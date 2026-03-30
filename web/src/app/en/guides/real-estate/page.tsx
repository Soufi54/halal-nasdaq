import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Real estate without riba — Complete guide",
  description:
    "Become a homeowner without a conventional loan. Murabaha, cash purchase, and all halal alternatives for property investment.",
};

export default function RealEstate() {
  return (
    <GuideLayout title="Real estate without riba" locale="en">
      <p className="text-lg">
        Real estate is one of the most popular investments among Muslims — it&apos;s
        tangible, useful, and potentially very profitable. The challenge:
        financing the purchase without a conventional loan (riba). Good news:
        there are several concrete strategies. Here&apos;s a breakdown.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        1. Cash purchase — the royal road
      </h2>
      <p>
        The simplest and most halal method: pay cash. It sounds impossible but
        it&apos;s more accessible than you think, especially with discipline and the
        right strategies.
      </p>
      <p>
        Start by aggressively saving while your investments grow. Combine a high
        savings rate with halal stock/gold returns, and you may reach a down
        payment — or full purchase price — faster than expected.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        2. Murabaha (Islamic home financing)
      </h2>
      <p>
        Murabaha is the most structured halal alternative to a conventional
        mortgage. The principle: an Islamic bank buys the property for you and
        resells it to you with a fixed markup, payable in monthly installments.
        No variable interest.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>US:</strong> Guidance Residential, UIF, Devon Bank, Ameen
          Housing
        </li>
        <li>
          <strong>UK:</strong> Al Rayan Bank, Gatehouse Bank, BLME
        </li>
        <li>
          <strong>Canada:</strong> Manzil, Zero Mortgage
        </li>
        <li>Process is typically longer than conventional — allow 2-4 months</li>
        <li>
          The markup is generally higher than a conventional mortgage rate, but
          that&apos;s the cost of compliance
        </li>
      </ul>
      <p>
        See our{" "}
        <a
          href="/en/guides/murabaha"
          className="text-[var(--color-gold)] hover:underline"
        >
          detailed Murabaha guide
        </a>{" "}
        for simulations and cost comparisons.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        3. Diminishing Musharakah (Ijara)
      </h2>
      <p>
        Another popular Islamic financing structure. The bank and you co-own the
        property. You pay rent on the bank&apos;s share + gradually buy out their
        portion. Over time, you own more and more until you own 100%.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Common in the UK (Al Rayan, Gatehouse) and some US providers</li>
        <li>Your monthly payment = rent + equity purchase</li>
        <li>Some scholars prefer this over Murabaha as it&apos;s considered more truly Islamic</li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        4. Other strategies
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Group buying (Islamic tontine):</strong> groups of Muslims
          pool their savings to buy properties in rotation. Informal system but
          it works — common in many Muslim communities worldwide
        </li>
        <li>
          <strong>Rent-to-own:</strong> some sellers or platforms offer
          rent-to-own arrangements where part of your rent goes toward the
          purchase price
        </li>
        <li>
          <strong>Foreclosure auctions:</strong> properties sold by courts,
          often 20-40% below market. Cash purchase required — perfect if you
          have the funds
        </li>
        <li>
          <strong>House hacking:</strong> buy a multi-unit property (duplex,
          triplex), live in one unit, rent the others. The rental income helps
          cover your costs — works great with a cash purchase strategy
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Key numbers to remember
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Target rental yield:</strong> 7% gross minimum for a
          worthwhile real estate investment
        </li>
        <li>
          <strong>Down payment:</strong> aim for 20%+ to get better terms and
          avoid PMI (conventional) or reduce markup (Murabaha)
        </li>
        <li>
          <strong>Cash reserves:</strong> keep 6 months of expenses + repair
          fund after purchase
        </li>
      </ul>
    </GuideLayout>
  );
}
