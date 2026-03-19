import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "Acheter des actions halal — Guide complet",
  description:
    "Screeners, criteres AAOIFI, purification, courtiers, ETFs halal europeens. Tout pour investir en bourse de maniere conforme.",
};

export default function ActionsBoursieres() {
  return (
    <GuideLayout title="Acheter des actions halal">
      <p className="text-lg">
        Investir en bourse en tant que musulman, c'est tout a fait possible. Il
        faut juste verifier que chaque action respecte les criteres de la charia.
        Avec les bons outils, ca prend 5 minutes. Voici le guide complet.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        1. Utilisez un screener halal
      </h2>
      <p>
        Un screener analyse automatiquement les bilans des entreprises et vous
        dit si une action est halal ou non. Voici les meilleurs :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a
            href="https://zoya.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            <strong>Zoya</strong>
          </a>{" "}
          — le plus complet. Standard AAOIFI, 30 000+ actions, ratio de
          purification inclus. Version gratuite disponible
        </li>
        <li>
          <a
            href="https://musaffa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            <strong>Musaffa</strong>
          </a>{" "}
          — 120 000+ actions sur 64 marches. Tres bonne couverture
          internationale
        </li>
        <li>
          <a
            href="https://www.islamicly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            <strong>Islamicly</strong>
          </a>{" "}
          — 30 000+ actions, interface simple et claire
        </li>
        <li>
          <strong>MuslimXChange</strong> — alternative interessante, communaute
          active
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        2. Comprendre les criteres AAOIFI
      </h2>
      <p>
        Le standard AAOIFI est le plus utilise pour evaluer la conformite d'une
        action. Concretement, une entreprise doit respecter ces seuils :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Activite principale licite</strong> — pas d'alcool, tabac,
          armes, jeux d'argent, pornographie, banque/assurance conventionnelle
        </li>
        <li>
          <strong>Dette / capitalisation boursiere &lt; 33%</strong> —
          l'entreprise ne doit pas etre trop endettee
        </li>
        <li>
          <strong>Depots porteurs d'interets &lt; 30%</strong> de la
          capitalisation
        </li>
        <li>
          <strong>Revenus haram &lt; 5%</strong> du chiffre d'affaires total
        </li>
      </ul>
      <p>
        Les screeners font ce travail automatiquement — vous n'avez pas besoin
        de calculer ca vous-meme.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        3. Purification des dividendes
      </h2>
      <p>
        Meme une action classee halal peut avoir une petite part de revenus non
        conformes (par exemple, des interets sur la tresorerie). La purification
        consiste a calculer ce pourcentage et a donner le montant equivalent en
        sadaqa (charite).
      </p>
      <p>
        En pratique : les screeners comme Zoya et Musaffa vous donnent
        directement le <strong>ratio de purification</strong>. Si c'est 2%, vous
        donnez 2% de vos dividendes en charite. Simple.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        4. Ou acheter ? Les courtiers accessibles en France
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Trade Republic</strong> — notre recommandation. Les
          investissements programmes (DCA automatique) sont gratuits. Interface
          simple, acces aux marches US et europeens
        </li>
        <li>
          <strong>Degiro</strong> — frais tres bas, large choix de marches.
          Interface un peu moins intuitive
        </li>
        <li>
          <strong>Trading 212</strong> — zero commission sur les actions,
          fractions d'actions disponibles
        </li>
      </ul>
      <p>
        Attention : pour acheter des actions US, il vous faut un{" "}
        <strong>CTO (Compte-Titres Ordinaire)</strong>. Le PEA ne permet pas
        d'acheter directement des actions americaines.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        5. ETFs halal accessibles en Europe
      </h2>
      <p>
        Si vous preferez un seul produit diversifie plutot que des actions
        individuelles, voici les ETFs halal achetables depuis la France :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>ISDU</strong> (iShares MSCI USA Islamic UCITS ETF) — expose
          aux grandes entreprises US halal, frais 0.30%/an
        </li>
        <li>
          <strong>ISDW</strong> (iShares MSCI World Islamic UCITS ETF) —
          diversification mondiale, frais 0.30%/an
        </li>
        <li>
          <strong>IGDA</strong> (Invesco Dow Jones Islamic Global Developed
          Markets) — alternative, frais 0.40%/an
        </li>
      </ul>
      <p>
        Note : vous avez peut-etre entendu parler de <strong>SPUS</strong> ou{" "}
        <strong>HLAL</strong>. Ces ETFs existent mais sont listes aux USA — ils
        ne sont pas directement accessibles aux residents francais a cause de la
        reglementation PRIIPs (pas de KID europeen). Les 3 ETFs ci-dessus sont
        les alternatives europeennes.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        6. Reconstituer un indice halal vous-meme
      </h2>
      <p>
        Si vous voulez eviter les frais des ETFs et avoir un controle total,
        vous pouvez reconstituer l'indice vous-meme en achetant les actions
        individuelles. C'est exactement ce que nos outils permettent :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a
            href="/nasdaq-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            NASDAQ 100 Halal
          </a>{" "}
          — les meilleures entreprises tech filtrees
        </li>
        <li>
          <a
            href="/sp500-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            S&P 500 Halal
          </a>{" "}
          — l'indice de reference americain, version halal
        </li>
      </ul>
      <p>
        Entrez votre montant et vous obtenez la repartition exacte. Combinez ca
        avec le DCA mensuel sur Trade Republic et vous avez une strategie solide.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        La strategie recommandee
      </h2>
      <p>
        Pour la plupart des gens : ouvrez un compte Trade Republic, mettez en
        place un investissement programme mensuel (DCA) sur un ETF halal comme
        ISDU, ou reconstituez l'indice avec nos outils. Commencez avec ce que
        vous pouvez, meme 50 EUR/mois. La regularite bat le timing.
      </p>
    </GuideLayout>
  );
}
