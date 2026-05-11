import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { SubscribeForm } from "../SubscribeForm";
import { StickyEmailBar } from "./StickyEmailBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const PIXEL_ID = "1986901548880799";

export const metadata: Metadata = {
  title: "Halal et patrimoine — Le guide d’investissement pour le musulman qui veut construire pour ses enfants",
  description:
    "Tu as refusé le riba. Tu as évité les arnaques. Mais ton argent dort. Le guide pour construire un patrimoine halal — voiture, maison, retraite, études des enfants, aider tes parents.",
  alternates: { canonical: "https://muslimfinance.net/ebook/v2" },
  openGraph: {
    title: "Refuser le riba, ce n’est pas être condamné à être pauvre.",
    description:
      "Le guide d’investissement halal pour le musulman qui veut construire pour ses enfants.",
    url: "https://muslimfinance.net/ebook/v2",
    siteName: "MuslimFinance",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function EbookV2Page() {
  return (
    <>
      <Script id="meta-pixel-ebook-v2" strategy="afterInteractive">{`
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

      <main
        className={`${playfair.variable} min-h-screen bg-stone-50 text-stone-900 antialiased pb-28 sm:pb-0`}
      >
        {/* HERO — email-first, tout au-dessus du fold */}
        <section className="relative px-5 pt-10 pb-12 sm:pt-16 sm:pb-16 max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-5">
            muslimfinance.net
          </p>

          <h1
            className="text-[2rem] sm:text-5xl font-black leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Refuser le riba,
            <br />
            <span className="text-amber-900">ce n’est pas être condamné à être pauvre.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-7 max-w-xl">
            Le guide d’investissement halal pour bâtir un patrimoine — études des enfants,
            retraite, aider tes parents, voiture, maison.
          </p>

          {/* Bloc offre + email AU-DESSUS DU FOLD */}
          <div className="bg-white border-2 border-amber-300 rounded-xl p-5 sm:p-6 shadow-lg">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-bold">
                Tarif lancement
              </span>
              <span className="text-stone-400 line-through text-lg ml-auto">29 €</span>
              <span className="text-3xl font-black text-stone-900">14 €</span>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              100 premiers inscrits • Payable à la sortie (15 juin 2026)
            </p>
            <SubscribeForm source="v2_hero" ctaLabel="Réserver — 14 €" />
          </div>

          <p className="mt-5 text-xs text-stone-500">
            Aperçu de 10 pages envoyé dès la semaine prochaine. Aucun paiement maintenant.
          </p>
        </section>

        {/* PAIN — 3 lignes max, lisibles en 5s */}
        <section className="bg-stone-900 text-stone-100 px-5 py-12 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xl sm:text-2xl font-bold leading-snug mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Tu as refusé le riba.<br />
              Tu as ignoré le copy trading et les MLM type Validus.<br />
              <span className="text-amber-400">Tu n’as toujours rien construit.</span>
            </p>
            <p className="text-stone-300 text-base leading-relaxed mb-5">
              À 32 ans, ton argent dort sur ton compte. Tu ne sais pas comment tu vas financer
              les études de tes enfants, ta retraite, ou aider tes parents.
            </p>
            <p className="text-amber-300 font-semibold">
              Tu as eu raison sur tout. Il te manque la suite.
            </p>
          </div>
        </section>

        {/* CE QUE TU OBTIENS — 3 cartes courtes */}
        <section className="px-5 py-12 max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-3">Inclus</p>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Le guide + 2 outils prêts à l’emploi.
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-amber-800 font-bold mb-1">
                Guide principal
              </p>
              <h3 className="text-lg font-bold mb-1">
                Halal et patrimoine — 10 chapitres
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Screening AAOIFI, actions halal, or physique, immobilier sans crédit,
                détecter Validus en 30 secondes, transmettre proprement.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-amber-800 font-bold mb-1">
                Bonus 1
              </p>
              <h3 className="text-lg font-bold mb-1">Tracker portefeuille halal (Google Sheets)</h3>
              <p className="text-sm text-stone-600">Positions, dividendes, calcul zakat auto. Valeur 19 €.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-amber-800 font-bold mb-1">
                Bonus 2
              </p>
              <h3 className="text-lg font-bold mb-1">Watchlist actions halal AAOIFI</h3>
              <p className="text-sm text-stone-600">
                30 actions screenées + maj trimestrielles 1 an par email. Valeur 29 €.
              </p>
            </div>
          </div>
        </section>

        {/* OBJECTIONS — 3 questions clés, format compact */}
        <section className="bg-stone-100 px-5 py-12 max-w-3xl mx-auto sm:rounded-xl sm:my-6">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            En 3 questions.
          </h2>
          <div className="space-y-5">
            {[
              ["Je paye maintenant ?", "Non. Tu inscris ton email, tu réserves au tarif 14 € (au lieu de 29 €). Paiement à la sortie le 15 juin 2026."],
              ["Je n’y connais rien en finance.", "Le guide part de zéro. Si tu sais ce qu’est un compte bancaire, tu peux suivre."],
              ["Pourquoi pas YouTube halal gratuit ?", "Parce que YouTube halal francophone est dominé par des comptes affiliés à des courtiers ou des « formations » à 1 500 €. Aucune affiliation ici."],
            ].map(([q, a], i) => (
              <div key={i}>
                <p className="font-bold text-stone-900 text-base">— {q}</p>
                <p className="text-sm text-stone-700 leading-relaxed mt-1">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-stone-900 text-stone-50 px-5 py-14 text-center">
          <h2
            className="text-2xl sm:text-4xl font-bold mb-3 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Tes enfants comptent sur toi.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mb-8 max-w-md mx-auto">
            14 € à la sortie le 15 juin. Aucun paiement aujourd’hui.
          </p>
          <SubscribeForm source="v2_final" ctaLabel="Je réserve mon exemplaire — 14 €" />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-stone-200 px-6 py-8 text-center text-xs text-stone-500">
          <p>muslimfinance.net — © 2026 • Par l’équipe muslimfinance.net</p>
        </footer>

        {/* STICKY EMAIL BAR MOBILE (toujours visible, pas un bouton scroll) */}
        <StickyEmailBar />
      </main>
    </>
  );
}
