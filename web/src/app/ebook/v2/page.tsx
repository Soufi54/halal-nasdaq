import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { SubscribeForm } from "../SubscribeForm";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const PIXEL_ID = "1986901548880799";

export const metadata: Metadata = {
  title: "Halal & patrimoine v2 — Réserve ta place. Ebook 29 EUR à la sortie (au lieu de 63 EUR)",
  description:
    "Cas concret d'un portefeuille Trade Republic — titres filtrés AAOIFI + protocole de conformité 4 règles. +18 728 EUR de plus-value latente en 2 ans. Inscris-toi pour l'ebook à 29 EUR à la sortie (au lieu de 63 EUR prix public).",
  alternates: { canonical: "https://muslimfinance.net/ebook/v2" },
  openGraph: {
    title: "+18 728 EUR de plus-value latente — portefeuille halal AAOIFI (protocole complet)",
    description:
      "Le guide complet : screening AAOIFI, actions halal, financer hadj/mariage/maison sans crédit riba. Réserve ta place — 29 EUR à la sortie (au lieu de 63 EUR).",
    url: "https://muslimfinance.net/ebook/v2",
    siteName: "MuslimFinance",
    type: "website",
    images: [
      {
        url: "https://muslimfinance.net/img/sma/visuel_2_perf.png",
        width: 1080,
        height: 1350,
        alt: "Portefeuille halal +18 728 EUR PV latente",
      },
    ],
  },
  robots: { index: false, follow: false },
};

