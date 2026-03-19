import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "La methode simple pour investir halal",
  description:
    "DCA, ETFs halal, Trade Republic, assurance vie halal. La strategie passive pour investir sans se prendre la tete.",
};

export default function InvestirSimplement() {
  return (
    <GuideLayout title="La methode simple">
      <p className="text-lg">
        Vous n'avez pas le temps de suivre les marches ? Vous ne voulez pas
        analyser des bilans financiers ? Parfait. Cette page est pour vous.
        Voici la strategie la plus simple et la plus efficace pour investir
        halal — ca prend 15 minutes a mettre en place, et ensuite c'est
        automatique.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Le principe : le DCA
      </h2>
      <p>
        <strong>DCA (Dollar Cost Averaging)</strong> = investir un montant fixe
        chaque mois, sans se poser de questions. Quand le marche baisse, vous
        achetez plus d'actions pour le meme prix. Quand il monte, vos actions
        prennent de la valeur. Sur le long terme, ca lisse le risque et ca bat
        95% des investisseurs qui essaient de timer le marche.
      </p>
      <p>
        La regularite bat le timing. Toujours.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Etape 1 : ouvrir un compte Trade Republic
      </h2>
      <p>
        <strong>Trade Republic</strong> est le courtier qu'on recommande pour
        commencer. Pourquoi ? Les investissements programmes (achats automatiques
        mensuels) sont <strong>gratuits</strong> — zero frais. L'interface est
        simple, et vous pouvez acheter des fractions d'actions meme avec un
        petit budget.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Etape 2 : choisir quoi acheter
      </h2>
      <p>Trois options, de la plus simple a la plus personnalisee :</p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Option A — Un ETF halal (le plus simple) :</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>ISDU</strong> — iShares MSCI USA Islamic (0.30%/an) :
              expose aux grandes entreprises US halal
            </li>
            <li>
              <strong>ISDW</strong> — iShares MSCI World Islamic (0.30%/an) :
              diversification mondiale
            </li>
            <li>
              <strong>IGDA</strong> — Invesco DJ Islamic (0.40%/an) :
              alternative avec une methodologie differente
            </li>
          </ul>
        </li>
        <li>
          <strong>Option B — Reconstituer l'indice vous-meme :</strong> utilisez
          nos outils{" "}
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
          pour obtenir la repartition exacte. Plus de travail, mais zero frais
          de gestion et un controle total
        </li>
        <li>
          <strong>Option C — Mix des deux :</strong> un ETF halal pour la base +
          quelques actions individuelles que vous aimez
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Etape 3 : programmer et oublier
      </h2>
      <p>
        Sur Trade Republic, configurez un investissement programme : choisissez
        le montant (meme 50 EUR/mois), la date, et c'est parti. Le prelevement
        est automatique, l'achat aussi. Vous n'avez plus rien a faire.
      </p>
      <p>
        <strong>50 EUR/mois pendant 20 ans</strong> a ~10% de rendement annuel
        = environ <strong>38 000 EUR</strong> (pour 12 000 EUR investis). La
        magie de la croissance composee.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Bonus : assurance vie et PER halal
      </h2>
      <p>
        Si vous cherchez des enveloppes fiscales avantageuses :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Assurance vie halal</strong> — proposee par 570easi. Avantage
          fiscal apres 8 ans
        </li>
        <li>
          <strong>PER halal (Plan Epargne Retraite)</strong> — Perennys et
          570easi. Les versements sont deductibles de vos revenus imposables
        </li>
      </ul>
      <p>
        Ces produits investissent dans des fonds conformes a la charia. Le
        rendement est plus modeste (~4%/an) mais l'avantage fiscal compense
        partiellement.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        La combinaison ideale pour un debutant
      </h2>
      <p>
        Si vous partez de zero, voici ce qu'on recommande :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Matelas de securite</strong> — 3 a 6 mois de depenses sur un
          compte accessible. Ne touchez pas a cet argent
        </li>
        <li>
          <strong>ETF halal en DCA</strong> — la majorite de votre investissement
          mensuel (70-80%). ISDU ou ISDW sur Trade Republic
        </li>
        <li>
          <strong>Un peu d'or via{" "}
          <a
            href="https://www.inaia.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            INAIA
          </a>
          </strong>{" "}
          — 10-20% de votre budget mensuel. Protection et diversification
        </li>
      </ul>
      <p>
        C'est tout. Pas besoin de plus. Commencez, soyez regulier, et laissez
        le temps faire le travail.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        La regle d'or
      </h2>
      <p>
        N'investissez que l'argent dont vous n'avez pas besoin a court terme.
        Gardez toujours votre matelas de securite intact. Et surtout : ne
        vendez pas en panique quand le marche baisse. C'est la que les debutants
        perdent de l'argent — pas a cause du marche, mais a cause de leurs
        emotions.
      </p>
    </GuideLayout>
  );
}
