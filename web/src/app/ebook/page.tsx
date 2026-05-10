import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { SubscribeForm } from "./SubscribeForm";

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
    "Tu as refusé le riba. Tu as évité les arnaques. Mais ton argent dort, et le temps file. Le guide pour construire un patrimoine halal — voiture, maison, retraite, études des enfants, aider tes parents.",
  alternates: { canonical: "https://muslimfinance.net/ebook" },
  openGraph: {
    title: "Refuser le riba, ce n’est pas être condamné à être pauvre.",
    description:
      "Le guide d’investissement halal pour le musulman qui veut construire pour ses enfants.",
    url: "https://muslimfinance.net/ebook",
    siteName: "MuslimFinance",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function EbookPage() {
  return (
    <>
      <Script id="meta-pixel-ebook" strategy="afterInteractive">{`
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
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>

      <main
        className={`${playfair.variable} min-h-screen bg-stone-50 text-stone-900 antialiased pb-24 sm:pb-0`}
      >
        {/* HERO */}
        <section className="relative px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-6">
            muslimfinance.net
          </p>
          <h1
            className="text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Refuser le riba,
            <br />
            <span className="text-amber-900">ce n’est pas être condamné à être pauvre.</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed mb-8 max-w-2xl">
            Le guide d’investissement halal pour le musulman qui veut construire un patrimoine pour
            ses enfants — sans crédit, sans copy trading, sans MLM type Validus, sans investissement
            bourbier au bled.
          </p>

          <div className="bg-white border border-amber-200 rounded-xl p-6 sm:p-7 shadow-sm mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-amber-800 w-full">
                Tarif lancement, 100 premiers inscrits
              </span>
              <span className="text-stone-400 line-through text-2xl">29 €</span>
              <span className="text-5xl font-black text-stone-900">14 €</span>
              <span className="text-sm text-stone-600">— payable à la sortie, pas maintenant</span>
            </div>
            <SubscribeForm source="hero" ctaLabel="Réserver mon exemplaire — 14 €" />
          </div>

          <p className="text-sm text-stone-500">
            Sortie : 15 juin 2026 • Aperçu de 10 pages envoyé dès la semaine prochaine
          </p>
        </section>

        {/* PAIN — c'est toi si */}
        <section className="bg-stone-900 text-stone-100 px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-10"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              C’est toi, si...
            </h2>
            <ul className="space-y-5 text-lg leading-relaxed">
              {[
                "Tu refuses tout produit financier à intérêt — même quand ton conseiller bancaire te regarde de travers.",
                "Tu as déjà ignoré 10 propositions « halal » louches : formations à 1500 €, signaux Telegram, copy trading, mentor trading sur Insta.",
                "Ton cousin t’appelle tous les 6 mois pour un « plan béton » au bled : terrain, agence de location, restaurant.",
                "À 32 ans, ton argent dort sur ton compte et ne te rapporte rien. Et le temps file.",
                "Tu ne sais pas comment tu vas financer les études de tes enfants, ta retraite, aider tes parents, t’acheter un appartement, une voiture.",
              ].map((t, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-amber-400 font-bold mt-1 select-none">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-xl text-amber-300 font-medium">
              Tu as eu raison sur tout. Mais il te manque la suite.
            </p>
            <div className="mt-10">
              <a
                href="#reserver"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-amber-400 text-stone-950 font-semibold hover:bg-amber-300 transition shadow-sm"
              >
                Réserver mon exemplaire — 14 €
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* À QUOI ÇA SERT (utilité concrète) */}
        <section className="bg-amber-50 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-4">
              À quoi sert un patrimoine
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-12 max-w-2xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Ce que tu pourras enfin financer.
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {[
                ["Les études de tes enfants", "Sans qu’ils dépendent d’un prêt étudiant ou d’une bourse aléatoire."],
                ["Aider tes parents", "Sans devoir demander à tes frères ou attendre la fin du mois."],
                ["Ta retraite", "Sans dépendre uniquement d’un système qui ne te rend pas ce que tu y as mis."],
                ["Un appartement, une maison", "Sans crédit à intérêt, en cash ou avec montage halal."],
                ["Une voiture", "Sans LOA, sans LLD, sans crédit auto."],
                ["Des vacances en famille", "Sans serrer la ceinture pendant 6 mois après."],
              ].map(([t, d], i) => (
                <div key={i}>
                  <h3 className="text-xl font-bold text-stone-900 mb-1">{t}</h3>
                  <p className="text-stone-700 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a
                href="#reserver"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-stone-900 text-amber-50 font-semibold hover:bg-stone-800 transition shadow-sm"
              >
                Je veux construire ça — 14 €
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE — sommaire (sans engagement nb pages) */}
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-4">Sommaire</p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Ce qu’il y a dedans.
          </h2>
          <p className="text-stone-600 mb-12 max-w-2xl">
            Un guide structuré, accompagné de deux outils concrets prêts à l’emploi.
          </p>

          <ol className="space-y-5">
            {[
              "Pourquoi 90 % des musulmans n’ont aucun patrimoine — et pourquoi ce n’est pas leur faute",
              "Le screening AAOIFI expliqué simplement — la seule norme qui compte vraiment",
              "Les actions halal de la watchlist 2026 — secteurs, ratios, justifications",
              "Profiter du boom de l’IA sans compromis — où placer, quoi éviter",
              "L’or physique : combien, où, comment — et pourquoi pas l’or papier",
              "L’immobilier nu sans crédit — les montages possibles",
              "Détecter une arnaque type Validus en 30 secondes — la checklist en 8 questions",
              "Les courtiers et plateformes 100 % compatibles — comparatif sans affiliation",
              "Le rebalancing trimestriel en 30 minutes — la routine qui suffit",
              "Transmettre — héritage, donation, zakat — calculs et cas pratiques",
            ].map((title, i) => (
              <li
                key={i}
                className="flex gap-5 pb-5 border-b border-stone-200 last:border-0"
              >
                <span
                  className="text-3xl font-bold text-amber-800 w-12 flex-shrink-0"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-stone-800 pt-1">{title}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <a
              href="#reserver"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-stone-900 text-amber-50 font-semibold hover:bg-stone-800 transition shadow-sm"
            >
              Réserver mon exemplaire — 14 €
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* PROMESSE CONCRÈTE */}
        <section className="bg-stone-100 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-4">
              Après lecture
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-12"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Tu sauras enfin :
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                ["Bâtir un portefeuille halal diversifié", "Actions AAOIFI + or + immobilier + cash productif. En 30 minutes."],
                ["Viser ~10 % par an", "En restant strictement halal. Sans spéculer. Sans copier personne."],
                ["Profiter du boom de l’IA", "Sans crypto, sans token sketch, sans formation MLM."],
                ["Détecter Validus & co. en 30 secondes", "La checklist 8 questions qui démasque toutes les pyramides."],
                ["Transmettre proprement", "Héritage halal, donation, calcul zakat sur portefeuille."],
                ["Y consacrer 30 minutes par mois", "Pas tes weekends. Pas tes nuits. Une routine simple."],
              ].map(([t, d], i) => (
                <div key={i}>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{t}</h3>
                  <p className="text-stone-700 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFÉRENCIATEURS */}
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-12"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Pourquoi ce guide, et pas une autre vidéo YouTube halal ?
          </h2>
          <div className="space-y-8">
            {[
              ["Écrit pour le pratiquant, pas adapté d’un guide générique", "La majorité des contenus « halal » sont des copies de Robert Kiyosaki avec un vernis. Ici, le cadre religieux est le point de départ, pas l’habillage."],
              ["Source AAOIFI uniquement", "Pas de « comité halal maison ». La norme internationale qui fait foi, expliquée simplement."],
              ["Concret, actionnable, avec outils", "Tu repars avec un tracker Google Sheets et une watchlist d’actions halal. Pas un PDF de motivation."],
              ["Aucune affiliation, aucun sponsor", "On ne touche aucune commission sur les courtiers, plateformes ou produits cités."],
            ].map(([t, d], i) => (
              <div key={i} className="border-l-4 border-amber-700 pl-6">
                <h3 className="text-xl font-bold mb-2">{t}</h3>
                <p className="text-stone-700 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BONUS */}
        <section className="bg-amber-50 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-4">
              Inclus en pré-inscription
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Deux outils livrés avec le guide.
            </h2>
            <p className="text-stone-600 mb-12">Le 15 juin, tu reçois tout en même temps.</p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg border border-stone-200 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2">
                  Bonus 1
                </p>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Tracker portefeuille halal
                </h3>
                <p className="text-stone-700 leading-relaxed mb-4">
                  Google Sheets prêt à l’emploi. Positions, dividendes, calcul zakat automatique sur l’ensemble du portefeuille.
                </p>
                <p className="text-sm text-stone-500">Valeur seule : 19 €</p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-stone-200 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2">
                  Bonus 2
                </p>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Watchlist actions halal AAOIFI
                </h3>
                <p className="text-stone-700 leading-relaxed mb-4">
                  PDF avec actions halal screenées et justifiées. Mise à jour trimestrielle envoyée par email pendant 1 an.
                </p>
                <p className="text-sm text-stone-500">Valeur seule : 29 €</p>
              </div>
            </div>
          </div>
        </section>

        {/* AUTEUR */}
        <section className="px-6 py-16 max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-6">Par</p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            L’équipe muslimfinance.net
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed">
            2 ans de tracking quotidien des actions halal AAOIFI. Aucune affiliation, aucun sponsor,
            aucun « partenariat stratégique » avec un broker. Juste un compte qui essaie de rendre
            l’investissement halal lisible pour ceux à qui personne n’a jamais expliqué.
          </p>
        </section>

        {/* PRICING / CTA principal */}
        <section
          id="reserver"
          className="bg-stone-900 text-stone-50 px-6 py-20 scroll-mt-16"
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-400 mb-6">
              Pré-inscription
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Mon email pour le recevoir.
              <br />
              <span className="text-amber-400">14 € à la sortie.</span>
            </h2>
            <div className="flex items-baseline justify-center gap-4 mb-3">
              <span className="text-stone-500 line-through text-2xl">29 €</span>
              <span className="text-6xl font-black text-amber-400">14 €</span>
            </div>
            <p className="text-stone-400 mb-10">
              tarif lancement, 100 premiers inscrits uniquement
            </p>

            <ul className="text-left space-y-3 mb-10 max-w-md mx-auto">
              {[
                "Le guide complet (PDF)",
                "Tracker portefeuille halal (Google Sheets)",
                "Watchlist actions halal AAOIFI (PDF)",
                "Mises à jour trimestrielles pendant 1 an",
                "Aperçu de 10 pages dès la semaine prochaine",
              ].map((it, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-400 select-none">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <SubscribeForm source="pricing" ctaLabel="Réserver mon exemplaire — 14 €" />
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20 max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Les questions qu’on nous pose
          </h2>
          <div className="space-y-6">
            {[
              ["C’est quoi exactement halal AAOIFI ?", "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) est l’organisme de référence international qui définit les critères de conformité d’une action à la loi islamique : ratios de dette, sources de revenus, secteurs interdits. C’est la norme la plus reconnue mondialement."],
              ["Je n’ai aucune connaissance financière. C’est pour moi ?", "Oui — le guide est écrit en partant de zéro. Aucune notion préalable requise. Si tu sais ce qu’est un compte bancaire, tu peux suivre."],
              ["Pourquoi acheter ça plutôt que regarder les vidéos YouTube halal gratuites ?", "Parce que YouTube halal francophone est dominé par des comptes affiliés à des courtiers, des MLM crypto, ou des « formations » à 1500 €. Notre guide n’a aucune affiliation et regroupe en un seul endroit ce qui prendrait 100 h de tri sur YouTube — avec des outils livrés."],
              ["Combien de temps faut-il pour appliquer ?", "Lecture : 3-4 h. Mise en place initiale du portefeuille : 2 h. Routine mensuelle : 30 minutes. Le guide est conçu pour des actifs occupés, pas pour des traders à plein temps."],
              ["Vous prenez une commission sur les courtiers cités ?", "Non. Aucune. Les comparatifs sont basés sur frais réels, conformité religieuse et qualité de service — sans aucun retour financier de notre part."],
              ["Je paye maintenant ?", "Non. Tu inscris ton email, tu réserves ton exemplaire au tarif lancement de 14 €. Le paiement se fait à la sortie, le 15 juin."],
            ].map(([q, a], i) => (
              <details
                key={i}
                className="group border-b border-stone-200 pb-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="cursor-pointer font-bold text-lg flex justify-between items-center list-none gap-4">
                  <span>{q}</span>
                  <span className="text-amber-700 text-2xl group-open:rotate-45 transition-transform select-none">+</span>
                </summary>
                <p className="mt-4 text-stone-700 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-amber-50 px-6 py-20 text-center">
          <h2
            className="text-3xl sm:text-5xl font-bold mb-6 max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Tes enfants comptent sur toi.
          </h2>
          <p className="text-lg text-stone-700 mb-10 max-w-xl mx-auto">
            Inscris ton email maintenant. <strong>14 €</strong> à la sortie le 15 juin. Aucun paiement aujourd’hui.
          </p>
          <SubscribeForm source="final" ctaLabel="Réserver mon exemplaire — 14 €" />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-stone-200 px-6 py-10 text-center text-sm text-stone-500">
          <p>muslimfinance.net — © 2026</p>
        </footer>

        {/* STICKY CTA mobile */}
        <a
          href="#reserver"
          className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-900 text-amber-50 text-center font-semibold py-4 shadow-2xl border-t border-amber-600"
        >
          Réserver mon exemplaire — 14 € →
        </a>
      </main>
    </>
  );
}
