"use client";

import { useState } from "react";

type Holding = {
  halal_rank: number;
  ticker: string;
  company: string;
  halal_weight: number;
  original_weight: number;
  halal_status: string;
  interest_pct: number | null;
  rank: number;
  weight: number;
};

function formatMoney(amount: number): string {
  if (amount >= 1000) {
    return (
      amount.toLocaleString("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + " EUR"
    );
  }
  return (
    amount.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " EUR"
  );
}

export function PortfolioTable({
  holdings,
  includedCount,
}: {
  holdings: Holding[];
  includedCount: number;
}) {
  const [portfolio, setPortfolio] = useState<string>("");

  const amount =
    parseFloat(portfolio.replace(/\s/g, "").replace(",", ".")) || 0;

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">Composition de l'indice</h2>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            {includedCount} actions halal — poids redistribues pro-rata
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label
            htmlFor="portfolio"
            className="text-sm font-medium text-[var(--color-muted-foreground)] whitespace-nowrap"
          >
            Mon portefeuille
          </label>
          <div className="relative">
            <input
              id="portfolio"
              type="text"
              inputMode="decimal"
              placeholder="10 000"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="h-10 w-40 rounded-xl border border-[var(--border)] bg-white px-4 pr-12 text-sm font-mono text-[var(--foreground)] placeholder:text-[var(--color-muted-foreground)]/40 focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/20 transition-colors duration-200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--color-muted-foreground)]">
              EUR
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-slate-50">
              <th className="w-14 px-6 py-3.5 text-left font-semibold text-[var(--color-navy)]">
                #
              </th>
              <th className="px-6 py-3.5 text-left font-semibold text-[var(--color-navy)]">
                Ticker
              </th>
              <th className="px-6 py-3.5 text-left font-semibold text-[var(--color-navy)]">
                Entreprise
              </th>
              <th className="px-6 py-3.5 text-right font-semibold text-[var(--color-navy)]">
                Poids
              </th>
              {amount > 0 && (
                <th className="px-6 py-3.5 text-right font-semibold text-[var(--color-gold)]">
                  Montant
                </th>
              )}
              <th className="px-6 py-3.5 text-right font-semibold text-[var(--color-muted-foreground)]">
                Original
              </th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, i) => (
              <tr
                key={h.ticker}
                className={`cursor-pointer border-b border-[var(--border)] last:border-0 transition-colors duration-150 hover:bg-slate-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                <td className="px-6 py-3 font-mono text-[var(--color-muted-foreground)]">
                  {h.halal_rank}
                </td>
                <td className="px-6 py-3">
                  <span className="font-bold text-[var(--color-navy)]">{h.ticker}</span>
                </td>
                <td className="px-6 py-3 text-[var(--color-muted-foreground)]">
                  {h.company}
                </td>
                <td className="px-6 py-3 text-right font-mono font-medium">
                  {h.halal_weight.toFixed(2)}%
                </td>
                {amount > 0 && (
                  <td className="px-6 py-3 text-right font-mono font-semibold text-[var(--color-gold)]">
                    {formatMoney((amount * h.halal_weight) / 100)}
                  </td>
                )}
                <td className="px-6 py-3 text-right font-mono text-[var(--color-muted-foreground)]/50">
                  {h.original_weight.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
