import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero — parle a quelqu'un qui debute */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14">
          <p className="inline-block rounded-full bg-[var(--color-navy)]/5 px-4 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] mb-8 tracking-wide">
            Pas un conseil financier — un point de depart
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-[1.15] md:text-[3.5rem] max-w-3xl text-[var(--color-navy)]">
            Vous avez de l'epargne.{" "}
            <span className="text-[var(--color-gold)]">Et maintenant ?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Votre argent dort sur un compte. Chaque annee, l'inflation lui
            fait perdre de la valeur. Vous savez qu'il faudrait investir, mais
            vous ne savez pas par ou commencer — et surtout, vous ne voulez
            pas faire n'importe quoi avec votre argent.
          </p>
          <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--color-muted-foreground)] leading-[1.7]">
            Ce site est la pour ca. On vous explique les bases, etape par
            etape, et on vous donne les outils pour investir en restant
            conforme a vos convictions.
          </p>
          <div className="mt-10">
            <Link
              href="/guides/repartition"
              className="cursor-pointer inline-flex h-12 items-center rounded-xl bg-[var(--color-navy)] px-7 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Commencer par les bases
            </Link>
          </div>
        </div>
      </section>

      {/* Le parcours — 4 etapes simples */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">
          4 etapes pour s'y retrouver
        </h2>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          Pas besoin d'etre un expert. Si vous suivez ces etapes dans l'ordre,
          vous aurez une base solide.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/guides/repartition"
            className="cursor-pointer group glass-card rounded-2xl p-6 border-l-4 border-l-[var(--color-gold)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold-muted)] text-sm font-bold text-[var(--color-gold)]">1</span>
              <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Savoir combien investir
              </h3>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Avant tout : mettez de cote 3 a 6 mois de depenses. Reservez
              l'argent de vos projets a court terme (mariage, voiture...).
              Le reste, c'est ce que vous pouvez investir.
            </p>
          </Link>

          <Link
            href="/guides/pourquoi-investir"
            className="cursor-pointer group glass-card rounded-2xl p-6 border-l-4 border-l-[var(--color-halal)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-halal-muted)] text-sm font-bold text-[var(--color-halal)]">2</span>
              <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Comprendre pourquoi c'est important
              </h3>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              L'inflation grignote votre pouvoir d'achat chaque annee. Ne rien
              faire, c'est perdre de l'argent. Investir, c'est le proteger —
              et potentiellement le faire grandir.
            </p>
          </Link>

          <Link
            href="/guides/actions-boursieres"
            className="cursor-pointer group glass-card rounded-2xl p-6 border-l-4 border-l-[var(--color-navy)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-[var(--color-navy)]">3</span>
              <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Choisir ou mettre son argent
              </h3>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Actions en bourse, or, immobilier — chaque option a ses avantages.
              On vous explique lesquelles sont conformes, comment les acheter,
              et sur quelle plateforme.
            </p>
          </Link>

          <Link
            href="/guides/investir-simplement"
            className="cursor-pointer group glass-card rounded-2xl p-6 border-l-4 border-l-[var(--color-muted-foreground)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-[var(--color-muted-foreground)]">4</span>
              <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Automatiser et ne plus y penser
              </h3>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Un montant fixe, chaque mois, en automatique. C'est la methode
              la plus simple et historiquement la plus efficace. Meme avec
              50 euros par mois, ca compte.
            </p>
          </Link>
        </div>
      </section>

      {/* Outils — pour ceux qui veulent aller plus loin */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-navy)]">
          Pour ceux qui veulent aller plus loin
        </h2>
        <p className="text-[0.95rem] text-[var(--color-muted-foreground)] mb-8 max-w-2xl leading-relaxed">
          Vous savez deja ce qu'est un indice boursier ? Vous voulez
          constituer votre propre portefeuille d'actions halal ? Ces outils
          sont faits pour vous.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/nasdaq-halal"
            className="cursor-pointer group glass-card rounded-2xl p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--color-navy)]">NASDAQ 100 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Explorer →
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Les 100 plus grandes entreprises tech americaines, passees au
              filtre du standard AAOIFI. Simulateur de portefeuille et export
              CSV inclus.
            </p>
          </Link>

          <Link
            href="/sp500-halal"
            className="cursor-pointer group glass-card rounded-2xl p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--color-navy)]">S&P 500 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                Explorer →
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Les 500 plus grandes entreprises US, tous secteurs. Plus
              diversifie, mais aussi plus d'exclusions. Meme methode, meme
              simulateur.
            </p>
          </Link>
        </div>
      </section>

      {/* Tous les guides */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">Tous les guides</h2>
          <Link href="/guides" className="cursor-pointer text-sm font-medium text-[var(--color-gold)] hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/guides/repartition", title: "Repartir son epargne", desc: "Le guide a lire en premier. Matelas de securite, projets court terme, puis investir." },
            { href: "/guides/pourquoi-investir", title: "Pourquoi investir ?", desc: "L'inflation, la zakat, et pourquoi ne rien faire c'est perdre." },
            { href: "/guides/actions-boursieres", title: "Actions halal", desc: "Screeners, criteres AAOIFI, purification, plateformes." },
            { href: "/guides/investir-simplement", title: "La methode simple", desc: "ETFs, DCA, investissement automatique mensuel." },
            { href: "/guides/or", title: "L'or", desc: "Halal par nature, protege de l'inflation. Comment acheter." },
            { href: "/guides/immobilier", title: "Immobilier", desc: "Murabaha, achat comptant, alternatives au pret classique." },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="cursor-pointer group glass-card rounded-2xl p-5"
            >
              <h3 className="font-semibold mb-1.5 text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-200 text-sm">
                {guide.title}
              </h3>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">{guide.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[var(--color-haram)]/15 bg-[var(--color-haram-muted)] p-6">
          <h3 className="font-semibold text-[var(--color-haram)] mb-3">Avant d'utiliser ce site</h3>
          <div className="text-sm text-[var(--color-muted-foreground)] leading-[1.7] space-y-2">
            <p>
              <strong className="text-[var(--foreground)]">On ne vous dit pas quoi acheter.</strong>{" "}
              Ce site partage des informations. Il ne remplace ni un conseiller
              financier, ni un scholar islamique.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Les donnees peuvent contenir des erreurs.</strong>{" "}
              Elles viennent de sources publiques (Zoya.finance, SlickCharts)
              et sont extraites automatiquement. Verifiez toujours par
              vous-meme.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
