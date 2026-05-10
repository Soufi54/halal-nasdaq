import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MuslimFinance — NASDAQ 100 et S&P 500 conformes charia",
    template: "%s | MuslimFinance",
  },
  description:
    "Vous voulez investir en bourse sans compromettre vos convictions ? On a passe chaque action du NASDAQ 100 et du S&P 500 au crible du standard AAOIFI. Resultat : la composition exacte d'un indice halal, avec simulateur de portefeuille. Gratuit, open-source, transparent.",
  metadataBase: new URL("https://muslimfinance.net"),
  alternates: {
    languages: {
      fr: "https://muslimfinance.net",
      en: "https://muslimfinance.net/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    siteName: "MuslimFinance",
    title: "MuslimFinance — Indices NASDAQ 100 & S&P 500 halal",
    description:
      "NASDAQ 100 Halal : 65 actions, S&P 500 Halal : 220 actions. Screening AAOIFI, simulateur de portefeuille, backtest historique. Gratuit et open-source.",
    url: "https://muslimfinance.net",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MuslimFinance — NASDAQ 100 & S&P 500 halal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MuslimFinance — Indices NASDAQ 100 & S&P 500 halal",
    description:
      "NASDAQ 100 Halal : 65 actions, S&P 500 Halal : 220 actions. Screening AAOIFI, backtest historique. Gratuit et open-source.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${outfit.variable} ${jetbrains.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
