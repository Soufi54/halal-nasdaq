"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/nasdaq-halal", label: "NASDAQ 100" },
  { href: "/sp500-halal", label: "S&P 500" },
  { href: "/guides", label: "Guides" },
  { href: "/methodologie", label: "Methodologie" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-navy)]">
            <span className="text-sm font-bold text-white">MF</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--color-navy)]">
            Muslim<span className="text-[var(--color-gold)]">Finance</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[var(--color-navy)] text-white"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <MobileMenu pathname={pathname} />
      </div>
    </nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <details className="relative md:hidden group">
      <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[var(--color-muted-foreground)] hover:bg-slate-100 list-none">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute right-0 top-12 w-48 rounded-xl border border-[var(--border)] bg-white p-2 shadow-lg">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[var(--color-navy)] text-white"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
