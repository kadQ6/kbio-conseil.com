import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export function ServiceCard({
  title,
  description,
  Icon,
  href,
  bullets,
  variant = "default",
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  href?: string;
  bullets?: string[];
  variant?: "default" | "feature";
}) {
  const isFeature = variant === "feature";
  const content = (
    <article
      className={`group relative flex h-full flex-col rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elev)] ${
        isFeature
          ? "border-[color:var(--color-line)] md:p-9"
          : "border-[color:var(--color-line)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)] transition-colors group-hover:bg-[color:var(--color-teal)] group-hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </span>
        {href && (
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-muted)] transition-all group-hover:border-[color:var(--color-ink)] group-hover:text-[color:var(--color-ink)]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        )}
      </div>

      <h3 className="mt-7 text-xl font-semibold tracking-tight text-[color:var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted-strong)]">
        {description}
      </p>

      {bullets && bullets.length > 0 && (
        <ul className="mt-6 space-y-2 border-t border-[color:var(--color-line)] pt-5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[14px] text-[color:var(--color-muted-strong)]">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-teal)]" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {href && (
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--color-ink)]">
          En savoir plus
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </article>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
}