const PRICE_LAUNCH = 29;
const PRICE_REGULAR = 63;
const LAUNCH_STR = "22 juillet 2026";

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
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>

      <main
        className={`${playfair.variable} min-h-screen bg-stone-50 text-stone-900 antialiased pb-32 sm:pb-0`}
      >
        {/* ═════════════════════════════════════════════════════════
            HERO — social proof screenshot + achat direct
        ═════════════════════════════════════════════════════════ */}
        <section className="relative bg-stone-900 text-stone-50 px-5 py-14 sm:py-20">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-4">
                muslimfinance.net · Edition 2026
              </p>

              <h1
                className="text-[2.2rem] sm:text-5xl font-black leading-[1.05] tracking-tight mb-5"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                +18 728 EUR
                <br />
                <span className="text-amber-400">
                  de plus-value latente en 2 ans.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-6 max-w-xl">
                Portefeuille personnel Trade Republic. Titres filtrés AAOIFI +
                protocole 4 règles (intérêts cash désactivés, zéro margin, zéro
                securities lending, screener AAOIFI). Voici la méthode
                complète — 47 pages. Sortie le {LAUNCH_STR}.
              </p>

              <div className="bg-white text-stone-900 rounded-xl p-5 border-2 border-amber-400 shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block bg-amber-500 text-stone-900 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                    Sortie le {LAUNCH_STR}
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-4xl font-black">{PRICE_LAUNCH} EUR</span>
                  <span className="text-stone-400 line-through text-lg">
                    {PRICE_REGULAR} EUR
                  </span>
                  <span className="ml-auto text-xs bg-amber-100 text-amber-900 px-2 py-1 rounded font-bold">
                    -54 %
                  </span>
                </div>
                <p className="text-xs text-stone-600 mb-4">
                  Inscris-toi pour être prévenu à la sortie et recevoir le tarif
                  préférentiel de <strong>29 EUR</strong> (au lieu de 63 EUR
                  après). Aucun paiement maintenant.
                </p>
                <SubscribeForm
                  source="v2_hero"
                  ctaLabel="Je réserve ma place"
                  successMsg="Tu es sur la liste. Tu recevras l'ebook et le lien de commande à 29 EUR à la sortie."
                  hint="Aucun paiement maintenant. Un email de confirmation arrive dans les 2 minutes."
                />
              </div>
            </div>

            {/* Screenshot portefeuille preuve */}
            <div className="relative aspect-[3/4] max-w-xs mx-auto">
              <Image
                src="/img/portfolio-proof/portfolio-proof-graph.png"
                alt="Portefeuille Trade Republic +18 728 EUR PV latente — titres AAOIFI + protocole conformité"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl ring-2 ring-amber-400/40"
                priority
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                Compte perso — vérifiable
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════
            ANGLE NVIDIA — social proof top holdings
        ═════════════════════════════════════════════════════════ */}
        <section className="px-5 py-16 max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-3">
            Ma preuve
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Nvidia va remplacer beaucoup d&apos;emplois qualifiés.{" "}
            <span className="text-amber-800">
              Autant en devenir actionnaire.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 max-w-2xl">
            Les entreprises qui construisent les puces d&apos;IA sont dans le
            NASDAQ halal AAOIFI. Toutes accessibles depuis Trade Republic ou
            DEGIRO. Voici ce qu&apos;elles ont donné sur mon compte.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-md">
              <table className="w-full text-sm">
                <thead className="bg-stone-900 text-amber-100 text-left">
                  <tr>
                    <th className="px-4 py-3 font-bold">Position</th>
                    <th className="px-4 py-3 font-bold text-right">
                      Plus-value
                    </th>
                  </tr>
                </thead>
                <tbody className="text-stone-800">
                  {[
                    ["NVIDIA", "+2 492 EUR"],
                    ["ARM (ADR)", "+2 821 EUR"],
                    ["ASML", "+1 764 EUR"],
                    ["AMD", "+1 985 EUR"],
                    ["TSMC (ADR)", "+1 421 EUR"],
                    ["Micron Technology", "+1 792 EUR"],
                    ["Broadcom", "+1 095 EUR"],
                    ["Advantest", "+1 425 EUR"],
                  ].map(([name, gain]) => (
                    <tr key={name} className="border-t border-stone-100">
                      <td className="px-4 py-3 font-medium">{name}</td>
                      <td className="px-4 py-3 text-right font-bold text-amber-800">
                        {gain}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-stone-900 text-amber-300 font-black">
                    <td className="px-4 py-3">Total tech halal</td>
                    <td className="px-4 py-3 text-right">+15 795 EUR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="relative aspect-[3/4] max-w-xs mx-auto sm:mx-0">
              <Image
                src="/img/portfolio-proof/portfolio-proof-top.png"
                alt="Screenshot Trade Republic top holdings halal"
                width={400}
                height={500}
                className="rounded-2xl shadow-xl ring-1 ring-stone-200"
              />
            </div>
          </div>

          <p className="mt-6 text-xs text-stone-500 max-w-2xl">
            Performances passées non garanties. Ces positions ont bénéficié
            d&apos;un cycle haussier semi-conducteurs exceptionnel 2023-2026.
            Ne place pas ce dont tu as besoin dans les 3 prochaines années.
          </p>
        </section>

        {/* ═════════════════════════════════════════════════════════
            PERSPECTIVE ROI — 29€ face aux gains
        ═════════════════════════════════════════════════════════ */}
        <section className="bg-stone-900 text-stone-50 px-5 py-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-4">
              Mise en perspective
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {PRICE_LAUNCH} EUR pour un guide,{" "}
              <span className="text-amber-400">
                face à +18 728 EUR déjà générés sur mon compte.
              </span>
            </h2>

            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              <div className="bg-stone-800/60 border border-amber-400/30 p-5 rounded-lg">
                <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">
                  Ratio
                </p>
                <p className="text-3xl font-black text-stone-50 mb-1">
                  0,15 %
                </p>
                <p className="text-sm text-stone-300 leading-snug">
                  du gain personnel que tu peux répliquer si tu appliques la
                  même méthode.
                </p>
              </div>
              <div className="bg-stone-800/60 border border-amber-400/30 p-5 rounded-lg">
                <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">
                  Break-even
                </p>
                <p className="text-3xl font-black text-stone-50 mb-1">
                  1 jour
                </p>
                <p className="text-sm text-stone-300 leading-snug">
                  de gains moyens sur mon portefeuille suffit à rembourser
                  l&apos;ebook (25 EUR/jour moyennés).
                </p>
              </div>
              <div className="bg-stone-800/60 border border-amber-400/30 p-5 rounded-lg">
                <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">
                  Ne pas acheter
                </p>
                <p className="text-3xl font-black text-stone-50 mb-1">
                  = 645×
                </p>
                <p className="text-sm text-stone-300 leading-snug">
                  moins cher qu&apos;économiser 29 EUR pour laisser 18 728 EUR
                  sur la table.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-amber-400 pl-5 py-2">
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
                <strong className="text-amber-300">Fais le calcul honnêtement.</strong>{" "}
                Si l&apos;ebook te fait construire un portefeuille qui te
                rapporte 500 EUR sur 12 mois, il t&apos;a rapporté 17×. S&apos;il
                te fait éviter une seule arnaque Validus/MLM (moyenne : 5 000
                EUR par cas), il t&apos;a rapporté 172×. Si tu suis la même
                méthode que le portefeuille perso ci-dessus, on parle de
                +18 728 EUR. Ratio réel : 645×.
              </p>
            </div>

            <div className="mt-8 max-w-md">
              <SubscribeForm
                source="v2_roi"
                ctaLabel="Je réserve ma place — 29 EUR à la sortie"
                successMsg="Tu es sur la liste. On te prévient à la sortie."
                hint={`Aucun paiement maintenant. Sortie le ${LAUNCH_STR}. Tarif préférentiel 29 EUR (au lieu de 63 EUR).`}
              />
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════
            ANGLE HADJ / MARIAGE
        ═════════════════════════════════════════════════════════ */}
        <section className="bg-stone-100 px-5 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-3">
              3 objectifs concrets
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black leading-tight mb-6 max-w-2xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Financer ton hadj, ton mariage,{" "}
              <span className="text-amber-800">
                ta maison — sans crédit riba.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 max-w-2xl">
              Un portefeuille halal, c&apos;est aussi un outil pour financer
              des objectifs personnels. Le guide donne le plan précis pour
              chaque cas — mensualités, durée, allocation ETF.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Hadj",
                  cost: "8-16K EUR",
                  duration: "3-5 ans",
                  mens: "115-400 EUR/mois",
                },
                {
                  title: "Mariage",
                  cost: "12-25K EUR",
                  duration: "3-5 ans",
                  mens: "170-620 EUR/mois",
                },
                {
                  title: "Apport 30 %",
                  cost: "45-120K EUR",
                  duration: "5-7 ans",
                  mens: "600-1600 EUR/mois",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="bg-white p-5 rounded-lg border border-amber-200 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2">
                    {p.title}
                  </p>
                  <p className="text-2xl font-black text-stone-900 mb-1">
                    {p.cost}
                  </p>
                  <p className="text-sm text-stone-600 mb-1">
                    Sur {p.duration}
                  </p>
                  <p className="text-sm text-amber-900 font-bold">{p.mens}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-stone-500 max-w-2xl">
              Calculs base rendement 10 %/an conservateur, ETF halal AAOIFI
              (SPWI + DEEN). Performances passées non garanties.
            </p>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════
            CE QUE TU OBTIENS
        ═════════════════════════════════════════════════════════ */}
        <section className="px-5 py-16 max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-amber-800 mb-3">
            Contenu du guide
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            11 chapitres · 47 pages · actionnable.
          </h2>

          <div className="space-y-3">
            {[
              [
                "1",
                "Pourquoi 90 % des musulmans n'ont aucun patrimoine",
                "Diagnostic et 3 blocages structurels",
              ],
              [
                "2",
                "Le screening AAOIFI expliqué simplement",
                "4 critères, 4 exclusions, autres normes islamiques",
              ],
              [
                "3",
                "Les 30 actions halal — watchlist 2026",
                "Top NASDAQ + S&P 500 avec justifications",
              ],
              [
                "4",
                "Nvidia va remplacer ton travail — deviens actionnaire",
                "Cas concret positions perso IA (NVDA, ARM, ASML...)",
              ],
              [
                "5",
                "L'or physique — combien, où, comment",
                "4 conditions islamiques, zakat or, fiscalité FR",
              ],
              [
                "6",
                "L'immobilier nu + SCPI halal",
                "Cash, mourabaha, SCI, SCPI sharia compliant",
              ],
              [
                "7",
                "Détecter une arnaque en 30 secondes",
                "Validus, OneCoin, MLM crypto — 5 cas réels",
              ],
              [
                "8",
                "Courtiers utilisables — le protocole de conformité en 4 règles",
                "Trade Republic, IBKR, DEGIRO, BoursoBank — intérêts cash, securities lending, margin, screener",
              ],
              [
                "9",
                "Le rebalancing trimestriel en 30 minutes",
                "Routine simple + calcul zakat portefeuille",
              ],
              [
                "10",
                "Financer hadj, mariage, maison sans crédit riba",
                "Plans 3, 5 et 7 ans avec tableaux d'épargne",
              ],
              [
                "11",
                "Transmettre — héritage, donation, zakat",
                "Calculs concrets, cas famille FR",
              ],
            ].map(([n, t, s]) => (
              <div
                key={n}
                className="flex gap-4 bg-white p-4 rounded-lg border border-stone-200"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-black flex items-center justify-center">
                  {n}
                </div>
                <div>
                  <p className="font-bold text-stone-900">{t}</p>
                  <p className="text-sm text-stone-600 mt-1">{s}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA milieu */}
          <div className="mt-10 bg-stone-900 text-stone-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-amber-500 text-stone-900 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                Sortie le {LAUNCH_STR}
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-1">
              <p className="text-3xl font-black">{PRICE_LAUNCH} EUR</p>
              <p className="text-stone-400 line-through text-lg">{PRICE_REGULAR} EUR</p>
            </div>
            <p className="text-sm text-stone-300 mb-4">
              Inscris-toi maintenant, tu recevras le PDF et le lien de commande
              à 29 EUR à la sortie (au lieu de 63 EUR pour le public).
            </p>
            <SubscribeForm
              source="v2_mid"
              ctaLabel="Je réserve ma place"
              successMsg="Tu es sur la liste. Confirmation email dans 2 min."
              hint="Aucun paiement maintenant."
            />
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════
            OBJECTIONS
        ═════════════════════════════════════════════════════════ */}
        <section className="bg-stone-100 px-5 py-14">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              En 4 questions.
            </h2>
            <div className="space-y-5">
              {[
                [
                  "Je paye maintenant ?",
                  `Non. Tu inscris juste ton email. À la sortie officielle (${LAUNCH_STR}), tu reçois le PDF + un lien de commande à 29 EUR (au lieu de 63 EUR pour les non-inscrits). Aucun engagement.`,
                ],
                [
                  `Pourquoi 29 EUR pour les inscrits et pas plus tard ?`,
                  `L'inscription à cette liste garantit le tarif préférentiel 29 EUR. Après la sortie, prix public 63 EUR. Ceux qui s'inscrivent maintenant paient 54 % moins cher.`,
                ],
                [
                  "Je n'y connais rien en finance.",
                  "Le guide part de zéro. Si tu sais ce qu'est un compte bancaire, tu peux suivre. Chaque chapitre a des tableaux concrets et une conclusion actionnable.",
                ],
                [
                  "C'est un conseil en investissement personnalisé ?",
                  "Non. C'est un guide d'éducation financière. Il ne remplace pas un CGP ORIAS. Tu restes seul responsable de tes décisions.",
                ],
                [
                  "Il y a des affiliations cachées ?",
                  `Non. Aucune affiliation broker ou fintech. Le guide est vendu 29 EUR (inscrits) puis 63 EUR (public), c'est le seul revenu.`,
                ],
              ].map(([q, a], i) => (
                <div key={i}>
                  <p className="font-bold text-stone-900 text-base">— {q}</p>
                  <p className="text-sm text-stone-700 leading-relaxed mt-1">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════
            FINAL CTA
        ═════════════════════════════════════════════════════════ */}
        <section className="bg-stone-900 text-stone-50 px-5 py-16 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Ta banque gagne de l&apos;argent sur ton ignorance.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mb-6 max-w-md mx-auto">
            Le guide qui change les règles. Sortie le {LAUNCH_STR}.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-4xl font-black text-amber-400">
                {PRICE_LAUNCH} EUR
              </span>
              <span className="text-stone-500 line-through text-lg">
                {PRICE_REGULAR} EUR
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-5">
              Tarif liste d&apos;inscription · Prix public {PRICE_REGULAR} EUR à
              la sortie
            </p>
            <SubscribeForm
              source="v2_final"
              ctaLabel="Je réserve ma place"
              successMsg="Tu es sur la liste. On se retrouve à la sortie."
              hint="Aucun paiement maintenant. Un email de confirmation arrive dans les 2 min."
            />
          </div>
        </section>

        <footer className="border-t border-stone-200 px-6 py-8 text-center text-xs text-stone-500 bg-stone-50">
          <p className="mb-2">muslimfinance.net — © 2026 · Édition 2026 · Usage personnel uniquement</p>
          <p>
            Ce guide est un outil d&apos;éducation financière. Il ne constitue
            pas un conseil en investissement personnalisé au sens de la
            directive MIF II.
          </p>
        </footer>
      </main>
    </>
  );
}
