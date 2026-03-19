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
    <nav className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-navy)] shadow-md">
            <span className="text-sm font-bold text-white">MF</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-[var(--color-navy)]">
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
                className={`cursor-pointer rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-navy)] text-white shadow-sm"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] hover:bg-white/60"
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
      <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-[var(--color-muted-foreground)] hover:bg-white/60 list-none transition-colors duration-200">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute right-0 top-12 w-48 rounded-2xl glass-card p-2">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[var(--color-navy)] text-white"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-navy)] hover:bg-white/50"
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
