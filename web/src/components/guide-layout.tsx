import Link from "next/link";

export function GuideLayout({
  title,
  children,
  locale = "fr",
}: {
  title: string;
  children: React.ReactNode;
  locale?: "fr" | "en";
}) {
  const backHref = locale === "en" ? "/en/guides" : "/guides";
  const backLabel = locale === "en" ? "← All guides" : "← Tous les guides";
  const disclaimer =
    locale === "en"
      ? "This content is for informational purposes only and does not constitute investment advice or a religious ruling. Do your own research and consult a professional."
      : "Ce contenu est fourni a titre informatif uniquement et ne constitue pas un conseil en investissement ni un avis religieux. Faites vos propres recherches et consultez un professionnel.";
  const disclaimerLabel = locale === "en" ? "Disclaimer:" : "Avertissement :";

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors mb-6"
          >
            {backLabel}
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
            <strong>{disclaimerLabel}</strong> {disclaimer}
          </p>
        </div>
      </main>
    </div>
  );
}
