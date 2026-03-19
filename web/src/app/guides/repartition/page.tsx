import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comment repartir son epargne",
  description:
    "Avant d'investir, il faut savoir combien garder en cash, combien placer, et ou. Le guide essentiel pour structurer son epargne de maniere halal.",
};

export default function Repartition() {
  return (
    <GuideLayout title="Comment repartir son epargne">
      <p className="text-lg">
        Avant de mettre un euro en bourse, il faut repondre a une question
        simple : combien je peux me permettre d'investir ? Ce guide vous donne
        un cadre. Pas une formule magique — un cadre de bon sens.
      </p>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--color-gold-muted)] p-4 my-6">
        <p className="text-sm font-medium text-[var(--foreground)]">
          Ce n'est pas un conseil financier. C'est un cadre general utilise par
          beaucoup d'investisseurs. Adaptez-le a votre situation, vos revenus,
          vos charges, et vos projets.
        </p>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Etape 1 — Le matelas de securite (intouchable)
      </h2>
      <p>
        Gardez toujours <strong>3 a 6 mois de depenses</strong> sur un compte
        courant ou un livret accessible. C'est votre filet de securite : une
        panne de voiture, une urgence medicale, une perte d'emploi. Cet argent
        ne doit jamais etre investi.
      </p>
      <p>
        Si vos depenses mensuelles sont de 1 500 EUR, votre matelas est entre
        4 500 et 9 000 EUR. Tant que ce montant n'est pas atteint, concentrez
        vous dessus avant de penser a investir.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Etape 2 — Les projets a court terme (ne pas immobiliser)
      </h2>
      <p>
        Vous prevoyez un mariage, l'achat d'une voiture, un demenagement, un
        voyage dans les 1 a 2 ans ? Cet argent ne doit pas etre investi en
        bourse. La bourse est volatile a court terme — votre argent peut perdre
        20% en quelques mois. Ce serait absurde de devoir vendre a perte
        pour financer votre mariage.
      </p>
      <p>
        Gardez ces sommes en cash ou sur un compte separe. Investir, c'est
        pour l'argent dont vous n'avez pas besoin avant au moins 3 a 5 ans.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Etape 3 — Repartir ce qui reste
      </h2>
      <p>
        Une fois votre matelas constitue et vos projets a court terme mis de
        cote, il vous reste votre epargne investissable. Voici une repartition
        courante (a adapter) :
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3 pr-4 text-left font-semibold text-[var(--foreground)]">
                Poche
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[var(--foreground)]">
                Part
              </th>
              <th className="py-3 pl-4 text-left font-semibold text-[var(--foreground)]">
                Pourquoi
              </th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Actions halal
              </td>
              <td className="py-3 px-4">~50-70%</td>
              <td className="py-3 pl-4">
                Le moteur de croissance. Rendement historique le plus eleve sur
                le long terme (~10-13% par an). Utilisez nos indices pour la
                composition.
              </td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Or
              </td>
              <td className="py-3 px-4">~10-20%</td>
              <td className="py-3 pl-4">
                Valeur refuge, halal par nature, protege contre l'inflation.
                Quand la bourse baisse, l'or monte souvent.
              </td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Immobilier
              </td>
              <td className="py-3 px-4">~10-30%</td>
              <td className="py-3 pl-4">
                Si vous avez le capital et le temps. Rendement 5-8% brut,
                tangible, mais peu liquide. Murabaha ou achat comptant.
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Cash supplementaire
              </td>
              <td className="py-3 px-4">~5-10%</td>
              <td className="py-3 pl-4">
                Pour saisir des opportunites ou renforcer en cas de baisse du
                marche.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Ces pourcentages ne sont pas des regles. Un jeune celibataire sans
        projet imminent peut mettre 80% en actions. Un pere de famille avec un
        mariage prevu dans un an sera plutot a 30%. Adaptez.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Etape 4 — Investir regulierement
      </h2>
      <p>
        Le plus important, c'est la regularite. Investir 200 EUR chaque mois
        pendant 20 ans donne de meilleurs resultats que d'investir 50 000 EUR
        d'un coup au mauvais moment. C'est ce qu'on appelle le{" "}
        <strong>DCA (Dollar Cost Averaging)</strong> : un montant fixe, chaque
        mois, sans se poser de question sur le "bon moment".
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        En resume
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>3 a 6 mois de depenses en cash</strong> — ne touchez jamais a
          ce matelas
        </li>
        <li>
          <strong>Mettez de cote les projets a court terme</strong> — mariage,
          voiture, demenagement
        </li>
        <li>
          <strong>Repartissez le reste</strong> — actions (50-70%), or (10-20%),
          immobilier si possible, un peu de cash opportuniste
        </li>
        <li>
          <strong>Investissez chaque mois</strong> — la regularite bat le timing
        </li>
      </ol>

      <p className="pt-4">
        Pour la partie actions, utilisez notre{" "}
        <Link
          href="/nasdaq-halal"
          className="text-[var(--color-gold)] hover:underline"
        >
          NASDAQ 100 Halal
        </Link>{" "}
        ou{" "}
        <Link
          href="/sp500-halal"
          className="text-[var(--color-gold)] hover:underline"
        >
          S&P 500 Halal
        </Link>{" "}
        pour savoir exactement combien mettre sur chaque action.
        Pour l'or, consultez notre{" "}
        <Link
          href="/guides/or"
          className="text-[var(--color-gold)] hover:underline"
        >
          guide sur l'or
        </Link>.
      </p>
    </GuideLayout>
  );
}
