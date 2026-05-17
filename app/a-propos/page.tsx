import type { Metadata } from "next";
import { Award, Compass, HeartPulse, Microscope, Target, Users } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageFeature } from "@/components/ImageFeature";
import { LogoWall } from "@/components/LogoWall";
import { CTASection } from "@/components/CTASection";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/site-data";

export const metadata: Metadata = buildMetadata({
  title: "À propos — K'BIO Conseil",
  description:
    "K'BIO Conseil accompagne directions techniques & bailleurs : ingénierie biomédicale, architecture hospitalière PSA, missions terrain Afrique & Europe.",
  path: "/a-propos",
  keywords: ["K'BIO Conseil ingénierie biomédicale", "architecture hospitalière Afrique"],
});

const values = [
  {
    title: "Rigueur méthodologique",
    description:
      "Chaque livrable est traçable, vérifiable et opposable. Nous travaillons avec des référentiels clairs, pas à l'intuition.",
    icon: Compass,
  },
  {
    title: "Compétence locale",
    description:
      "Nous transférons les compétences vers les équipes locales. Notre objectif est l'autonomie de l'établissement, pas la dépendance.",
    icon: Users,
  },
  {
    title: "Sens du soin",
    description:
      "Un parc fiable, c'est un service clinique sécurisé. Nos décisions techniques sont toujours arbitrées au regard du patient.",
    icon: HeartPulse,
  },
  {
    title: "Précision technique",
    description:
      "Nous appliquons les normes IEC 60601, IEC 62353, NF S99-170 et les bonnes pratiques biomédicales sans compromis.",
    icon: Microscope,
  },
];

