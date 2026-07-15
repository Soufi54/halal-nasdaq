/**
 * POST /api/subscribe
 * Recupere un email et :
 *   1. Save dans SUBSCRIBERS_KV
 *   2. Envoie un welcome email via Resend
 *   3. Fire event Lead au CAPI Meta (server-side dedup event_id)
 *
 * Body JSON : { email, source?, utm_source?, utm_campaign?, utm_content?, eventId?, fbclid?, fbp? }
 * Return    : { ok } | { ok: false, error }
 */

interface Body {
  email?: string;
  source?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  eventId?: string;
  fbclid?: string;
  fbp?: string;
}

interface Subscriber {
  email: string;
  source: string;
  ts: string;
  ip: string;
  ua: string;
  country: string;
  price_anchor: number;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  referer?: string;
}

interface Env {
  SUBSCRIBERS_KV?: KVNamespace;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
  SITE_URL?: string;
}

const DEFAULT_FROM = "guide@muslimfinance.net";
const DEFAULT_SITE = "https://muslimfinance.net";

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ ok: false, error: "Body invalide" }, 400);
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Email invalide" }, 400);
  }

  const sub: Subscriber = {
    email,
    source: typeof body.source === "string" ? body.source : "ebook_landing",
    ts: new Date().toISOString(),
    ip:
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "",
    ua: request.headers.get("user-agent")?.slice(0, 200) ?? "",
    country:
      (request as Request & { cf?: { country?: string } }).cf?.country ?? "",
    price_anchor: 29,
    utm_source: body.utm_source,
    utm_campaign: body.utm_campaign,
    utm_content: body.utm_content,
    referer: request.headers.get("referer") ?? undefined,
  };

  // 1. Save KV
  if (!env.SUBSCRIBERS_KV) {
    console.error("SUBSCRIBERS_KV binding manquant");
    return json({ ok: false, error: "Storage indisponible" }, 503);
  }
  try {
    await env.SUBSCRIBERS_KV.put(`email:${email}`, JSON.stringify(sub));
  } catch (e) {
    console.error("kv_put_error", e);
    return json({ ok: false, error: "Storage erreur" }, 500);
  }

  // 2. Welcome email Resend (fire and forget - ne bloque pas la réponse)
  if (env.RESEND_API_KEY) {
    ctx.waitUntil(
      sendWelcomeEmail({
        to: email,
        resendKey: env.RESEND_API_KEY,
        from: env.RESEND_FROM_EMAIL ?? DEFAULT_FROM,
        siteUrl: env.SITE_URL ?? DEFAULT_SITE,
      }),
    );
  }

  // 3. Meta CAPI Lead server-side
  if (env.META_PIXEL_ID && env.META_CAPI_ACCESS_TOKEN) {
    const eventId = body.eventId ?? crypto.randomUUID();
    ctx.waitUntil(
      sendMetaLead({
        pixelId: env.META_PIXEL_ID,
        accessToken: env.META_CAPI_ACCESS_TOKEN,
        testEventCode: env.META_TEST_EVENT_CODE,
        email,
        eventId,
        fbclid: body.fbclid,
        fbp: body.fbp,
        clientIp: sub.ip,
        userAgent: sub.ua,
        referer: sub.referer,
        source: sub.source,
      }),
    );
  }

  return json({ ok: true });
};

