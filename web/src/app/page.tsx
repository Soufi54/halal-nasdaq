import Link from "next/link";
import nasdaqData from "@/data.json";
import sp500Data from "@/sp500-data.json";

const nasdaqStats = nasdaqData.stats;
const sp500Stats = sp500Data.stats;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,_transparent_50%)] opacity-[0.03]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-12 bg-[var(--color-gold)]" />
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-gold)]">
              Standard AAOIFI
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] md:text-7xl max-w-3xl">
            Investir en
            <br />
            <span className="text-[var(--color-gold)]">bourse halal</span>,
            <br />
            simplement.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            Indices NASDAQ 100 et S&P 500 reconstitues sans les actions non
            conformes a la charia. Donnees ouvertes, scraping transparent,
            simulateur de portefeuille integre.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/nasdaq-halal"
              className="inline-flex h-12 items-center rounded-xl bg-[var(--color-gold)] px-6 text-sm font-semibold text-black transition-colors hover:bg-[var(--color-gold)]/90"
            >
              NASDAQ 100 Halal
            </Link>
            <Link
              href="/sp500-halal"
              className="inline-flex h-12 items-center rounded-xl border border-white/10 px-6 text-sm font-semibold transition-colors hover:bg-white/5"
            >
              S&P 500 Halal
            </Link>
          </div>
        </div>
      </section>

      {/* Indices cards */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Nos indices</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/nasdaq-halal"
            className="group rounded-2xl border border-white/5 bg-[var(--card)] p-8 transition-all hover:border-[var(--color-gold)]/20 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">NASDAQ 100 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors">
                Voir →
              </span>
            </div>
            <div className="flex gap-8 mb-4">
              <div>
                <p className="text-3xl font-bold text-[var(--color-halal)]">
                  {nasdaqStats.included}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  actions halal
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--color-haram)]">
                  {nasdaqStats.excluded}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  exclues
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              L'indice NASDAQ 100 filtre selon les criteres AAOIFI. Approche
              stricte — seules les actions certifiees halal sont incluses.
            </p>
          </Link>

          <Link
            href="/sp500-halal"
            className="group rounded-2xl border border-white/5 bg-[var(--card)] p-8 transition-all hover:border-[var(--color-gold)]/20 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">S&P 500 Halal</h3>
              <span className="text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-gold)] transition-colors">
                Voir →
              </span>
            </div>
            <div className="flex gap-8 mb-4">
              <div>
                <p className="text-3xl font-bold text-[var(--color-halal)]">
                  {sp500Stats.included}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  actions halal
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--color-haram)]">
                  {sp500Stats.excluded}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  exclues
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Le S&P 500 reconstitue selon les memes criteres. {sp500Stats.total_sp500} actions
              analysees, poids redistribues pro-rata.
            </p>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">Comment ca marche</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-gold)]/10">
                <span className="text-lg font-bold text-[var(--color-gold)]">1</span>
              </div>
              <h3 className="font-semibold mb-2">Scraping des poids</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Les poids de chaque action sont recuperes automatiquement depuis
                les ETF de reference (QQQ pour le NASDAQ, SPY pour le S&P).
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-halal)]/10">
                <span className="text-lg font-bold text-[var(--color-halal)]">2</span>
              </div>
              <h3 className="font-semibold mb-2">Screening AAOIFI</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Chaque action est verifiee sur Zoya.finance selon le standard
                AAOIFI. Les actions non conformes et douteuses sont exclues.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Redistribution pro-rata</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Les poids des actions restantes sont redistribues
                proportionnellement pour reconstituer un indice a 100%.
                Simulez votre portefeuille en un clic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Guides</h2>
            <Link
              href="/guides"
              className="text-sm text-[var(--color-gold)] hover:underline"
            >
              Tous les guides →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/guides/pourquoi-investir",
                title: "Pourquoi investir ?",
                desc: "Les bases de l'investissement et pourquoi c'est important pour chaque musulman.",
              },
              {
                href: "/guides/actions-boursieres",
                title: "Actions boursieres",
                desc: "Comment investir en bourse de maniere halal. Screeners, criteres, plateformes.",
              },
              {
                href: "/guides/investir-simplement",
                title: "Investir sans se prendre la tete",
                desc: "La strategie passive : ETFs, DCA, et comment commencer avec peu.",
              },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl border border-white/5 bg-[var(--card)] p-6 transition-all hover:border-white/10 hover:bg-white/[0.03]"
              >
                <h3 className="font-semibold mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  {guide.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer banner */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-[var(--color-haram)]/10 bg-[var(--color-haram)]/5 p-6">
            <h3 className="font-semibold text-[var(--color-haram)] mb-2">
              Avertissement
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Ce site ne fournit <strong>aucun conseil en investissement</strong>{" "}
              ni <strong>aucun avis religieux</strong>. Les donnees sont generees
              par scraping automatique et peuvent contenir des erreurs. Le statut
              halal/haram est indicatif — les createurs de ce site ne s'engagent
              sur rien d'un point de vue ethique ou financier.{" "}
              <strong>Faites vos propres recherches</strong> (DYOR) et consultez
              un conseiller financier qualifie ainsi qu'un scholar islamique.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
