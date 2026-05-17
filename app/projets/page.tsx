import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ReferenceCard } from "@/components/ReferenceCard";
import { LogoWall } from "@/components/LogoWall";
import { CTASection } from "@/components/CTASection";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { buildMetadata } from "@/lib/seo";
import { references, sectors, testimonials } from "@/lib/site-data";
import { images } from "@/lib/images";

const referenceVisuals = [
  images.audit,
  images.imaging,
  images.equipmentClose,
  images.surgery,
  images.monitor,
  images.laboratory,
];

export const metadata: Metadata = buildMetadata({
  title: "Nos projets",
  description:
    "Références représentatives : programmes PSA Rwanda, missions UNICEF/Somalie, CHUD Djibouti, BERTIN, France & Gabon — livrables K'BIO pour bailleurs et directions techniques.",
  path: "/projets",
});

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos projets"
        title="Missions représentatives : programmes PSA, AO & architecture hospitalière."
        description="Le détail des contacts et certains périmètres reste confidentiel. Nous partageons des références complètes sur demande officielle AO ou ministère bailleur."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Nos projets" }]}
        image={images.imaging.src}
        imageAlt={images.imaging.alt}
      />

      <section>
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Missions anonymisées"
            title="Six axes de mission représentant notre carnet bailleurs & institutionnel."
            description="Chaque mission est préparée et restituée selon notre méthode standard, avec un livrable structuré et exploitable par la direction."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {references.map((r, i) => {
              const visual = referenceVisuals[i % referenceVisuals.length];
              return (
                <AnimatedReveal key={r.type} delay={(i % 3) * 0.05}>
                  <ReferenceCard reference={r} image={visual.src} imageAlt={visual.alt} />
                </AnimatedReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow="Domaines techniques"
            title="Couvrir tous les segments critiques d'un parc biomédical."
          />
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {sectors.map((s, i) => (
              <AnimatedReveal key={s.title} delay={i * 0.03}>
                <div className="h-full rounded-2xl border border-[color:var(--color-line)] bg-white p-5 text-center">
                  <span
                    aria-hidden
                    className="grid h-9 w-9 mx-auto place-items-center rounded-xl bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]"
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-[13.5px] font-medium text-[color:var(--color-ink)]">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[11.5px] text-[color:var(--color-muted)]">{s.description}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow="Témoignages"
            title="Retours clients"
            description="Témoignages génériques (secteur masqué) — références détaillées sur demande institutionnelle."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <AnimatedReveal key={i} delay={i * 0.05}>
                <figure className="relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white p-8 md:p-10">
                  <Quote className="h-8 w-8 text-[color:var(--color-teal)]" />
                  <blockquote className="mt-5 text-[18px] leading-relaxed text-[color:var(--color-ink)]">
                    « {t.quote} »
                  </blockquote>
                  <figcaption className="mt-7 border-t border-[color:var(--color-line)] pt-5 text-[14px]">
                    <p className="font-semibold text-[color:var(--color-ink)]">{t.author}</p>
                    <p className="text-[color:var(--color-muted)]">{t.role}</p>
                  </figcaption>
                  <p className="mt-4 text-[11.5px] italic text-[color:var(--color-muted)]">
                    {t.note}
                  </p>
                </figure>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <LogoWall />

      <CTASection
        eyebrow="Échanger en confiance"
        title="Vous souhaitez échanger sur une mission similaire à la vôtre ?"
        description="Nous pouvons vous présenter des références détaillées dans le cadre d'un échange confidentiel."
        primaryHref="/contact"
        primaryLabel="Demander un échange"
      />
    </>
  );
}
