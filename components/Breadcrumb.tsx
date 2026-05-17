import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-[color:var(--color-muted)]">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="hover:text-[color:var(--color-ink)] transition-colors"
                >
                  {c.label}
                </Link>
              ) : (
                <span className={last ? "text-[color:var(--color-ink)] font-medium" : ""}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 text-[color:var(--color-line-strong)]" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