// ── Welcome email via Resend ───────────────────────────────────────────
async function sendWelcomeEmail(args: {
  to: string;
  resendKey: string;
  from: string;
  siteUrl: string;
}): Promise<void> {
  const html = welcomeEmailHtml(args.siteUrl);
  const text = welcomeEmailText(args.siteUrl);

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
        subject: "Ton exemplaire de Halal & patrimoine v2 est réservé",
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

function welcomeEmailHtml(siteUrl: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<body style="font-family: -apple-system, Arial, sans-serif; background: #fafaf7; color: #1c1917; margin: 0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; padding: 40px 32px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <p style="font-size: 11px; letter-spacing: 2px; color: #c9a662; text-transform: uppercase; margin: 0 0 16px;">MUSLIMFINANCE.NET</p>

    <h1 style="font-size: 26px; margin: 0 0 12px; color: #1c1917;">C'est noté.</h1>
    <p style="color: #57534e; line-height: 1.6; margin: 0 0 16px;">
      Ton email est inscrit sur la liste. À la sortie officielle, tu recevras :
    </p>

    <ul style="color: #57534e; line-height: 1.7; margin: 0 0 24px; padding-left: 20px;">
      <li><strong>L'ebook Halal &amp; patrimoine v2</strong> (47 pages PDF)</li>
      <li><strong>Un lien de commande à 29 EUR</strong> (au lieu de 63 EUR pour le public)</li>
      <li>Un accès en avant-première 48h avant la sortie publique</li>
    </ul>

    <div style="background: #f7f3eb; border-left: 4px solid #c9a662; padding: 16px 20px; margin: 24px 0;">
      <p style="margin: 0 0 8px; font-weight: bold; color: #1c1917;">Ce que contient le guide :</p>
      <p style="margin: 0; color: #57534e; font-size: 14px; line-height: 1.6;">
        Cas concret du portefeuille perso (+18 728 EUR PV latente, 100 %
        AAOIFI), méthode Nvidia/ARM/ASML halal, plans hadj/mariage/apport
        maison, courtiers utilisables + protocole 4 règles, or physique,
        détection arnaques type Validus.
      </p>
    </div>

    <h2 style="font-size: 18px; margin: 32px 0 12px; color: #1c1917;">En attendant</h2>
    <p style="color: #57534e; line-height: 1.6; margin: 0 0 12px;">
      Suis <a href="https://x.com/muslimfinance_" style="color: #c9a662; font-weight: bold;">@muslimfinance_</a> sur X pour les backtests hebdo et la watchlist AAOIFI mise à jour chaque semaine.
    </p>

    <p style="color: #57534e; line-height: 1.6; margin: 0 0 24px;">
      Explore les outils gratuits déjà disponibles :
    </p>

    <ul style="color: #57534e; line-height: 1.7; margin: 0 0 24px; padding-left: 20px;">
      <li><a href="${siteUrl}/nasdaq-halal" style="color: #c9a662;">NASDAQ 100 halal</a> — 66 actions filtrées AAOIFI</li>
      <li><a href="${siteUrl}/backtest" style="color: #c9a662;">Backtest 5 ans</a> — performance vs indices classiques</li>
      <li><a href="${siteUrl}/checklist" style="color: #c9a662;">Checklist arnaque</a> — détecter Validus en 30 secondes</li>
    </ul>

    <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />

    <p style="color: #a8a29e; font-size: 12px; line-height: 1.5; margin: 0 0 12px;">
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

function welcomeEmailText(siteUrl: string): string {
  return `C'est noté.

Ton email est inscrit sur la liste. À la sortie officielle, tu recevras :
- L'ebook Halal & patrimoine v2 (47 pages PDF)
- Un lien de commande à 29 EUR (au lieu de 63 EUR pour le public)
- Un accès en avant-première 48h avant la sortie publique

Ce que contient le guide :
Cas concret du portefeuille perso (+18 728 EUR PV latente, 100 % AAOIFI), méthode Nvidia/ARM/ASML halal, plans hadj/mariage/apport maison, courtiers utilisables + protocole 4 règles, or physique, détection arnaques type Validus.

En attendant :
Suis @muslimfinance_ sur X : https://x.com/muslimfinance_

Explore les outils gratuits déjà disponibles :
- NASDAQ 100 halal : ${siteUrl}/nasdaq-halal
- Backtest 5 ans : ${siteUrl}/backtest
- Checklist arnaque : ${siteUrl}/checklist

---
Ce guide est un outil d'éducation financière. Il ne constitue pas un conseil en investissement personnalisé au sens de la directive MIF II. Tu restes seul responsable de tes décisions.

${siteUrl}`;
}

// ── Meta CAPI Lead ─────────────────────────────────────────────────────
async function sendMetaLead(args: {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
  email: string;
  eventId: string;
  fbclid?: string;
  fbp?: string;
  clientIp: string;
  userAgent: string;
  referer?: string;
  source: string;
}): Promise<void> {
  const hashedEmail = await sha256(args.email);
  const now = Math.floor(Date.now() / 1000);
  const fbc = args.fbclid ? `fb.1.${Date.now()}.${args.fbclid}` : undefined;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: now,
        event_id: args.eventId,
        event_source_url: args.referer ?? "https://muslimfinance.net/ebook/v2",
        action_source: "website",
        user_data: {
          em: [hashedEmail],
          client_ip_address: args.clientIp,
          client_user_agent: args.userAgent,
          ...(fbc ? { fbc } : {}),
          ...(args.fbp ? { fbp: args.fbp } : {}),
        },
        custom_data: {
          currency: "EUR",
          value: 29,
          content_name: args.source,
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
      console.error("meta_capi_lead_error", await res.text());
    }
  } catch (e) {
    console.error("meta_capi_lead_exception", e);
  }
}

async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
