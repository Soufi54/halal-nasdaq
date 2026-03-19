import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-navy)]">
                <span className="text-sm font-bold text-white">MF</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--color-navy)]">
                Muslim<span className="text-[var(--color-gold)]">Finance</span>
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Outils et guides pour investir de maniere conforme a la charia.
              Donnees ouvertes, transparentes, gratuites.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--color-navy)]">Indices</h3>
            <div className="flex flex-col gap-2">
              <Link href="/nasdaq-halal" className="cursor-pointer text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] transition-colors duration-200">
                NASDAQ 100 Halal
              </Link>
              <Link href="/sp500-halal" className="cursor-pointer text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] transition-colors duration-200">
                S&P 500 Halal
              </Link>
              <Link href="/methodologie" className="cursor-pointer text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] transition-colors duration-200">
                Methodologie
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--color-navy)]">Guides</h3>
            <div className="flex flex-col gap-2">
              <Link href="/guides" className="cursor-pointer text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] transition-colors duration-200">
                Tous les guides
              </Link>
              <Link href="/guides/pourquoi-investir" className="cursor-pointer text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] transition-colors duration-200">
                Pourquoi investir ?
              </Link>
              <Link href="/guides/actions-boursieres" className="cursor-pointer text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] transition-colors duration-200">
                Actions boursieres
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <div className="rounded-xl border border-[var(--color-haram)]/20 bg-[var(--color-haram-muted)] p-4 mb-6">
            <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
              <strong className="text-[var(--foreground)]">Avertissement important :</strong>{" "}
              Les informations presentees sur ce site sont generees automatiquement
              par scraping de sources publiques (SlickCharts, Zoya.finance) et ne
              constituent en aucun cas un conseil en investissement, un conseil
              financier ou un avis religieux. Les donnees peuvent contenir des
              erreurs. Le statut halal/haram est fourni a titre indicatif
              uniquement — <strong>faites vos propres recherches</strong> et consultez un
              conseiller financier qualifie ainsi qu'un scholar islamique avant
              toute decision d'investissement. Les createurs de ce site declinent
              toute responsabilite quant a l'exactitude des donnees et aux
              decisions prises sur cette base.
            </p>
          </div>
          <p className="text-center text-xs text-[var(--color-muted-foreground)]">
            MuslimFinance.net — Donnees ouvertes, pas de conseil financier
          </p>
        </div>
      </div>
    </footer>
  );
}
