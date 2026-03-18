import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Guides complets pour investir de maniere halal. Actions, ETFs, or, immobilier, et plus.",
};

const guides = [
  {
    href: "/guides/pourquoi-investir",
    title: "Pourquoi investir ?",
    desc: "Comprendre l'importance d'investir son argent et pourquoi le laisser dormir sur un compte est une perte.",
  },
  {
    href: "/guides/actions-boursieres",
    title: "Actions boursieres halal",
    desc: "Comment investir en bourse de maniere conforme. Screeners, criteres AAOIFI, purification des dividendes.",
  },
  {
    href: "/guides/investir-simplement",
    title: "Investir sans se prendre la tete",
    desc: "La strategie passive pour ceux qui n'ont pas le temps : ETFs, DCA, et comment commencer avec peu.",
  },
  {
    href: "/guides/or",
    title: "Investir dans l'or",
    desc: "L'or comme investissement halal par nature. Formes d'investissement, avantages, inconvenients.",
  },
  {
    href: "/guides/immobilier",
    title: "Immobilier physique",
    desc: "Acheter un bien immobilier sans riba. Financement halal, alternatives au pret bancaire classique.",
  },
  {
    href: "/guides/recapitulatif",
    title: "Recapitulatif des investissements",
    desc: "Vue d'ensemble de toutes les options d'investissement halal disponibles, classees par type.",
  },
];

export default function Guides() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Guides</h1>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            Apprendre a investir de maniere conforme a la charia. Des bases aux
            strategies avancees.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-white/5 bg-[var(--card)] p-6 transition-all hover:border-[var(--color-gold)]/20 hover:bg-white/[0.03]"
            >
              <h2 className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors">
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
