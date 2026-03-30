import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Why invest?",
  description:
    "Why investing is essential. Inflation, zakat, historical performance, and the Islamic perspective on investing.",
};

export default function WhyInvest() {
  return (
    <GuideLayout title="Why invest?" locale="en">
      <p className="text-lg">
        Leaving your money in a checking account means watching it lose value
        every year. This isn&apos;t an opinion — it&apos;s a mathematical fact. Here&apos;s
        why investing isn&apos;t a luxury but a necessity.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Inflation eats your money
      </h2>
      <p>
        In recent years, inflation has been running between{" "}
        <strong>2 and 5%</strong> in most Western countries. Concretely: $10,000
        in a checking account today will be worth roughly ~$9,500 in a year if
        inflation is at 5%. After 10 years, you&apos;ll have lost a third of your
        purchasing power without spending a cent.
      </p>
      <p>This isn&apos;t a theoretical risk — it&apos;s a certainty.</p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        The double penalty: inflation + zakat
      </h2>
      <p>
        On top of inflation, there&apos;s <strong>zakat al maal</strong>: 2.5% of
        savings above the nisab, due every year. It&apos;s a religious obligation and
        a wisdom: money isn&apos;t meant to sit idle — it&apos;s meant to circulate and
        produce value.
      </p>
      <p>
        Do the math: inflation 3% + zakat 2.5% = your savings lose{" "}
        <strong>~5.5% per year</strong> if they&apos;re not working. In 10 years,
        you&apos;ve lost more than half of their real value.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Investing means putting your money to work
      </h2>
      <p>
        Investing doesn&apos;t mean speculating. It means putting your money into
        assets that generate value — companies that produce, real estate that
        houses, gold that preserves. Here are the historical returns:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>NASDAQ 100</strong> — ~13% per year on average
        </li>
        <li>
          <strong>S&P 500</strong> — ~10% per year on average
        </li>
        <li>
          <strong>Gold</strong> — ~7% per year on average
        </li>
        <li>
          <strong>Checking account</strong> — 0%. Minus inflation. Minus zakat.
        </li>
      </ul>
      <p>
        Even a modest investment at 7-10% per year is enough to offset inflation
        and zakat, and to grow your wealth.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        What does Islam say?
      </h2>
      <p>
        Islam doesn&apos;t prohibit investing — on the contrary, it encourages
        economic activity and wealth creation. What&apos;s forbidden is riba
        (interest), gharar (excessive uncertainty), and maysir (gambling). Within
        these limits, investing is not only permissible but recommended.
      </p>
      <p>
        The Prophet (peace be upon him) was himself a trader, and Khadijah (may
        Allah be pleased with her) was a successful businesswoman. Many
        companions were active investors in trade and agriculture. Islam values
        those who grow their wealth in a lawful manner.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Where to start?
      </h2>
      <p>
        The next step is to understand how to allocate your money. Check out our{" "}
        <a
          href="/en/guides/summary"
          className="text-[var(--color-gold)] hover:underline"
        >
          overview of all halal investments
        </a>{" "}
        to see all options, or go straight to{" "}
        <a
          href="/en/guides/simple-method"
          className="text-[var(--color-gold)] hover:underline"
        >
          the simple method
        </a>{" "}
        if you want a turnkey strategy.
      </p>
    </GuideLayout>
  );
}
