import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How our halal indices are built. Sources, AAOIFI screening method, weight redistribution, limitations and disclaimers.",
};

export default function MethodologyEn() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Methodology
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            Full transparency on our sources, method, and limitations.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Data sources</h2>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="font-semibold mb-2">Index weights</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                The weight of each stock is automatically scraped from{" "}
                <strong>SlickCharts</strong> (slickcharts.com), which aggregates
                data from reference ETFs: QQQ (Invesco) for the NASDAQ 100 and
                SPY (SPDR) for the S&P 500. Weights reflect market
                capitalization and are updated weekly.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="font-semibold mb-2">Halal screening</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                The Shariah compliance status of each stock is scraped from{" "}
                <strong>Zoya.finance</strong>, which uses the{" "}
                <strong>AAOIFI</strong> standard (Accounting and Auditing
                Organization for Islamic Financial Institutions). This is the
                most recognized and strictest standard for stock screening.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">AAOIFI standard</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            The AAOIFI standard evaluates stock compliance based on several
            financial criteria:
          </p>
          <ul className="space-y-3 text-sm text-[var(--color-muted-foreground)]">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Core business:</strong> the company must not operate in
                a prohibited sector (alcohol, tobacco, weapons, gambling,
                pornography, conventional banking, conventional insurance).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Debt ratio:</strong> interest-bearing debt must not
                exceed 30% of market capitalization.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Interest income:</strong> revenue from interest must not
                exceed 5% of total revenue.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Impermissible income:</strong> revenue from
                non-compliant activities must not exceed 5% of total revenue.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Our method</h2>
          <div className="space-y-4 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            <p>
              <strong>Strict approach:</strong> we only include stocks classified
              as &quot;Halal&quot; by Zoya.finance. Stocks classified as &quot;Questionable&quot;
              (doubtful) are excluded along with non-compliant stocks. This is
              the most conservative approach.
            </p>
            <p>
              <strong>Pro-rata redistribution:</strong> once non-compliant stocks
              are removed, the weights of the remaining stocks are redistributed
              proportionally so the total adds up to 100%. An index of 67 stocks
              out of 100 will therefore have higher weights for each stock.
            </p>
            <p>
              <strong>LLM validation:</strong> in addition to programmatic
              scraping, we use an LLM (Claude) to verify a random sample of
              results with each update. This helps detect regressions in the
              scraping process.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Limitations & disclaimers</h2>
          <div className="rounded-2xl border border-[var(--color-haram)]/10 bg-[var(--color-haram)]/5 p-6 space-y-3">
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>Data from scraping:</strong> data is automatically
              collected by scraping third-party websites. It may contain errors,
              delays, or inaccuracies. We cannot guarantee 100% reliability.
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>Not financial advice:</strong> this site does not provide
              any investment advice. This is not a buy or sell recommendation.
              Past performance does not predict future results.
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>Not religious guidance:</strong> the creators of this site
              are not Islamic scholars. Halal/haram status is provided for
              informational purposes, based on data from Zoya.finance (AAOIFI
              standard). We make no commitments from an ethical or religious
              standpoint.
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>DYOR:</strong> always do your own research. Verify the
              data with reliable sources. Consult a qualified financial advisor
              and a trusted Islamic scholar before making any investment
              decision.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Source code</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            The source code for this site and all scrapers is fully open-source.
            You can verify, audit, and contribute:
          </p>
          <a
            href="https://github.com/Soufi54/halal-nasdaq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-xl border border-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/5"
          >
            github.com/Soufi54/halal-nasdaq →
          </a>
        </section>
      </main>
    </div>
  );
}
