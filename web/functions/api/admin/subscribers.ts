interface Env {
  SUBSCRIBERS_KV?: KVNamespace;
  ADMIN_TOKEN?: string;
}

interface Subscriber {
  email: string;
  source?: string;
  ts: string;
  ip?: string;
  ua?: string;
  country?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  referer?: string;
  price_anchor?: number;
}

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const headerToken = ctx.request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const queryToken = url.searchParams.get("token");
  const provided = headerToken ?? queryToken ?? "";
  const expected = ctx.env.ADMIN_TOKEN;

  if (!expected || provided !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!ctx.env.SUBSCRIBERS_KV) {
    return new Response("KV not bound", { status: 500 });
  }

  const all: Subscriber[] = [];
  let cursor: string | undefined;

  do {
    const page: KVNamespaceListResult<unknown, string> = await ctx.env.SUBSCRIBERS_KV.list({
      prefix: "email:",
      cursor,
      limit: 1000,
    });
    cursor = page.list_complete ? undefined : page.cursor;
    const values = await Promise.all(
      page.keys.map(async (k) => {
        const v = await ctx.env.SUBSCRIBERS_KV!.get(k.name);
        return v ? (JSON.parse(v) as Subscriber) : null;
      })
    );
    for (const v of values) if (v) all.push(v);
  } while (cursor);

  all.sort((a, b) => (b.ts > a.ts ? 1 : -1));

  if (url.searchParams.get("format") === "csv") {
    const header = "email,ts,source,country,utm_source,utm_campaign,utm_content,ip,referer";
    const rows = all.map((s) =>
      [s.email, s.ts, s.source ?? "", s.country ?? "", s.utm_source ?? "", s.utm_campaign ?? "", s.utm_content ?? "", s.ip ?? "", s.referer ?? ""]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    return new Response([header, ...rows].join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="ebook_subscribers_${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(JSON.stringify({ ok: true, count: all.length, subscribers: all }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
