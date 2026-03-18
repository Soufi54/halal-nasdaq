import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Immobilier physique halal",
  description:
    "Investir dans l'immobilier sans riba. Financement halal, murabaha, alternatives au pret classique.",
};

export default function Immobilier() {
  return (
    <GuideLayout title="Immobilier physique">
      <p className="text-lg">
        L'immobilier est un des investissements preferes des musulmans — c'est
        tangible, utile et potentiellement tres rentable. Le principal defi :
        financer l'achat sans recourir au pret bancaire classique (riba).
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Le probleme du pret classique
      </h2>
      <p>
        Un pret immobilier classique implique le paiement d'interets, ce qui
        constitue du riba — interdit en Islam de maniere unanime par les
        savants. Cependant, des alternatives existent.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Alternatives halal
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Murabaha immobiliere :</strong> la banque achete le bien et
          vous le revend avec une marge connue d'avance, payable en
          mensualites. Pas d'interet variable. Proposee en France par 570easi
          et quelques banques partenaires.
        </li>
        <li>
          <strong>Ijara (location-vente) :</strong> vous louez le bien a la
          banque avec une option d'achat. Chaque loyer integre une part de
          rachat. A la fin du contrat, vous etes proprietaire.
        </li>
        <li>
          <strong>Achat comptant :</strong> le plus simple mais demande un
          capital important. Possible pour des petites surfaces ou des biens
          decotes (encheres, travaux).
        </li>
        <li>
          <strong>Achat a plusieurs (tontine islamique) :</strong> des
          groupes de musulmans mutualisent leur epargne pour acheter a tour de
          role. Systeme informel mais pratique.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Rentabilite
      </h2>
      <p>
        L'immobilier locatif genere des revenus reguliers (loyers) et une
        plus-value potentielle a la revente. En France, un rendement brut de
        5-8% est atteignable dans certaines villes de province. L'investissement
        immobilier demande cependant du temps, de la gestion, et comporte des
        risques (vacance locative, travaux, impots).
      </p>
    </GuideLayout>
  );
}
