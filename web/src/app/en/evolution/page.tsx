import type { Metadata } from "next";
import history from "@/history.json";
import { HistoryChart } from "@/components/history-chart";

export const metadata: Metadata = {
  title: "Halal Index Evolution — MuslimFinance",
  description:
    "Track the weekly evolution of the NASDAQ 100 Halal and S&P 500 Halal indices: compliant stock count, halal weight, trends.",
};

export default function EvolutionPageEn() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Updated weekly · Data since March 2026
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            Halal Index{" "}
            <span className="text-[var(--color-gold)]">Evolution</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            How many stocks remain compliant? What percentage of the index is
            halal? Track the trends week by week.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <HistoryChart data={history} locale="en" />
      </section>

      {/* Explanations */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Halal stock count</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              How many stocks from the original index pass the AAOIFI screening
              (via Zoya.finance). Doubtful stocks are excluded.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Halal weight (%)</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              The cumulative weight of halal stocks in the original index (before
              redistribution). The higher this number, the closer the halal index
              tracks the full index.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
