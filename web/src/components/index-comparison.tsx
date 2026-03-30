"use client";

import { useState } from "react";

type Holding = {
  ticker: string;
  company: string;
  weight: number;
  halal_weight?: number;
  halal_status: string;
  original_weight?: number;
};

type Props = {
  nasdaqHoldings: Holding[];
  nasdaqStats: { total_nasdaq100: number; included: number; excluded: number; included_weight_pct: number };
  sp500Holdings: Holding[];
  sp500Stats: { total_sp500: number; included: number; excluded: number };
  locale?: string;
};

function topN(holdings: Holding[], n: number, key: "weight" | "halal_weight") {
  return [...holdings]
    .sort((a, b) => (b[key] ?? b.weight) - (a[key] ?? a.weight))
    .slice(0, n);
}

function sumWeight(holdings: Holding[], key: "weight" | "halal_weight", n: number) {
  return topN(holdings, n, key).reduce((s, h) => s + (h[key] ?? h.weight), 0);
}

export function IndexComparison({ nasdaqHoldings, nasdaqStats, sp500Holdings, sp500Stats, locale = "fr" }: Props) {
  const [tab, setTab] = useState<"nasdaq" | "sp500">("nasdaq");
  const isFr = locale === "fr";

  const allNasdaq = nasdaqHoldings.filter(() => true); // all original holdings including excluded would need full data
  const halalNasdaq = nasdaqHoldings.filter((h) => h.halal_status === "halal");
  const halalSp500 = sp500Holdings.filter((h) => h.halal_status === "halal");

  const holdings = tab === "nasdaq" ? halalNasdaq : halalSp500;
  const stats = tab === "nasdaq" ? nasdaqStats : sp500Stats;
  const total = tab === "nasdaq" ? nasdaqStats.total_nasdaq100 : sp500Stats.total_sp500;
  const included = stats.included;
  const excluded = stats.excluded;

  // Concentration analysis
  const top1w = holdings[0]?.halal_weight ?? holdings[0]?.weight ?? 0;
  const top5w = sumWeight(holdings, "halal_weight", 5);
  const top10w = sumWeight(holdings, "halal_weight", 10);

  return (
    <div>
      {/* Tab selector */}
      <div className="flex gap-2 mb-8">
        {(["nasdaq", "sp500"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              tab === t
                ? "bg-[var(--color-navy)] text-white shadow-sm"
                : "bg-white/60 text-[var(--color-muted-foreground)] hover:bg-white/80 border border-[var(--border)]"
            }`}
          >
            {t === "nasdaq" ? "NASDAQ 100" : "S&P 500"}
          </button>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-[var(--color-navy)]">{included}<span className="text-lg text-[var(--color-muted-foreground)]">/{total}</span></p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{isFr ? "actions halal" : "halal stocks"}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-[var(--color-haram)]">{excluded}</p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{isFr ? "exclues" : "excluded"}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-[var(--color-gold)]">{top1w.toFixed(1)}%</p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{isFr ? "poids #1 (halal)" : "top stock weight (halal)"}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-[var(--color-halal)]">{top5w.toFixed(1)}%</p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{isFr ? "top 5 (halal)" : "top 5 weight (halal)"}</p>
        </div>
      </div>

      {/* Concentration comparison bar */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h3 className="font-semibold text-[var(--color-navy)] mb-4">
          {isFr ? "Concentration : indice halal vs indice complet" : "Concentration: halal vs full index"}
        </h3>
        <div className="space-y-4">
          {[
            { label: "Top 1", halal: top1w, original: holdings[0]?.original_weight ?? holdings[0]?.weight ?? 0 },
            { label: "Top 5", halal: top5w, original: sumWeight(holdings, "weight", 5) },
            { label: "Top 10", halal: top10w, original: sumWeight(holdings, "weight", 10) },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--color-muted-foreground)]">{row.label}</span>
                <span className="text-xs text-[var(--color-muted-foreground)]">
                  {isFr ? "Original" : "Original"}: {row.original.toFixed(1)}% → Halal: {row.halal.toFixed(1)}%
                </span>
              </div>
              <div className="flex gap-1 h-6">
                <div
                  className="rounded-l-lg bg-[var(--color-navy)]/20 flex items-center justify-center"
                  style={{ width: `${Math.min(row.original, 100)}%` }}
                >
                  <span className="text-[10px] font-medium text-[var(--color-navy)]">{row.original.toFixed(1)}%</span>
                </div>
                <div
                  className="rounded-r-lg bg-[var(--color-gold)] flex items-center justify-center"
                  style={{ width: `${Math.min(row.halal, 100)}%` }}
                >
                  <span className="text-[10px] font-bold text-white">{row.halal.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 side by side */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-[var(--color-navy)] mb-4">
          {isFr ? "Top 10 — poids dans l'indice halal" : "Top 10 — weight in halal index"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-2 px-3 text-[var(--color-muted-foreground)] font-medium">#</th>
                <th className="text-left py-2 px-3 text-[var(--color-muted-foreground)] font-medium">Ticker</th>
                <th className="text-left py-2 px-3 text-[var(--color-muted-foreground)] font-medium">{isFr ? "Entreprise" : "Company"}</th>
                <th className="text-right py-2 px-3 text-[var(--color-muted-foreground)] font-medium">{isFr ? "Poids original" : "Original weight"}</th>
                <th className="text-right py-2 px-3 text-[var(--color-muted-foreground)] font-medium">{isFr ? "Poids halal" : "Halal weight"}</th>
              </tr>
            </thead>
            <tbody>
              {topN(holdings, 10, "halal_weight").map((h, i) => (
                <tr key={h.ticker} className="border-b border-[var(--border)]/50">
                  <td className="py-2 px-3 text-[var(--color-muted-foreground)]">{i + 1}</td>
                  <td className="py-2 px-3 font-medium">{h.ticker}</td>
                  <td className="py-2 px-3 text-[var(--color-muted-foreground)]">{h.company}</td>
                  <td className="py-2 px-3 text-right">{(h.original_weight ?? h.weight).toFixed(2)}%</td>
                  <td className="py-2 px-3 text-right font-medium text-[var(--color-gold)]">{(h.halal_weight ?? h.weight).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
