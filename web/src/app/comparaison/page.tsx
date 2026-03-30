import type { Metadata } from "next";
import nasdaqData from "@/data.json";
import sp500Data from "@/sp500-data.json";
import { IndexComparison } from "@/components/index-comparison";

export const metadata: Metadata = {
  title: "Comparaison indices halal vs complets — MuslimFinance",
  description:
    "Comparez la composition du NASDAQ 100 Halal et du S&P 500 Halal avec les indices complets : concentration, top holdings, poids redistribues.",
};

export default function ComparaisonPage() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Donnees au {nasdaqData.date} · NASDAQ 100 + S&P 500
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            Halal vs{" "}
            <span className="text-[var(--color-gold)]">indice complet</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Quand on retire les actions non conformes, l&apos;indice se concentre
            davantage sur les leaders tech. Voici l&apos;impact concret sur la
            composition.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <IndexComparison
          nasdaqHoldings={nasdaqData.holdings}
          nasdaqStats={nasdaqData.stats as never}
          sp500Holdings={sp500Data.holdings}
          sp500Stats={sp500Data.stats as never}
          locale="fr"
        />
      </section>

      {/* Takeaways */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-xl font-bold text-[var(--color-navy)] mb-6">Ce qu&apos;il faut retenir</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Plus concentre</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              L&apos;indice halal est plus concentre que l&apos;indice complet. Les
              poids des top holdings sont amplifies car le poids des actions
              exclues est redistribue proportionnellement.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Biais tech</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Les actions exclues sont souvent dans la finance, l&apos;assurance et
              le divertissement. L&apos;indice halal est donc naturellement plus
              expose a la tech et la sante.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Tracking error</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Avec ~57% du poids original conserve pour le NASDAQ et ~52% pour
              le S&P, la performance de l&apos;indice halal peut s&apos;ecarter
              significativement de l&apos;indice complet.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Diversification</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Le S&P 500 Halal (225 actions) offre plus de diversification que
              le NASDAQ 100 Halal (67 actions). Combiner les deux peut
              reduire le risque de concentration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
