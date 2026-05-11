"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function StickyEmailBar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMsg("Email invalide");
      return;
    }
    setStatus("loading");
    try {
      const url = new URL(window.location.href);
      const res = await fetch("https://muslimfinance-subscribe.backwatcherdev.workers.dev/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "v2_sticky",
          utm_source: url.searchParams.get("utm_source") ?? undefined,
          utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
          utm_content: url.searchParams.get("utm_content") ?? undefined,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        setStatus("ok");
        setMsg("Inscrit");
        try {
          window.fbq?.("track", "Lead", {
            content_name: "ebook_halal_patrimoine",
            value: 14,
            currency: "EUR",
          });
        } catch {}
      } else {
        setStatus("err");
        setMsg(data.error ?? "Erreur");
      }
    } catch {
      setStatus("err");
      setMsg("Erreur réseau");
    }
  }

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-900 border-t-2 border-amber-500 shadow-2xl">
      {status === "ok" ? (
        <div className="px-4 py-4 text-center">
          <p className="text-amber-300 font-bold text-sm">
            ✓ C&apos;est noté. Aperçu de 10 pages la semaine prochaine.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-amber-400 font-bold text-base">14 €</span>
            <span className="text-stone-400 line-through text-xs">29 €</span>
            <span className="text-[10px] text-stone-400 ml-auto">payable à la sortie</span>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              placeholder="ton.email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 px-3 py-2.5 rounded-md bg-stone-50 text-stone-900 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2.5 rounded-md bg-amber-500 text-stone-950 font-bold text-sm whitespace-nowrap disabled:opacity-50 active:bg-amber-400"
            >
              {status === "loading" ? "..." : "Réserver"}
            </button>
          </div>
          {status === "err" && (
            <p className="mt-1.5 text-[11px] text-red-300">{msg}</p>
          )}
        </form>
      )}
    </div>
  );
}
