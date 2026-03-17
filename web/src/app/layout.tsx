import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NASDAQ 100 Halal | Investissement ethique conforme AAOIFI",
  description:
    "Reconstitution du NASDAQ 100 filtree selon les criteres de conformite charia AAOIFI. Actions halal uniquement, poids redistribues. Simulateur de portefeuille integre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
