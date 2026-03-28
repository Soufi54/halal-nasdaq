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

function formatMoney(amount: number, locale: string = "fr"): string {
  const loc = locale === "en" ? "en-US" : "fr-FR";
  const currency = locale === "en" ? "USD" : "EUR";
  if (amount >= 1000) {
    return (
      amount.toLocaleString(loc, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + ` ${currency}`
    );
  }
  return (
    amount.toLocaleString(loc, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ` ${currency}`
  );
}

function downloadCSV(holdings: Holding[], amount: number, locale: string = "fr") {
  const sep = ";";
  const currency = locale === "en" ? "USD" : "EUR";
  const companyLabel = locale === "en" ? "Company" : "Entreprise";
  const weightLabel = locale === "en" ? "Weight (%)" : "Poids (%)";
  const amountLabel = locale === "en" ? `Amount (${currency})` : `Montant (${currency})`;
  const origLabel = locale === "en" ? "Original weight (%)" : "Poids original (%)";
  const header = amount > 0
    ? ["#", "Ticker", companyLabel, weightLabel, amountLabel, origLabel]
    : ["#", "Ticker", companyLabel, weightLabel, origLabel];

  const rows = holdings.map((h) => {
    const base = [
      h.halal_rank,
      h.ticker,
      `"${h.company}"`,
      h.halal_weight.toFixed(2),
    ];
    if (amount > 0) {
      base.push(((amount * h.halal_weight) / 100).toFixed(2));
    }
    base.push(h.original_weight.toFixed(2));
    return base.join(sep);
  });

  const csv = "\uFEFF" + header.join(sep) + "\n" + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = amount > 0
    ? `portefeuille-halal-${amount}EUR.csv`
    : "composition-halal.csv";
  a.click();
  URL.revokeObjectURL(url);
}

const labels = {
  fr: {
    composition: "Composition",
    actionsRedist: (n: number) => `${n} actions — poids redistribues pro-rata`,
    simulate: "Simuler un portefeuille",
    exportCSV: "Exporter CSV",
    company: "Entreprise",
    weight: "Poids",
    amount: "Montant",
    orig: "Orig.",
    currency: "EUR",
  },
  en: {
    composition: "Composition",
    actionsRedist: (n: number) => `${n} stocks — weights redistributed pro-rata`,
    simulate: "Simulate a portfolio",
    exportCSV: "Export CSV",
    company: "Company",
    weight: "Weight",
    amount: "Amount",
    orig: "Orig.",
    currency: "USD",
  },
};

export function PortfolioTable({
  holdings,
  includedCount,
  locale = "fr",
}: {
  holdings: Holding[];
  includedCount: number;
  locale?: "fr" | "en";
}) {
  const t = labels[locale];
  const [portfolio, setPortfolio] = useState<string>("");

  const amount =
    parseFloat(portfolio.replace(/\s/g, "").replace(",", ".")) || 0;

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">{t.composition}</h2>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            {t.actionsRedist(includedCount)}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label
            htmlFor="portfolio"
            className="text-sm font-medium text-[var(--color-muted-foreground)] whitespace-nowrap"
          >
            {t.simulate}
          </label>
          <div className="relative">
            <input
              id="portfolio"
              type="text"
              inputMode="decimal"
              placeholder="10 000"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="h-11 w-44 rounded-xl border border-[var(--border)] bg-white/80 backdrop-blur-sm px-4 pr-14 text-sm font-mono text-[var(--foreground)] placeholder:text-[var(--color-muted-foreground)]/40 focus:border-[var(--color-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]/10 transition-all duration-200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--color-muted-foreground)]">
              {t.currency}
            </span>
          </div>
          <button
            onClick={() => downloadCSV(holdings, amount, locale)}
            className="cursor-pointer h-11 rounded-xl border border-[var(--border)] bg-white/60 px-4 text-sm font-medium text-[var(--color-navy)] transition-all duration-200 hover:bg-white hover:shadow-sm hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M4 12h8M8 2v8m0 0L5 7m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.exportCSV}
            </span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl glass-card !p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="w-14 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                #
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                Ticker
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                {t.company}
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                {t.weight}
              </th>
              {amount > 0 && (
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                  {t.amount}
                </th>
              )}
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]/50">
                {t.orig}
              </th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, i) => (
              <tr
                key={h.ticker}
                className={`border-b border-[var(--border)] last:border-0 transition-colors duration-150 hover:bg-white/50 ${
                  i % 2 === 0 ? "" : "bg-white/20"
                }`}
              >
                <td className="px-5 py-3.5 font-mono text-xs text-[var(--color-muted-foreground)]">
                  {h.halal_rank}
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-semibold text-[var(--color-navy)]">{h.ticker}</span>
                </td>
                <td className="px-5 py-3.5 text-[var(--color-muted-foreground)]">
                  {h.company}
                </td>
                <td className="px-5 py-3.5 text-right font-mono font-medium text-[var(--foreground)]">
                  {h.halal_weight.toFixed(2)}%
                </td>
                {amount > 0 && (
                  <td className="px-5 py-3.5 text-right font-mono font-semibold text-[var(--color-gold)]">
                    {formatMoney((amount * h.halal_weight) / 100, locale)}
                  </td>
                )}
                <td className="px-5 py-3.5 text-right font-mono text-xs text-[var(--color-muted-foreground)]/40">
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
