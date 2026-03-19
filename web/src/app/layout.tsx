import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MuslimFinance.net — Investir halal, simplement",
    template: "%s | MuslimFinance.net",
  },
  description:
    "Indices boursiers reconstitues conformes a la charia (AAOIFI). NASDAQ 100 Halal, S&P 500 Halal, guides d'investissement. Gratuit et open-source.",
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
        className={`${ibmPlex.variable} ${jetbrains.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
