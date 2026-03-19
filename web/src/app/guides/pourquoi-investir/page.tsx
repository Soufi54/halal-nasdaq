import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Pourquoi investir ?",
  description:
    "Comprendre pourquoi investir est essentiel. Inflation, zakat, performance historique, et la vision islamique de l'investissement.",
};

export default function PourquoiInvestir() {
  return (
    <GuideLayout title="Pourquoi investir ?">
      <p className="text-lg">
        Laisser son argent dormir sur un compte courant, c'est le regarder
        perdre de la valeur chaque annee. Ce n'est pas une opinion — c'est un
        fait mathematique. Voici pourquoi investir n'est pas un luxe mais une
        necessite.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        L'inflation grignote votre argent
      </h2>
      <p>
        En France, l'inflation a tourne entre <strong>2 et 5%</strong> ces
        dernieres annees. Concretement : 10 000 EUR sur un compte courant
        aujourd'hui vaudront l'equivalent de ~9 500 EUR dans un an si
        l'inflation est a 5%. Au bout de 10 ans, vous aurez perdu un tiers de
        votre pouvoir d'achat sans avoir depense un centime.
      </p>
      <p>
        Ce n'est pas un risque theorique — c'est une certitude.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        La double peine : inflation + zakat
      </h2>
      <p>
        En plus de l'inflation, il y a la <strong>zakat al maal</strong> : 2.5%
        de l'epargne qui dort au-dessus du nissab, a payer chaque annee. C'est
        une obligation religieuse et une sagesse : l'argent n'est pas fait pour
        dormir, il est fait pour circuler et produire de la valeur.
      </p>
      <p>
        Faites le calcul : inflation 3% + zakat 2.5% = votre epargne perd{" "}
        <strong>~5.5% par an</strong> si elle ne travaille pas. En 10 ans, vous
        avez perdu plus de la moitie de sa valeur reelle.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Investir, c'est faire travailler son argent
      </h2>
      <p>
        Investir ne veut pas dire speculer. C'est mettre son argent dans des
        actifs qui generent de la valeur — des entreprises qui produisent, de
        l'immobilier qui loge, de l'or qui preserve. Voici les performances
        historiques :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>NASDAQ 100</strong> — ~13% par an en moyenne
        </li>
        <li>
          <strong>S&P 500</strong> — ~10% par an en moyenne
        </li>
        <li>
          <strong>Or</strong> — ~7% par an en moyenne
        </li>
        <li>
          <strong>Compte courant</strong> — 0%. Moins l'inflation. Moins la
          zakat.
        </li>
      </ul>
      <p>
        Meme un investissement modeste a 7-10% par an suffit a compenser
        l'inflation et la zakat, et a faire croitre votre patrimoine.
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
        Le Prophete (paix et salut sur lui) etait lui-meme commercant, et
        Khadija (qu'Allah l'agree) etait une femme d'affaires prospere. De
        nombreux compagnons etaient des investisseurs actifs dans le commerce et
        l'agriculture. L'Islam valorise celui qui fait fructifier ses biens de
        maniere licite.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Par ou commencer ?
      </h2>
      <p>
        La prochaine etape, c'est de comprendre comment repartir votre argent.
        Consultez notre guide{" "}
        <a
          href="/guides/recapitulatif"
          className="text-[var(--color-gold)] hover:underline"
        >
          recapitulatif de tous les investissements halal
        </a>{" "}
        pour voir toutes les options, ou allez directement a{" "}
        <a
          href="/guides/investir-simplement"
          className="text-[var(--color-gold)] hover:underline"
        >
          la methode simple
        </a>{" "}
        si vous voulez une strategie cle en main.
      </p>
    </GuideLayout>
  );
}
