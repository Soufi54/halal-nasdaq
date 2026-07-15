import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const PIXEL_ID = "1986901548880799";

export const metadata: Metadata = {
  title: "Merci — Halal & patrimoine v2",
  description: "Ton achat est confirmé. Verifie ta boite email pour recevoir le PDF.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <>
      <Script id="meta-pixel-success" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
        fbq('track','PageView');
      `}</Script>

      <main
        className={`${playfair.variable} min-h-screen bg-stone-50 text-stone-900 antialiased`}
      >
        <section className="max-w-2xl mx-auto px-5 py-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-4">
            muslimfinance.net
          </p>

          <h1
            className="text-4xl sm:text-5xl font-black mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Merci pour ton achat.
          </h1>

          <p className="text-base text-stone-700 leading-relaxed mb-8 max-w-md mx-auto">
            Ton exemplaire de <strong>Halal &amp; patrimoine v2</strong> vient
            de partir sur ton email. Regarde ta boite dans les 2 prochaines
            minutes (verifie aussi le dossier <em>spam</em> au cas ou).
          </p>

          <div className="bg-white border-2 border-amber-300 rounded-xl p-6 shadow-sm mb-8">
            <p className="text-xs uppercase tracking-widest text-amber-800 font-bold mb-3">
              Prochaine etape
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              Commence par le chapitre 1 (page 4) puis passe direct au chapitre
              4 (page 15). C&apos;est la que se trouve la methode complete +
              les positions du portefeuille perso.
            </p>
          </div>

          <div className="bg-stone-900 text-stone-50 rounded-xl p-6 mb-8">
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-3">
              Bonus
            </p>
            <p className="text-sm text-stone-300 mb-4 leading-relaxed">
              Suis <a href="https://x.com/muslimfinance_" className="text-amber-400 underline">@muslimfinance_</a> pour
              les backtests hebdomadaires et la watchlist AAOIFI mise a jour.
            </p>
            <a
              href="https://x.com/muslimfinance_"
              className="inline-block bg-amber-500 text-stone-900 px-5 py-2 rounded-md font-bold text-sm"
            >
              Voir le compte X
            </a>
          </div>

          <p className="text-xs text-stone-500 mb-2">
            Un souci avec l&apos;email ? Contact :{" "}
            <a
              href="mailto:hello@muslimfinance.net"
              className="text-amber-800 underline"
            >
              hello@muslimfinance.net
            </a>
          </p>

          <Link
            href="/"
            className="text-xs text-stone-500 underline"
          >
            Retour au site
          </Link>
        </section>
      </main>
    </>
  );
}
