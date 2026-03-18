import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-gold)]">
                <span className="text-sm font-bold text-black">MF</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Muslim<span className="text-[var(--color-gold)]">Finance</span>
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Outils et guides pour investir de maniere conforme a la charia.
              Donnees ouvertes, transparentes, gratuites.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Indices</h3>
            <div className="flex flex-col gap-2">
              <Link href="/nasdaq-halal" className="text-sm text-[var(--color-muted-foreground)] hover:text-white transition-colors">
                NASDAQ 100 Halal
              </Link>
              <Link href="/sp500-halal" className="text-sm text-[var(--color-muted-foreground)] hover:text-white transition-colors">
                S&P 500 Halal
              </Link>
              <Link href="/methodologie" className="text-sm text-[var(--color-muted-foreground)] hover:text-white transition-colors">
                Methodologie
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Guides</h3>
            <div className="flex flex-col gap-2">
              <Link href="/guides" className="text-sm text-[var(--color-muted-foreground)] hover:text-white transition-colors">
                Tous les guides
              </Link>
              <Link href="/guides/pourquoi-investir" className="text-sm text-[var(--color-muted-foreground)] hover:text-white transition-colors">
                Pourquoi investir ?
              </Link>
              <Link href="/guides/actions-boursieres" className="text-sm text-[var(--color-muted-foreground)] hover:text-white transition-colors">
                Actions boursieres
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/5 pt-6">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 mb-6">
            <p className="text-xs text-[var(--color-muted-foreground)]/70 leading-relaxed">
              <strong className="text-[var(--color-muted-foreground)]">Avertissement important :</strong>{" "}
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
          <p className="text-center text-xs text-[var(--color-muted-foreground)]/40">
            MuslimFinance.net — Donnees ouvertes, pas de conseil financier
          </p>
        </div>
      </div>
    </footer>
  );
}
