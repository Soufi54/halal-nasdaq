import type { Metadata } from "next";
import { GuideLayout } from "@/components/guide-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recapitulatif des investissements halal",
  description:
    "Vue d'ensemble de toutes les options d'investissement conformes a la charia : actions, ETFs, or, immobilier, et plus.",
};

export default function Recapitulatif() {
  return (
    <GuideLayout title="Recapitulatif des investissements halal">
      <p className="text-lg">
        Toutes les options d'investissement conformes (ou potentiellement
        conformes) a la charia, classees par type. Chacune a ses avantages et
        ses limites.
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
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Actions individuelles halal
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span> (avec
                screening)
              </td>
              <td className="py-3 px-4">7-12% /an (historique)</td>
              <td className="py-3 pl-4">Moyenne</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                ETFs halal (SPUS, HLAL)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">7-10% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Or physique / ETCs
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">3-8% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Immobilier (comptant / murabaha)
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-halal)]">Halal</span>
              </td>
              <td className="py-3 px-4">5-8% brut</td>
              <td className="py-3 pl-4">Difficile</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Crowdfunding immobilier
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-doubtful)]">A verifier</span>
              </td>
              <td className="py-3 px-4">6-12% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                SCPI
              </td>
              <td className="py-3 px-4">
                <span className="text-[var(--color-doubtful)]">
                  Controverse
                </span>
              </td>
              <td className="py-3 px-4">4-6% /an</td>
              <td className="py-3 pl-4">Facile</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium text-[var(--foreground)]">
                Assurance vie / Livrets
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
        Notre recommandation
      </h2>
      <p>
        Pour la plupart des gens, la strategie la plus simple est de combiner :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Un matelas de securite</strong> (3-6 mois de depenses) sur un
          compte courant
        </li>
        <li>
          <strong>Un investissement passif en actions halal</strong> via des
          ETFs (SPUS, HLAL) ou en{" "}
          <Link
            href="/nasdaq-halal"
            className="text-[var(--color-gold)] hover:underline"
          >
            reconstituant l'indice vous-meme
          </Link>
        </li>
        <li>
          <strong>Un peu d'or</strong> pour la diversification (5-15% du
          portefeuille)
        </li>
        <li>
          <strong>De l'immobilier</strong> si vous avez le capital et le temps
        </li>
      </ul>
    </GuideLayout>
  );
}
