import type { Metadata } from "next";
import backtestData from "@/backtest.json";
import { BacktestChart } from "@/components/backtest-chart";

export const metadata: Metadata = {
  title: "Backtest — Performance historique halal vs indice complet — MuslimFinance",
  description:
    "Comparez la performance historique du NASDAQ 100 Halal et du S&P 500 Halal avec les indices complets sur 1, 3 et 5 ans. Donnees reelles, composition actuelle.",
};

export default function BacktestPage() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Donnees au {backtestData.date} · Prix historiques reels
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            Performance{" "}
            <span className="text-[var(--color-gold)]">historique</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Et si vous aviez investi dans l&apos;indice halal au lieu de l&apos;indice
            complet ? Ce backtest applique la composition halal actuelle sur les
            prix historiques reels pour comparer les performances.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <BacktestChart data={backtestData as never} locale="fr" />
      </section>

      {/* Methodology + caveats */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-xl font-bold text-[var(--color-navy)] mb-6">
          Comment lire ces resultats
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Methode</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              On prend la composition halal actuelle (tickers + poids) et on
              l&apos;applique retroactivement sur les prix historiques reels
              (Yahoo Finance). Les poids sont redistribues pro-rata, comme pour
              l&apos;indice actuel. Base 100 au debut de chaque periode.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Surperformance tech</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              L&apos;indice halal surperforme principalement parce qu&apos;il
              exclut la finance et surpondere la tech — qui a ete le secteur
              le plus performant ces dernieres annees. Ce biais sectoriel
              peut s&apos;inverser.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Limites</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Ce n&apos;est pas un &quot;vrai&quot; backtest : la composition
              halal change chaque trimestre (les screeners reclassifient des
              actions). Ici on utilise la composition d&apos;aujourd&apos;hui,
              ce qui introduit un biais de survie.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Ce que ca veut dire</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Investir halal ne signifie pas sacrifier la performance. Au
              contraire, la discipline du screening peut etre un avantage.
              Mais les performances passees ne garantissent pas les
              performances futures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
