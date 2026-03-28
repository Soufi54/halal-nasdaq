import type { Metadata } from "next";
import data from "@/sp500-data.json";
import { PortfolioTable } from "@/components/portfolio-table";

export const metadata: Metadata = {
  title: "S&P 500 Halal — Composition & Portfolio Simulator",
  description: `${data.stats.included} stocks in the S&P 500 pass the AAOIFI screening. The other ${data.stats.excluded} are removed. Portfolio simulator included. Data from Zoya.finance, not financial advice.`,
};

type ExcludedHolding = {
  ticker: string;
  company: string;
  weight: number;
  halal_status: string;
};

const holdings = data.holdings as Array<{
  halal_rank: number;
  ticker: string;
  company: string;
  halal_weight: number;
  original_weight: number;
  halal_status: string;
  interest_pct: number | null;
  rank: number;
  weight: number;
}>;
const excluded = data.excluded as ExcludedHolding[];
const stats = data.stats;

function StatusBadge({ status }: { status: string }) {
  if (status === "doubtful") {
    return (
      <span className="inline-flex items-center rounded-full bg-[var(--color-doubtful-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-doubtful)]">
        Doubtful
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-haram-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-haram)]">
      Non-compliant
    </span>
  );
}

export default function SP500HalalEn() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Updated {data.date} · Data from Zoya.finance · AAOIFI standard
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            S&P 500{" "}
            <span className="text-[var(--color-gold)]">Halal</span>
          </h1>
          <div className="mt-6 max-w-2xl space-y-3 text-[0.95rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            <p>
              <strong className="text-[var(--foreground)]">What is the S&P 500?</strong>{" "}
              The most followed index in the world. It includes the 500 largest
              US companies across all sectors: tech, healthcare, finance, energy,
              consumer goods. Since its creation, it has returned roughly{" "}
              <strong className="text-[var(--foreground)]">10% per year</strong> on
              average. It&apos;s the benchmark for long-term investing.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Why so many exclusions?</strong>{" "}
              The S&P 500 contains many banks, insurers, and utilities — sectors
              that inherently rely on conventional debt. Result: out of{" "}
              {stats.total_sp500} stocks,{" "}
              <strong className="text-[var(--color-halal)]">{stats.included} are compliant</strong>.
              The other {stats.excluded} are removed. What remains: tech (Nvidia,
              Apple), healthcare (Eli Lilly, J&J), energy (Exxon), payments
              (Visa, Mastercard).
            </p>
            <p>
              Enter an amount to see your allocation. CSV export available.
            </p>
          </div>
          <p className="mt-3 text-sm text-[var(--color-muted-foreground)]/60">
            Past performance does not predict future results. Halal statuses
            can change every quarter. Always verify for yourself.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Halal stocks
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-halal)]">
              {stats.included}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              out of {stats.total_sp500} in the S&P 500
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Excluded stocks
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-haram)]">
              {stats.excluded}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              {stats.excluded_weight_pct}% of original weight
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Doubtful
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-doubtful)]">
              {stats.doubtful_count}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              excluded (strict approach)
            </p>
          </div>
        </div>

        {/* Composition + simulator */}
        <PortfolioTable holdings={holdings} includedCount={stats.included} locale="en" />

        {/* Excluded */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Excluded stocks</h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              {stats.excluded} non-compliant or doubtful stocks —{" "}
              {stats.excluded_weight_pct}% of the original S&P 500
            </p>
          </div>
          <div className="glass-card rounded-2xl !p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-left font-medium text-[var(--color-muted-foreground)]">
                    Ticker
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-[var(--color-muted-foreground)]">
                    Company
                  </th>
                  <th className="px-6 py-4 text-right font-medium text-[var(--color-muted-foreground)]">
                    Original weight
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-[var(--color-muted-foreground)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {excluded.map((h, i) => (
                  <tr
                    key={h.ticker}
                    className={`border-b border-[var(--border)] last:border-0 transition-colors hover:bg-slate-50 ${
                      i % 2 === 0 ? "" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="px-6 py-3.5 font-bold">{h.ticker}</td>
                    <td className="px-6 py-3.5 text-[var(--color-muted-foreground)]">
                      {h.company}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono">
                      {h.weight.toFixed(2)}%
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={h.halal_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[var(--color-haram)]/10 bg-[var(--color-haram)]/5 p-6">
          <h3 className="font-semibold text-[var(--color-haram)] mb-2">
            Disclaimer
          </h3>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            This data is automatically generated by scraping public sources and
            does not constitute investment advice or religious guidance. Halal/haram
            statuses come from Zoya.finance and may contain errors.{" "}
            <strong>Do your own research</strong> and verify with reliable sources
            before making any investment decision.
          </p>
        </div>
      </main>
    </div>
  );
}
