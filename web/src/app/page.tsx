import Link from "next/link";
import nasdaqData from "@/data.json";
import sp500Data from "@/sp500-data.json";

const nasdaqStats = nasdaqData.stats;
const sp500Stats = sp500Data.stats;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-semibold text-[var(--color-navy)] mb-8">
            Donnees indicatives par scraping — pas un conseil financier ni un avis religieux
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-[1.15] md:text-6xl max-w-4xl text-[var(--color-navy)]">
            Les indices US,{" "}
            <span className="text-[var(--color-gold)]">filtres par la charia</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            On prend le NASDAQ 100 et le S&P 500. On retire les actions qui ne
            passent pas le screening AAOIFI. On redistribue les poids. Vous
            obtenez la composition d'un indice conforme — avec le montant exact
            a investir par action selon votre budget.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted-foreground)]/60">
            Les statuts halal proviennent de Zoya.finance (standard AAOIFI) et
            peuvent changer d'un trimestre a l'autre. Verifiez toujours par
            vous-meme avant d'investir.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/nasdaq-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl bg-[var(--color-navy)] px-7 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              NASDAQ 100 — {nasdaqStats.included} actions halal
            </Link>
            <Link
              href="/sp500-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl border-2 border-[var(--color-navy)] px-7 text-sm font-semibold text-[var(--color-navy)] transition-all duration-200 hover:bg-[var(--color-navy)] hover:text-white"
            >
              S&P 500 — {sp500Stats.included} actions halal
            </Link>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-4">
          {[
            { value: `${nasdaqStats.included + sp500Stats.included}`, label: "Actions halal", sub: "NASDAQ + S&P combines", color: "text-[var(--color-halal)]" },
            { value: `${nasdaqStats.excluded + sp500Stats.excluded}`, label: "Actions exclues", sub: "non conformes ou douteuses", color: "text-[var(--color-haram)]" },
            { value: "AAOIFI", label: "Standard utilise", sub: "via Zoya.finance", color: "text-[var(--color-navy)]" },
            { value: "0 EUR", label: "Cout de l'outil", sub: "gratuit, open-source", color: "text-[var(--color-gold)]" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 cursor-default">
              <p className={`stat-number text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm font-medium text-[var(--foreground)] mt-1">{stat.label}</p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Indices cards */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Deux indices, une methode</h2>
        <p className="text-sm text-[var(--color-muted-foreground)] mb-8">
          Meme screening AAOIFI, meme approche stricte. Les "doubtful" sont exclus.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/nasdaq-halal"
            className="cursor-pointer group glass-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">NASDAQ 100</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Voir la composition →
              </span>
            </div>
            <div className="flex gap-10 mb-5">
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-halal)]">{nasdaqStats.included}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">passent le screening</p>
              </div>
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-haram)]">{nasdaqStats.excluded}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">retirees</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Tech-heavy. Seulement {nasdaqStats.excluded_weight_pct}% du poids
              retire — principalement telecoms, energies, conglomerats.
            </p>
          </Link>

          <Link
            href="/sp500-halal"
            className="cursor-pointer group glass-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">S&P 500</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Voir la composition →
              </span>
            </div>
            <div className="flex gap-10 mb-5">
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-halal)]">{sp500Stats.included}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">passent le screening</p>
              </div>
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-haram)]">{sp500Stats.excluded}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">retirees</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Plus diversifie mais {sp500Stats.excluded_weight_pct}% du poids
              retire — les financieres et assurances pesent lourd.
            </p>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Ce qu'on fait concretement</h2>
        <p className="text-sm text-[var(--color-muted-foreground)] mb-8">
          Pas de magie. Du scraping, un filtre, une regle de trois.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { n: "1", color: "text-[var(--color-gold)]", bg: "bg-[var(--color-gold-muted)]", title: "On recupere les poids", desc: "Les poids de chaque action sont scraped depuis SlickCharts (source : ETF QQQ et SPY). Ca change avec la capitalisation boursiere." },
            { n: "2", color: "text-[var(--color-halal)]", bg: "bg-[var(--color-halal-muted)]", title: "On filtre via AAOIFI", desc: "Chaque ticker est verifie sur Zoya.finance (dette, revenus d'interets, activites interdites). Les non conformes et doubtful sont retires." },
            { n: "3", color: "text-[var(--color-navy)]", bg: "bg-slate-100", title: "On redistribue", desc: "Les poids restants sont recalcules pour faire 100%. Entrez votre budget et vous avez le montant exact par action." },
          ].map((step) => (
            <div key={step.n} className="glass-card rounded-2xl p-6 cursor-default">
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${step.bg}`}>
                <span className={`text-lg font-bold ${step.color}`}>{step.n}</span>
              </div>
              <h3 className="font-semibold mb-2 text-[var(--color-navy)]">{step.title}</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">Guides</h2>
          <Link href="/guides" className="cursor-pointer text-sm font-medium text-[var(--color-gold)] hover:underline">
            Tous les guides →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { href: "/guides/pourquoi-investir", title: "Pourquoi investir ?", desc: "L'inflation mange votre epargne. La zakat vous incite a faire travailler votre argent. Voici pourquoi." },
            { href: "/guides/actions-boursieres", title: "Actions halal", desc: "Screeners, criteres AAOIFI, purification des dividendes, et ou acheter concretement." },
            { href: "/guides/investir-simplement", title: "Investir sans y passer des heures", desc: "ETFs halal, DCA, et comment demarrer meme avec 50 euros par mois." },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="cursor-pointer group glass-card rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-2 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                {guide.title}
              </h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{guide.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[var(--color-haram)]/15 bg-[var(--color-haram-muted)] p-6">
          <h3 className="font-semibold text-[var(--color-haram)] mb-3">A lire avant d'utiliser ce site</h3>
          <div className="text-sm text-[var(--color-muted-foreground)] leading-relaxed space-y-2">
            <p>
              <strong className="text-[var(--foreground)]">Ce site ne donne aucun conseil en investissement.</strong>{" "}
              Les donnees sont generees automatiquement par scraping de sites tiers et peuvent contenir des erreurs ou des retards.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Ce site ne donne aucun avis religieux.</strong>{" "}
              Nous ne sommes pas des scholars islamiques. Le statut halal/haram est celui de Zoya.finance — nous ne l'avons pas verifie independamment.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Faites vos propres recherches.</strong>{" "}
              Consultez un conseiller financier qualifie et un scholar islamique de confiance. Nous declinons toute responsabilite.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
