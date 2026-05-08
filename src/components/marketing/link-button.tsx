import type {ReactNode} from "react";

import Link from "next/link";

const BASE_CLASS =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent";

const VARIANT_CLASS = {
  outline:
    "border border-border bg-background text-foreground hover:bg-surface-secondary",
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  secondary: "bg-surface-secondary text-foreground hover:bg-surface-tertiary",
} as const;

export interface LinkButtonProps {
  children: ReactNode;
  href: string;
  variant?: keyof typeof VARIANT_CLASS;
  className?: string;
}

export function LinkButton({
  children,
  className = "",
  href,
  variant = "primary",
}: LinkButtonProps) {
  return (
    <Link className={`${BASE_CLASS} ${VARIANT_CLASS[variant]} ${className}`} href={href}>
      {children}
    </Link>
  );
}
