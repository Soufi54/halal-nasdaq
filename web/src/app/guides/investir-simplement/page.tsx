import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Investir sans se prendre la tete",
  description:
    "La strategie d'investissement passive halal. ETFs, DCA, et comment commencer avec peu d'argent.",
};

export default function InvestirSimplement() {
  return (
    <GuideLayout title="Investir sans se prendre la tete">
      <p className="text-lg">
        Vous n'avez pas le temps de suivre les marches ? Vous ne voulez pas
        passer des heures a analyser des actions ? La strategie passive est
        faite pour vous.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Le principe : acheter regulierement, ne jamais vendre
      </h2>
      <p>
        La strategie la plus simple et historiquement la plus efficace est le{" "}
        <strong>DCA (Dollar Cost Averaging)</strong> : investir un montant fixe
        chaque mois, quoi que fasse le marche. Quand le marche baisse, vous
        achetez plus d'actions pour le meme prix. Quand il monte, vos actions
        prennent de la valeur.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Option 1 : ETFs halal
      </h2>
      <p>
        Les ETFs (fonds negocies en bourse) halal sont le moyen le plus simple
        d'investir. Un seul produit vous donne une exposition a des centaines
        d'actions deja filtrees pour leur conformite charia :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>SPUS</strong> (SP Funds S&P 500 Sharia) — replique du S&P
          500 halal
        </li>
        <li>
          <strong>HLAL</strong> (Wahed FTSE USA Shariah) — large cap US halal
        </li>
        <li>
          <strong>UMMA</strong> (Wahed Dow Jones Islamic World) — diversification
          mondiale
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Option 2 : reconstituer vous-meme l'indice
      </h2>
      <p>
        Si vous voulez eviter les frais de gestion des ETFs (0.50-0.65% par
        an), vous pouvez reconstituer l'indice vous-meme en achetant les
        actions individuelles. C'est exactement ce que nos outils{" "}
        <a
          href="/nasdaq-halal"
          className="text-[var(--color-gold)] hover:underline"
        >
          NASDAQ 100 Halal
        </a>{" "}
        et{" "}
        <a
          href="/sp500-halal"
          className="text-[var(--color-gold)] hover:underline"
        >
          S&P 500 Halal
        </a>{" "}
        vous permettent de faire : entrez votre montant et vous obtenez la
        repartition exacte.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Combien investir ?
      </h2>
      <p>
        Commencez avec ce que vous pouvez. Meme 50 EUR par mois, investis
        regulierement pendant 20 ans, peuvent generer un capital significatif
        grace aux interets composes (ou plutot, dans notre cas, a la croissance
        des entreprises). L'important c'est la regularite, pas le montant.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        La regle d'or
      </h2>
      <p>
        N'investissez que l'argent dont vous n'avez pas besoin a court terme.
        Gardez toujours un matelas de securite (3-6 mois de depenses) sur un
        compte accessible avant de commencer a investir.
      </p>
    </GuideLayout>
  );
}
