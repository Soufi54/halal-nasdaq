"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Le domaine prod (muslimfinance.net) est servi par GitHub Pages, sans
// backend : on poste alors vers les Pages Functions Cloudflare en absolu.
function apiBase(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.endsWith("pages.dev")
    ? ""
    : "https://muslimfinance.pages.dev";
}

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)"),
  );
  return match ? decodeURIComponent(match[2]) : "";
}

export function SubscribeForm({
  ctaLabel = "Recevoir la checklist",
  source = "ebook_landing",
  successMsg = "C'est noté. Tu vas recevoir la checklist par email.",
  hint = "0 paiement. Checklist gratuite (Détecter Validus en 30s + watchlist actions halal).",
}: {
  ctaLabel?: string;
  source?: string;
  successMsg?: string;
  hint?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");
  const [formStarted, setFormStarted] = useState(false);

  function onEmailFocus() {
    if (formStarted) return;
    setFormStarted(true);
    try {
      window.fbq?.("trackCustom", "FormStart", { content_name: source });
    } catch {}
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const eventId =
      globalThis.crypto?.randomUUID?.() ??
      String(Date.now()) + Math.random().toString(36).slice(2);

    const url = new URL(window.location.href);
    const fbclid = url.searchParams.get("fbclid") ?? "";
    const fbp = getCookie("_fbp");

    // 1. Pixel client Lead event (dedup avec CAPI via eventID)
    try {
      window.fbq?.(
        "track",
        "Lead",
        {
          content_name: source,
          value: 29,
          currency: "EUR",
        },
        { eventID: eventId },
      );
    } catch {}

    try {
      // Save au KV + welcome email + Meta CAPI Lead (tout dans /api/subscribe)
      const kvRes = await fetch(`${apiBase()}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          eventId,
          fbclid: fbclid || undefined,
          fbp: fbp || undefined,
          utm_source: url.searchParams.get("utm_source") ?? undefined,
          utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
          utm_content: url.searchParams.get("utm_content") ?? undefined,
        }),
      });
      const data = (await kvRes.json()) as { ok: boolean; error?: string };

      if (data.ok) {
        setStatus("ok");
        setMsg(successMsg);
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
          onFocus={onEmailFocus}
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
      <p className="mt-3 text-xs text-stone-500">{hint}</p>
      <p className="mt-2 text-[11px] text-stone-400">
        En t&apos;inscrivant, tu acceptes de recevoir des emails liés à la
        sortie du guide. Désinscription à tout moment (réponds STOP).{" "}
        <a href="/confidentialite" className="underline">
          Confidentialité
        </a>
      </p>
    </form>
  );
}
