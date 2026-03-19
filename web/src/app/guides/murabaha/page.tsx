import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "La Murabaha immobiliere — Simulations et comparaison honnete",
  description:
    "Comment fonctionne la Murabaha en France. Simulations concretes, pourquoi c'est plus cher qu'un credit classique, frais caches, et conseils pour reduire le cout.",
};

export default function Murabaha() {
  return (
    <GuideLayout title="La Murabaha immobiliere">
      <p className="text-lg">
        La Murabaha, c'est l'alternative halal au pret immobilier. Le principe
        est simple : une banque achete le bien pour vous, puis vous le revend
        avec une marge fixe. Pas d'interet, pas de taux variable. Mais ce
        mecanisme a un cout — et il est important de le comprendre avant de
        s'engager.
      </p>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--color-gold-muted)] p-4 my-6">
        <p className="text-sm font-medium text-[var(--foreground)]">
          Les simulations ci-dessous sont basees sur des conditions reelles
          proposees par une banque operant en France. Les montants sont
          arrondis. Ce ne sont pas des offres — demandez votre propre
          simulation aupres d'un etablissement qui propose ce service.
        </p>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Comment ca marche
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          Vous trouvez un bien et negociez le prix avec le vendeur
        </li>
        <li>
          La banque <strong>achete le bien</strong> a votre place (elle paie le
          vendeur + les frais d'acquisition)
        </li>
        <li>
          La banque vous <strong>revend le bien</strong> a un prix superieur.
          La difference, c'est sa marge — fixee une fois pour toutes au moment
          de la signature
        </li>
        <li>
          Vous remboursez en <strong>mensualites fixes</strong> sur 10, 15 ou
          20 ans
        </li>
      </ol>
      <p>
        Contrairement a un pret classique, il n'y a pas de taux d'interet. La
        marge ne bouge jamais — meme si les taux du marche montent ou
        descendent.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Simulation 1 — Bien a 180 000 EUR sur 10 ans
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Prix du bien</td>
              <td className="py-2 text-right font-mono">180 000 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Apport personnel</td>
              <td className="py-2 text-right font-mono">80 000 EUR (44%)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Montant finance</td>
              <td className="py-2 text-right font-mono">~121 000 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Duree</td>
              <td className="py-2 text-right font-mono">10 ans (120 mois)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Mensualite</td>
              <td className="py-2 text-right font-mono">~1 215 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Marge de la banque</td>
              <td className="py-2 text-right font-mono text-[var(--color-gold)]">~25 700 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Prix total paye</td>
              <td className="py-2 text-right font-mono font-bold">~210 000 EUR</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Equivalent taux annuel</td>
              <td className="py-2 text-right font-mono">~3.6%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Simulation 2 — Bien a 250 000 EUR sur 20 ans
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Prix du bien</td>
              <td className="py-2 text-right font-mono">250 000 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Apport personnel</td>
              <td className="py-2 text-right font-mono">50 000 EUR (20%)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Montant finance</td>
              <td className="py-2 text-right font-mono">~229 000 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Duree</td>
              <td className="py-2 text-right font-mono">20 ans (240 mois)</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Mensualite</td>
              <td className="py-2 text-right font-mono">~1 463 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Marge de la banque</td>
              <td className="py-2 text-right font-mono text-[var(--color-gold)]">~122 800 EUR</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Prix total paye</td>
              <td className="py-2 text-right font-mono font-bold">~378 000 EUR</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Equivalent taux annuel</td>
              <td className="py-2 text-right font-mono">~4.2%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Pourquoi la Murabaha coute plus cher
      </h2>
      <p>
        Un credit classique en France tourne autour de 3 a 3.5% en 2024-2025.
        La Murabaha sort a 3.6% sur 10 ans et 4.2% sur 20 ans. D'ou vient la
        difference ?
      </p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>La double mutation.</strong> C'est le facteur principal. Dans
          un pret classique, la banque vous prete de l'argent — il n'y a qu'une
          seule vente (vendeur → vous). En Murabaha, il y a{" "}
          <strong>deux ventes</strong> : vendeur → banque, puis banque → vous.
          Chaque vente genere des frais de notaire. Vous payez donc les frais
          deux fois. Sur un bien a 250K, ca represente environ 23 000 EUR de
          frais au total, contre ~18 000 EUR en classique
        </li>
        <li>
          <strong>Le cout de portage.</strong> La banque achete le bien avant de
          vous le revendre. Pendant ce temps, elle porte le risque. Ce risque a
          un prix, integre dans la marge
        </li>
        <li>
          <strong>Un marche de niche.</strong> Tres peu de banques proposent la
          Murabaha en France. Moins de concurrence = moins de pression sur les
          prix. Un marche du credit classique avec des dizaines de banques en
          competition tire les taux vers le bas — ce n'est pas le cas ici
        </li>
        <li>
          <strong>Les frais de dossier.</strong> Environ 1 000 EUR, comparables
          a ceux d'un credit classique
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        La comparaison en chiffres
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3 pr-4 text-left font-semibold text-[var(--foreground)]">Scenario</th>
              <th className="py-3 px-4 text-right font-semibold text-[var(--foreground)]">Murabaha</th>
              <th className="py-3 pl-4 text-right font-semibold text-[var(--foreground)]">Credit classique (3.2%)</th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">180K sur 10 ans</td>
              <td className="py-2 px-4 text-right font-mono">~25 700 EUR de marge</td>
              <td className="py-2 pl-4 text-right font-mono">~19 800 EUR d'interets</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">250K sur 20 ans</td>
              <td className="py-2 px-4 text-right font-mono">~122 800 EUR de marge</td>
              <td className="py-2 pl-4 text-right font-mono">~82 600 EUR d'interets</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sur 10 ans, la difference est d'environ 6 000 EUR. Sur 20 ans, elle
        grimpe a 40 000 EUR. C'est significatif. Chacun doit evaluer ce que
        ca represente par rapport a ses revenus, ses convictions, et ses
        alternatives (achat comptant, HLM, etc.).
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        570easi : intermediaire, pas banque
      </h2>
      <p>
        <a
          href="https://570easi.com/fr/immobilier/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-gold)] hover:underline"
        >
          570easi
        </a>{" "}
        est souvent le premier nom qu'on entend quand on parle de Murabaha en
        France. Mais il faut comprendre leur role :{" "}
        <strong>570easi est un courtier</strong>, pas une banque. Ils font
        l'intermediaire entre vous et la banque qui propose le produit — et
        ils prennent une commission pour ce service.
      </p>
      <p>
        Pour la Murabaha immobiliere, il est souvent plus avantageux de
        contacter <strong>directement la banque</strong> qui propose ce service
        en France. Vous obtiendrez les memes conditions sans la commission de
        l'intermediaire. Demandez une simulation — c'est gratuit et sans
        engagement.
      </p>
      <p>
        En revanche, 570easi est pertinent pour d'autres produits ou ils
        apportent une vraie valeur ajoutee : les <strong>SCPI halal</strong>{" "}
        (comme Fair Invest) et les <strong>assurances vie conformes</strong>,
        qui sont des produits qu'ils ont eux-memes structures et qu'on ne
        trouve pas ailleurs.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Comment reduire le cout
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Maximisez votre apport.</strong> La simulation a 44% d'apport
          revient a ~3.6%/an equivalent. Celle a 20% d'apport revient a
          ~4.2%/an. Chaque euro d'apport en plus reduit la marge de la banque
        </li>
        <li>
          <strong>Reduisez la duree.</strong> 10 ans coute beaucoup moins cher
          que 20 ans — pas seulement parce que vous payez moins longtemps, mais
          aussi parce que le taux equivalent est plus bas
        </li>
        <li>
          <strong>Visez les biens HLM.</strong> Un bien a 180K achete a un
          bailleur social (20-30% sous le marche) avec un gros apport peut
          rendre la Murabaha tout a fait accessible. Voir notre{" "}
          <a
            href="/guides/immobilier"
            className="text-[var(--color-gold)] hover:underline"
          >
            guide immobilier
          </a>
        </li>
        <li>
          <strong>Achetez comptant si vous pouvez.</strong> Zero marge, zero
          double mutation, zero frais de dossier. C'est la solution la plus
          economique. Voir{" "}
          <a
            href="https://proprietairesansriba.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            proprietairesansriba.com
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        En resume
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3 pr-4 text-left font-semibold text-[var(--foreground)]">Avantages</th>
              <th className="py-3 pl-4 text-left font-semibold text-[var(--foreground)]">Inconvenients</th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-muted-foreground)] align-top">
            <tr>
              <td className="py-2 pr-4">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Conforme a la charia</li>
                  <li>Marge fixe — pas de mauvaise surprise</li>
                  <li>Pas d'interet variable</li>
                  <li>Permet d'acheter sans payer comptant</li>
                </ul>
              </td>
              <td className="py-2 pl-4">
                <ul className="list-disc pl-4 space-y-1">
                  <li>30 a 50% plus cher qu'un credit classique</li>
                  <li>Double frais de notaire (double mutation)</li>
                  <li>Processus plus long (3-4 mois)</li>
                  <li>Tres peu de banques le proposent en France</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        La Murabaha n'est pas parfaite. Elle coute plus cher, et c'est normal
        — le mecanisme est structurellement plus complexe qu'un simple pret.
        Mais pour ceux qui veulent acceder a la propriete tout en restant
        conformes, c'est aujourd'hui la seule option structuree en France.
        A chacun de peser le cout financier face a l'importance qu'il accorde
        a la conformite.
      </p>
    </GuideLayout>
  );
}
