import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Investir dans l'or — Guide pratique",
  description:
    "Comment investir dans l'or de maniere halal. INAIA, or physique, ETCs, strategie DCA, et rendement historique.",
};

export default function Or() {
  return (
    <GuideLayout title="Investir dans l'or">
      <p className="text-lg">
        L'or est l'investissement halal par excellence. Pas d'interet, pas de
        doute — c'est un actif tangible qui a preserve sa valeur depuis des
        millenaires. Aujourd'hui, il est aussi facile a acheter que des actions.
        Voici comment s'y prendre concretement.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Pourquoi l'or ?
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Halal par nature</strong> — pas de riba, pas de gharar, aucune
          controverse parmi les savants
        </li>
        <li>
          <strong>Valeur refuge</strong> — quand les marches actions chutent,
          l'or monte generalement. C'est un comportement inverse qui protege
          votre portefeuille
        </li>
        <li>
          <strong>Protection contre l'inflation</strong> — l'or conserve sa
          valeur quand les monnaies se deprecient
        </li>
        <li>
          <strong>Plus liquide que l'immobilier</strong> — vous pouvez revendre
          rapidement, pas besoin d'attendre des mois
        </li>
        <li>
          <strong>~7% par an historiquement</strong> — moins que les actions
          (~10-13%) mais bien plus que le compte courant (0%)
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Notre recommandation : INAIA Gold Dinar
      </h2>
      <p>
        La plateforme qu'on recommande pour acheter de l'or, c'est{" "}
        <a
          href="https://www.inaia.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-gold)] hover:underline"
        >
          INAIA
        </a>
        . Pourquoi ?
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Or physique stocke dans des coffres securises en Allemagne</li>
        <li>Livraison a domicile possible si vous voulez toucher votre or</li>
        <li>Interface simple, pensee pour les musulmans</li>
        <li>
          Possibilite d'acheter des petits montants — pas besoin d'un lingot
          entier
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Or physique vs or papier
      </h2>
      <p>
        Deux grandes familles pour investir dans l'or :
      </p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Or physique</strong> (pieces, lingots, plateformes comme INAIA)
          — vous possedez reellement de l'or. C'est le plus conforme d'un point
          de vue charia. Inconvenient : frais de stockage et spreads a l'achat
        </li>
        <li>
          <strong>Or papier (ETCs)</strong> — des certificats adosses a de l'or
          physique, achetables via un courtier comme Trade Republic ou Degiro.
          Exemples :{" "}
          <strong>iShares Physical Gold</strong> (ticker IGLN),{" "}
          <strong>Amundi Physical Gold</strong> (ticker GOLD). Plus pratique et
          moins de frais, mais vous ne possedez pas l'or directement — certains
          savants considerent que c'est acceptable, d'autres non
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        La strategie : DCA sur l'or
      </h2>
      <p>
        La meilleure approche, c'est le <strong>DCA (Dollar Cost Averaging)</strong>{" "}
        : investir le meme montant chaque mois, par exemple 50 ou 100 EUR.
        Quand l'or est cher, vous en achetez moins. Quand il baisse, vous en
        achetez plus. Sur le long terme, ca lisse votre prix d'achat et vous
        evite le stress du timing.
      </p>
      <p>
        INAIA permet de faire exactement ca — un achat regulier, meme petit,
        sans se poser de questions.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Les limites
      </h2>
      <p>
        L'or ne produit pas de revenus (pas de dividendes, pas de loyers). Sa
        valeur depend uniquement de l'offre et la demande. Sur le tres long
        terme, les actions ont historiquement surperforme l'or (~10% vs ~7%).
        L'or est donc un <strong>complement</strong> a votre portefeuille, pas
        un remplacement. On recommande generalement 10-20% de votre portefeuille
        en or.
      </p>
    </GuideLayout>
  );
}
