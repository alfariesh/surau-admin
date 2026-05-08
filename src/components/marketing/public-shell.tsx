import type {ReactNode} from "react";

import Link from "next/link";

import {PublicNavbar} from "./public-navbar";

const FOOTER_LINKS = [
  {href: "/book", label: "Book"},
  {href: "/feature", label: "Feature"},
  {href: "/blog", label: "Blog"},
  {href: "/about", label: "About"},
] as const;

export function PublicShell({children}: {children: ReactNode}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <PublicNavbar />
      {children}
      <footer className="border-separator/70 border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Surau</p>
            <p className="text-muted mt-1 text-sm">Literasi islami dan pengelolaan komunitas.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-sm">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} className="text-muted hover:text-foreground" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
