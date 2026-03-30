import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Buying halal stocks — Complete guide",
  description:
    "Screeners, AAOIFI criteria, purification, brokers, halal ETFs. Everything you need to invest in stocks the Shariah-compliant way.",
};

export default function BuyingStocks() {
  return (
    <GuideLayout title="Buying halal stocks" locale="en">
      <p className="text-lg">
        Investing in the stock market as a Muslim is absolutely possible. You
        just need to verify that each stock meets the criteria of Shariah law.
        With the right tools, it takes 5 minutes. Here&apos;s the complete guide.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        1. Use a halal screener
      </h2>
      <p>
        A screener automatically analyzes company financials and tells you
        whether a stock is halal or not. Here are the best ones:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a
            href="https://zoya.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            <strong>Zoya</strong>
          </a>{" "}
          — the most comprehensive. AAOIFI standard, 30,000+ stocks,
          purification ratio included. Free tier available
        </li>
        <li>
          <a
            href="https://musaffa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            <strong>Musaffa</strong>
          </a>{" "}
          — 120,000+ stocks across 64 markets. Excellent international coverage
        </li>
        <li>
          <a
            href="https://www.islamicly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            <strong>Islamicly</strong>
          </a>{" "}
          — 30,000+ stocks, simple and clear interface
        </li>
        <li>
          <strong>MuslimXChange</strong> — interesting alternative, active
          community
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        2. Understand AAOIFI criteria
      </h2>
      <p>
        The AAOIFI standard is the most widely used to evaluate stock
        compliance. Concretely, a company must meet these thresholds:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Lawful core business</strong> — no alcohol, tobacco, weapons,
          gambling, pornography, conventional banking/insurance
        </li>
        <li>
          <strong>Debt / market cap &lt; 33%</strong> — the company must not be
          too leveraged
        </li>
        <li>
          <strong>Interest-bearing deposits &lt; 30%</strong> of market cap
        </li>
        <li>
          <strong>Haram revenue &lt; 5%</strong> of total revenue
        </li>
      </ul>
      <p>
        Screeners do this automatically — you don&apos;t need to calculate it
        yourself.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        3. Dividend purification
      </h2>
      <p>
        Even a stock classified as halal may have a small portion of
        non-compliant revenue (e.g., interest on cash reserves). Purification
        means calculating that percentage and donating the equivalent amount to
        charity (sadaqah).
      </p>
      <p>
        In practice: screeners like Zoya and Musaffa give you the{" "}
        <strong>purification ratio</strong> directly. If it&apos;s 2%, you donate 2%
        of your dividends to charity. Simple.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        4. Where to buy? Popular brokers
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Interactive Brokers</strong> — the gold standard for
          international investors. Access to all US and global markets, low fees,
          fractional shares available
        </li>
        <li>
          <strong>Charles Schwab / Fidelity</strong> — excellent for US-based
          investors. Zero commission on US stocks, research tools included
        </li>
        <li>
          <strong>Trading 212</strong> — zero commission, fractional shares,
          available in the UK and Europe
        </li>
        <li>
          <strong>Wahed Invest</strong> — Shariah-compliant robo-advisor. They
          manage the portfolio for you based on Islamic principles
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        5. Halal ETFs
      </h2>
      <p>
        If you prefer a single diversified product rather than individual
        stocks, here are some halal ETFs:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>SPUS</strong> (SP Funds S&P 500 Sharia Industry Exclusions
          ETF) — US-listed, tracks halal S&P 500 stocks
        </li>
        <li>
          <strong>HLAL</strong> (Wahed FTSE USA Shariah ETF) — US-listed,
          Shariah-compliant US large-cap stocks
        </li>
        <li>
          <strong>ISDU</strong> (iShares MSCI USA Islamic UCITS ETF) — European-listed,
          0.30% fees/year
        </li>
        <li>
          <strong>ISDW</strong> (iShares MSCI World Islamic UCITS ETF) — global
          diversification, European-listed, 0.30% fees/year
        </li>
      </ul>
      <p>
        Note: SPUS and HLAL are listed in the US. European residents may not
        have direct access due to PRIIPs regulations — check ISDU and ISDW as
        alternatives.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        6. Build a halal index yourself
      </h2>
      <p>
        If you want to avoid ETF fees and have full control, you can replicate
        the index yourself by buying individual stocks. That&apos;s exactly what our
        tools allow:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a
            href="/en/nasdaq-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            NASDAQ 100 Halal
          </a>{" "}
          — the top tech companies, filtered
        </li>
        <li>
          <a
            href="/en/sp500-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            S&P 500 Halal
          </a>{" "}
          — the US benchmark index, halal version
        </li>
      </ul>
      <p>
        Enter your amount and you get the exact allocation. Combine this with
        monthly DCA and you have a solid strategy.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Recommended strategy
      </h2>
      <p>
        For most people: open a brokerage account, set up a monthly automatic
        investment (DCA) in a halal ETF like SPUS or HLAL, or replicate the
        index with our tools. Start with what you can, even $50/month.
        Consistency beats timing.
      </p>
    </GuideLayout>
  );
}
