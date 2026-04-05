import type { Metadata } from "next";
import backtestData from "@/backtest.json";
import { BacktestChart } from "@/components/backtest-chart";

export const metadata: Metadata = {
  title: "Backtest — Historical halal vs full index performance — MuslimFinance",
  description:
    "Compare the historical performance of the NASDAQ 100 Halal and S&P 500 Halal with the full indices over 1, 3, and 5 years. Real price data, current composition.",
};

export default function BacktestPageEn() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Data as of {backtestData.date} · Real historical prices
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            Historical{" "}
            <span className="text-[var(--color-gold)]">performance</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            What if you had invested in the halal index instead of the full
            index? This backtest applies the current halal composition to real
            historical prices to compare performance.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <BacktestChart data={backtestData as never} locale="en" />
      </section>

      {/* Methodology + caveats */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-xl font-bold text-[var(--color-navy)] mb-6">
          How to read these results
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Methodology</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              We take the current halal composition (tickers + weights) and
              apply it retroactively to real historical prices (Yahoo Finance).
              Weights are redistributed pro-rata, same as the live index.
              Base 100 at the start of each period.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Tech outperformance</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              The halal index outperforms mainly because it excludes financials
              and overweights tech — which has been the best-performing sector
              in recent years. This sector bias can reverse.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Limitations</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              This is not a &quot;true&quot; backtest: halal composition
              changes quarterly as screeners reclassify stocks. We use
              today&apos;s composition, which introduces survivorship bias.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">What it means</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Investing halal doesn&apos;t mean sacrificing returns. The
              screening discipline can actually be an advantage. But past
              performance does not guarantee future results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
