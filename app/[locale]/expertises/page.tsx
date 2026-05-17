import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { getExpertises } from "@/lib/copy/merged";
import { images } from "@/lib/images";
import { localizeHref } from "@/lib/i18n/paths";
import { normalizeLocale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale);
  return buildMetadata({
    title: locale === "en" ? "Biomedical expertise" : "Expertises biomédicales",
    description:
      locale === "en"
        ? "Biomedical readiness, CMMS modernization, tenders, perioperative architectures & regulated medical fluids."
        : "Expertises biomédicales et hospitalières — audit PSA, GMAO, AO, bloc opératoire & fluides médicaux.",
    path: "/expertises",
    locale,
  });
}

export default async function ExpertisesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const expertises = getExpertises(locale);
  const homeHref = localizeHref(locale, "/");
  const contactHref = localizeHref(locale, "/contact");
  const methodeHref = localizeHref(locale, "/methode");

  const homeCrumb = locale === "en" ? "Home" : "Accueil";
  const heroEyebrow = locale === "en" ? "Expertise" : "Expertises";

  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={
          locale === "en"
            ? "Eleven practice areas to stabilize fleets, capex dossiers & critical infrastructures."
            : "Onze domaines pour fiabiliser parc, investissements & infrastructures critiques."
        }
        description={
          locale === "en"
            ? "Each competency can operate standalone or as audit + perioperative fluids bundles. Needs are scripted before Ministries or partners kick programmes off."
            : "Chaque expertise peut être mobilisée seule ou combinée audit + architecture fluides selon périmètres projet. Expression des besoins cadrée avant kick-off ministère/partenaires."
        }
        crumbs={[{ label: homeCrumb, href: homeHref }, { label: heroEyebrow }]}
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
                      href={localizeHref(locale, `/contact?expertise=${e.slug}`)}
                      variant="ghost"
                      size="md"
                      className="w-full justify-between"
                    >
                      {locale === "en" ? "Discuss this expertise" : "Discuter de cette expertise"}
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
        eyebrow={locale === "en" ? "Structured mandate" : "Mission cadrée"}
        title={
          locale === "en"
            ? "Shape the engagement that mirrors your biomedical portfolio."
            : "Construisons ensemble la mission qui correspond à votre parc."
        }
        description={
          locale === "en"
            ? "Our clusters combine fluidly across operational, financial and timetable constraints."
            : "Nos expertises se combinent pour répondre à vos contraintes opérationnelles, budgétaires et calendaires."
        }
        primaryHref={contactHref}
        primaryLabel={locale === "en" ? "Define my mandate" : "Définir ma mission"}
        secondaryHref={methodeHref}
        secondaryLabel={locale === "en" ? "See methodology" : "Voir la méthode"}
      />
    </>
  );
}
