"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)"),
  );
  return match ? decodeURIComponent(match[2]) : "";
}

function getQueryParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

/**
 * BuyButton — declenche l'achat via /api/checkout, envoie InitiateCheckout event
 * cote client (pixel) + cote server (CAPI dedup event_id).
 */
export function BuyButton({
  ctaLabel = "Acheter maintenant — 14 EUR",
  contentName = "ebook_halal_patrimoine_v2",
  variant = "dark",
}: {
  ctaLabel?: string;
  contentName?: string;
  variant?: "dark" | "light";
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "err">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onClick() {
    setStatus("loading");
    setMsg("");

    const eventId =
      globalThis.crypto?.randomUUID?.() ??
      String(Date.now()) + Math.random().toString(36).slice(2);

    const fbclid = getQueryParam("fbclid");
    const fbp = getCookie("_fbp");
    const gclid = getQueryParam("gclid");
    const utm = {
      source: getQueryParam("utm_source"),
      medium: getQueryParam("utm_medium"),
      campaign: getQueryParam("utm_campaign"),
      content: getQueryParam("utm_content"),
    };

    // Client-side pixel event (dedup avec CAPI via eventID)
    try {
      window.fbq?.(
        "track",
        "InitiateCheckout",
        {
          content_name: contentName,
          value: 29,
          currency: "EUR",
        },
        { eventID: eventId },
      );
    } catch {}

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentName,
          eventId,
          fbclid,
          fbp,
          gclid,
          utm,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (res.ok && data.url) {
        // Redirect vers Stripe Checkout
        window.location.href = data.url;
      } else {
        setStatus("err");
        setMsg(data.error ?? "Erreur, réessaie dans quelques secondes.");
      }
    } catch {
      setStatus("err");
      setMsg("Erreur réseau, réessaie.");
    }
  }

  const baseCls =
    "w-full px-6 py-4 rounded-md font-bold text-lg transition shadow-sm disabled:opacity-60";
  const darkCls =
    "bg-amber-500 text-stone-900 hover:bg-amber-400 active:bg-amber-600";
  const lightCls =
    "bg-amber-400 text-stone-900 hover:bg-amber-300 active:bg-amber-500";

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={status === "loading"}
        className={`${baseCls} ${variant === "light" ? lightCls : darkCls}`}
      >
        {status === "loading" ? "Redirection Stripe..." : ctaLabel}
      </button>
      {status === "err" && (
        <p role="status" className="mt-3 text-sm text-red-400">
          {msg}
        </p>
      )}
    </div>
  );
}
