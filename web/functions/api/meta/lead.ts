/**
 * POST /api/meta/lead
 * Envoie un event `Lead` via Meta Conversion API (server-side) — bypass iOS ATT.
 *
 * Le pixel client envoie le meme event avec le meme event_id pour dedup Meta.
 *
 * Body JSON : { email, eventId, fbclid?, fbp?, value?, currency?, source? }
 * Return    : { ok } | { error }
 */

interface Body {
  email?: string;
  eventId?: string;
  fbclid?: string;
  fbp?: string;
  value?: number;
  currency?: string;
  source?: string;
}

interface Env {
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { env, request } = ctx;

  if (!env.META_PIXEL_ID || !env.META_CAPI_ACCESS_TOKEN) {
    return json(
      { error: "Meta CAPI non configure (PIXEL_ID / ACCESS_TOKEN manquant)" },
      503,
    );
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: "Body invalide" }, 400);
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Email invalide" }, 400);
  }

  const hashedEmail = await sha256(email);
  const clientIP =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";
  const userAgent = request.headers.get("user-agent") ?? "";
  const eventId = body.eventId ?? crypto.randomUUID();

  const now = Math.floor(Date.now() / 1000);
  const fbc = body.fbclid ? `fb.1.${Date.now()}.${body.fbclid}` : undefined;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: now,
        event_id: eventId,
        event_source_url: request.headers.get("referer") ?? "https://muslimfinance.net/ebook",
        action_source: "website",
        user_data: {
          em: [hashedEmail],
          client_ip_address: clientIP,
          client_user_agent: userAgent,
          ...(fbc ? { fbc } : {}),
          ...(body.fbp ? { fbp: body.fbp } : {}),
        },
        custom_data: {
          currency: body.currency ?? "EUR",
          value: body.value ?? 29,
          content_name: body.source ?? "ebook_halal_patrimoine_v2",
        },
      },
    ],
  };
  if (env.META_TEST_EVENT_CODE) {
    payload.test_event_code = env.META_TEST_EVENT_CODE;
  }

  const url = `https://graph.facebook.com/v19.0/${env.META_PIXEL_ID}/events?access_token=${env.META_CAPI_ACCESS_TOKEN}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("meta_capi_lead_error", err);
    return json({ error: "Meta CAPI erreur", details: err }, 502);
  }

  return json({ ok: true, event_id: eventId });
};

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
