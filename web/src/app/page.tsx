import Link from "next/link";
import nasdaqData from "@/data.json";
import sp500Data from "@/sp500-data.json";

const nasdaqStats = nasdaqData.stats;
const sp500Stats = sp500Data.stats;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero — court, accueillant, pas technique */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-8 tracking-wide">
            Pas un conseil financier, pas un avis religieux
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-[1.15] md:text-[3.5rem] max-w-3xl text-[var(--color-navy)]">
            Investir{" "}
            <span className="text-[var(--color-gold)]">sans compromis</span>{" "}
            sur vos convictions.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Vous savez que votre argent perd de la valeur chaque annee. Vous
            voulez le faire travailler, mais pas n'importe comment. Ce site vous
            aide a y voir clair : quoi investir, comment le faire, et surtout
            comment rester conforme.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/guides/repartition"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl bg-[var(--color-navy)] px-7 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Par ou commencer
            </Link>
            <Link
              href="/nasdaq-halal"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl border-2 border-[var(--color-navy)]/15 px-7 text-sm font-semibold text-[var(--color-navy)] transition-all duration-200 hover:bg-[var(--color-navy)] hover:text-white hover:border-[var(--color-navy)]"
            >
              Voir les indices halal
            </Link>
          </div>
        </div>
      </section>

      {/* Ce qu'on propose — en 3 blocs simples */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-6 cursor-default">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-halal-muted)]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.7 5.3L8 14l-4.7-4.7" stroke="var(--color-halal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="font-semibold mb-2 text-[var(--color-navy)]">Des indices filtres</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              On prend les plus grands indices boursiers et on retire les
              actions non conformes. Il reste un portefeuille propre, avec les
              poids recalcules.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 cursor-default">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-gold-muted)]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M2 10h16" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3 className="font-semibold mb-2 text-[var(--color-navy)]">Des guides concrets</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Combien garder en cash, combien investir, en quoi, sur quelle
              plateforme. Des reponses simples pour ceux qui debutent comme pour
              ceux qui veulent aller plus loin.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 cursor-default">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 6v4l3 3M18 10a8 8 0 11-16 0 8 8 0 0116 0z" stroke="var(--color-navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="font-semibold mb-2 text-[var(--color-navy)]">Gratuit, transparent</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Pas de compte a creer, pas de frais. Les donnees viennent de
              sources publiques. On vous explique exactement d'ou vient chaque
              chiffre.
            </p>
          </div>
        </div>
      </section>

      {/* Nos outils */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">Nos outils</h2>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          Deux indices americains, passes au filtre du standard AAOIFI.
          Simulez votre portefeuille et exportez la composition.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/nasdaq-halal"
            className="cursor-pointer group glass-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">NASDAQ 100 Halal</h3>
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
              Les 100 plus grandes entreprises tech americaines, filtrees
              selon le standard AAOIFI. Simulateur de portefeuille integre.
            </p>
          </Link>

          <Link
            href="/sp500-halal"
            className="cursor-pointer group glass-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[var(--color-navy)]">S&P 500 Halal</h3>
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
              Les 500 plus grandes entreprises americaines, tous secteurs.
              Plus diversifie, mais plus d'exclusions. Meme methode.
            </p>
          </Link>
        </div>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">Apprendre</h2>
          <Link href="/guides" className="cursor-pointer text-sm font-medium text-[var(--color-gold)] hover:underline">
            Tous les guides →
          </Link>
        </div>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          Vous debutez ? Commencez par la repartition de l'epargne. Le reste
          viendra naturellement.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/guides/repartition", title: "Repartir son epargne", desc: "Combien garder en cash, combien investir, comment repartir. Le guide a lire en premier.", tag: "Essentiel" },
            { href: "/guides/pourquoi-investir", title: "Pourquoi investir ?", desc: "L'inflation mange votre pouvoir d'achat. La zakat pousse a faire fructifier. Voici pourquoi.", tag: "Bases" },
            { href: "/guides/actions-boursieres", title: "Acheter des actions halal", desc: "Screeners, criteres, purification des dividendes, plateformes d'achat.", tag: "Pratique" },
            { href: "/guides/investir-simplement", title: "La methode simple", desc: "ETFs halal + achat automatique chaque mois. Votre portefeuille tourne tout seul.", tag: "Debutant" },
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
            </p>
            <p>
              <strong className="text-[var(--foreground)]">On n'est pas des savants.</strong>{" "}
              Le statut halal ou haram vient de Zoya.finance (standard AAOIFI).
              On ne l'a pas verifie nous-memes. Consultez un scholar de
              confiance.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Les donnees peuvent contenir des erreurs.</strong>{" "}
              Elles sont extraites automatiquement de sites tiers. Verifiez
              toujours par vous-meme avant d'investir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
