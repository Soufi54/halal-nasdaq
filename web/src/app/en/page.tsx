import Link from "next/link";

export default function HomeEn() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-8 tracking-wide">
            Not financial advice — a starting point
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-[1.15] md:text-[3.5rem] max-w-3xl text-[var(--color-navy)]">
            You have savings.{" "}
            <span className="text-[var(--color-gold)]">Now what?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Your money is sitting in a bank account. Every year, inflation eats
            away at its value. You know you should invest, but you don&apos;t know
            where to start — and you don&apos;t want to compromise your faith.
          </p>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            This site is here to help. We screened every stock in the NASDAQ 100
            and S&P 500 using the AAOIFI standard. Free, open-source, transparent.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/en/nasdaq-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl bg-[var(--color-navy)] px-7 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              NASDAQ 100 Halal
            </Link>
            <Link
              href="/en/sp500-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl border border-[var(--border)] bg-white/60 px-7 text-sm font-semibold text-[var(--color-navy)] shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              S&P 500 Halal
            </Link>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">
          What you&apos;ll find here
        </h2>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          We rebuilt the two most popular US stock indices — keeping only
          Shariah-compliant stocks. No paid API. No black box. Everything is
          open-source.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/en/nasdaq-halal"
            className="cursor-pointer group glass-card rounded-2xl p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--color-navy)]">NASDAQ 100 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Explore →
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              The 100 largest US tech companies, screened with the AAOIFI
              standard. Portfolio simulator and CSV export included.
            </p>
          </Link>

          <Link
            href="/en/sp500-halal"
            className="cursor-pointer group glass-card rounded-2xl p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--color-navy)]">S&P 500 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Explore →
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              The 500 largest US companies, all sectors. More diversified, but
              more exclusions. Same method, same simulator.
            </p>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">
          How it works
        </h2>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          Three steps, fully automated, updated weekly.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-6 border-l-4 border-l-[var(--color-gold)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold-muted)] text-sm font-bold text-[var(--color-gold)]">1</span>
              <h3 className="font-semibold text-[var(--color-navy)]">
                Scrape index weights
              </h3>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              We pull the exact weight of each stock from SlickCharts
              (based on QQQ and SPY ETFs).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border-l-4 border-l-[var(--color-halal)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-halal-muted)] text-sm font-bold text-[var(--color-halal)]">2</span>
              <h3 className="font-semibold text-[var(--color-navy)]">
                Screen with AAOIFI
              </h3>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Each stock is checked against the AAOIFI standard via
              Zoya.finance. Non-compliant and doubtful stocks are excluded.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border-l-4 border-l-[var(--color-navy)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-[var(--color-navy)]">3</span>
              <h3 className="font-semibold text-[var(--color-navy)]">
                Redistribute weights
              </h3>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              The removed weight is redistributed pro-rata among the
              remaining halal stocks so the total adds up to 100%.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology + open source */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/en/methodology"
            className="cursor-pointer group glass-card rounded-2xl p-7"
          >
            <h3 className="text-lg font-bold text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-200">
              Methodology →
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Full transparency on our sources, screening process, weight
              redistribution, and limitations.
            </p>
          </Link>
          <a
            href="https://github.com/Soufi54/halal-nasdaq"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer group glass-card rounded-2xl p-7"
          >
            <h3 className="text-lg font-bold text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-200">
              Open Source →
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              All code, scrapers, and data are public on GitHub. Audit,
              verify, or contribute.
            </p>
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[var(--color-haram)]/15 bg-[var(--color-haram-muted)] p-6">
          <h3 className="font-semibold text-[var(--color-haram)] mb-3">Before you use this site</h3>
          <div className="text-sm text-[var(--color-muted-foreground)] leading-[1.7] space-y-2">
            <p>
              <strong className="text-[var(--foreground)]">We don&apos;t tell you what to buy.</strong>{" "}
              This site shares information. It does not replace a financial
              advisor or an Islamic scholar.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Data may contain errors.</strong>{" "}
              It comes from public sources (Zoya.finance, SlickCharts) and is
              extracted automatically. Always verify for yourself.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
