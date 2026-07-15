/**
 * POST /api/stripe/webhook
 * Recoit les events Stripe (checkout.session.completed) et :
 *   1. Delivre l'ebook par email (Resend) avec lien PDF direct
 *   2. Envoie l'event Purchase a Meta Conversion API (server-side)
 *   3. Save la vente dans KV (PURCHASES_KV)
 *
 * Signature Stripe verifiee avec STRIPE_WEBHOOK_SECRET.
 *
 * Return : "OK" (200) OU 400/500 en cas d'erreur
 */

interface Env {
  STRIPE_WEBHOOK_SECRET?: string;
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  EBOOK_URL?: string;
  SITE_URL?: string;
  SUBSCRIBERS_KV?: KVNamespace;
  PURCHASES_KV?: KVNamespace;
}

const DEFAULT_EBOOK_URL =
  "https://muslimfinance.net/products/halal-patrimoine-v2.pdf";

interface StripeSession {
  id: string;
  object: "checkout.session";
  amount_total: number;
  currency: string;
  customer_details?: { email?: string; name?: string };
  metadata?: Record<string, string>;
  payment_status: string;
}

interface StripeEvent {
  id: string;
  type: string;
  data: { object: StripeSession };
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { env, request } = ctx;

  const rawBody = await request.text();
  const sigHeader = request.headers.get("stripe-signature") ?? "";

