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
import { getReferences, getSectors, getTestimonials } from "@/lib/copy/merged";
import { localizeHref } from "@/lib/i18n/paths";
import { normalizeLocale } from "@/lib/i18n/config";
import { images } from "@/lib/images";

const referenceVisuals = [
  images.audit,
  images.imaging,
  images.equipmentClose,
  images.surgery,
  images.monitor,
  images.laboratory,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale);
  return buildMetadata({
    title: locale === "en" ? "Projects & references" : "Nos projets",
    description:
      locale === "en"
        ? "Representative programmes: Rwanda PSA, UNICEF/Somalia mandates, Djibouti CHUD dossiers, BERTIN fleets, France & Gabon—with donor-grade deliverables."
        : "Références représentatives : programmes PSA Rwanda, missions UNICEF/Somalie, CHUD Djibouti, BERTIN, France & Gabon — livrables K'BIO pour bailleurs et directions techniques.",
    path: "/projets",
    locale,
  });
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = normalizeLocale((await params).locale);
  const references = getReferences(locale);
  const sectors = getSectors(locale);
  const testimonials = getTestimonials(locale);
  const homeHref = localizeHref(locale, "/");
  const contactHref = localizeHref(locale, "/contact");

  const homeCrumb = locale === "en" ? "Home" : "Accueil";
  const projCrumb = locale === "en" ? "Projects" : "Nos projets";
  const masked = locale === "en" ? "Anonymised mandate" : "Mission anonymisée";

  return (
    <>
      <PageHero
        eyebrow={projCrumb}
        title={
          locale === "en"
            ? "Representative missions: biomedical PSA, tenders & hospital architectures."
            : "Missions représentatives : programmes PSA, AO & architecture hospitalière."
        }
        description={
          locale === "en"
            ? "Names and granular scopes remain confidential. Full dossiers are shared upon formal tender or Ministry requests."
            : "Le détail des contacts et certains périmètres reste confidentiel. Nous partageons des références complètes sur demande officielle AO ou ministère bailleur."
        }
        crumbs={[{ label: homeCrumb, href: homeHref }, { label: projCrumb }]}
        image={images.imaging.src}
        imageAlt={images.imaging.alt}
      />

      <section>
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow={locale === "en" ? "Sanitised vignettes" : "Missions anonymisées"}
            title={
              locale === "en"
                ? "Six recurring mission arcs across donors & Ministries."
                : "Six axes de mission représentant notre carnet bailleurs & institutionnel."
            }
            description={
              locale === "en"
                ? "Each dossier mirrors our playbook with leadership-ready artefacts."
                : "Chaque mission est préparée et restituée selon notre méthode standard, avec un livrable structuré et exploitable par la direction."
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {references.map((r, i) => {
              const visual = referenceVisuals[i % referenceVisuals.length];
              return (
                <AnimatedReveal key={r.type} delay={(i % 3) * 0.05}>
                  <ReferenceCard
                    reference={r}
                    image={visual.src}
                    imageAlt={visual.alt}
                    maskedBadge={masked}
                  />
                </AnimatedReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow={locale === "en" ? "Technical domains" : "Domaines techniques"}
            title={
              locale === "en"
                ? "Cover every high-risk biomedical segment."
                : "Couvrir tous les segments critiques d'un parc biomédical."
            }
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
            eyebrow={locale === "en" ? "Testimonials" : "Témoignages"}
            title={locale === "en" ? "Client echoes" : "Retours clients"}
            description={
              locale === "en"
                ? "Voluntarily vague sector tagging—granular dossiers under NDA briefings."
                : "Témoignages génériques (secteur masqué) — références détaillées sur demande institutionnelle."
            }
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

      <LogoWall
        eyebrow={locale === "en" ? "Trust" : "Confiance"}
        title={locale === "en" ? "Partners who mobilise our teams" : undefined}
        subtitle={
          locale === "en"
            ? "Representative mandates: UNICEF corridors, Ministries, multisite operators."
            : undefined
        }
        disclaimer={
          locale === "en"
            ? "Illustrative monograms pending legal approvals."
            : undefined
        }
      />

      <CTASection
        eyebrow={locale === "en" ? "Confidential exchange" : "Échanger en confiance"}
        title={
          locale === "en"
            ? "Need a playbook comparable to yours?"
            : "Vous souhaitez échanger sur une mission similaire à la vôtre ?"
        }
        description={
          locale === "en"
            ? "We can walk you through dossiers comparable to yours under reciprocal confidentiality rules."
            : "Nous pouvons vous présenter des références détaillées dans le cadre d'un échange confidentiel."
        }
        primaryHref={contactHref}
        primaryLabel={locale === "en" ? "Ask for a briefing" : "Demander un échange"}
      />
    </>
  );
}
