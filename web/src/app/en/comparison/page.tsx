import type { Metadata } from "next";
import nasdaqData from "@/data.json";
import sp500Data from "@/sp500-data.json";
import { IndexComparison } from "@/components/index-comparison";

export const metadata: Metadata = {
  title: "Halal vs Full Index Comparison — MuslimFinance",
  description:
    "Compare the NASDAQ 100 Halal and S&P 500 Halal composition with the full indices: concentration, top holdings, redistributed weights.",
};

export default function ComparisonPageEn() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Data as of {nasdaqData.date} · NASDAQ 100 + S&P 500
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            Halal vs{" "}
            <span className="text-[var(--color-gold)]">Full Index</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            When non-compliant stocks are removed, the index becomes more
            concentrated on tech leaders. Here&apos;s the concrete impact on
            composition.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <IndexComparison
          nasdaqHoldings={nasdaqData.holdings}
          nasdaqStats={nasdaqData.stats as never}
          sp500Holdings={sp500Data.holdings}
          sp500Stats={sp500Data.stats as never}
          locale="en"
        />
      </section>

      {/* Takeaways */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-xl font-bold text-[var(--color-navy)] mb-6">Key takeaways</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">More concentrated</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              The halal index is more concentrated than the full index. Top
              holding weights are amplified because the excluded weight is
              redistributed proportionally.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Tech bias</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Excluded stocks are often in finance, insurance, and entertainment.
              The halal index is therefore naturally more exposed to tech and
              healthcare.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Tracking error</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              With ~57% of original weight retained for NASDAQ and ~52% for
              S&P, the halal index performance can deviate significantly from
              the full index.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Diversification</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              The S&P 500 Halal (225 stocks) offers more diversification than
              the NASDAQ 100 Halal (67 stocks). Combining both can reduce
              concentration risk.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
