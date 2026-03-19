import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tous les investissements halal — Recapitulatif",
  description:
    "Vue d'ensemble complete de toutes les options d'investissement conformes a la charia : actions, ETFs, or, immobilier, SCPI, assurance vie, PER, et plus.",
};

export default function Recapitulatif() {
  return (
    <GuideLayout title="Tous les investissements halal">
      <p className="text-lg">
        Toutes les options d'investissement conformes (ou potentiellement
        conformes) a la charia, classees par type. Un tableau pour tout voir
        d'un coup, et une strategie recommandee a la fin.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 pr-4 text-left font-semibold text-[var(--foreground)]">
                Investissement
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[var(--foreground)]">
                Statut halal
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[var(--foreground)]">
                Rendement
              </th>
              <th className="py-3 pl-4 text-left font-semibold text-[var(--foreground)]">
                Difficulte
              </th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-muted-foreground)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Actions individuelles halal
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span> (avec
                screening)
              </td>
              <td className="py-3 px-4">7-13% /an</td>
              <td className="py-3 pl-4">Moyenne</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                ETFs halal (ISDU, ISDW, IGDA)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">~10% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Or physique / ETCs
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">~7% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Immobilier (comptant / murabaha)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">5-8% brut</td>
              <td className="py-3 pl-4">Difficile</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Immobilier HLM / bailleurs sociaux
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">7-10% brut</td>
              <td className="py-3 pl-4">Moyenne</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Assurance vie halal (570easi)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">~4% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                PER halal (Perennys, 570easi)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span> +
                defiscalisant
              </td>
              <td className="py-3 px-4">~4% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                SCPI Fair Invest (570easi)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-doubtful)]">
                  Controverse
                </span>
              </td>
              <td className="py-3 px-4">~4% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Crowdfunding immobilier
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-doubtful)]">A verifier</span>
              </td>
              <td className="py-3 px-4">6-12% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Luxe (montres &lt; 5K)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">&gt;10% /an</td>
              <td className="py-3 pl-4">Expertise requise</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Investissement prive (business)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span> (si
                activite licite)
              </td>
              <td className="py-3 px-4">Variable</td>
              <td className="py-3 pl-4">Tres difficile</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Assurance vie classique / Livrets
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-haram)]">
                  Non conforme
                </span>{" "}
                (riba)
              </td>
              <td className="py-3 px-4">2-3% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-[var(--foreground)] pt-4">
        Strategie recommandee
      </h2>
      <p>
        Voici la repartition qu'on recommande pour la plupart des gens, par
        ordre de priorite :
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        <li>
          <strong>Matelas de securite (3-6 mois de depenses)</strong> — sur un
          compte courant, accessible immediatement. C'est la base, ne touchez
          jamais a cet argent pour investir
        </li>
        <li>
          <strong>ETF halal ou reconstitution d'indice en DCA (~50-70%)</strong>{" "}
          — c'est le moteur de croissance de votre portefeuille. ISDU ou ISDW
          sur Trade Republic (programme gratuit), ou reconstituez l'indice avec
          nos outils{" "}
          <Link
            href="/nasdaq-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            NASDAQ 100 Halal
          </Link>{" "}
          et{" "}
          <Link
            href="/sp500-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            S&P 500 Halal
          </Link>
        </li>
        <li>
          <strong>Or via{" "}
          <a
            href="https://www.inaia.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            INAIA
          </a>{" "}
          (~10-20%)</strong>{" "}
          — diversification et protection. Comportement inverse aux actions,
          valeur refuge en periode de crise
        </li>
        <li>
          <strong>Immobilier si capital suffisant</strong> — quand vous avez
          assez pour acheter comptant ou via murabaha. Regardez les biens HLM
          sur{" "}
          <a
            href="https://www.bienveo.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline"
          >
            Bienveo
          </a>{" "}
          en priorite
        </li>
      </ol>
      <p>
        L'important n'est pas le montant mais la regularite. Meme 50 EUR/mois
        investis de maniere consistante pendant 20 ans generent un capital
        significatif. Commencez maintenant.
      </p>
    </GuideLayout>
  );
}
