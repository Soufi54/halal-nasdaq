import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Murabaha home financing — Simulations & honest comparison",
  description:
    "How Murabaha home financing works. Concrete simulations, why it costs more than a conventional mortgage, hidden fees, and tips to reduce the cost.",
};

export default function Murabaha() {
  return (
    <GuideLayout title="Murabaha home financing" locale="en">
      <p className="text-lg">
        Murabaha is the halal alternative to a conventional mortgage. The
        principle is simple: a bank buys the property for you, then sells it
        back to you with a fixed markup. No interest, no variable rate. But this
        mechanism has a cost — and it&apos;s important to understand it before
        committing.
      </p>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--color-gold-muted)] p-4 my-6">
        <p className="text-sm font-medium text-[var(--foreground)]">
          The simulations below are based on real conditions offered by Islamic
          financial institutions. Amounts are rounded. These are not offers —
          request your own simulation from a provider in your country.
        </p>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        How it works
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>You find a property and negotiate the price with the seller</li>
        <li>
          The bank <strong>buys the property</strong> on your behalf (it pays
          the seller + acquisition costs)
        </li>
        <li>
          The bank <strong>sells the property to you</strong> at a higher price.
          The difference is its markup — fixed once and for all at signing
        </li>
        <li>
          You pay back in <strong>fixed monthly installments</strong> over 10,
          15, or 20 years
        </li>
      </ol>
      <p>
        Unlike a conventional loan, there&apos;s no interest rate. The markup never
        changes — even if market rates go up or down.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Simulation 1 — $300,000 property over 15 years
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Property price</td>
              <td className="py-2 text-right font-mono">$300,000</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Down payment</td>
              <td className="py-2 text-right font-mono">$60,000 (20%)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Amount financed</td>
              <td className="py-2 text-right font-mono">~$240,000</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Duration</td>
              <td className="py-2 text-right font-mono">15 years (180 months)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Monthly payment</td>
              <td className="py-2 text-right font-mono">~$2,050</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Bank markup</td>
              <td className="py-2 text-right font-mono text-[var(--color-gold)]">~$129,000</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Total price paid</td>
              <td className="py-2 text-right font-mono font-bold">~$429,000</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Equivalent annual rate</td>
              <td className="py-2 text-right font-mono">~5.0%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Simulation 2 — $500,000 property over 25 years
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Property price</td>
              <td className="py-2 text-right font-mono">$500,000</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Down payment</td>
              <td className="py-2 text-right font-mono">$100,000 (20%)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Amount financed</td>
              <td className="py-2 text-right font-mono">~$400,000</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Duration</td>
              <td className="py-2 text-right font-mono">25 years (300 months)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Monthly payment</td>
              <td className="py-2 text-right font-mono">~$2,530</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Bank markup</td>
              <td className="py-2 text-right font-mono text-[var(--color-gold)]">~$359,000</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Total price paid</td>
              <td className="py-2 text-right font-mono font-bold">~$859,000</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Equivalent annual rate</td>
              <td className="py-2 text-right font-mono">~5.5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Why Murabaha costs more
      </h2>
      <p>
        A conventional mortgage might be around 6-7% in the US or 3-4% in the
        UK/Europe. Murabaha typically comes out 0.5-2% higher. Here&apos;s why:
      </p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Double transfer.</strong> In a conventional loan, the bank
          lends you money — there&apos;s only one sale (seller to you). In Murabaha,
          there are <strong>two sales</strong>: seller to bank, then bank to
          you. Each transfer may generate additional closing costs
        </li>
        <li>
          <strong>Carrying cost.</strong> The bank buys the property before
          reselling it to you. During that time, it bears the risk. This risk
          has a price, built into the markup
        </li>
        <li>
          <strong>Niche market.</strong> Very few institutions offer Murabaha.
          Less competition = less pressure on prices. A conventional mortgage
          market with dozens of competing banks drives rates down — that&apos;s not
          the case here
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Where to find Murabaha
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>US:</strong> Guidance Residential, UIF (University Islamic
          Financial), Devon Bank, Ameen Housing
        </li>
        <li>
          <strong>UK:</strong> Al Rayan Bank, Gatehouse Bank, BLME
        </li>
        <li>
          <strong>Canada:</strong> Manzil, Zero Mortgage
        </li>
        <li>
          <strong>France:</strong> 570easi (intermediary), contact the bank
          directly for better rates
        </li>
        <li>
          <strong>Other countries:</strong> check with local Islamic banks or
          cooperative finance groups in your community
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        How to reduce the cost
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Maximize your down payment.</strong> Every extra dollar you put
          down reduces the bank&apos;s markup. A 40% down payment is significantly
          cheaper than 20%
        </li>
        <li>
          <strong>Shorten the duration.</strong> 15 years costs much less than
          25 — not just because you pay for less time, but because the
          equivalent rate is lower
        </li>
        <li>
          <strong>Shop around.</strong> If there are multiple providers in your
          country, get quotes from all of them. Even small rate differences
          matter over decades
        </li>
        <li>
          <strong>Buy cash if you can.</strong> Zero markup, zero double
          transfer, zero closing costs. It&apos;s the most economical solution
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Summary
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3 pr-4 text-left font-semibold text-[var(--foreground)]">Pros</th>
              <th className="py-3 pl-4 text-left font-semibold text-[var(--foreground)]">Cons</th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-muted-foreground)] align-top">
            <tr>
              <td className="py-2 pr-4">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Shariah-compliant</li>
                  <li>Fixed markup — no surprises</li>
                  <li>No variable interest rate</li>
                  <li>Enables homeownership without riba</li>
                </ul>
              </td>
              <td className="py-2 pl-4">
                <ul className="list-disc pl-4 space-y-1">
                  <li>20-50% more expensive than conventional</li>
                  <li>Double closing costs in some jurisdictions</li>
                  <li>Longer process (2-4 months)</li>
                  <li>Very few providers available</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Murabaha isn&apos;t perfect. It costs more, and that&apos;s understandable — the
        mechanism is structurally more complex than a simple loan. But for those
        who want to access homeownership while staying compliant, it&apos;s the most
        structured option available today. Each person must weigh the financial
        cost against the importance they place on compliance.
      </p>
    </GuideLayout>
  );
}
