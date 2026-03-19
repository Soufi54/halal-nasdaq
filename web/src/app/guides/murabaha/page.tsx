import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";

export const metadata: Metadata = {
  title: "La Murabaha immobiliere — Guide complet et simulations",
  description:
    "Comment fonctionne la Murabaha immobiliere en France. Simulations concretes, comparaison avec le credit classique, cout reel, et conseils pratiques.",
};

export default function Murabaha() {
  return (
    <GuideLayout title="La Murabaha immobiliere">
      <p className="text-lg">
        La Murabaha, c'est l'alternative halal au pret immobilier classique. Le
        principe : la banque achete le bien pour vous, puis vous le revend avec
        une marge fixe connue d'avance. Pas d'interet variable, pas de riba.
        Mais ca a un cout. On vous explique tout, chiffres a l'appui.
      </p>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--color-gold-muted)] p-4 my-6">
        <p className="text-sm font-medium text-[var(--foreground)]">
          Les simulations ci-dessous sont basees sur des donnees reelles de
          Chaabi Bank, anonymisees. Ce ne sont pas des offres — les conditions
          dependent de votre profil. Contactez directement la banque pour une
          simulation personnalisee.
        </p>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Comment ca marche
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          Vous trouvez un bien immobilier et negociez le prix avec le vendeur
        </li>
        <li>
          La banque <strong>achete le bien</strong> a votre place (elle paie le
          vendeur + les frais d'acquisition)
        </li>
        <li>
          La banque vous <strong>revend le bien</strong> a un prix superieur,
          avec une marge fixe connue des le depart
        </li>
        <li>
          Vous payez ce prix en <strong>mensualites fixes</strong> sur 10, 15
          ou 20 ans
        </li>
      </ol>
      <p>
        La difference avec un pret classique : il n'y a pas de taux d'interet.
        La marge de la banque est fixee une fois pour toutes au moment de la
        signature. Elle ne change jamais, meme si les taux du marche bougent.
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
        Comparaison avec un credit classique
      </h2>
      <p>
        Soyons honnetes : la Murabaha coute plus cher qu'un pret bancaire
        classique. Voici la comparaison sur les memes montants, avec un taux
        classique a 3.2% (moyenne France 2024-2025) :
      </p>
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
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Difference</td>
              <td className="py-2 px-4 text-right font-mono text-[var(--color-haram)]" colSpan={2}>
                ~5 900 EUR de plus en Murabaha (+30%)
              </td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">250K sur 20 ans</td>
              <td className="py-2 px-4 text-right font-mono">~122 800 EUR de marge</td>
              <td className="py-2 pl-4 text-right font-mono">~82 600 EUR d'interets</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-[var(--foreground)]">Difference</td>
              <td className="py-2 px-4 text-right font-mono text-[var(--color-haram)]" colSpan={2}>
                ~40 200 EUR de plus en Murabaha (+49%)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        La Murabaha coute environ <strong>30 a 50% de plus</strong> qu'un
        credit classique selon la duree. Plus la duree est longue, plus l'ecart
        se creuse. C'est le prix de la conformite — a vous de decider si ca
        vaut le coup pour votre situation.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Les frais a ne pas oublier
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Frais d'acquisition par la banque</strong> — la banque paie
          les frais de notaire quand elle achete le bien (~5 000 a 6 500 EUR).
          Ces frais sont integres dans le montant finance
        </li>
        <li>
          <strong>Frais de vente (notaire)</strong> — quand la banque vous
          revend le bien, il y a des frais de notaire supplementaires (~16 000
          a 23 000 EUR). C'est la double mutation : la banque achete, puis vous
          vend. Deux transactions = deux fois des frais de notaire
        </li>
        <li>
          <strong>Frais de dossier</strong> — environ 1 000 EUR
        </li>
      </ul>
      <p>
        La double mutation est le gros inconvenient de la Murabaha : vous payez
        les frais de notaire deux fois. Sur un bien a 250K, ca represente
        environ 23 000 EUR de frais de notaire au total (deduits de votre
        apport).
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        570easi ou directement la banque ?
      </h2>
      <p>
        Beaucoup de gens connaissent{" "}
        <a
          href="https://570easi.com/fr/immobilier/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-gold)] hover:underline"
        >
          570easi
        </a>{" "}
        pour la Murabaha immobiliere. Ce qu'il faut comprendre :{" "}
        <strong>570easi est un intermediaire</strong>, pas une banque. Ils vous
        mettent en relation avec Chaabi Bank (ou d'autres partenaires) et
        prennent une commission au passage.
      </p>
      <p>
        <strong>Notre conseil :</strong> pour la Murabaha immobiliere,
        contactez <strong>directement Chaabi Bank</strong>. Vous aurez les
        memes conditions sans la commission de l'intermediaire. Demandez une
        simulation — c'est gratuit et sans engagement.
      </p>
      <p>
        En revanche, pour les <strong>SCPI</strong> (comme Fair Invest) et les{" "}
        <strong>assurances vie halal</strong>, 570easi apporte une vraie
        valeur ajoutee car ils ont negocie des produits specifiques qu'on ne
        trouve pas ailleurs.
      </p>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Comment reduire le cout
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Augmentez votre apport au maximum.</strong> La simulation 1
          (44% d'apport) coute proportionnellement moins cher que la simulation
          2 (20% d'apport). Plus votre apport est eleve, moins la marge de la
          banque est importante
        </li>
        <li>
          <strong>Reduisez la duree.</strong> 10 ans coute ~3.6% equivalent,
          20 ans coute ~4.2%. L'ecart parait faible mais sur 20 ans ca fait
          des dizaines de milliers d'euros de difference
        </li>
        <li>
          <strong>Explorez les achats HLM.</strong> Un bien a 180K achete a un
          bailleur social (20-30% sous le marche) avec un bon apport peut
          rendre la Murabaha beaucoup plus accessible. Voir notre{" "}
          <a
            href="/guides/immobilier"
            className="text-[var(--color-gold)] hover:underline"
          >
            guide immobilier
          </a>
        </li>
        <li>
          <strong>Achetez comptant si possible.</strong> C'est la solution la
          plus economique. Pas de marge, pas de double mutation, pas de frais
          de dossier. Voir{" "}
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
                  <li>Marge fixe, pas de surprise</li>
                  <li>Pas d'interet variable</li>
                  <li>Permet l'effet de levier sans riba</li>
                </ul>
              </td>
              <td className="py-2 pl-4">
                <ul className="list-disc pl-4 space-y-1">
                  <li>30-50% plus cher qu'un credit classique</li>
                  <li>Double mutation = double frais de notaire</li>
                  <li>Processus plus long (3-4 mois)</li>
                  <li>Peu de banques proposent le produit en France</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </GuideLayout>
  );
}
