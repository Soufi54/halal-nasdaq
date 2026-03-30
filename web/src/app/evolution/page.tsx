import type { Metadata } from "next";
import history from "@/history.json";
import { HistoryChart } from "@/components/history-chart";

export const metadata: Metadata = {
  title: "Evolution des indices halal — MuslimFinance",
  description:
    "Suivez l'evolution hebdomadaire du NASDAQ 100 Halal et du S&P 500 Halal : nombre d'actions conformes, poids halal, tendances.",
};

export default function EvolutionPage() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Mis a jour chaque semaine · Donnees depuis mars 2026
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            Evolution des{" "}
            <span className="text-[var(--color-gold)]">indices halal</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Combien d&apos;actions restent conformes ? Quel pourcentage de l&apos;indice
            est halal ? Suivez les tendances semaine apres semaine.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <HistoryChart data={history} locale="fr" />
      </section>

      {/* Explications */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Nombre d&apos;actions halal</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Combien d&apos;actions de l&apos;indice original passent le screening AAOIFI
              (via Zoya.finance). Les actions &quot;doubtful&quot; sont exclues.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--color-navy)] mb-2">Poids halal (%)</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Le poids cumule des actions halal dans l&apos;indice original (avant
              redistribution). Plus ce chiffre est eleve, plus l&apos;indice halal
              ressemble a l&apos;indice complet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