const positioning = [
  {
    title: "Deux bases : Paris & Djibouti",
    description:
      "Coordination Île-de-France pour études & dossiers européens ; ancrage Djibouti pour Corne de l'Afrique.",
  },
  {
    title: "Missions multisites",
    description:
      "Programmes PSA, bailleurs UNICEF / FSE / banques de développement, ministères de santé & opérateurs privés multisites.",
  },
  {
    title: "Fondateur & réseaux experts",
    description:
      "Pilotage par ingénieur biomédical fondateur, mobilisation de spécialistes architecture blocs AO selon périmètres projet.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Un cabinet français & corne Afrique au service du plateau technique critique."
        description="K'BIO Conseil relie expertise biomédicale terrain, structuration données GMAO et ingénierie hospitalière (blocs, fluides médicaux) pour offrir des livrables réalistes devant investissements & bailleurs."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        image={images.about.src}
        imageAlt={images.about.alt}
      />

      <section>
        <Container className="py-24 md:py-32">
          <ImageFeature
            eyebrow="Notre raison d'être"
            title="Structurer données parc, risques & investissements — sans promesse irréaliste."
            image={images.team.src}
            imageAlt={images.team.alt}
            description={
              <>
                <p>
                  Dans la plupart des établissements que nous accompagnons, la maintenance biomédicale
                  souffre des mêmes contraintes : équipements vieillissants, parcs incomplets,
                  interventions non documentées, dépendance forte aux fabricants, absence d'indicateurs
                  consolidés.
                </p>
                <p>
                  {site.name} intervient souvent là où parcs vieillissants, imports Excel hétérogènes et
                  exigences bailleur se croisent : besoin d'un tableau de situation investissement vite
                  exploitable, même lorsque l'historique est incomplet ou les identifiants hétérogènes.
                </p>
                <p>
                  Méthode terrain vérifiable, nomenclatures explicables, formats Excel traçables jusqu'à
                  micro-diffusion projet — en intégrant les délais d'approvisionnement locaux et le niveau
                  réel des compétences maintenance.
                </p>
              </>
            }
          />
        </Container>
      </section>

      <section className="bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <AnimatedReveal>
              <article className="h-full rounded-3xl border border-[color:var(--color-line)] bg-white p-8">
                <Target className="h-6 w-6 text-[color:var(--color-teal-700)]" />
                <h3 className="mt-5 text-xl font-semibold text-[color:var(--color-ink)]">Mission</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted-strong)]">
                  Garantir la disponibilité, la sécurité et la conformité des équipements médicaux
                  pour soutenir la continuité des soins.
                </p>
              </article>
            </AnimatedReveal>
            <AnimatedReveal delay={0.05}>
              <article className="h-full rounded-3xl border border-[color:var(--color-line)] bg-white p-8">
                <Compass className="h-6 w-6 text-[color:var(--color-teal-700)]" />
                <h3 className="mt-5 text-xl font-semibold text-[color:var(--color-ink)]">Vision</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted-strong)]">
                  Faire émerger un standard régional d'ingénierie biomédicale, ancré dans les
                  réalités africaines et aligné sur les meilleures pratiques internationales.
                </p>
              </article>
            </AnimatedReveal>
            <AnimatedReveal delay={0.1}>
              <article className="h-full rounded-3xl border border-[color:var(--color-line)] bg-white p-8">
                <Award className="h-6 w-6 text-[color:var(--color-teal-700)]" />
                <h3 className="mt-5 text-xl font-semibold text-[color:var(--color-ink)]">Engagement</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted-strong)]">
                  Une qualité de livrable constante, une transparence sans réserve sur les actions
                  et un transfert de compétence vers les équipes locales.
                </p>
              </article>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow="Valeurs"
            title="Quatre valeurs qui structurent notre exigence quotidienne."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimatedReveal key={v.title} delay={i * 0.05}>
                <article className="h-full rounded-3xl border border-[color:var(--color-line)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]"
                  >
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-[color:var(--color-ink)]">{v.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-muted-strong)]">
                    {v.description}
                  </p>
                </article>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-ink)] text-white">
        <Container className="py-24 md:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-teal-100)]">
                Positionnement
              </p>
              <h2 className="display mt-4 text-3xl md:text-[40px] text-white">
                Un ancrage local, une exigence internationale.
              </h2>
              <p className="mt-5 max-w-md text-[15.5px] text-white/75 leading-relaxed">
                K'BIO Conseil enchaîne missions France (réseaux hospitaliers APS) et grands périmètres
                région Afrique où les parcs sont dispersés multiples sites et formats Excel historiques imparfaits.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {positioning.map((p) => (
                <article key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="mt-3 text-[14px] text-white/75 leading-relaxed">{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 md:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="L'équipe"
                title="Compétences mobilitaires et réseaux spécialisés."
                description="Le noyau couvre biomédical, data GMAO, architecture bloc & fluides, méthodes AO/TABORD selon vos besoins : nous associons ponctuellement métrologues, architectes partenaires et ingénieurs locaux sous pilotage commun."
              />
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { role: "Ingénierie biomédicale", description: "Audits PSA, criticité fonctionnelle, plans investissement multisites, dossiers AO biomédical." },
                  { role: "Terrain & mise en données", description: "Visites structurées, imports Excel désordonnés, harmonisation nomenclatures, QC livrables." },
                  { role: "GMAO Excel & KPI", description: "Inventaires 6-feuilles type, dashboards COUNTIF agrégés, exports bailleur ministère." },
                  { role: "Architecture & fluides", description: "Notes APS bloc, dimensionnements médicaux gaz, pré-analyses investissement infrastructures critiques." },
                ].map((t) => (
                  <article
                    key={t.role}
                    className="rounded-2xl border border-[color:var(--color-line)] bg-white p-6"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-teal-700)]">
                      Pôle
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-ink)]">{t.role}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--color-muted-strong)]">
                      {t.description}
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-[12.5px] text-[color:var(--color-muted)]">
                Les noms et photographies des collaborateurs ne sont pas affichés par défaut. Nous
                pouvons les communiquer dans le cadre d'une réponse à appel d'offres ou d'un
                processus de sélection.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LogoWall />

      <CTASection
        eyebrow="Travailler avec nous"
        title="Proposer ensemble une mission PSA, AO ou étude architecture."
        primaryHref="/contact"
        primaryLabel="Nous contacter"
      />
    </>
  );
}
