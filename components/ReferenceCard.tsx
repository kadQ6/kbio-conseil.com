import Image from "next/image";
import { Building2 } from "lucide-react";
import type { Reference } from "@/lib/site-data";

export function ReferenceCard({
  reference,
  image,
  imageAlt,
}: {
  reference: Reference;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elev)]">
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-soft)]">
          <Image
            src={image}
            alt={imageAlt ?? reference.type}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,37,69,0) 50%, rgba(11,37,69,0.55) 100%)",
            }}
          />
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-[color:var(--color-ink)] backdrop-blur">
            <Building2 className="h-3 w-3 text-[color:var(--color-teal-700)]" />
            Mission anonymisée
          </div>
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-7">
        {!image && (
          <div className="mb-5 flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--color-soft)] text-[color:var(--color-ink)]"
            >
              <Building2 className="h-4 w-4" />
            </span>
            <p className="eyebrow">Mission anonymisée</p>
          </div>
        )}

        <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">{reference.type}</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-muted-strong)]">
          {reference.description}
        </p>

        <dl className="mt-auto pt-7 grid grid-cols-3 gap-3 border-t border-[color:var(--color-line)]">
          {reference.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                {m.label}
              </dt>
              <dd className="num-tabular mt-1 text-base font-semibold text-[color:var(--color-ink)]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
