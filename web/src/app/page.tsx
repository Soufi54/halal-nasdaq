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
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-8 tracking-wide">
            Outil gratuit — ce n'est ni un conseil financier, ni un avis religieux
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-[1.15] md:text-[3.5rem] max-w-4xl text-[var(--color-navy)]">
            La bourse americaine,{" "}
            <span className="text-[var(--color-gold)]">sans les actions haram.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Le NASDAQ 100, c'est un indice qui regroupe les 100 plus grosses
            entreprises technologiques americaines — Apple, Nvidia, Google,
            Amazon. Depuis sa creation en 1985, il affiche une performance
            moyenne d'environ <strong>13% par an</strong>. Le S&P 500, c'est
            plus large : les 500 plus grosses entreprises US, tous secteurs
            confondus, avec environ <strong>10% par an</strong> historiquement.
          </p>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Le probleme : certaines de ces entreprises ne sont pas compatibles
            avec les principes de la finance islamique. On a verifie chacune
            d'entre elles selon le standard AAOIFI, le plus strict du marche.
            Celles qui ne passent pas sont retirees. Les poids sont recalcules.
            Il vous reste un indice propre — et un simulateur pour savoir
            exactement combien placer sur chaque action.
          </p>
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]/60 max-w-2xl leading-relaxed">
            Les performances passees ne garantissent pas les performances
            futures. Les donnees viennent de Zoya.finance et SlickCharts.
            Verifiez toujours par vous-meme.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/nasdaq-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl bg-[var(--color-navy)] px-7 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Voir le NASDAQ 100 halal
            </Link>
            <Link
              href="/sp500-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl border-2 border-[var(--color-navy)]/15 px-7 text-sm font-semibold text-[var(--color-navy)] transition-all duration-200 hover:bg-[var(--color-navy)] hover:text-white hover:border-[var(--color-navy)]"
            >
              Voir le S&P 500 halal
            </Link>
          </div>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-4">
          {[
            { value: nasdaqStats.included + sp500Stats.included, label: "actions conformes", sub: "sur les deux indices combines", color: "text-[var(--color-halal)]" },
            { value: nasdaqStats.excluded + sp500Stats.excluded, label: "actions retirees", sub: "non conformes ou douteuses", color: "text-[var(--color-haram)]" },
            { value: "AAOIFI", label: "standard de reference", sub: "le plus strict du marche", color: "text-[var(--color-navy)]" },
            { value: "Gratuit", label: "acces libre, sans compte", sub: "disponible pour tous", color: "text-[var(--color-gold)]" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 cursor-default">
              <p className={`stat-number text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm font-medium text-[var(--foreground)] mt-1">{stat.label}</p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Les deux indices */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Choisissez votre indice</h2>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          Meme methode de filtrage, meme rigueur. La difference : le NASDAQ est
          concentre en tech, le S&P couvre toute l'economie americaine.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/nasdaq-halal"
            className="cursor-pointer group glass-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">NASDAQ 100</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Explorer →
              </span>
            </div>
            <div className="flex gap-10 mb-5">
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-halal)]">{nasdaqStats.included}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">conformes</p>
              </div>
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-haram)]">{nasdaqStats.excluded}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">retirees</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Les 100 plus grosses tech US. ~13% par an en moyenne depuis 1985.
              Seulement {nasdaqStats.excluded_weight_pct}% du poids retire.
              Nvidia, Apple, Broadcom en tete.
            </p>
          </Link>

          <Link
            href="/sp500-halal"
            className="cursor-pointer group glass-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">S&P 500</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Explorer →
              </span>
            </div>
            <div className="flex gap-10 mb-5">
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-halal)]">{sp500Stats.included}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">conformes</p>
              </div>
              <div>
                <p className="stat-number text-3xl font-bold text-[var(--color-haram)]">{sp500Stats.excluded}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">retirees</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Les 500 plus grosses entreprises US, tous secteurs. ~10% par an
              historiquement. La moitie exclue (banques, assureurs). Reste de la
              tech, de la sante, de l'energie.
            </p>
          </Link>
        </div>
      </section>

      {/* Comment ca marche */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Comment ca marche</h2>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-xl leading-relaxed">
          Trois etapes. Tout est automatise, tout est verifiable.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { n: "1", color: "text-[var(--color-gold)]", bg: "bg-[var(--color-gold-muted)]", title: "Les poids de l'indice", desc: "On recupere la ponderation de chaque action depuis les ETF de reference (QQQ, SPY). Ce sont des donnees publiques, mises a jour avec le marche." },
            { n: "2", color: "text-[var(--color-halal)]", bg: "bg-[var(--color-halal-muted)]", title: "Le filtre AAOIFI", desc: "Chaque action est passee au crible : niveau de dette, revenus d'interets, activites interdites. Si elle ne passe pas, elle sort. Si elle est \"douteuse\", elle sort aussi." },
            { n: "3", color: "text-[var(--color-navy)]", bg: "bg-slate-100", title: "Votre portefeuille", desc: "Les poids sont recalcules pour totaliser 100%. Vous entrez un montant, on vous dit combien mettre sur chaque action. Pas plus complique que ca." },
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
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">Par ou commencer</h2>
          <Link href="/guides" className="cursor-pointer text-sm font-medium text-[var(--color-gold)] hover:underline">
            Tous les guides →
          </Link>
        </div>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          Avant d'investir, il faut comprendre quelques bases. Combien garder
          en cash ? Comment repartir son epargne ? Par ou demarrer ?
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/guides/repartition", title: "Repartir son epargne", desc: "3 a 6 mois de cash, pas d'argent immobilise si vous avez un projet, et ensuite : actions, or, immobilier.", tag: "Essentiel" },
            { href: "/guides/pourquoi-investir", title: "Pourquoi investir ?", desc: "L'inflation grignote votre pouvoir d'achat chaque annee. La zakat incite a faire fructifier son argent.", tag: "Bases" },
            { href: "/guides/actions-boursieres", title: "Acheter des actions halal", desc: "Quel screener, quels criteres, comment purifier les dividendes, sur quelle plateforme.", tag: "Pratique" },
            { href: "/guides/investir-simplement", title: "La methode simple", desc: "ETFs halal, achat automatique chaque mois. Votre portefeuille tourne tout seul.", tag: "Debutant" },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="cursor-pointer group glass-card rounded-2xl p-5"
            >
              <span className="inline-block rounded-full bg-[var(--color-navy)]/5 px-2.5 py-0.5 text-[0.65rem] font-semibold text-[var(--color-navy)] uppercase tracking-wider mb-3">
                {guide.tag}
              </span>
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
          <h3 className="font-semibold text-[var(--color-haram)] mb-3">Avant d'utiliser ce site</h3>
          <div className="text-sm text-[var(--color-muted-foreground)] leading-[1.7] space-y-2">
            <p>
              <strong className="text-[var(--foreground)]">On ne vous dit pas quoi acheter.</strong>{" "}
              Ce site affiche des donnees. Il ne recommande rien, ne garantit
              rien, et n'est pas habilite a donner des conseils financiers.
              Les performances passees ne presagent pas des performances futures.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">On n'est pas des savants.</strong>{" "}
              Le statut halal ou haram vient de Zoya.finance, base sur le
              standard AAOIFI. On ne l'a pas verifie nous-memes. Consultez un
              scholar de confiance.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Les donnees sont du scraping.</strong>{" "}
              Automatiquement extraites de sites tiers. Il peut y avoir des
              erreurs, des retards, des incoherences. Verifiez ce que vous
              utilisez.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
