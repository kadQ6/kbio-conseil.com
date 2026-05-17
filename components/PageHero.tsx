import Image from "next/image";
import { Container } from "./Container";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { AnimatedReveal } from "./AnimatedReveal";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-line)] bg-[color:var(--color-soft)]">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-[color:var(--color-teal)]/10 blur-3xl"
      />
      <Container className="relative pt-14 pb-20 md:pt-20 md:pb-28">
        <Breadcrumb items={crumbs} />
        <div className="mt-7 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className={image ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl"}>
            <AnimatedReveal>
              <p className="eyebrow">{eyebrow}</p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.05}>
              <h1 className="display mt-4 text-balance text-4xl md:text-5xl lg:text-[58px]">
                {title}
              </h1>
            </AnimatedReveal>
            {description && (
              <AnimatedReveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-pretty text-lg text-[color:var(--color-muted-strong)]">
                  {description}
                </p>
              </AnimatedReveal>
            )}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <AnimatedReveal delay={0.15}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-[color:var(--color-line)] shadow-[var(--shadow-elev)]">
                  <Image
                    src={image}
                    alt={imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11,37,69,0) 55%, rgba(11,37,69,0.25) 100%)",
                    }}
                  />
                </div>
              </AnimatedReveal>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
