import Link from "next/link";

export function GuideLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors mb-6"
          >
            ← Tous les guides
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <article className="prose-custom space-y-6 text-[var(--color-muted-foreground)] leading-relaxed">
          {children}
        </article>
        <div className="mt-12 rounded-2xl border border-[var(--color-haram)]/10 bg-[var(--color-haram)]/5 p-6">
          <p className="text-xs text-[var(--color-muted-foreground)]/70 leading-relaxed">
            <strong>Avertissement :</strong> ce contenu est fourni a titre
            informatif uniquement et ne constitue pas un conseil en
            investissement ni un avis religieux. Faites vos propres recherches
            et consultez un professionnel.
          </p>
        </div>
      </main>
    </div>
  );
}
