import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S&P 500 Halal",
  description:
    "Composition du S&P 500 reconstitue selon les criteres AAOIFI. Actions halal uniquement, poids redistribues, simulateur de portefeuille.",
};

export default function SP500Halal() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 rounded-full bg-[var(--color-gold)]" />
            <span className="text-sm font-medium tracking-widest uppercase text-[var(--color-gold)]">
              Standard AAOIFI — Approche stricte
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            S&P 500{" "}
            <span className="text-[var(--color-gold)]">Halal</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-muted-foreground)] leading-relaxed">
            Le S&P 500 reconstitue en excluant les actions non conformes et
            douteuses selon les criteres AAOIFI.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="mb-4 flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-[var(--color-gold)]/10">
              <span className="text-2xl font-bold text-[var(--color-gold)]">
                500
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">Bientot disponible</h2>
            <p className="text-sm text-[var(--color-muted-foreground)] max-w-md">
              Le screening des 500 actions du S&P 500 est en cours. Cette page
              sera mise a jour automatiquement une fois les donnees pretes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
