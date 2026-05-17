import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { MethodTimeline } from "@/components/MethodTimeline";
import { ImageFeature } from "@/components/ImageFeature";
import { CTASection } from "@/components/CTASection";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { ArrowRight } from "lucide-react";
import { normalizeLocale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/paths";
import { getMethodSteps } from "@/lib/copy/merged";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale);
  const titleFr = "Méthode K'BIO";
  const titleEn = "K'BIO methodology";
  return buildMetadata({
    title: locale === "en" ? titleEn : titleFr,
    description:
      locale === "en"
        ? "A five-phase, traceable workflow from programme framing through field consolidation and donor-aligned reporting."
        : "Notre méthode en cinq étapes structurées : diagnostic, inventaire, analyse des risques, plan d'action priorisé, suivi et reporting. Une démarche traçable et reproductible.",
    path: "/methode",
    locale,
  });
}

const detailedSteps = [
  {
    label: "Préparation de mission",
    description:
      "Cadrage écrit avec la direction technique, identification des interlocuteurs, planification des accès et organisation logistique.",
  },
  {
    label: "Collecte des données",
    description:
      "Recueil des contrats, documentations techniques, historiques d'intervention et plans de maintenance existants.",
  },
  {
    label: "Inventaire équipement par équipement",
    description:
      "Identification physique, étiquetage, photo, fiche normalisée et localisation par service / salle.",
  },
  {
    label: "Classification critique",
    description:
      "Criticité OMS, classe IEC, niveau de risque patient, taux d'utilisation, état général et conformité réglementaire.",
  },
  {
    label: "Analyse technique",
    description:
      "Contrôles fonctionnels, vérifications de sécurité électrique, métrologie et tests selon le type d'équipement.",
  },
  {
    label: "Analyse des risques",
    description:
      "Cartographie des défaillances probables, impact clinique et plan de continuité associé.",
  },
  {
    label: "Plan d'action",
    description:
      "Recommandations classées par urgence et criticité, livrées sous une forme exploitable par la direction.",
  },
  {
    label: "Estimation budgétaire",
    description:
      "Chiffrage des actions correctives, des pièces, des contrats et des investissements de renouvellement.",
  },
  {
    label: "Restitution client",
    description:
      "Présentation argumentée des conclusions à la direction et accompagnement à la priorisation.",
  },
  {
    label: "Suivi périodique",
    description:
      "Revue trimestrielle, indicateurs de performance, ajustement des plans et accompagnement durable.",
  },
];

export default async function MethodPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const homeHref = localizeHref(locale, "/");
  const contactHref = localizeHref(locale, "/contact");
  const methodStepsLocale = getMethodSteps(locale);

  const homeCrumb = locale === "en" ? "Home" : "Accueil";
  const methCrumb = locale === "en" ? "Method" : "Méthode";

  return (
    <>
      <PageHero
        eyebrow={methCrumb}
        title={
          locale === "en"
            ? "Structured, traceable methodology from ward data to financier dossiers."
            : "Une démarche structurée, traçable et opposable."
        }
        description={
          locale === "en"
            ? "Every sprint is scripted for reproducibility — from briefing through continuous steering with auditable artefacts."
            : "Notre méthode est conçue pour produire des résultats reproductibles : du diagnostic initial au pilotage continu, chaque étape est formalisée et documentée."
        }
        crumbs={[{ label: homeCrumb, href: homeHref }, { label: methCrumb }]}
        image={images.blueprint.src}
        imageAlt={images.blueprint.alt}
      />

      <section>
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow="Cinq étapes clés"
            title="Le socle commun à nos missions PSA, GMAO & architecture."
            description="Adapté à votre contexte multi-sites, à vos contraintes calendaires et aux exigences de vos bailleurs."
          />
          <div className="mt-14">
            <MethodTimeline steps={methodStepsLocale} />
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Étapes opérationnelles"
                title="Dix étapes opérationnelles, du cadrage au suivi."
                description="Le détail de notre déroulé terrain pour les missions complexes ou multi-sites."
              />
            </div>
            <div className="lg:col-span-7">
              <ol className="relative border-l border-[color:var(--color-line-strong)] pl-6 md:pl-10 space-y-6">
                {detailedSteps.map((s, i) => (
                  <AnimatedReveal key={s.label} delay={i * 0.03}>
                    <li className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-[34px] md:-left-[51px] top-1 grid h-7 w-7 place-items-center rounded-full bg-white text-[color:var(--color-ink)] ring-1 ring-[color:var(--color-line-strong)]"
                      >
                        <span className="num-tabular text-[12px] font-semibold">{i + 1}</span>
                      </span>
                      <h3 className="text-base font-semibold text-[color:var(--color-ink)]">
                        {s.label}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-[color:var(--color-muted-strong)]">
                        {s.description}
                      </p>
                    </li>
                  </AnimatedReveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 md:py-32">
          <ImageFeature
            eyebrow="Sur le terrain"
            title="Une méthode pensée pour les contextes africains et multi-sites."
            image={images.meeting.src}
            imageAlt={images.meeting.alt}
            reverse
            description={
              <>
                <p>
                  Nos missions sont déployées dans des contextes opérationnels exigeants : sites
                  multiples, contraintes logistiques, pic d'activité hospitalière, calendriers de
                  bailleurs. La méthode est cadrée pour rester applicable et traçable, quel que soit
                  le périmètre.
                </p>
                <p>
                  Nous adaptons l'organisation, les outils et le rythme de mission à votre réalité —
                  sans compromis sur la rigueur du livrable.
                </p>
              </>
            }
            stats={[
              { value: "10", label: "Étapes opérationnelles" },
              { value: "5", label: "Phases-clés" },
              { value: "100 %", label: "Traçabilité" },
            ]}
          >
            <ButtonLink href={contactHref} variant="primary" size="md">
              Cadrer ma mission
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </ImageFeature>
        </Container>
      </section>

      <section>
        <Container className="py-24 md:py-28">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Traçabilité",
                description:
                  "Chaque action est datée, signée et documentée. Tous les livrables sont opposables aux audits internes et externes.",
              },
              {
                title: "Adaptabilité",
                description:
                  "Notre méthode s'adapte aux contextes multi-sites, aux contraintes des bailleurs et aux périodes d'activité hospitalière.",
              },
              {
                title: "Transfert",
                description:
                  "Le savoir-faire est transféré aux équipes locales tout au long de la mission pour garantir la pérennité des résultats.",
              },
            ].map((p, i) => (
              <AnimatedReveal key={p.title} delay={i * 0.05}>
                <article className="h-full rounded-3xl border border-[color:var(--color-line)] bg-white p-8">
                  <p className="eyebrow">Principe</p>
                  <h3 className="mt-4 text-xl font-semibold text-[color:var(--color-ink)]">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted-strong)]">
                    {p.description}
                  </p>
                </article>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Cadrer une mission"
        title="Discutons du déroulé d'une mission adaptée à votre établissement."
        primaryHref={contactHref}
        primaryLabel="Cadrer ma mission"
      />
    </>
  );
}
