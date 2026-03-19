import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const dmSans = DM_Sans({
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${jetbrains.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
