import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { StatsGrid } from "@/components/StatsGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { MethodTimeline } from "@/components/MethodTimeline";
import { ReferenceCard } from "@/components/ReferenceCard";
import { CTASection } from "@/components/CTASection";
import { ImageFeature } from "@/components/ImageFeature";
import { LogoWall } from "@/components/LogoWall";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/Button";
import {
  getHeroStats,
  getMethodSteps,
  getReferences,
  getServiceModels,
  getSectors,
  getWhyKbio,
} from "@/lib/copy/merged";
import { getHeroCopy } from "@/lib/copy/home";
import { homeSections } from "@/lib/copy/home-page";
import { normalizeLocale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/paths";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";
import { images } from "@/lib/images";

const referenceImages = [images.audit.src, images.imaging.src, images.laboratory.src];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale);
  return buildMetadata({
    title: site.name,
    path: "/",
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = normalizeLocale((await params).locale);
  const h = homeSections(locale);
  const hero = getHeroCopy(locale);

  const serviceModels = getServiceModels(locale);
  const references = getReferences(locale);
  const sectors = getSectors(locale);
  const whyKbio = getWhyKbio(locale);
  const methodSteps = getMethodSteps(locale);
  const heroStats = getHeroStats(locale);

  const contactHref = localizeHref(locale, "/contact");
  const expertisesHref = localizeHref(locale, "/expertises");
  const methodeHref = localizeHref(locale, "/methode");
  const projetsHref = localizeHref(locale, "/projets");

  return (
    <>
      <HeroSection hero={hero} contactHref={contactHref} expertisesHref={expertisesHref} />

      <section className="relative">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">{h.introEyebrow}</p>
              <h2 className="display mt-4 text-3xl md:text-[40px] leading-[1.05]">{h.introTitle}</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[color:var(--color-muted-strong)] text-pretty">
                {h.introP1}
              </p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-[color:var(--color-muted)]">{h.introP2}</p>
            </div>
          </div>

          <div className="mt-16">
            <AnimatedReveal>
              <StatsGrid stats={heroStats} locale={locale} />
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      <section className="relative bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-32">
          <ImageFeature
            eyebrow={h.fieldEyebrow}
            title={h.fieldTitle}
            description={
              <>
                <p>{h.fieldP1}</p>
                <p>{h.fieldP2}</p>
              </>
            }
            image={images.audit.src}
            imageAlt={images.audit.alt}
            stats={h.fieldStats}
          >
            <ButtonLink href={methodeHref} variant="ghost" size="md">
              {h.methodBtn}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </ImageFeature>
        </Container>
      </section>

      <section className="relative">
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow={h.servicesEyebrow}
            title={h.servicesTitle}
            description={h.servicesDesc}
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {serviceModels.map((s, i) => (
              <AnimatedReveal key={s.title} delay={i * 0.05}>
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  Icon={s.icon}
                  href={expertisesHref}
                  moreLabel={h.serviceMore}
                />
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-32">
          <ImageFeature
            eyebrow={h.whyEyebrow}
            title={h.whyTitle}
            reverse
            image={images.equipmentClose.src}
            imageAlt={images.equipmentClose.alt}
            description={<p>{h.whyLead}</p>}
          >
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyKbio.slice(0, 4).map((w) => (
                <li
                  key={w.title}
                  className="group rounded-2xl border border-[color:var(--color-line)] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]"
                  >
                    <w.icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-[color:var(--color-ink)]">{w.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--color-muted-strong)]">
                    {w.description}
                  </p>
                </li>
              ))}
            </ul>
          </ImageFeature>
        </Container>
      </section>

      <section id="methode" className="relative">
        <Container className="py-24 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={h.methodEyebrow} title={h.methodTitle} description={h.methodDesc} />
            <ButtonLink href={methodeHref} variant="ghost" size="md" className="self-start md:self-auto">
              {h.methodBtn}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-14">
            <MethodTimeline steps={methodSteps} />
          </div>
        </Container>
      </section>

      <LogoWall
        title={h.logoWallTitle}
        subtitle={h.logoWallSubtitle}
        disclaimer={h.logoWallDisclaimer}
        eyebrow={h.logoWallEyebrow}
      />

      <section className="relative">
        <Container className="py-24 md:py-32">
          <SectionHeading eyebrow={h.sectorsEyebrow} title={h.sectorsTitle} description={h.sectorsDesc} />
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {sectors.map((s, i) => (
              <AnimatedReveal key={s.title} delay={i * 0.03}>
                <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-[color:var(--color-line)] bg-white px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)] transition-colors group-hover:bg-[color:var(--color-teal)] group-hover:text-white"
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium leading-tight text-[color:var(--color-ink)]">{s.title}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {references.slice(0, 3).map((r, i) => (
              <AnimatedReveal key={r.type} delay={i * 0.05}>
                <ReferenceCard
                  reference={r}
                  image={referenceImages[i]}
                  imageAlt={`${h.refAltPrefix} ${r.type}`}
                  maskedBadge={h.refMaskedBadge}
                />
              </AnimatedReveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href={projetsHref} variant="ghost" size="md">
              {h.projectsBtn}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow={h.ctaEyebrow}
        title={h.ctaTitle}
        description={h.ctaDesc}
        primaryHref={contactHref}
        primaryLabel={h.ctaPrimary}
        secondaryHref={expertisesHref}
        secondaryLabel={h.ctaSecondary}
      />
    </>
  );
}
