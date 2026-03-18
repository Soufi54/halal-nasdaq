import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Investir dans l'or",
  description:
    "L'or comme investissement halal. Formes d'achat, avantages, inconvenients et fiscalite.",
};

export default function Or() {
  return (
    <GuideLayout title="Investir dans l'or">
      <p className="text-lg">
        L'or est l'un des rares investissements unanimement considere comme
        halal. C'est un actif tangible, sans interet, et qui a preserve sa
        valeur depuis des millenaires.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Pourquoi l'or ?
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Halal par nature</strong> — pas de riba, pas de gharar
        </li>
        <li>
          <strong>Protection contre l'inflation</strong> — l'or conserve sa
          valeur quand les monnaies se deprecient
        </li>
        <li>
          <strong>Valeur refuge</strong> — en periode de crise, l'or monte
          generalement
        </li>
        <li>
          <strong>Diversification</strong> — peu correle aux marches actions
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Comment acheter de l'or ?
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Or physique</strong> (pieces, lingots) — le plus "pur" d'un
          point de vue halal. Achetable chez des revendeurs agrees (Gold.fr,
          AuCoffre, Comptoir de l'Or)
        </li>
        <li>
          <strong>Or papier (ETCs)</strong> — certificats adosses a de l'or
          physique. Plus pratique mais moins tangible. Exemples : iShares
          Physical Gold, Amundi Physical Gold
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Les limites
      </h2>
      <p>
        L'or ne produit pas de revenus (pas de dividendes, pas de loyers). Sa
        valeur depend uniquement de l'offre et la demande. Sur le tres long
        terme, les actions ont historiquement surperforme l'or. L'or est donc
        un complement, pas un remplacement, a un portefeuille diversifie.
      </p>
    </GuideLayout>
  );
}
