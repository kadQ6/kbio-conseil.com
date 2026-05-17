import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { expertises } from "@/lib/site-data";
import { images } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "Expertises biomédicales",
  description:
    "Expertises biomédicales et hospitalières — audit PSA, GMAO, AO, bloc opératoire & fluides médicaux.",
  path: "/expertises",
});

export default function ExpertisesPage() {
  return (
    <>
      <PageHero
        eyebrow="Expertises"
        title="Onze domaines pour fiabiliser parc, investissements & infrastructures critiques."
        description="Chaque expertise peut être mobilisée seule ou combinée audit + architecture fluides selon périmètres projet. Expression des besoins cadrée avant kick-off ministère/partenaires."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Expertises" }]}
        image={images.techField.src}
        imageAlt={images.techField.alt}
      />

      <section>
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {expertises.map((e, i) => (
              <AnimatedReveal key={e.slug} delay={(i % 3) * 0.04}>
                <article className="group relative flex h-full flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elev)]">
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)] transition-colors group-hover:bg-[color:var(--color-teal)] group-hover:text-white"
                    >
                      <e.icon className="h-5 w-5" />
                    </span>
                    <span className="num-tabular text-[12px] text-[color:var(--color-muted)]">
                      0{i + 1}
                    </span>
                  </div>

                  <h2 className="mt-7 text-xl font-semibold tracking-tight text-[color:var(--color-ink)]">
                    {e.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-muted-strong)]">
                    {e.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-[color:var(--color-line)] pt-5">
                    {e.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-[14px] text-[color:var(--color-muted-strong)]"
                      >
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-teal)]" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 pt-5 border-t border-[color:var(--color-line)]">
                    <ButtonLink
                      href={`/contact?expertise=${e.slug}`}
                      variant="ghost"
                      size="md"
                      className="w-full justify-between"
                    >
                      Discuter de cette expertise
                      <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  </div>
                </article>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Mission cadrée"
        title="Construisons ensemble la mission qui correspond à votre parc."
        description="Nos expertises se combinent pour répondre à vos contraintes opérationnelles, budgétaires et calendaires."
        primaryHref="/contact"
        primaryLabel="Définir ma mission"
        secondaryHref="/methode"
        secondaryLabel="Voir la méthode"
      />
    </>
  );
}
