import data from "@/data.json";
import { PortfolioTable } from "@/components/portfolio-table";
import { Badge } from "@/components/ui/badge";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8d234]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full bg-[var(--color-gold)]" />
            <span className="text-sm font-medium tracking-widest uppercase text-[var(--color-gold)]">
              Standard AAOIFI
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight leading-tight md:text-6xl">
            NASDAQ 100
            <br />
            <span className="text-[var(--color-gold)]">Halal</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            L'indice NASDAQ 100 reconstitue en excluant les actions non
            conformes a la charia. Approche stricte — uniquement les actions
            certifiees halal.
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted-foreground)]/60">
            Derniere mise a jour : {data.date}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Actions halal
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-halal)]">
              {stats.included}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              sur {stats.total_nasdaq100} du NASDAQ 100
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
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
          <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Dont doubtful exclues
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-doubtful)]">
              {stats.doubtful_count}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]/50">
              approche stricte
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
              {stats.excluded_weight_pct}% du NASDAQ 100 original
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[var(--card)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
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
                    className={`border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.02] ${
                      i % 2 === 0 ? "" : "bg-white/[0.01]"
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

        {/* Methodologie */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Methodologie</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                <h3 className="font-semibold">Source des poids</h3>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                ETF QQQ (Invesco) via SlickCharts. Les poids refletent la
                capitalisation boursiere de chaque action dans l'indice. Mis a
                jour hebdomadairement.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-[var(--color-halal)]" />
                <h3 className="font-semibold">Screening halal</h3>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Zoya.finance, standard AAOIFI (Accounting and Auditing
                Organization for Islamic Financial Institutions). Screening
                trimestriel apres les publications de resultats.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-[var(--color-haram)]" />
                <h3 className="font-semibold">Methode stricte</h3>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Seules les actions certifiees "Halal" sont incluses. Les actions
                "Doubtful" et "Non conformes" sont exclues. Les poids sont
                redistribues pro-rata (total = 100%).
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-[var(--color-muted-foreground)]" />
                <h3 className="font-semibold">Disclaimer</h3>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Cet outil est fourni a titre informatif. Il ne constitue pas un
                conseil en investissement. Consultez un conseiller financier et
                un scholar islamique avant d'investir.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-2">
          <p className="text-sm text-[var(--color-muted-foreground)]/50">
            NASDAQ 100 Halal — Standard AAOIFI (strict)
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)]/30">
            Donnees mises a jour le {data.date}
          </p>
        </div>
      </footer>
    </div>
  );
}
