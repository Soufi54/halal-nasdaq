import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Investing in gold — Practical guide",
  description:
    "How to invest in gold the halal way. Physical gold, gold ETFs, DCA strategy, and historical returns.",
};

export default function Gold() {
  return (
    <GuideLayout title="Investing in gold" locale="en">
      <p className="text-lg">
        Gold is the quintessential halal investment. No interest, no doubt — it&apos;s
        a tangible asset that has preserved its value for millennia. Today, it&apos;s
        as easy to buy as stocks. Here&apos;s how to do it concretely.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Why gold?
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Halal by nature</strong> — no riba, no gharar, no controversy
          among scholars
        </li>
        <li>
          <strong>Safe haven</strong> — when stock markets crash, gold typically
          rises. This inverse behavior protects your portfolio
        </li>
        <li>
          <strong>Inflation protection</strong> — gold holds its value when
          currencies depreciate
        </li>
        <li>
          <strong>More liquid than real estate</strong> — you can sell quickly,
          no need to wait months
        </li>
        <li>
          <strong>~7% per year historically</strong> — less than stocks (~10-13%)
          but far more than a savings account (0%)
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        How to buy gold
      </h2>
      <p>Two main approaches:</p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Physical gold</strong> (coins, bars, online platforms) — you
          actually own the gold. This is the most compliant from a Shariah
          perspective. Options include:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Local dealers</strong> — APMEX, JM Bullion, SD Bullion
              (US), BullionVault, The Royal Mint (UK)
            </li>
            <li>
              <strong>Online platforms</strong> — OneGold, Vaulted, or INAIA
              (Europe) let you buy fractional gold stored in secure vaults
            </li>
          </ul>
          Downside: storage fees and buy/sell spreads
        </li>
        <li>
          <strong>Gold ETFs/ETCs</strong> — certificates backed by physical
          gold, purchasable via any broker. Examples:{" "}
          <strong>GLD</strong> (SPDR Gold Trust),{" "}
          <strong>IAU</strong> (iShares Gold Trust),{" "}
          <strong>SGOL</strong> (Aberdeen Standard Physical Gold). More
          practical and lower fees, but you don&apos;t own the gold directly — some
          scholars consider this acceptable, others don&apos;t
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        The strategy: DCA on gold
      </h2>
      <p>
        The best approach is{" "}
        <strong>DCA (Dollar Cost Averaging)</strong>: invest the same amount
        every month, for example $50 or $100. When gold is expensive, you buy
        less. When it drops, you buy more. Over the long term, this smooths your
        average purchase price and eliminates the stress of timing.
      </p>
      <p>
        Many platforms support recurring purchases — set it up once and forget
        about it.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        The limits
      </h2>
      <p>
        Gold doesn&apos;t produce income (no dividends, no rent). Its value depends
        solely on supply and demand. Over the very long term, stocks have
        historically outperformed gold (~10% vs ~7%). Gold is therefore a{" "}
        <strong>complement</strong> to your portfolio, not a replacement. We
        generally recommend 10-20% of your portfolio in gold.
      </p>
    </GuideLayout>
  );
}
