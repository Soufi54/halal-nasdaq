import type { Metadata } from "next";
import Link from "next/link";
import nasdaqData from "@/data.json";
import sp500Data from "@/sp500-data.json";

// Merge all stocks from both indices
const allStocks = new Map<string, {
  ticker: string;
  company: string;
  halal_status: string;
  halal_weight_nasdaq?: number;
  halal_weight_sp500?: number;
  original_weight_nasdaq?: number;
  original_weight_sp500?: number;
  in_nasdaq: boolean;
  in_sp500: boolean;
  interest_pct: number | null;
}>();

for (const h of nasdaqData.holdings as Array<Record<string, unknown>>) {
  allStocks.set(h.ticker as string, {
    ticker: h.ticker as string,
    company: h.company as string,
    halal_status: "halal",
    halal_weight_nasdaq: h.halal_weight as number,
    original_weight_nasdaq: h.original_weight as number,
    in_nasdaq: true,
    in_sp500: false,
    interest_pct: h.interest_pct as number | null,
  });
}
for (const h of nasdaqData.excluded as Array<Record<string, unknown>>) {
  allStocks.set(h.ticker as string, {
    ticker: h.ticker as string,
    company: h.company as string,
    halal_status: h.halal_status as string,
    in_nasdaq: true,
    in_sp500: false,
    interest_pct: null,
  });
}

for (const h of sp500Data.holdings as Array<Record<string, unknown>>) {
  const existing = allStocks.get(h.ticker as string);
  if (existing) {
    existing.in_sp500 = true;
    existing.halal_weight_sp500 = h.halal_weight as number;
    existing.original_weight_sp500 = h.original_weight as number;
  } else {
    allStocks.set(h.ticker as string, {
      ticker: h.ticker as string,
      company: h.company as string,
      halal_status: "halal",
      halal_weight_sp500: h.halal_weight as number,
      original_weight_sp500: h.original_weight as number,
      in_nasdaq: false,
      in_sp500: true,
      interest_pct: h.interest_pct as number | null,
    });
  }
}
for (const h of sp500Data.excluded as Array<Record<string, unknown>>) {
  if (!allStocks.has(h.ticker as string)) {
    allStocks.set(h.ticker as string, {
      ticker: h.ticker as string,
      company: h.company as string,
      halal_status: h.halal_status as string,
      in_nasdaq: false,
      in_sp500: true,
      interest_pct: null,
    });
  } else {
    const existing = allStocks.get(h.ticker as string)!;
    existing.in_sp500 = true;
  }
}

export function generateStaticParams() {
  return Array.from(allStocks.keys()).map((ticker) => ({ ticker }));
}

export function generateMetadata({ params }: { params: { ticker: string } }): Metadata {
  const stock = allStocks.get(params.ticker);
  if (!stock) {
    return { title: "Stock not found" };
  }
  const status = stock.halal_status === "halal" ? "Halal" : stock.halal_status === "doubtful" ? "Doubtful" : "Non-compliant";
  return {
    title: `${stock.company} (${stock.ticker}) — ${status} per AAOIFI`,
    description: `${stock.company} (${stock.ticker}) is ${status.toLowerCase()} according to the AAOIFI standard (source: Zoya.finance). ${stock.in_nasdaq ? "In the NASDAQ 100." : ""} ${stock.in_sp500 ? "In the S&P 500." : ""} Always verify for yourself.`,
  };
}

function StatusBadge({ status }: { status: string }) {
  if (status === "halal") {
    return (
      <span className="inline-flex items-center rounded-full bg-[var(--color-halal-muted)] px-3 py-1 text-sm font-semibold text-[var(--color-halal)]">
        Halal
      </span>
    );
  }
  if (status === "doubtful") {
    return (
      <span className="inline-flex items-center rounded-full bg-[var(--color-doubtful-muted)] px-3 py-1 text-sm font-semibold text-[var(--color-doubtful)]">
        Doubtful
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-haram-muted)] px-3 py-1 text-sm font-semibold text-[var(--color-haram)]">
      Non-compliant
    </span>
  );
}

export default function StockPageEn({ params }: { params: { ticker: string } }) {
  const stock = allStocks.get(params.ticker);

  if (!stock) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-muted-foreground)]">Stock not found.</p>
      </div>
    );
  }

  const isHalal = stock.halal_status === "halal";

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <Link
            href={stock.in_nasdaq ? "/en/nasdaq-halal" : "/en/sp500-halal"}
            className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors mb-6 cursor-pointer"
          >
            ← Back to index
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-[var(--color-navy)]">
              {stock.ticker}
            </h1>
            <StatusBadge status={stock.halal_status} />
          </div>
          <p className="text-lg text-[var(--color-muted-foreground)]">
            {stock.company}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-[var(--color-navy)] mb-4">
            Compliance status
          </h2>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed">
            According to{" "}
            <a
              href={`https://zoya.finance/stocks/${stock.ticker}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gold)] hover:underline"
            >
              Zoya.finance
            </a>{" "}
            (AAOIFI standard), <strong>{stock.company}</strong> is classified as{" "}
            <strong>
              {isHalal ? "Halal (compliant)" : stock.halal_status === "doubtful" ? "Doubtful (questionable)" : "Non-compliant (not halal)"}
            </strong>.
          </p>
          {!isHalal && (
            <p className="mt-2 text-[var(--color-muted-foreground)] leading-relaxed">
              This stock is <strong>excluded</strong> from our reconstructed indices.
              {stock.halal_status === "doubtful" && " Doubtful stocks are excluded in our strict approach."}
            </p>
          )}
        </div>

        {isHalal && (stock.halal_weight_nasdaq || stock.halal_weight_sp500) && (
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-[var(--color-navy)] mb-4">
              Weight in our indices
            </h2>
            <div className="space-y-3">
              {stock.in_nasdaq && stock.halal_weight_nasdaq && (
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-muted-foreground)]">NASDAQ 100 Halal</span>
                  <span className="font-mono font-semibold">{stock.halal_weight_nasdaq.toFixed(2)}%</span>
                </div>
              )}
              {stock.in_sp500 && stock.halal_weight_sp500 && (
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-muted-foreground)]">S&P 500 Halal</span>
                  <span className="font-mono font-semibold">{stock.halal_weight_sp500.toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-[var(--color-navy)] mb-4">
            Present in
          </h2>
          <div className="flex gap-3">
            {stock.in_nasdaq && (
              <Link href="/en/nasdaq-halal" className="cursor-pointer inline-flex items-center rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-white/50 transition-colors duration-200">
                NASDAQ 100
              </Link>
            )}
            {stock.in_sp500 && (
              <Link href="/en/sp500-halal" className="cursor-pointer inline-flex items-center rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-white/50 transition-colors duration-200">
                S&P 500
              </Link>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-haram)]/15 bg-[var(--color-haram-muted)] p-5">
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            <strong className="text-[var(--foreground)]">Disclaimer:</strong>{" "}
            The status shown comes from Zoya.finance (AAOIFI standard) and may
            contain errors. It can change from one quarter to the next. Always
            verify for yourself with reliable sources before making any
            investment decision. This is not financial or religious advice.
          </p>
        </div>
      </main>
    </div>
  );
}
