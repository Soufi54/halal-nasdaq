import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodologie",
  description:
    "Comment sont construits nos indices halal. Sources, methode de screening AAOIFI, redistribution des poids, limites et avertissements.",
};

export default function Methodologie() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Methodologie
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            Transparence totale sur nos sources, notre methode et nos limites.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Sources des donnees</h2>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
              <h3 className="font-semibold mb-2">Poids des indices</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Les poids de chaque action sont recuperes par scraping
                automatique depuis <strong>SlickCharts</strong> (slickcharts.com),
                qui agrege les donnees des ETF de reference : QQQ (Invesco) pour
                le NASDAQ 100 et SPY (SPDR) pour le S&P 500. Les poids
                refletent la capitalisation boursiere et sont mis a jour
                hebdomadairement.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
              <h3 className="font-semibold mb-2">Screening halal</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Le statut de conformite charia de chaque action est recupere par
                scraping depuis <strong>Zoya.finance</strong>, qui utilise le
                standard <strong>AAOIFI</strong> (Accounting and Auditing
                Organization for Islamic Financial Institutions). C'est le
                standard le plus reconnu et le plus strict pour le screening
                d'actions.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Standard AAOIFI</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            Le standard AAOIFI evalue la conformite d'une action selon
            plusieurs criteres financiers :
          </p>
          <ul className="space-y-3 text-sm text-[var(--color-muted-foreground)]">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Activite principale :</strong> l'entreprise ne doit pas
                operer dans un secteur interdit (alcool, tabac, armes, jeux
                d'argent, pornographie, banque conventionnelle, assurance
                conventionnelle).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Ratio de dette :</strong> la dette portant interet ne
                doit pas depasser 30% de la capitalisation boursiere.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Revenus d'interets :</strong> les revenus provenant
                d'interets ne doivent pas depasser 5% du chiffre d'affaires
                total.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
              <span>
                <strong>Revenus illicites :</strong> les revenus provenant
                d'activites non conformes ne doivent pas depasser 5% du total.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Notre methode</h2>
          <div className="space-y-4 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            <p>
              <strong>Approche stricte :</strong> nous n'incluons que les actions
              classees "Halal" par Zoya.finance. Les actions classees
              "Questionable" (doubtful) sont exclues au meme titre que les
              actions non conformes. C'est l'approche la plus conservatrice.
            </p>
            <p>
              <strong>Redistribution pro-rata :</strong> une fois les actions non
              conformes retirees, les poids des actions restantes sont
              redistribues proportionnellement pour que le total fasse 100%. Un
              indice de 67 actions sur 100 aura donc des poids plus eleves pour
              chaque action.
            </p>
            <p>
              <strong>Validation LLM :</strong> en complement du scraping
              programmatique, nous utilisons un LLM (Claude) pour verifier un
              echantillon aleatoire de resultats a chaque mise a jour. Cela
              permet de detecter des regressions dans le scraping.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Limites et avertissements</h2>
          <div className="rounded-2xl border border-[var(--color-haram)]/10 bg-[var(--color-haram)]/5 p-6 space-y-3">
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>Donnees par scraping :</strong> les donnees sont
              recuperees automatiquement par scraping de sites tiers. Elles
              peuvent contenir des erreurs, des retards ou des inexactitudes.
              Nous ne pouvons pas garantir leur fiabilite a 100%.
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>Pas de conseil financier :</strong> ce site ne fournit
              aucun conseil en investissement. Il ne s'agit pas d'une
              recommandation d'achat ou de vente. Les performances passees ne
              prejugent pas des performances futures.
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>Pas d'avis religieux :</strong> les createurs de ce site
              ne sont pas des scholars islamiques. Le statut halal/haram est
              fourni a titre indicatif, base sur les donnees de Zoya.finance
              (standard AAOIFI). Nous ne nous engageons sur rien d'un point de
              vue ethique ou religieux.
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              <strong>DYOR :</strong> faites toujours vos propres recherches.
              Verifiez les donnees aupres de sources fiables. Consultez un
              conseiller financier qualifie et un scholar islamique de confiance
              avant toute decision d'investissement.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Code source</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            Le code source de ce site et des scrapers est entierement
            open-source. Vous pouvez verifier, auditer et contribuer :
          </p>
          <a
            href="https://github.com/Soufi54/halal-nasdaq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-xl border border-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/5"
          >
            github.com/Soufi54/halal-nasdaq →
          </a>
        </section>
      </main>
    </div>
  );
}
