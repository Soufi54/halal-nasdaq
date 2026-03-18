import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Actions boursieres halal",
  description:
    "Guide complet pour investir en bourse de maniere halal. Screeners, criteres AAOIFI, purification, et plateformes.",
};

export default function ActionsBoursieres() {
  return (
    <GuideLayout title="Actions boursieres halal">
      <p className="text-lg">
        Investir en bourse en tant que musulman, c'est possible — mais ca
        demande de verifier que chaque action respecte les criteres de la
        charia. Voici comment faire.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        1. Utilisez un screener
      </h2>
      <p>
        Aucune action n'est 100% halal de maniere evidente. Il faut verifier
        les ratios financiers de chaque entreprise. Heureusement, des outils
        existent pour faire ce travail automatiquement :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Zoya.finance</strong> — le plus complet, standard AAOIFI,
          30 000+ actions couvertes
        </li>
        <li>
          <strong>Musaffa.com</strong> — 120 000+ actions, 64 marches
        </li>
        <li>
          <strong>Islamicly</strong> — 30 000+ actions, interface simple
        </li>
      </ul>
      <p>
        Ces screeners verifient les criteres financiers (dette, revenus
        d'interets, activites interdites) et classent chaque action en Halal,
        Doubtful ou Not Halal.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        2. Comprendre les criteres AAOIFI
      </h2>
      <p>
        Le standard AAOIFI evalue chaque entreprise sur :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Activite principale :</strong> pas d'alcool, tabac, armes,
          jeux d'argent, pornographie, banque/assurance conventionnelle
        </li>
        <li>
          <strong>Dette/capitalisation &lt; 30%</strong> — l'entreprise ne
          doit pas etre trop endettee
        </li>
        <li>
          <strong>Revenus d'interets &lt; 5%</strong> du chiffre d'affaires
        </li>
        <li>
          <strong>Revenus illicites &lt; 5%</strong> du total
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        3. Purification des dividendes
      </h2>
      <p>
        Meme une action halal peut avoir une petite part de revenus non
        conformes (ex: interets sur la tresorerie). Le concept de
        "purification" consiste a calculer le pourcentage de revenus impurs et
        a donner ce montant en sadaqa (charite). Les screeners comme Zoya
        fournissent le ratio de purification.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        4. Ou acheter ?
      </h2>
      <p>
        N'importe quel courtier classique permet d'acheter des actions
        individuelles halal. En France, les options courantes sont :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Trade Republic, DEGIRO, Interactive Brokers</strong> — courtiers generalistes avec acces aux marches US
        </li>
        <li>
          <strong>Lina Finance</strong> — courtier specifiquement halal (francais)
        </li>
      </ul>
      <p>
        Attention : un CTO (Compte-Titres Ordinaire) est necessaire pour les
        actions US. Le PEA ne permet pas d'acheter directement des actions
        americaines.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        5. Reconstituer un indice halal
      </h2>
      <p>
        C'est exactement ce que fait{" "}
        <a
          href="/nasdaq-halal"
          className="text-[var(--color-gold)] hover:underline"
        >
          notre outil NASDAQ 100 Halal
        </a>{" "}
        : on prend un indice de reference, on retire les actions non conformes,
        et on redistribue les poids. Ca permet d'avoir une exposition
        diversifiee a la bourse americaine tout en restant conforme.
      </p>
    </GuideLayout>
  );
}
