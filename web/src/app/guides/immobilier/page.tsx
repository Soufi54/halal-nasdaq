import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Immobilier sans riba — Guide complet",
  description:
    "Devenir proprietaire sans pret bancaire. Murabaha 570easi, achat comptant, strategie HLM, et toutes les alternatives halal.",
};

export default function Immobilier() {
  return (
    <GuideLayout title="Immobilier sans riba">
      <p className="text-lg">
        L'immobilier est un des investissements preferes des musulmans — c'est
        tangible, utile et potentiellement tres rentable. Le defi : financer
        l'achat sans recourir au pret bancaire classique (riba). Bonne
        nouvelle : il existe plusieurs strategies concretes. On vous les
        detaille.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        1. Achat comptant — la voie royale
      </h2>
      <p>
        La methode la plus simple et la plus halal : payer cash. Ca parait
        impossible mais c'est plus accessible qu'on ne le pense, surtout avec
        les strategies HLM qu'on detaille plus bas.
      </p>
      <p>
        Le livre de reference sur le sujet :{" "}
        <a
          href="https://proprietairesansriba.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-gold)] hover:underline"
        >
          proprietairesansriba.com
        </a>
        . Il propose un ebook gratuit{" "}
        <strong>"10 strategies pour devenir proprietaire sans banques"</strong>.
        A lire absolument.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        2. Murabaha avec 570easi
      </h2>
      <p>
        La{" "}
        <a
          href="https://570easi.com/fr/immobilier/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-gold)] hover:underline"
        >
          murabaha immobiliere via 570easi
        </a>{" "}
        est l'alternative au pret classique la plus structuree en France. Le
        principe : 570easi achete le bien pour vous et vous le revend avec une
        marge fixe connue d'avance, payable en mensualites. Pas d'interet
        variable.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Contact recommande : Abdelkarim Boutera</li>
        <li>Processus plus long qu'un pret classique — prevoyez 3-4 mois</li>
        <li>La marge est generalement superieure au taux d'un pret classique, mais c'est le prix de la conformite</li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        3. Strategie HLM / bailleurs sociaux — le bon plan meconnu
      </h2>
      <p>
        C'est probablement la strategie la plus sous-estimee pour acheter sans
        riba. Voici comment ca marche :
      </p>
      <p>
        Depuis la <strong>loi ELAN</strong>, les bailleurs sociaux sont
        encourages a vendre une partie de leur patrimoine. Resultat : des
        appartements vendus <strong>20 a 30% sous le prix du marche</strong>,
        avec des frais de notaire reduits (3-4% au lieu de 7-8% dans l'ancien).
      </p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Ou trouver ces biens ?</strong> —{" "}
          <a
            href="https://www.bienveo.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            Bienveo
          </a>{" "}
          (plateforme officielle), Havitat, ProprietaireMaintenant
        </li>
        <li>
          <strong>Grands bailleurs qui vendent :</strong> Seqens, 3F, Logirep,
          CDC Habitat — consultez leurs sites directement
        </li>
        <li>
          <strong>Clause de rachat 10 ans :</strong> si vous avez un probleme,
          le bailleur peut racheter le bien. C'est un filet de securite
        </li>
        <li>
          <strong>Astuce importante :</strong> achetez{" "}
          <strong>au prix affiche</strong> (article L.443-12-1 du Code de la
          Construction et de l'Habitation). Si vous payez le prix fixe par le
          bailleur sans negocier en dessous, il n'y a pas de clause
          anti-speculative. Vous pouvez donc revendre librement et fixer le
          loyer librement si vous mettez en location
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        4. Autres strategies
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Achat a plusieurs (tontine islamique) :</strong> des groupes
          de musulmans mutualisent leur epargne pour acheter a tour de role.
          Systeme informel mais qui fonctionne
        </li>
        <li>
          <strong>Ijara (location-vente) :</strong> vous louez le bien a un
          financeur islamique avec une option d'achat. Chaque loyer integre une
          part de rachat
        </li>
        <li>
          <strong>Encheres judiciaires :</strong> des biens vendus par les
          tribunaux, souvent 20-40% sous le marche. Achat comptant obligatoire —
          parfait si vous avez le cash
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Les chiffres a retenir
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Frais de notaire :</strong> ancien 7-8%, neuf ou HLM 3-4%
        </li>
        <li>
          <strong>Rendement vise :</strong> 7% brut minimum pour que
          l'investissement locatif soit interessant
        </li>
        <li>
          <strong>HLM :</strong> prix 20-30% sous le marche = rentabilite
          superieure des le depart
        </li>
      </ul>
    </GuideLayout>
  );
}
