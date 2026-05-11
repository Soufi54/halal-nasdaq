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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    siteName: "MuslimFinance",
    title: "MuslimFinance — Halal NASDAQ 100 & S&P 500 Index",
    description:
      "NASDAQ 100 Halal: 66 stocks, S&P 500 Halal: 226 stocks. AAOIFI screening, portfolio simulator, historical backtest. Free and open-source.",
    url: "https://muslimfinance.net/en",
    images: [
      {
        url: "/og-image-en.png",
        width: 1200,
        height: 630,
        alt: "MuslimFinance — Halal NASDAQ 100 & S&P 500",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MuslimFinance — Halal NASDAQ 100 & S&P 500 Index",
    description:
      "NASDAQ 100 Halal: 66 stocks, S&P 500 Halal: 226 stocks. AAOIFI screening, historical backtest. Free and open-source.",
    images: ["/og-image-en.png"],
  },
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
