import type { Metadata } from "next";
import data from "@/sp500-data.json";
import { PortfolioTable } from "@/components/portfolio-table";

export const metadata: Metadata = {
  title: "S&P 500 Halal — Composition et simulateur",
  description:
    "223 actions du S&P 500 passent le screening AAOIFI. Les 280 autres sont retirees. Simulateur de portefeuille integre. Donnees de Zoya.finance, pas un conseil financier.",
};

type ExcludedHolding = {
  ticker: string;
  company: string;
  weight: number;
  halal_status: string;
};

const holdings = data.holdings as Array<{
  halal_rank: number;
  ticker: string;
  company: string;
  halal_weight: number;
  original_weight: number;
  halal_status: string;
  interest_pct: number | null;
  rank: number;
  weight: number;
}>;
const excluded = data.excluded as ExcludedHolding[];
const stats = data.stats;

function StatusBadge({ status }: { status: string }) {
  if (status === "doubtful") {
    return (
      <span className="inline-flex items-center rounded-full bg-[var(--color-doubtful-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-doubtful)]">
        Doubtful
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-haram-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-haram)]">
      Non conforme
    </span>
  );
}

export default function SP500Halal() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-6">
            Mise a jour {data.date} · Donnees Zoya.finance · Standard AAOIFI
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[var(--color-navy)]">
            S&P 500{" "}
            <span className="text-[var(--color-gold)]">Halal</span>
          </h1>
          <div className="mt-6 max-w-2xl space-y-3 text-[0.95rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            <p>
              <strong className="text-[var(--foreground)]">Le S&P 500, c'est quoi ?</strong>{" "}
              L'indice le plus suivi au monde. Il regroupe les 500 plus grosses
              entreprises americaines, tous secteurs confondus : tech, sante,
              finance, energie, consommation. Depuis sa creation, il affiche
              environ <strong className="text-[var(--foreground)]">10% par an</strong> en
              moyenne. C'est la reference de l'investissement long terme.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Pourquoi tant d'exclusions ?</strong>{" "}
              Le S&P 500 contient beaucoup de banques, d'assureurs et de
              utilities — des secteurs qui, par nature, dependent du systeme de
              dette classique. Resultat : sur {stats.total_sp500} actions,{" "}
              <strong className="text-[var(--color-halal)]">{stats.included} sont conformes</strong>.
              Les {stats.excluded} autres sortent. Ce qui reste : de la tech
              (Nvidia, Apple), de la sante (Eli Lilly, J&J), de l'energie
              (Exxon), des paiements (Visa, Mastercard).
            </p>
            <p>
              Entrez un montant pour voir votre repartition. Export CSV
              disponible.
            </p>
          </div>
          <p className="mt-3 text-sm text-[var(--color-muted-foreground)]/60">
            Les performances passees ne presagent pas des performances futures.
            Les statuts halal peuvent changer chaque trimestre. Verifiez par
            vous-meme.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Actions halal
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-halal)]">
              {stats.included}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              sur {stats.total_sp500} du S&P 500
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Actions exclues
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-haram)]">
              {stats.excluded}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              {stats.excluded_weight_pct}% du poids original
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Dont doubtful
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-doubtful)]">
              {stats.doubtful_count}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              exclues (approche stricte)
            </p>
          </div>
        </div>

        {/* Composition + simulateur */}
        <PortfolioTable holdings={holdings} includedCount={stats.included} />

        {/* Exclues */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Actions exclues</h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              {stats.excluded} actions non conformes ou douteuses —{" "}
              {stats.excluded_weight_pct}% du S&P 500 original
            </p>
          </div>
          <div className="glass-card rounded-2xl !p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-left font-medium text-[var(--color-muted-foreground)]">
                    Ticker
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-[var(--color-muted-foreground)]">
                    Entreprise
                  </th>
                  <th className="px-6 py-4 text-right font-medium text-[var(--color-muted-foreground)]">
                    Poids original
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-[var(--color-muted-foreground)]">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {excluded.map((h, i) => (
                  <tr
                    key={h.ticker}
                    className={`border-b border-[var(--border)] last:border-0 transition-colors hover:bg-slate-50 ${
                      i % 2 === 0 ? "" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="px-6 py-3.5 font-bold">{h.ticker}</td>
                    <td className="px-6 py-3.5 text-[var(--color-muted-foreground)]">
                      {h.company}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono">
                      {h.weight.toFixed(2)}%
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={h.halal_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[var(--color-haram)]/10 bg-[var(--color-haram)]/5 p-6">
          <h3 className="font-semibold text-[var(--color-haram)] mb-2">
            Avertissement
          </h3>
          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
            Ces donnees sont generees automatiquement par scraping de sources
            publiques et ne constituent en aucun cas un conseil en investissement
            ni un avis religieux. Les statuts halal/haram proviennent de
            Zoya.finance et peuvent contenir des erreurs.{" "}
            <strong>Faites vos propres recherches</strong> et verifications
            aupres de sources fiables avant toute decision d'investissement.
          </p>
        </div>
      </main>
    </div>
  );
}
