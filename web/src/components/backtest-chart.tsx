"use client";

import { useState } from "react";

type DataPoint = { date: string; halal: number; index: number };

type PeriodData = {
  start_date: string;
  end_date: string;
  data_points: number;
  available_tickers: number;
  total_tickers: number;
  halal_return_pct: number;
  index_return_pct: number;
  outperformance_pct: number;
  series: DataPoint[];
};

type BacktestData = {
  date: string;
  nasdaq100: Record<string, PeriodData>;
  sp500: Record<string, PeriodData>;
};

type Period = "1y" | "3y" | "5y";

const PERIOD_LABELS: Record<string, Record<Period, string>> = {
  fr: { "1y": "1 an", "3y": "3 ans", "5y": "5 ans" },
  en: { "1y": "1 year", "3y": "3 years", "5y": "5 years" },
};

const INDEX_LABELS: Record<string, Record<string, string>> = {
  fr: { nasdaq: "NASDAQ 100", sp500: "S&P 500" },
  en: { nasdaq: "NASDAQ 100", sp500: "S&P 500" },
};

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  if (locale === "fr") {
    return d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
  }
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export function BacktestChart({ data, locale = "fr" }: { data: BacktestData; locale?: string }) {
  const [index, setIndex] = useState<"nasdaq" | "sp500">("nasdaq");
  const [period, setPeriod] = useState<Period>("3y");
  const isFr = locale === "fr";

  const indexData = index === "nasdaq" ? data.nasdaq100 : data.sp500;
  const periodData = indexData?.[period];

  if (!periodData) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-[var(--color-muted-foreground)]">
          {isFr ? "Donnees non disponibles pour cette periode." : "Data not available for this period."}
        </p>
      </div>
    );
  }

  const series = periodData.series;
  const etfLabel = index === "nasdaq" ? "QQQ" : "SPY";
  const halalLabel = index === "nasdaq" ? "NASDAQ 100 Halal" : "S&P 500 Halal";

  // Chart dimensions
  const W = 700, H = 350;
  const PAD = { top: 20, right: 20, bottom: 45, left: 55 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // Data ranges
  const allVals = series.flatMap((s) => [s.halal, s.index]);
  const minV = Math.floor(Math.min(...allVals) * 0.95);
  const maxV = Math.ceil(Math.max(...allVals) * 1.05);
  const range = maxV - minV || 1;

  function x(i: number) {
    return PAD.left + (i / (series.length - 1)) * chartW;
  }
  function y(v: number) {
    return PAD.top + chartH - ((v - minV) / range) * chartH;
  }

  function pathD(values: number[]) {
    return values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  }

  // Y-axis ticks
  const tickCount = 6;
  const step = range / (tickCount - 1);
  const yTicks = Array.from({ length: tickCount }, (_, i) => Math.round(minV + step * i));

  // X-axis labels (show ~6 labels)
  const labelInterval = Math.max(1, Math.floor(series.length / 6));
  const xLabels = series
    .map((s, i) => ({ date: s.date, i }))
    .filter((_, i) => i % labelInterval === 0 || i === series.length - 1);

  const halalValues = series.map((s) => s.halal);
  const indexValues = series.map((s) => s.index);

  // Area fill for halal
  const areaPath =
    pathD(halalValues) +
    `L${x(series.length - 1).toFixed(1)},${y(minV).toFixed(1)}` +
    `L${x(0).toFixed(1)},${y(minV).toFixed(1)}Z`;

  return (
    <div>
      {/* Index + Period selectors */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["nasdaq", "sp500"] as const).map((idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              index === idx
                ? "bg-[var(--color-navy)] text-white shadow-sm"
                : "bg-white/60 text-[var(--color-muted-foreground)] hover:bg-white/80 border border-[var(--border)]"
            }`}
          >
            {INDEX_LABELS[locale]?.[idx] ?? INDEX_LABELS.en[idx]}
          </button>
        ))}
        <div className="w-px bg-[var(--border)] mx-1" />
        {(["1y", "3y", "5y"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              period === p
                ? "bg-[var(--color-gold)] text-white shadow-sm"
                : "bg-white/60 text-[var(--color-muted-foreground)] hover:bg-white/80 border border-[var(--border)]"
            }`}
          >
            {PERIOD_LABELS[locale]?.[p] ?? PERIOD_LABELS.en[p]}
          </button>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className={`text-3xl font-bold ${periodData.halal_return_pct >= 0 ? "text-[var(--color-halal)]" : "text-[var(--color-haram)]"}`}>
            {periodData.halal_return_pct >= 0 ? "+" : ""}{periodData.halal_return_pct}%
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{halalLabel}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className={`text-3xl font-bold ${periodData.index_return_pct >= 0 ? "text-[var(--color-navy)]" : "text-[var(--color-haram)]"}`}>
            {periodData.index_return_pct >= 0 ? "+" : ""}{periodData.index_return_pct}%
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{etfLabel} ({isFr ? "indice complet" : "full index"})</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className={`text-3xl font-bold ${periodData.outperformance_pct >= 0 ? "text-[var(--color-gold)]" : "text-[var(--color-haram)]"}`}>
            {periodData.outperformance_pct >= 0 ? "+" : ""}{periodData.outperformance_pct}%
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{isFr ? "surperformance halal" : "halal outperformance"}</p>
        </div>
      </div>

      {/* Chart */}
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
                {tick}
              </text>
            </g>
          ))}

          {/* Base 100 line */}
          <line
            x1={PAD.left} y1={y(100)} x2={W - PAD.right} y2={y(100)}
            stroke="var(--color-muted-foreground)" strokeDasharray="2 4" strokeWidth="0.5" opacity="0.5"
          />

          {/* X-axis labels */}
          {xLabels.map(({ date, i: idx }) => (
            <text key={idx} x={x(idx)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">
              {formatDate(date, locale)}
            </text>
          ))}

          {/* Halal area fill */}
          <path d={areaPath} fill="var(--color-gold)" opacity="0.08" />

          {/* Index line */}
          <path
            d={pathD(indexValues)}
            fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
          />

          {/* Halal line */}
          <path
            d={pathD(halalValues)}
            fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[var(--color-gold)]" />
            <span className="text-sm text-[var(--color-muted-foreground)]">{halalLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[var(--color-navy)] opacity-60" />
            <span className="text-sm text-[var(--color-muted-foreground)]">{etfLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
