import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Everything you need to know before investing halal. Savings allocation, stocks, ETFs, gold, real estate.",
};

const featured = {
  href: "/en/guides/allocation",
  title: "How to allocate your savings",
  desc: "The first guide to read. How much to keep in cash, how much to invest, and how to split between stocks, gold, and real estate. The essential framework before you start.",
};

const guides = [
  {
    href: "/en/guides/why-invest",
    title: "Why invest?",
    desc: "Inflation eats your savings. Zakat pushes you to grow them. Here's why doing nothing is the worst option.",
  },
  {
    href: "/en/guides/buying-stocks",
    title: "Buying halal stocks",
    desc: "Which screener to use, AAOIFI criteria to check, how to purify dividends, and which broker to pick.",
  },
  {
    href: "/en/guides/simple-method",
    title: "The simple method",
    desc: "No time? Halal ETFs, automatic monthly purchases, and your portfolio runs on autopilot.",
  },
  {
    href: "/en/guides/gold",
    title: "Investing in gold",
    desc: "Halal by nature, protects against inflation. The different ways to buy gold and what you need to know.",
  },
  {
    href: "/en/guides/murabaha",
    title: "Murabaha: simulations & comparison",
    desc: "How much does a Murabaha cost vs a conventional mortgage? Real simulations, hidden fees, and how to reduce the cost.",
  },
  {
    href: "/en/guides/real-estate",
    title: "Real estate without riba",
    desc: "Cash purchase, Murabaha, affordable housing strategies. Every way to buy property without a conventional loan.",
  },
  {
    href: "/en/guides/summary",
    title: "All halal investments",
    desc: "The comparison table: returns, time, liquidity, difficulty. So you know where to put your money based on your profile.",
  },
];

export default function GuidesEn() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-navy)]">Guides</h1>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl">
            New to halal investing? Start with the savings allocation guide.
            Otherwise, pick what interests you.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-8">
        {/* Featured guide */}
        <Link
          href={featured.href}
          className="cursor-pointer group block glass-card rounded-2xl p-8 border-2 border-[var(--color-gold)]/20"
        >
          <span className="inline-block rounded-full bg-[var(--color-gold-muted)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-4">
            Read first
          </span>
          <h2 className="text-2xl font-bold mb-3 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
            {featured.title}
          </h2>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl">
            {featured.desc}
          </p>
        </Link>

        {/* Other guides */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="cursor-pointer group glass-card rounded-2xl p-6"
            >
              <h2 className="text-lg font-bold mb-2 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                {guide.title}
              </h2>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                {guide.desc}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
