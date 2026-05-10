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
  title: "Halal et patrimoine — Le guide pour ceux qui ont refuse le riba sans alternative",
  description:
    "Pour le musulman 25-45 qui veut construire un patrimoine pour ses enfants — sans credit, sans copy trading, sans MLM type Validus. Pre-inscription au tarif lancement 14€.",
  alternates: { canonical: "https://muslimfinance.net/ebook" },
  openGraph: {
    title: "Halal et patrimoine — Le guide qu'on aurait du t'ecrire a 25 ans",
    description: "Tu as refuse le riba. Tu n'as pas refuse d'avoir un patrimoine.",
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

      <main className={`${playfair.variable} min-h-screen bg-stone-50 text-stone-900 antialiased`}>
        {/* HERO */}
        <section className="relative px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-8">
            muslimfinance.net
          </p>
          <h1
            className="text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight mb-7"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Tu as refuse le riba.
            <br />
            <span className="text-amber-900">Tu n&apos;as pas refuse d&apos;avoir un patrimoine.</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed mb-10 max-w-2xl">
            Le guide d&apos;investissement halal pour le musulman 25-45 qui veut construire pour ses
            enfants — sans credit, sans copy trading, sans MLM type Validus, sans investissement bourbier au bled.
          </p>

          <div className="flex flex-wrap items-baseline gap-3 mb-12">
            <span className="text-stone-400 line-through text-xl">29€</span>
            <span className="text-3xl font-bold">14€</span>
            <span className="text-sm text-stone-600">tarif lancement, 100 premiers inscrits</span>
          </div>

          <SubscribeForm source="hero" />

          <p className="mt-8 text-sm text-stone-500">
            Sortie : 15 juin 2026 • PDF 80 pages + 2 bonus inclus
          </p>
        </section>

        {/* PAIN — c'est toi si */}
        <section className="bg-stone-900 text-stone-100 px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-10"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              C&apos;est toi, si...
            </h2>
            <ul className="space-y-5 text-lg leading-relaxed">
              {[
                "Tu refuses tout produit financier a interet — meme quand ton conseiller bancaire te regarde de travers.",
                "Tu as deja ignore 10 propositions « halal » louches : formations a 1500€, signaux Telegram, copy trading, mentor trading sur Insta.",
                "A 32 ans, ton compte epargne est encore a zero. Ce n'est pas par paresse. C'est par manque de carte.",
                "Ton cousin t'appelle tous les 6 mois pour un « plan beton » au bled : terrain, agence de location, restaurant.",
                "Tu sens que le temps file — tes enfants comptent sur toi et tu n'as toujours pas commence.",
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
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Ce qu&apos;il y a dedans
          </h2>
          <p className="text-stone-600 mb-12">80 pages, 10 chapitres, 2 outils prets a l&apos;emploi.</p>

          <ol className="space-y-6">
            {[
              "Pourquoi 90% des musulmans n'ont aucun patrimoine — et pourquoi ce n'est pas leur faute",
              "Le screening AAOIFI explique simplement — la seule norme qui compte vraiment",
              "Les 30 actions halal de la watchlist 2026 — secteurs, ratios, justifications",
              "Profiter du boom de l'IA sans compromis — ou placer, quoi eviter",
              "L'or physique : combien, ou, comment — et pourquoi pas l'or papier",
              "L'immobilier nu sans credit — les 3 montages possibles",
              "Detecter une arnaque type Validus en 30 secondes — la checklist en 8 questions",
              "Les courtiers et plateformes 100% compatibles — comparatif sans affiliation",
              "Le rebalancing trimestriel en 30 minutes — la routine qui suffit",
              "Transmettre — heritage, donation, zakat — calculs et cas pratiques",
            ].map((title, i) => (
              <li
                key={i}
                className="flex gap-5 pb-6 border-b border-stone-200 last:border-0"
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
        </section>

        {/* PROMESSE CONCRETE */}
        <section className="bg-amber-50 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-12"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Apres lecture, tu sauras :
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                ["Batir un portefeuille halal diversifie", "Actions AAOIFI + or + immobilier + cash productif. En 30 minutes."],
                ["Viser ~10% par an", "En restant strictement halal. Sans speculer. Sans copier personne."],
                ["Profiter du boom de l'IA", "Sans crypto, sans token sketch, sans formation MLM."],
                ["Detecter Validus & co. en 30 secondes", "La checklist 8 questions qui demasque toutes les pyramides."],
                ["Transmettre proprement", "Heritage halal, donation, calcul zakat sur portefeuille."],
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

        {/* DIFFERENCIATEURS */}
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-12"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Pourquoi ce guide, et pas une autre video YouTube halal ?
          </h2>
          <div className="space-y-8">
            {[
              ["Ecrit pour le pratiquant, pas adapte d'un guide generique", "La majorite des contenus « halal » sont des copies de Robert Kiyosaki avec un vernis. Ici, le cadre religieux est le point de depart, pas l'habillage."],
              ["Source AAOIFI uniquement", "Pas de « comite halal maison ». La norme internationale qui fait foi, expliquee simplement."],
              ["Concret, actionnable, avec outils", "Tu repars avec un tracker Google Sheets et une watchlist de 30 actions. Pas un PDF de motivation."],
              ["Aucune affiliation, aucun sponsor", "On ne touche aucune commission sur les courtiers, plateformes ou produits cites."],
            ].map(([t, d], i) => (
              <div key={i} className="border-l-4 border-amber-700 pl-6">
                <h3 className="text-xl font-bold mb-2">{t}</h3>
                <p className="text-stone-700 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BONUS */}
        <section className="bg-stone-100 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Inclus en pre-inscription
            </h2>
            <p className="text-stone-600 mb-12">2 outils livres en meme temps que l&apos;ebook le 15 juin.</p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg border border-stone-200 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2">Bonus 1</p>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Tracker portefeuille halal
                </h3>
                <p className="text-stone-700 leading-relaxed mb-4">
                  Google Sheets pret a l&apos;emploi. Positions, dividendes, calcul zakat automatique sur l&apos;ensemble du portefeuille.
                </p>
                <p className="text-sm text-stone-500">Valeur seule : 19€</p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-stone-200 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2">Bonus 2</p>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Watchlist 30 actions AAOIFI
                </h3>
                <p className="text-stone-700 leading-relaxed mb-4">
                  PDF avec 30 actions halal screenees et justifiees. Mise a jour trimestrielle envoyee par email pendant 1 an.
                </p>
                <p className="text-sm text-stone-500">Valeur seule : 29€</p>
              </div>
            </div>
          </div>
        </section>

        {/* AUTEUR */}
        <section className="px-6 py-20 max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-800 mb-6">Par</p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            L&apos;equipe muslimfinance.net
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed">
            2 ans de tracking quotidien des actions halal AAOIFI. Aucune affiliation, aucun sponsor,
            aucun « partenariat strategique » avec un broker. Juste un compte qui essaie de rendre
            l&apos;investissement halal lisible pour ceux a qui personne n&apos;a jamais explique.
          </p>
        </section>

        {/* PRICING / CTA */}
        <section className="bg-stone-900 text-stone-50 px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl sm:text-5xl font-bold mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Inscris ton email maintenant.
              <br />
              <span className="text-amber-400">Paye a la sortie.</span>
            </h2>
            <div className="flex items-baseline justify-center gap-4 mb-3">
              <span className="text-stone-500 line-through text-2xl">29€</span>
              <span className="text-5xl font-bold text-amber-400">14€</span>
            </div>
            <p className="text-stone-400 mb-10">tarif lancement, 100 premiers inscrits uniquement</p>

            <ul className="text-left space-y-3 mb-10 max-w-md mx-auto">
              {[
                "Ebook PDF 80 pages",
                "Tracker portefeuille halal (Google Sheets)",
                "Watchlist 30 actions AAOIFI (PDF)",
                "Mises a jour trimestrielles pendant 1 an",
                "Apercu de 10 pages des la semaine prochaine",
              ].map((it, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-400 select-none">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <SubscribeForm source="pricing" ctaLabel="Reserver mon exemplaire" />
          </div>
        </section>

        {/* GARANTIE */}
        <section className="px-6 py-16 max-w-3xl mx-auto text-center border-b border-stone-200">
          <p
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Si on rate la livraison du 15 juin de plus de 30 jours, remboursement integral.
          </p>
          <p className="text-stone-600">Aucune question posee. C&apos;est notre engagement.</p>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20 max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Les questions qu&apos;on nous pose
          </h2>
          <div className="space-y-6">
            {[
              ["C'est quoi exactement halal AAOIFI ?", "AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) est l'organisme de reference international qui definit les criteres de conformite d'une action a la loi islamique : ratios de dette, sources de revenus, secteurs interdits. C'est la norme la plus reconnue mondialement, suivie par la majorite des indices halal serieux."],
              ["Je n'ai aucune connaissance financiere. C'est pour moi ?", "Oui — le guide est ecrit en partant de zero. Aucune notion prealable requise. Si tu sais ce qu'est un compte bancaire, tu peux suivre. Les chapitres techniques (screening, rebalancing) sont expliques avec des exemples concrets."],
              ["Pourquoi acheter ca plutot que regarder les videos YouTube halal gratuites ?", "Parce que YouTube halal francophone est domine par des comptes affilies a des courtiers, des MLM crypto, ou des « formations » a 1500€. Notre guide n'a aucune affiliation, aucun sponsor, et regroupe en 80 pages structurees ce qui prendrait 100h de tri sur YouTube — avec des outils livres."],
              ["Combien de temps faut-il pour appliquer ?", "Lecture : 3-4h. Mise en place initiale du portefeuille : 2h. Routine mensuelle : 30 minutes. Le guide est concu pour des actifs occupes (cadres, parents, etudiants), pas pour des traders a plein temps."],
              ["Vous prenez une commission sur les courtiers cites ?", "Non. Aucune. Les comparatifs de courtiers sont bases sur frais reels, conformite religieuse, et qualite de service — sans aucun retour financier de notre part."],
              ["Je peux le revendre ou le partager avec un ami ?", "L'ebook est sous licence personnelle. Le partager avec ta femme, tes parents, tes enfants : oui. Le revendre ou le diffuser publiquement : non — c'est ce qui permet de garder le tarif accessible."],
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
            Inscris ton email maintenant. Tarif lancement <strong>14€</strong> a la sortie le 15 juin. Aucun paiement aujourd&apos;hui.
          </p>
          <SubscribeForm source="final" ctaLabel="Je reserve mon exemplaire" />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-stone-200 px-6 py-10 text-center text-sm text-stone-500">
          <p>muslimfinance.net — © 2026</p>
        </footer>
      </main>
    </>
  );
}
