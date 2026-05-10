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
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  let body: Record<string, unknown> = {};
  try {
    body = await ctx.request.json();
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
    ip: ctx.request.headers.get("cf-connecting-ip") ?? ctx.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
    ua: ctx.request.headers.get("user-agent")?.slice(0, 200) ?? "",
    country: (ctx.request as Request & { cf?: { country?: string } }).cf?.country ?? "",
    price_anchor: 14,
    utm_source: typeof body.utm_source === "string" ? body.utm_source : undefined,
    utm_campaign: typeof body.utm_campaign === "string" ? body.utm_campaign : undefined,
    utm_content: typeof body.utm_content === "string" ? body.utm_content : undefined,
    referer: ctx.request.headers.get("referer") ?? undefined,
  };

  if (!ctx.env.SUBSCRIBERS_KV) {
    console.error("SUBSCRIBERS_KV binding manquant");
    return json({ ok: false, error: "Storage indisponible" }, 503);
  }

  try {
    await ctx.env.SUBSCRIBERS_KV.put(`email:${email}`, JSON.stringify(sub));
  } catch (e) {
    console.error("kv_put_error", e);
    return json({ ok: false, error: "Storage erreur" }, 500);
  }

  return json({ ok: true });
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
