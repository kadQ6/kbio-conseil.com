import { Check } from "lucide-react";
import type { Offer } from "@/lib/site-data";
import { ButtonLink } from "./Button";

export function OfferCard({ offer, featured = false }: { offer: Offer; featured?: boolean }) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10 ${
        featured
          ? "bg-[color:var(--color-ink)] text-white shadow-[var(--shadow-elev)] ring-1 ring-[color:var(--color-ink)]"
          : "border border-[color:var(--color-line)] bg-white text-[color:var(--color-ink)]"
      }`}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(420px 240px at 110% -10%, rgba(15,181,166,0.35), transparent 60%)",
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className={`eyebrow ${featured ? "text-[color:var(--color-teal-100)]" : ""}`}>
            {offer.duration}
          </p>
          {offer.highlight && (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${
                featured
                  ? "bg-[color:var(--color-teal)] text-[color:var(--color-ink)]"
                  : "bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]"
              }`}
            >
              {offer.highlight}
            </span>
          )}
        </div>

        <h3
          className={`mt-5 text-2xl md:text-3xl font-semibold tracking-tight ${
            featured ? "text-white" : ""
          }`}
        >
          {offer.name}
        </h3>
        <p
          className={`mt-3 text-[15px] leading-relaxed ${
            featured ? "text-white/80" : "text-[color:var(--color-muted-strong)]"
          }`}
        >
          {offer.tagline}
        </p>

        <ul className="mt-8 space-y-3.5">
          {offer.features.map((f) => (
            <li key={f} className="flex gap-3 text-[14.5px]">
              <span
                aria-hidden
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  featured
                    ? "bg-[color:var(--color-teal)] text-[color:var(--color-ink)]"
                    : "bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]"
                }`}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className={featured ? "text-white/90" : "text-[color:var(--color-muted-strong)]"}>
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-10 pt-6 border-t border-white/15">
        <ButtonLink
          href={offer.ctaHref}
          variant={featured ? "secondary" : "primary"}
          size="lg"
          className="w-full"
        >
          {offer.ctaLabel}
        </ButtonLink>
      </div>
    </article>
  );
}
