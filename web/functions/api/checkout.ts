/**
 * POST /api/checkout
 * Cree une Stripe Checkout Session pour l'ebook halal & patrimoine (14 EUR)
 * avec metadata tracking (event_id, fbclid, fbp, gclid, utm_*).
 *
 * Body JSON : { contentName?, eventId, fbclid?, fbp?, gclid?, utm? }
 * Return    : { url } (URL Stripe Checkout) OU { error }
 */

interface UTM {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

interface Body {
  contentName?: string;
  eventId?: string;
  fbclid?: string;
  fbp?: string;
  gclid?: string;
  utm?: UTM;
}

interface Env {
  STRIPE_SECRET_KEY?: string;
  STRIPE_PRICE_ID?: string;
  SITE_URL?: string;
}

const DEFAULT_SITE = "https://muslimfinance.net";

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { env, request } = ctx;

  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PRICE_ID) {
    return json(
      { error: "Stripe non configure (STRIPE_SECRET_KEY / STRIPE_PRICE_ID manquant)" },
      503,
    );
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    // ignore
  }

  const site = env.SITE_URL || DEFAULT_SITE;
  const eventId = body.eventId || crypto.randomUUID();

  // Stripe Checkout Session via REST API (Workers-compatible)
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("payment_method_types[0]", "card");
  params.set("line_items[0][price]", env.STRIPE_PRICE_ID);
  params.set("line_items[0][quantity]", "1");
  params.set("success_url", `${site}/ebook/success?sid={CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", `${site}/ebook/v2?canceled=1`);
  params.set("allow_promotion_codes", "false");
  params.set("locale", "fr");

  // Metadata pour tracking dans le webhook (event_id + fbclid + fbp + gclid + utm_*)
  params.set("metadata[event_id]", eventId);
  if (body.contentName) params.set("metadata[content_name]", body.contentName);
  if (body.fbclid) params.set("metadata[fbclid]", body.fbclid);
  if (body.fbp) params.set("metadata[fbp]", body.fbp);
  if (body.gclid) params.set("metadata[gclid]", body.gclid);
  if (body.utm?.source) params.set("metadata[utm_source]", body.utm.source);
  if (body.utm?.medium) params.set("metadata[utm_medium]", body.utm.medium);
  if (body.utm?.campaign) params.set("metadata[utm_campaign]", body.utm.campaign);
  if (body.utm?.content) params.set("metadata[utm_content]", body.utm.content);

  // client_reference_id = eventId pour dedup Google Ads (gclid) si besoin
  params.set("client_reference_id", eventId);

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!stripeRes.ok) {
    const err = (await stripeRes.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    console.error("stripe_checkout_error", err);
    return json(
      { error: err.error?.message ?? "Erreur creation checkout" },
      500,
    );
  }

  const session = (await stripeRes.json()) as { url: string; id: string };
  return json({ url: session.url, id: session.id });
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
