import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Pourquoi investir ?",
  description:
    "Comprendre pourquoi investir est essentiel, meme en tant que musulman. L'inflation, la perte de pouvoir d'achat, et les alternatives halal.",
};

export default function PourquoiInvestir() {
  return (
    <GuideLayout title="Pourquoi investir ?">
      <p className="text-lg">
        Laisser son argent dormir sur un compte courant, c'est le regarder
        perdre de la valeur chaque annee. L'inflation grignote votre pouvoir
        d'achat silencieusement — en France, elle tourne autour de 2 a 5% par
        an ces dernieres annees.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        L'argent qui dort perd de la valeur
      </h2>
      <p>
        10 000 EUR sur un compte courant aujourd'hui vaudront l'equivalent de
        ~9 500 EUR dans un an si l'inflation est a 5%. Au bout de 10 ans, vous
        aurez perdu un tiers de votre pouvoir d'achat sans avoir depense un
        centime. Ce n'est pas un risque theorique — c'est une certitude
        mathematique.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Investir, c'est proteger ce qu'on a
      </h2>
      <p>
        Investir ne veut pas dire speculer ou jouer en bourse. C'est simplement
        mettre son argent au travail pour qu'il conserve — ou augmente — sa
        valeur dans le temps. Il existe de nombreuses manieres d'investir de
        facon conforme a la charia : actions halal, or, immobilier, etc.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Et en Islam ?
      </h2>
      <p>
        L'Islam n'interdit pas l'investissement — au contraire, il encourage
        l'activite economique et la mise en valeur des richesses. Ce qui est
        interdit, c'est le riba (l'interet), le gharar (l'incertitude
        excessive) et le maysir (le jeu de hasard). En respectant ces limites,
        investir est non seulement permis mais recommande.
      </p>
      <p>
        Le Prophete (paix et salut sur lui) etait lui-meme commercant, et de
        nombreux compagnons etaient des investisseurs actifs dans le commerce
        et l'agriculture.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Par ou commencer ?
      </h2>
      <p>
        Si vous ne savez pas par ou commencer, consultez notre guide{" "}
        <a
          href="/guides/investir-simplement"
          className="text-[var(--color-gold)] hover:underline"
        >
          Investir sans se prendre la tete
        </a>{" "}
        ou le{" "}
        <a
          href="/guides/recapitulatif"
          className="text-[var(--color-gold)] hover:underline"
        >
          recapitulatif de tous les investissements halal
        </a>
        .
      </p>
    </GuideLayout>
  );
}