  // 1. Verifier signature Stripe
  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET manquant");
    return new Response("Config missing", { status: 503 });
  }

  const isValid = await verifyStripeSignature(
    rawBody,
    sigHeader,
    env.STRIPE_WEBHOOK_SECRET,
  );
  if (!isValid) {
    console.error("Stripe signature invalid");
    return new Response("Invalid signature", { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // On acknowledge les autres events sans traiter
    return new Response("Ignored", { status: 200 });
  }

  const session = event.data.object;
  if (session.payment_status !== "paid") {
    return new Response("Not paid yet", { status: 200 });
  }

  const email = session.customer_details?.email;
  const amount = session.amount_total / 100;
  const currency = (session.currency || "eur").toUpperCase();
  const metadata = session.metadata ?? {};
  const eventId = metadata.event_id || event.id;

  // 2. Envoyer ebook par email (Resend)
  if (email && env.RESEND_API_KEY) {
    await sendEbookEmail({
      to: email,
      resendKey: env.RESEND_API_KEY,
      from: env.RESEND_FROM_EMAIL ?? "guide@muslimfinance.net",
      ebookUrl: env.EBOOK_URL ?? DEFAULT_EBOOK_URL,
      siteUrl: env.SITE_URL ?? "https://muslimfinance.net",
    });
  } else {
    console.warn("Ebook delivery skipped: no email or no RESEND_API_KEY");
  }

  // 3. Meta CAPI Purchase (server-side)
  if (env.META_PIXEL_ID && env.META_CAPI_ACCESS_TOKEN && email) {
    await sendMetaPurchase({
      pixelId: env.META_PIXEL_ID,
      accessToken: env.META_CAPI_ACCESS_TOKEN,
      testEventCode: env.META_TEST_EVENT_CODE,
      email,
      amount,
      currency,
      eventId,
      fbclid: metadata.fbclid,
      fbp: metadata.fbp,
    });
  }

  // 4. Save purchase dans KV
  if (env.PURCHASES_KV && email) {
    const record = {
      email,
      amount,
      currency,
      session_id: session.id,
      event_id: eventId,
      fbclid: metadata.fbclid ?? "",
      gclid: metadata.gclid ?? "",
      utm_source: metadata.utm_source ?? "",
      utm_campaign: metadata.utm_campaign ?? "",
      utm_content: metadata.utm_content ?? "",
      ts: new Date().toISOString(),
    };
    try {
      await env.PURCHASES_KV.put(
        `purchase:${session.id}`,
        JSON.stringify(record),
      );
      await env.PURCHASES_KV.put(`email:${email.toLowerCase()}`, session.id);
    } catch (e) {
      console.error("KV purchase save error", e);
    }
  }

  return new Response("OK", { status: 200 });
};

// ── Meta CAPI Purchase ──────────────────────────────────────────────────
async function sendMetaPurchase(args: {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
  email: string;
  amount: number;
  currency: string;
  eventId: string;
  fbclid?: string;
  fbp?: string;
}): Promise<void> {
  const hashedEmail = await sha256(args.email.trim().toLowerCase());
  const now = Math.floor(Date.now() / 1000);
  const fbc = args.fbclid ? `fb.1.${Date.now()}.${args.fbclid}` : undefined;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: now,
        event_id: args.eventId,
        action_source: "website",
        event_source_url: "https://muslimfinance.net/ebook/v2",
        user_data: {
          em: [hashedEmail],
          ...(fbc ? { fbc } : {}),
          ...(args.fbp ? { fbp: args.fbp } : {}),
        },
        custom_data: {
          currency: args.currency,
          value: args.amount,
          content_ids: ["halal-patrimoine-v2"],
          content_name: "Halal & patrimoine v2",
          content_type: "product",
        },
      },
    ],
  };
  if (args.testEventCode) payload.test_event_code = args.testEventCode;

  const url = `https://graph.facebook.com/v19.0/${args.pixelId}/events?access_token=${args.accessToken}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("meta_capi_purchase_error", await res.text());
    }
  } catch (e) {
    console.error("meta_capi_purchase_exception", e);
  }
}

// ── Delivery email via Resend ───────────────────────────────────────────
async function sendEbookEmail(args: {
  to: string;
  resendKey: string;
  from: string;
  ebookUrl: string;
  siteUrl: string;
}): Promise<void> {
  const html = ebookEmailHtml(args.ebookUrl, args.siteUrl);
  const text = ebookEmailText(args.ebookUrl, args.siteUrl);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: args.from,
        to: args.to,
        subject: "Ta précommande Halal & patrimoine v2 — télécharge le PDF",
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("resend_error", await res.text());
    }
  } catch (e) {
    console.error("resend_exception", e);
  }
}

function ebookEmailHtml(ebookUrl: string, siteUrl: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<body style="font-family: -apple-system, Arial, sans-serif; background: #fafaf7; color: #1c1917; margin: 0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; padding: 40px 32px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <p style="font-size: 11px; letter-spacing: 2px; color: #c9a662; text-transform: uppercase; margin: 0 0 16px;">MUSLIMFINANCE.NET</p>

    <h1 style="font-size: 26px; margin: 0 0 12px; color: #1c1917;">Merci pour ta précommande.</h1>
    <p style="color: #57534e; line-height: 1.6; margin: 0 0 12px;">
      Tu fais partie des personnes qui ont pris le tarif précommande à
      <strong>29 EUR</strong> (au lieu de 63 EUR après le 21 juillet 2026).
    </p>
    <p style="color: #57534e; line-height: 1.6; margin: 0 0 24px;">
      Ton exemplaire de <strong>Halal &amp; patrimoine v2</strong> est prêt.
      Clique sur le bouton pour télécharger le PDF (47 pages).
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${ebookUrl}" style="display: inline-block; background: #c9a662; color: #1c1917; padding: 14px 32px; border-radius: 8px; font-weight: bold; text-decoration: none;">
        Télécharger le PDF
      </a>
    </div>

    <p style="color: #57534e; font-size: 14px; line-height: 1.6; margin: 24px 0;">
      Le lien reste valable — enregistre le PDF sur ton téléphone ou ton
      ordinateur pour le relire quand tu veux. Aucun DRM.
    </p>

    <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />

    <p style="color: #57534e; font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
      <strong>Prochaine étape :</strong> chapitre 1 (page 4) puis chapitre 4 (page 15) — c'est là que se trouve la méthode complète.
    </p>
    <p style="color: #57534e; font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
      Suis-nous sur X : <a href="https://x.com/muslimfinance_" style="color: #c9a662;">@muslimfinance_</a>
    </p>

    <p style="color: #a8a29e; font-size: 12px; line-height: 1.5; margin: 32px 0 0;">
      Ce guide est un outil d'éducation financière. Il ne constitue pas un
      conseil en investissement personnalisé au sens de la directive MIF II.
      Tu restes seul responsable de tes décisions.
    </p>

    <p style="color: #a8a29e; font-size: 12px; text-align: center; margin: 24px 0 0;">
      <a href="${siteUrl}" style="color: #a8a29e;">${siteUrl.replace(/^https?:\/\//, "")}</a>
    </p>
  </div>
</body>
</html>`;
}

function ebookEmailText(ebookUrl: string, siteUrl: string): string {
  return `Merci pour ta précommande.

Tu fais partie des personnes qui ont pris le tarif précommande à 29 EUR (au lieu de 63 EUR après le 21 juillet 2026).

Ton exemplaire de "Halal & patrimoine v2" est prêt :

${ebookUrl}

47 pages actionnables. PDF sans DRM — enregistre-le sur ton appareil.

Prochaine étape : chapitre 1 (page 4) puis chapitre 4 (page 15) — c'est là que se trouve la méthode complète.

Suis-nous sur X : https://x.com/muslimfinance_

---
Ce guide est un outil d'éducation financière. Il ne constitue pas un conseil en investissement personnalisé au sens de la directive MIF II. Tu restes seul responsable de tes décisions.

${siteUrl}`;
}

// ── Stripe signature verification ────────────────────────────────────────
async function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
): Promise<boolean> {
  // Stripe-Signature: t=timestamp,v1=hash,v0=old_hash
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const [k, v] = p.split("=");
      return [k, v];
    }),
  );
  const timestamp = parts["t"];
  const expected = parts["v1"];
  if (!timestamp || !expected) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signedPayload),
  );
  const hex = [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Timing-safe compare
  if (hex.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) {
    diff |= hex.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
