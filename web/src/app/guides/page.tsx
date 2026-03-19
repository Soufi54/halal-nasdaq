import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Tout ce qu'il faut savoir avant d'investir halal. Repartition de l'epargne, actions, ETFs, or, immobilier.",
};

const featured = {
  href: "/guides/repartition",
  title: "Comment repartir son epargne",
  desc: "Le premier guide a lire. Combien garder en cash, combien investir, comment repartir entre actions, or et immobilier. Le cadre essentiel avant de commencer.",
};

const guides = [
  {
    href: "/guides/pourquoi-investir",
    title: "Pourquoi investir ?",
    desc: "L'inflation mange votre epargne. La zakat vous pousse a la faire fructifier. Voici pourquoi ne rien faire est la pire option.",
  },
  {
    href: "/guides/actions-boursieres",
    title: "Acheter des actions halal",
    desc: "Quel screener utiliser, quels criteres AAOIFI verifier, comment purifier les dividendes, sur quelle plateforme acheter.",
  },
  {
    href: "/guides/investir-simplement",
    title: "La methode simple",
    desc: "Pas le temps ? ETFs halal, achat automatique chaque mois, et votre portefeuille tourne tout seul.",
  },
  {
    href: "/guides/or",
    title: "Investir dans l'or",
    desc: "Halal par nature, protege contre l'inflation. Les differentes facons d'acheter de l'or et ce qu'il faut savoir.",
  },
  {
    href: "/guides/murabaha",
    title: "La Murabaha : simulations et comparaison",
    desc: "Combien coute une Murabaha vs un credit classique ? Simulations reelles, frais caches, et comment reduire le cout.",
  },
  {
    href: "/guides/immobilier",
    title: "Immobilier sans riba",
    desc: "Strategie HLM, achat comptant, Murabaha. Toutes les facons d'acheter un bien sans pret classique.",
  },
  {
    href: "/guides/recapitulatif",
    title: "Tous les investissements halal",
    desc: "Le tableau comparatif : rendement, temps, liquidite, difficulte. Pour savoir ou mettre votre argent selon votre profil.",
  },
];

export default function Guides() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-navy)]">Guides</h1>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl">
            Vous debutez ? Commencez par le guide sur la repartition de
            l'epargne. Sinon, piochez ce qui vous interesse.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-8">
        {/* Featured guide */}
        <Link
          href={featured.href}
          className="cursor-pointer group block glass-card rounded-2xl p-8 border-2 border-[var(--color-gold)]/20"
        >
          <span className="inline-block rounded-full bg-[var(--color-gold-muted)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-4">
            A lire en premier
          </span>
          <h2 className="text-2xl font-bold mb-3 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
            {featured.title}
          </h2>
          <p className="text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl">
            {featured.desc}
          </p>
        </Link>

        {/* Other guides */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="cursor-pointer group glass-card rounded-2xl p-6"
            >
              <h2 className="text-lg font-bold mb-2 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                {guide.title}
              </h2>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                {guide.desc}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
