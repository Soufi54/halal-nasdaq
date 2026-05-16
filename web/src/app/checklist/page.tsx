import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { ChecklistForm } from "./ChecklistForm";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const PIXEL_ID = "1986901548880799";

export const metadata: Metadata = {
  title: "Détecte une arnaque type Validus en 30 secondes — guide gratuit muslimfinance.net",
  description:
    "Checklist 8 questions + watchlist 10 actions halal AAOIFI. PDF gratuit, immédiat par email. Pour ne plus tomber dans le piège Validus, OneCoin, copy trading, MLM 'halal'.",
  alternates: { canonical: "https://muslimfinance.net/checklist" },
  openGraph: {
    title: "Halal & arnaques 2026 — la checklist 8 questions que tu n'as jamais reçue",
    description:
      "Guide PDF gratuit : détecter une arnaque type Validus en 30 secondes + 10 actions halal AAOIFI à mettre en watchlist 2026.",
    url: "https://muslimfinance.net/checklist",
    siteName: "MuslimFinance",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ChecklistPage() {
  return (
    <>
      <Script id="meta-pixel-checklist" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
        fbq('track','PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>

      <main className={`${playfair.variable} min-h-screen bg-stone-50 text-stone-900 antialiased`}>
        {/* HERO */}
        <section className="relative px-5 pt-12 pb-10 sm:pt-20 sm:pb-16 max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-5">
            muslimfinance.net &nbsp;•&nbsp; Guide gratuit
          </p>

          <h1
            className="text-[2.1rem] sm:text-5xl font-black leading-[1.05] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Détecte une arnaque type Validus
            <br />
            <span className="text-amber-900">en 30 secondes.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 max-w-xl">
            Checklist 8 questions + watchlist 10 actions halal AAOIFI.<br />
            <strong>PDF gratuit, envoyé immédiatement par email.</strong>
          </p>

          <div className="bg-white border-2 border-amber-300 rounded-xl p-5 sm:p-7 shadow-lg max-w-md">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-bold mb-3">
              Recevoir le guide
            </p>
            <ChecklistForm source="checklist_hero" />
            <p className="mt-3 text-xs text-stone-500">
              PDF envoyé en 30 sec sur ton email. Tu peux te désabonner à tout moment.
            </p>
          </div>
        </section>

        {/* CE QU'IL Y A DEDANS */}
        <section className="bg-stone-900 text-stone-100 px-5 py-14">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Ce que tu vas pouvoir détecter en 30 secondes.
            </h2>
            <ul className="space-y-4 text-base sm:text-lg leading-relaxed">
              {[
                "Les MLM type Validus, OneCoin, Bitconnect — le marqueur n° 1 qui les démasque",
                "Les groupes Telegram « signaux halal » qui te vendent du rêve à 99 €/mois",
                "Les « mentors trading » sur Insta qui ne montrent que des Lambo louées",
                "Les « tokens halal » sans sous-jacent réel ni cotation publique",
                "Les courtiers non régulés cachés derrière un label religieux bidon",
              ].map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-400 font-bold mt-1 select-none">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* BONUS WATCHLIST */}
        <section className="px-5 py-14 max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-3">Bonus inclus</p>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            10 actions halal AAOIFI à mettre en watchlist 2026.
          </h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            Les 10 plus grosses positions du NASDAQ 100 qui passent le filtre AAOIFI.
            Toutes <strong>cotées, vérifiables, accessibles via un courtier classique</strong>.
            Pas de token mystère, pas de plateforme « halal exclusive ».
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <p className="text-sm text-stone-700 mb-2">
              <strong>Données vérifiées</strong> sur muslimfinance.net : 66 actions halal sur 100 du NASDAQ, 221 sur 500 du S&amp;P 500.
            </p>
            <p className="text-sm text-stone-700">
              Backtest 1 an : <strong>NASDAQ 100 halal +89,57 %</strong> vs indice classique +40,73 %.
              <span className="block mt-1 text-xs text-stone-500 italic">
                ⚠️ Performances passées ≠ futures. Composition actuelle appliquée historiquement.
              </span>
            </p>
          </div>
        </section>

        {/* PAR QUI */}
        <section className="bg-stone-100 px-5 py-12 max-w-3xl mx-auto sm:rounded-xl sm:my-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-3">Par qui</p>
          <h2
            className="text-xl sm:text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            L&apos;équipe muslimfinance.net.
          </h2>
          <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
            2 ans de tracking quotidien des actions halal AAOIFI. Aucune affiliation, aucun sponsor,
            aucun « partenariat stratégique » avec un broker ou un MLM.
            Site public, données vérifiables — <a href="https://muslimfinance.net" className="text-amber-800 underline">muslimfinance.net</a>.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="bg-stone-900 text-stone-50 px-5 py-14 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Récupère le guide maintenant.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mb-7 max-w-md mx-auto">
            PDF envoyé en 30 sec. Gratuit. Sans paiement, sans CB, sans engagement.
          </p>
          <div className="max-w-md mx-auto">
            <ChecklistForm source="checklist_final" />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-stone-200 px-6 py-8 text-center text-xs text-stone-500">
          <p>muslimfinance.net &nbsp;•&nbsp; © 2026 &nbsp;•&nbsp; L&apos;équipe muslimfinance.net</p>
        </footer>
      </main>
    </>
  );
}
