import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to allocate your savings",
  description:
    "Before investing, you need to know how much to keep in cash, how much to invest, and where. The essential guide to structuring your savings the halal way.",
};

export default function Allocation() {
  return (
    <GuideLayout title="How to allocate your savings" locale="en">
      <p className="text-lg">
        Before putting a single dollar in the market, you need to answer one
        simple question: how much can I afford to invest? This guide gives you a
        framework. Not a magic formula — a common-sense framework.
      </p>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--color-gold-muted)] p-4 my-6">
        <p className="text-sm font-medium text-[var(--foreground)]">
          This is not financial advice. It&apos;s a general framework used by many
          investors. Adapt it to your situation, income, expenses, and goals.
        </p>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Step 1 — Emergency fund (untouchable)
      </h2>
      <p>
        Always keep <strong>3 to 6 months of expenses</strong> in a checking
        account or easily accessible savings. This is your safety net: a car
        breakdown, a medical emergency, a job loss. This money should never be
        invested.
      </p>
      <p>
        If your monthly expenses are $3,000, your emergency fund should be
        between $9,000 and $18,000. Until you reach that amount, focus on
        building it before thinking about investing.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Step 2 — Short-term goals (don&apos;t lock up)
      </h2>
      <p>
        Are you planning a wedding, buying a car, moving, or traveling in the
        next 1-2 years? That money should not be invested in the stock market.
        The market is volatile short-term — your money could lose 20% in a few
        months. It would be absurd to sell at a loss to fund your wedding.
      </p>
      <p>
        Keep these sums in cash or a separate account. Investing is for money
        you won&apos;t need for at least 3 to 5 years.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Step 3 — Allocate the rest
      </h2>
      <p>
        Once your emergency fund is set and your short-term goals are covered,
        you have your investable savings. Here&apos;s a common allocation (adapt to
        your situation):
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3 pr-4 text-left font-semibold text-[var(--foreground)]">
                Bucket
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[var(--foreground)]">
                Share
              </th>
              <th className="py-3 pl-4 text-left font-semibold text-[var(--foreground)]">
                Why
              </th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Halal stocks
              </td>
              <td className="py-3 px-4">~50-70%</td>
              <td className="py-3 pl-4">
                The growth engine. Highest historical returns over the long term
                (~10-13% per year). Use our indices for the composition.
              </td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Gold
              </td>
              <td className="py-3 px-4">~10-20%</td>
              <td className="py-3 pl-4">
                Safe haven, halal by nature, protects against inflation. When
                stocks drop, gold often rises.
              </td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Real estate
              </td>
              <td className="py-3 px-4">~10-30%</td>
              <td className="py-3 pl-4">
                If you have the capital and time. 5-8% gross returns, tangible,
                but illiquid. Murabaha or cash purchase.
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Extra cash
              </td>
              <td className="py-3 px-4">~5-10%</td>
              <td className="py-3 pl-4">
                To seize opportunities or buy more when the market dips.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        These percentages are not rules. A young single person with no upcoming
        projects can put 80% in stocks. A parent with a wedding planned next
        year might be at 30%. Adapt.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Step 4 — Invest regularly
      </h2>
      <p>
        The most important thing is consistency. Investing $200 every month for
        20 years produces better results than investing $50,000 all at once at
        the wrong time. This is called{" "}
        <strong>DCA (Dollar Cost Averaging)</strong>: a fixed amount, every
        month, without worrying about the &quot;right time.&quot;
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Summary
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>3 to 6 months of expenses in cash</strong> — never touch this
          cushion
        </li>
        <li>
          <strong>Set aside short-term goals</strong> — wedding, car, moving
        </li>
        <li>
          <strong>Allocate the rest</strong> — stocks (50-70%), gold (10-20%),
          real estate if possible, some opportunistic cash
        </li>
        <li>
          <strong>Invest every month</strong> — consistency beats timing
        </li>
      </ol>

      <p className="pt-4">
        For stocks, use our{" "}
        <Link
          href="/en/nasdaq-halal"
          className="text-[var(--color-gold)] hover:underline"
        >
          NASDAQ 100 Halal
        </Link>{" "}
        or{" "}
        <Link
          href="/en/sp500-halal"
          className="text-[var(--color-gold)] hover:underline"
        >
          S&P 500 Halal
        </Link>{" "}
        to know exactly how much to put on each stock. For gold, see our{" "}
        <Link
          href="/en/guides/gold"
          className="text-[var(--color-gold)] hover:underline"
        >
          gold guide
        </Link>.
      </p>
    </GuideLayout>
  );
}
