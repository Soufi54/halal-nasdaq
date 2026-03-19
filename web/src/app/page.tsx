import Link from "next/link";
import nasdaqData from "@/data.json";
import sp500Data from "@/sp500-data.json";

const nasdaqStats = nasdaqData.stats;
const sp500Stats = sp500Data.stats;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20">
          <p className="text-sm font-medium text-[var(--color-muted-foreground)] mb-6">
            Donnees indicatives — pas un conseil financier ni un avis religieux
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight leading-[1.15] md:text-6xl max-w-4xl text-[var(--color-navy)]">
            Les indices US,{" "}
            <span className="text-[var(--color-gold)]">filtres par la charia</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            On prend le NASDAQ 100 et le S&P 500. On retire les actions qui ne
            passent pas le screening AAOIFI. On redistribue les poids. Vous
            obtenez la composition d'un indice conforme — avec le montant exact
            a investir par action selon votre budget.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted-foreground)]/70">
            Les statuts halal proviennent de Zoya.finance (standard AAOIFI) et
            peuvent changer d'un trimestre a l'autre. Verifiez toujours par
            vous-meme avant d'investir.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/nasdaq-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl bg-[var(--color-navy)] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-navy-light)]"
            >
              NASDAQ 100 — {nasdaqStats.included} actions halal
            </Link>
            <Link
              href="/sp500-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl border border-[var(--border)] px-6 text-sm font-semibold text-[var(--color-navy)] transition-colors duration-200 hover:bg-slate-50"
            >
              S&P 500 — {sp500Stats.included} actions halal
            </Link>
          </div>
        </div>
      </section>

      {/* Indices cards */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Deux indices, une methode</h2>
        <p className="text-sm text-[var(--color-muted-foreground)] mb-8">
          Meme screening AAOIFI, meme approche stricte. Les "doubtful" sont exclus.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/nasdaq-halal"
            className="cursor-pointer group rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm transition-all duration-200 hover:border-[var(--color-gold)]/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">NASDAQ 100 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Voir la composition →
              </span>
            </div>
            <div className="flex gap-8 mb-4">
              <div>
                <p className="text-3xl font-bold text-[var(--color-halal)]">{nasdaqStats.included}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">passent le screening</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--color-haram)]">{nasdaqStats.excluded}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">retirees de l'indice</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Tech-heavy. {nasdaqStats.excluded_weight_pct}% du poids original
              est retire — principalement des telecoms, energies et
              conglomerats industriels.
            </p>
          </Link>

          <Link
            href="/sp500-halal"
            className="cursor-pointer group rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm transition-all duration-200 hover:border-[var(--color-gold)]/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">S&P 500 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Voir la composition →
              </span>
            </div>
            <div className="flex gap-8 mb-4">
              <div>
                <p className="text-3xl font-bold text-[var(--color-halal)]">{sp500Stats.included}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">passent le screening</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--color-haram)]">{sp500Stats.excluded}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">retirees de l'indice</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Plus diversifie. {sp500Stats.excluded_weight_pct}% du poids
              retire — les financieres, assurances et utilities pesent
              lourd dans les exclusions.
            </p>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Ce qu'on fait concretement</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] mb-8">
            Pas de magie. Du scraping, un filtre, une regle de trois.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-gold-muted)]">
                <span className="text-lg font-bold text-[var(--color-gold)]">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-[var(--color-navy)]">On recupere les poids</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Les poids de chaque action dans l'indice sont scraped depuis
                SlickCharts (source : ETF QQQ et SPY). Ca change avec la
                capitalisation boursiere.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-halal-muted)]">
                <span className="text-lg font-bold text-[var(--color-halal)]">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-[var(--color-navy)]">On filtre via AAOIFI</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Chaque ticker est verifie sur Zoya.finance (standard AAOIFI :
                dette, revenus d'interets, activites interdites). Les "Not
                Halal" et "Doubtful" sont retires.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <span className="text-lg font-bold text-[var(--color-navy)]">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-[var(--color-navy)]">On redistribue</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Les poids des actions restantes sont recalcules pour que le
                total fasse 100%. Entrez votre budget et vous avez le montant
                exact par action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)]">Guides</h2>
            <Link href="/guides" className="cursor-pointer text-sm text-[var(--color-gold)] hover:underline">
              Tous les guides →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/guides/pourquoi-investir", title: "Pourquoi investir ?", desc: "L'inflation mange votre epargne. La zakat vous incite a faire travailler votre argent. Voici pourquoi." },
              { href: "/guides/actions-boursieres", title: "Actions boursieres halal", desc: "Screeners, criteres AAOIFI, purification des dividendes, et ou acheter concretement." },
              { href: "/guides/investir-simplement", title: "Investir sans y passer des heures", desc: "ETFs halal, DCA, et comment demarrer meme avec 50 euros par mois." },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="cursor-pointer group rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition-all duration-200 hover:border-[var(--color-gold)]/30 hover:shadow-md"
              >
                <h3 className="font-semibold mb-2 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                  {guide.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-foreground)]">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-[var(--color-haram)]/20 bg-[var(--color-haram-muted)] p-6">
            <h3 className="font-semibold text-[var(--color-haram)] mb-2">A lire avant d'utiliser ce site</h3>
            <div className="text-sm text-[var(--color-muted-foreground)] leading-relaxed space-y-2">
              <p>
                <strong>Ce site ne donne aucun conseil en investissement.</strong>{" "}
                Les donnees affichees sont generees automatiquement par scraping
                de sites tiers (SlickCharts, Zoya.finance) et peuvent contenir
                des erreurs ou des retards.
              </p>
              <p>
                <strong>Ce site ne donne aucun avis religieux.</strong>{" "}
                Nous ne sommes pas des scholars islamiques. Le statut
                halal/haram est celui fourni par Zoya.finance (standard AAOIFI)
                — nous ne l'avons pas verifie independamment. Un statut peut
                changer d'un trimestre a l'autre.
              </p>
              <p>
                <strong>Faites vos propres recherches.</strong>{" "}
                Verifiez chaque action aupres de sources fiables avant
                d'investir. Consultez un conseiller financier qualifie et un
                scholar islamique de confiance. Nous declinons toute
                responsabilite.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
