"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const WORKER_URL = "https://muslimfinance-subscribe.backwatcherdev.workers.dev/api/lead";
const PDF_URL = "/lead-magnets/checklist-validus.pdf";

export function ChecklistForm({ source = "checklist_hero" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMsg("Email invalide");
      return;
    }
    setStatus("loading");
    try {
      const url = new URL(window.location.href);
      const res = await fetch(WORKER_URL, {
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
        setMsg("C'est noté. Vérifie ta boîte mail dans 30 sec.");
        try {
          window.fbq?.("track", "Lead", {
            content_name: "leadmagnet_checklist_validus",
            value: 0,
            currency: "EUR",
          });
        } catch {}
        // Open PDF directly as fallback (in case email is filtered)
        setTimeout(() => {
          window.open(PDF_URL, "_blank", "noopener,noreferrer");
        }, 700);
      } else {
        setStatus("err");
        setMsg(data.error ?? "Erreur, réessaie.");
      }
    } catch {
      setStatus("err");
      setMsg("Erreur réseau, réessaie.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
        <p className="font-semibold mb-1">✓ {msg}</p>
        <p className="text-sm">
          Le PDF s&apos;ouvre dans un nouvel onglet. Si rien ne s&apos;est passé,{" "}
          <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
            clique ici pour télécharger
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form className="w-full" onSubmit={onSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="ton.email@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 px-4 py-3 rounded-md bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-3 rounded-md bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 active:bg-amber-300 disabled:opacity-50 transition shadow-sm whitespace-nowrap"
        >
          {status === "loading" ? "Envoi..." : "Recevoir le guide"}
        </button>
      </div>
      {status === "err" && (
        <p role="status" className="mt-3 text-sm text-red-700">{msg}</p>
      )}
    </form>
  );
}
