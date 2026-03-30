"use client";

import { useState } from "react";

type Snapshot = {
  date: string;
  nasdaq100: { total: number; halal: number; halal_weight_pct: number };
  sp500: { total: number; halal: number; halal_weight_pct: number };
};

type Metric = "halal_count" | "halal_weight";

const LABELS: Record<string, Record<Metric, string>> = {
  fr: {
    halal_count: "Nombre d'actions halal",
    halal_weight: "Poids halal (%)",
  },
  en: {
    halal_count: "Halal stock count",
    halal_weight: "Halal weight (%)",
  },
};

const TAB_LABELS: Record<string, Record<Metric, string>> = {
  fr: { halal_count: "Nombre", halal_weight: "Poids %" },
  en: { halal_count: "Count", halal_weight: "Weight %" },
};

function getValue(s: Snapshot, index: "nasdaq100" | "sp500", metric: Metric): number {
  if (metric === "halal_count") return s[index].halal;
  return s[index].halal_weight_pct;
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  if (locale === "fr") {
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function HistoryChart({ data, locale = "fr" }: { data: Snapshot[]; locale?: string }) {
  const [metric, setMetric] = useState<Metric>("halal_count");

  if (data.length < 2) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-[var(--color-muted-foreground)]">
          {locale === "fr"
            ? "Le graphique sera disponible apres 2 semaines de donnees. Revenez bientot !"
            : "The chart will be available after 2 weeks of data. Come back soon!"}
        </p>
      </div>
    );
  }

  // Chart dimensions
  const W = 700, H = 320;
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // Data
  const nasdaqVals = data.map((s) => getValue(s, "nasdaq100", metric));
  const sp500Vals = data.map((s) => getValue(s, "sp500", metric));
  const allVals = [...nasdaqVals, ...sp500Vals];
  const minV = Math.floor(Math.min(...allVals) * 0.95);
  const maxV = Math.ceil(Math.max(...allVals) * 1.05);
  const range = maxV - minV || 1;

  function x(i: number) {
    return PAD.left + (i / (data.length - 1)) * chartW;
  }
  function y(v: number) {
    return PAD.top + chartH - ((v - minV) / range) * chartH;
  }

  function polyline(vals: number[]) {
    return vals.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  }

  // Y-axis ticks (4-5 ticks)
  const tickCount = 5;
  const step = range / (tickCount - 1);
  const yTicks = Array.from({ length: tickCount }, (_, i) => minV + step * i);

  return (
    <div>
      {/* Metric toggle */}
      <div className="flex gap-2 mb-6">
        {(["halal_count", "halal_weight"] as Metric[]).map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              metric === m
                ? "bg-[var(--color-navy)] text-white shadow-sm"
                : "bg-white/60 text-[var(--color-muted-foreground)] hover:bg-white/80 border border-[var(--border)]"
            }`}
          >
            {TAB_LABELS[locale]?.[m] ?? TAB_LABELS.en[m]}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px] mx-auto" style={{ minWidth: 400 }}>
          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={PAD.left} y1={y(tick)} x2={W - PAD.right} y2={y(tick)}
                stroke="var(--border)" strokeDasharray="4 4" strokeWidth="1"
              />
              <text x={PAD.left - 8} y={y(tick) + 4} textAnchor="end" fontSize="11" fill="var(--color-muted-foreground)">
                {metric === "halal_weight" ? tick.toFixed(1) : Math.round(tick)}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((s, i) => (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--color-muted-foreground)">
              {formatDate(s.date, locale)}
            </text>
          ))}

          {/* NASDAQ line */}
          <polyline
            points={polyline(nasdaqVals)}
            fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
          {nasdaqVals.map((v, i) => (
            <circle key={`n${i}`} cx={x(i)} cy={y(v)} r="4" fill="var(--color-gold)" stroke="white" strokeWidth="2" />
          ))}

          {/* S&P 500 line */}
          <polyline
            points={polyline(sp500Vals)}
            fill="none" stroke="var(--color-halal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
          {sp500Vals.map((v, i) => (
            <circle key={`s${i}`} cx={x(i)} cy={y(v)} r="4" fill="var(--color-halal)" stroke="white" strokeWidth="2" />
          ))}
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[var(--color-gold)]" />
            <span className="text-sm text-[var(--color-muted-foreground)]">NASDAQ 100 Halal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[var(--color-halal)]" />
            <span className="text-sm text-[var(--color-muted-foreground)]">S&P 500 Halal</span>
          </div>
        </div>
      </div>

      {/* Data table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-2 px-3 text-[var(--color-muted-foreground)] font-medium">Date</th>
              <th className="text-right py-2 px-3 text-[var(--color-gold)] font-medium">NASDAQ 100</th>
              <th className="text-right py-2 px-3 text-[var(--color-halal)] font-medium">S&P 500</th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((s) => (
              <tr key={s.date} className="border-b border-[var(--border)]/50">
                <td className="py-2 px-3 text-[var(--color-muted-foreground)]">{formatDate(s.date, locale)}</td>
                <td className="py-2 px-3 text-right font-medium">
                  {metric === "halal_count"
                    ? `${s.nasdaq100.halal}/${s.nasdaq100.total}`
                    : `${s.nasdaq100.halal_weight_pct.toFixed(1)}%`}
                </td>
                <td className="py-2 px-3 text-right font-medium">
                  {metric === "halal_count"
                    ? `${s.sp500.halal}/${s.sp500.total}`
                    : `${s.sp500.halal_weight_pct.toFixed(1)}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
