"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function SubscribeForm({
  ctaLabel = "Recevoir le guide en avant-première",
  source = "ebook_landing",
}: {
  ctaLabel?: string;
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");

    try {
      const url = new URL(window.location.href);
      const res = await fetch("https://muslimfinance-subscribe.backwatcherdev.workers.dev/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          utm_source: url.searchParams.get("utm_source") ?? undefined,
          utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
          utm_content: url.searchParams.get("utm_content") ?? undefined,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (data.ok) {
        setStatus("ok");
        setMsg("C’est noté. Tu recevras un aperçu de 10 pages la semaine prochaine.");
        try {
          window.fbq?.("track", "Lead", {
            content_name: "ebook_halal_patrimoine",
            value: 14,
            currency: "EUR",
          });
        } catch {}
      } else {
        setStatus("err");
        setMsg(data.error ?? "Erreur, réessaie.");
      }
    } catch {
      setStatus("err");
      setMsg("Erreur réseau, réessaie.");
    }
  }

  return (
    <form className="w-full max-w-md mx-auto" onSubmit={onSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="ton.email@exemple.com"
          className="flex-1 px-4 py-3 rounded-md bg-white/95 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
          disabled={status === "loading" || status === "ok"}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "ok"}
          className="px-6 py-3 rounded-md bg-stone-900 text-amber-50 font-semibold hover:bg-stone-800 active:bg-stone-950 disabled:opacity-50 transition shadow-sm"
        >
          {status === "loading" ? "Envoi..." : status === "ok" ? "Inscrit" : ctaLabel}
        </button>
      </div>
      {status !== "idle" && status !== "loading" && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            status === "ok" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {msg}
        </p>
      )}
      <p className="mt-3 text-xs text-stone-500">
        0 paiement maintenant. Tarif lancement <strong>14 €</strong> à la sortie (15 juin 2026).
      </p>
    </form>
  );
}
