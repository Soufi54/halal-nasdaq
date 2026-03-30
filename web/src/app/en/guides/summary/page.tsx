import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All halal investments — Overview",
  description:
    "Complete overview of all Shariah-compliant investment options: stocks, ETFs, gold, real estate, sukuk, and more.",
};

export default function Summary() {
  return (
    <GuideLayout title="All halal investments" locale="en">
      <p className="text-lg">
        All investment options that are compliant (or potentially compliant) with
        Shariah law, organized by type. One table to see everything at a glance,
        and a recommended strategy at the end.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 pr-4 text-left font-semibold text-[var(--foreground)]">
                Investment
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[var(--foreground)]">
                Halal status
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[var(--foreground)]">
                Returns
              </th>
              <th className="py-3 pl-4 text-left font-semibold text-[var(--foreground)]">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Individual halal stocks
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span> (with
                screening)
              </td>
              <td className="py-3 px-4">7-13% /yr</td>
              <td className="py-3 pl-4">Medium</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Halal ETFs (SPUS, HLAL, ISDU, ISDW)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">~10% /yr</td>
              <td className="py-3 pl-4">Easy</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Physical gold / Gold ETFs
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">~7% /yr</td>
              <td className="py-3 pl-4">Easy</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Real estate (cash / Murabaha)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">5-8% gross</td>
              <td className="py-3 pl-4">Hard</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Sukuk (Islamic bonds)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">3-6% /yr</td>
              <td className="py-3 pl-4">Medium</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Shariah robo-advisors (Wahed, Amana)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">~6-8% /yr</td>
              <td className="py-3 pl-4">Easy</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Real estate crowdfunding
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-doubtful)]">Verify</span>
              </td>
              <td className="py-3 px-4">6-12% /yr</td>
              <td className="py-3 pl-4">Easy</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Private business investment
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span> (if
                lawful activity)
              </td>
              <td className="py-3 px-4">Variable</td>
              <td className="py-3 pl-4">Very hard</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Conventional savings / bonds
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-haram)]">
                  Not compliant
                </span>{" "}
                (riba)
              </td>
              <td className="py-3 px-4">2-5% /yr</td>
              <td className="py-3 pl-4">Easy</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Recommended strategy
      </h2>
      <p>
        Here&apos;s the allocation we recommend for most people, in order of
        priority:
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        <li>
          <strong>Emergency fund (3-6 months of expenses)</strong> — in a
          checking account, accessible immediately. This is the foundation —
          never touch this money to invest
        </li>
        <li>
          <strong>Halal ETF or index replication via DCA (~50-70%)</strong> —
          this is the growth engine of your portfolio. SPUS, HLAL, ISDU, or ISDW
          depending on your location, or replicate the index with our tools{" "}
          <Link
            href="/en/nasdaq-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            NASDAQ 100 Halal
          </Link>{" "}
          and{" "}
          <Link
            href="/en/sp500-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            S&P 500 Halal
          </Link>
        </li>
        <li>
          <strong>Gold (~10-20%)</strong> — diversification and protection.
          Inverse behavior to stocks, safe haven during crises
        </li>
        <li>
          <strong>Real estate when capital allows</strong> — when you have
          enough for a cash purchase or Murabaha. Consider affordable housing
          opportunities first
        </li>
      </ol>
      <p>
        What matters is not the amount but the consistency. Even $50/month
        invested consistently for 20 years generates significant capital. Start
        now.
      </p>
    </GuideLayout>
  );
}
