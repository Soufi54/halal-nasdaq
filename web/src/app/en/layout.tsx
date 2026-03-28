import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MuslimFinance — Shariah-compliant NASDAQ 100 & S&P 500",
    template: "%s | MuslimFinance",
  },
  description:
    "Want to invest in stocks without compromising your faith? We screened every stock in the NASDAQ 100 and S&P 500 using the AAOIFI standard. Result: the exact composition of a halal index, with portfolio simulator. Free, open-source, transparent.",
  alternates: {
    languages: {
      fr: "https://muslimfinance.net",
      en: "https://muslimfinance.net/en",
    },
  },
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
