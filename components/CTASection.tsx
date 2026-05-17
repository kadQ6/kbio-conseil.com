import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";

export function CTASection({
  eyebrow,
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Planifier un premier échange",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative">
      <Container className="py-24 md:py-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--color-ink)] px-7 py-14 md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 360px at 100% 0%, rgba(15,181,166,0.35), transparent 60%), radial-gradient(700px 360px at 0% 100%, rgba(255,255,255,0.06), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 hidden h-64 w-64 rounded-full border border-white/10 md:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 hidden h-[420px] w-[420px] rounded-full border border-white/5 md:block"
          />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              {eyebrow && (
                <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-teal-100)]">
                  {eyebrow}
                </p>
              )}
              <h2 className="display mt-4 text-balance text-3xl md:text-5xl text-white">{title}</h2>
              {description && (
                <p className="mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-white/75">
                  {description}
                </p>
              )}
            </div>

            <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
              <ButtonLink href={primaryHref} variant="secondary" size="lg">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              {secondaryHref && secondaryLabel && (
                <ButtonLink href={secondaryHref} variant="outline-light" size="lg">
                  {secondaryLabel}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
