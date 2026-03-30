import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "The simple method to invest halal",
  description:
    "DCA, halal ETFs, robo-advisors. The passive strategy to invest without the hassle.",
};

export default function SimpleMethod() {
  return (
    <GuideLayout title="The simple method" locale="en">
      <p className="text-lg">
        You don&apos;t have time to follow the markets? You don&apos;t want to analyze
        financial statements? Perfect. This page is for you. Here&apos;s the
        simplest and most effective strategy to invest halal — it takes 15
        minutes to set up, and then it&apos;s automatic.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        The principle: DCA
      </h2>
      <p>
        <strong>DCA (Dollar Cost Averaging)</strong> = invest a fixed amount
        every month, no questions asked. When the market drops, you buy more
        shares for the same price. When it rises, your shares gain value. Over
        the long term, this smooths out risk and beats 95% of investors who try
        to time the market.
      </p>
      <p>Consistency beats timing. Always.</p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Step 1: Open a brokerage account
      </h2>
      <p>
        You need a broker that lets you buy stocks and ETFs. Here are solid
        options:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Interactive Brokers</strong> — low fees, access to global
          markets, fractional shares. Great for any country
        </li>
        <li>
          <strong>Charles Schwab / Fidelity</strong> — zero-commission US stock
          trades (US residents)
        </li>
        <li>
          <strong>Trading 212</strong> — zero commission, fractional shares (UK
          and Europe)
        </li>
        <li>
          <strong>Wahed Invest</strong> — Shariah-compliant robo-advisor. They
          manage everything for you
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Step 2: Choose what to buy
      </h2>
      <p>Three options, from simplest to most customized:</p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Option A — A halal ETF (simplest):</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>SPUS</strong> — SP Funds S&P 500 Sharia (US-listed):
              tracks halal S&P 500 stocks
            </li>
            <li>
              <strong>HLAL</strong> — Wahed FTSE USA Shariah (US-listed):
              large-cap US halal stocks
            </li>
            <li>
              <strong>ISDU</strong> — iShares MSCI USA Islamic (European-listed,
              0.30%/year): for non-US investors
            </li>
            <li>
              <strong>ISDW</strong> — iShares MSCI World Islamic
              (European-listed, 0.30%/year): global diversification
            </li>
          </ul>
        </li>
        <li>
          <strong>Option B — Replicate the index yourself:</strong> use our
          tools{" "}
          <a
            href="/en/nasdaq-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            NASDAQ 100 Halal
          </a>{" "}
          and{" "}
          <a
            href="/en/sp500-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            S&P 500 Halal
          </a>{" "}
          to get the exact allocation. More work, but zero management fees and
          full control
        </li>
        <li>
          <strong>Option C — Mix of both:</strong> a halal ETF for the base +
          some individual stocks you like
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Step 3: Automate and forget
      </h2>
      <p>
        Most brokers let you set up recurring investments: choose the amount
        (even $50/month), the date, and you&apos;re set. The transfer is automatic,
        the purchase is automatic. You don&apos;t have to do anything else.
      </p>
      <p>
        <strong>$100/month for 20 years</strong> at ~10% annual return = roughly{" "}
        <strong>$76,000</strong> (for $24,000 invested). The magic of compound
        growth.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Bonus: Shariah-compliant robo-advisors
      </h2>
      <p>
        If you want a fully managed solution:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Wahed Invest</strong> — Shariah-compliant robo-advisor with
          diversified portfolios (stocks, gold, sukuk). Available globally
        </li>
        <li>
          <strong>Saturna Capital (Amana Funds)</strong> — US-based
          Shariah-compliant mutual funds with a long track record
        </li>
      </ul>
      <p>
        These products invest in Shariah-compliant assets. Returns may be more
        modest than DIY investing, but convenience is the trade-off.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        The ideal combo for a beginner
      </h2>
      <p>If you&apos;re starting from zero, here&apos;s what we recommend:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Emergency fund</strong> — 3 to 6 months of expenses in an
          accessible account. Don&apos;t touch this money
        </li>
        <li>
          <strong>Halal ETF via DCA</strong> — the majority of your monthly
          investment (70-80%). SPUS, HLAL, or ISDU depending on your location
        </li>
        <li>
          <strong>Some gold</strong> — 10-20% of your monthly budget. Protection
          and diversification
        </li>
      </ul>
      <p>
        That&apos;s it. No need for more. Start, be consistent, and let time do the
        work.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        The golden rule
      </h2>
      <p>
        Only invest money you don&apos;t need short-term. Always keep your emergency
        fund intact. And most importantly: don&apos;t panic sell when the market
        drops. That&apos;s where beginners lose money — not because of the market,
        but because of their emotions.
      </p>
    </GuideLayout>
  );
}
