import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — MuslimFinance",
  description:
    "Politique de confidentialité du site muslimfinance.net : données collectées, finalités, sous-traitants, droits RGPD.",
  alternates: { canonical: "https://muslimfinance.net/confidentialite" },
  robots: { index: false, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-5 py-14">
      <div className="max-w-2xl mx-auto prose-sm">
        <h1 className="text-3xl font-bold mb-8">
          Politique de confidentialité
        </h1>

        <h2 className="text-xl font-bold mt-8 mb-3">Qui traite tes données</h2>
        <p className="text-stone-700 leading-relaxed">
          Le site muslimfinance.net est édité par l&apos;éditeur de
          MuslimFinance. Contact pour toute question relative à tes données :{" "}
          <a href="mailto:guide@muslimfinance.net" className="underline">
            guide@muslimfinance.net
          </a>
          .
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Données collectées</h2>
        <p className="text-stone-700 leading-relaxed">
          Lorsque tu t&apos;inscris via un formulaire du site, nous
          enregistrons : ton adresse email, la date d&apos;inscription, la page
          d&apos;origine, les paramètres de campagne (UTM), ton adresse IP, ton
          navigateur (user-agent) et ton pays. Aucune donnée bancaire
          n&apos;est collectée — aucun paiement n&apos;a lieu sur ce site.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Finalité et base légale</h2>
        <p className="text-stone-700 leading-relaxed">
          Ces données servent uniquement à t&apos;envoyer l&apos;email de
          confirmation, les informations liées à la sortie du guide
          &laquo;&nbsp;Halal &amp; patrimoine&nbsp;&raquo; et le lien de
          commande au tarif inscrit. Base légale : ton consentement
          (inscription volontaire). Tu peux le retirer à tout moment en
          répondant STOP à n&apos;importe quel email — ton adresse est alors
          supprimée de la liste.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Sous-traitants</h2>
        <ul className="list-disc pl-6 text-stone-700 leading-relaxed">
          <li>
            <strong>Cloudflare</strong> — hébergement du site et stockage de la
            liste d&apos;inscrits.
          </li>
          <li>
            <strong>Resend</strong> — envoi des emails.
          </li>
          <li>
            <strong>Meta</strong> — mesure publicitaire (pixel et Conversions
            API). Ton email n&apos;est transmis à Meta que sous forme hachée
            (SHA-256), jamais en clair, uniquement pour mesurer l&apos;efficacité
            des campagnes.
          </li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Durée de conservation</h2>
        <p className="text-stone-700 leading-relaxed">
          Les données sont conservées le temps de la campagne de lancement du
          guide, puis au maximum 3 ans après ton dernier contact, ou supprimées
          immédiatement sur demande de désinscription.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Tes droits</h2>
        <p className="text-stone-700 leading-relaxed">
          Conformément au RGPD, tu disposes d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, d&apos;opposition et de portabilité
          sur tes données. Écris à{" "}
          <a href="mailto:guide@muslimfinance.net" className="underline">
            guide@muslimfinance.net
          </a>{" "}
          — réponse sous 30 jours. Tu peux aussi déposer une réclamation auprès
          de la CNIL (cnil.fr).
        </p>

        <p className="text-xs text-stone-500 mt-10">
          Dernière mise à jour : 19 juillet 2026.
        </p>
      </div>
    </main>
  );
}
