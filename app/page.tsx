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
import { references, sectors, serviceModels, whyKbio } from "@/lib/site-data";
import { images } from "@/lib/images";

const referenceImages = [images.audit.src, images.imaging.src, images.laboratory.src];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Introduction + chiffres clés */}
      <section className="relative">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Le cabinet</p>
              <h2 className="display mt-4 text-3xl md:text-[40px] leading-[1.05]">
                Ingénierie biomédicale structurée, du terrain aux dossiers bailleurs.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[color:var(--color-muted-strong)] text-pretty">
                K'BIO soutient ministères de santé, directions techniques hospitalières et
                bailleurs sur des périmètres multisites : mise en disponibilité, audit PSA,
                fichiers Excel GMAO industrialisés, assistance architecture bloc & fluides médicaux.
              </p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-[color:var(--color-muted)]">
                Méthodes alignées OMS/IEC où utile, livrables versionnés, exports conformes audits
                — sans sur-promettre des disponibilités impossibles sur le terrain réel des sites.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <AnimatedReveal>
              <StatsGrid />
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* Image feature 1 — Sur le terrain */}
      <section className="relative bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-32">
          <ImageFeature
            eyebrow="Sur le terrain"
            title="Présence technique qui transforme l'état du parc en plan d'arbitrage."
            description={
              <>
                <p>
                  Déplacements sur sites critiques (blocs, dialyse, imagerie, laboratoires) comme
                  appui à distance lorsque la mission est structurée en vagues locales. Visites
                  documentées, nomenclatures homogènes, criticité fonctionnelle.
                </p>
                <p>
                  Vous obtenez une base unique pour KPI consolidés ministère ou bailleur, et des
                  chiffrages d'investissement comparables dans le temps.
                </p>
              </>
            }
            image={images.audit.src}
            imageAlt={images.audit.alt}
            stats={[
              { value: "120+", label: "Audits PSA & missions livrées" },
              { value: "> 3200 DM", label: "Ex. programme Rwanda PSA" },
              { value: "UNICEF", label: "& bailleurs multiformats Excel" },
            ]}
          >
            <ButtonLink href="/methode" variant="ghost" size="md">
              Voir la méthode
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </ImageFeature>
        </Container>
      </section>

      {/* Modèles de service */}
      <section className="relative">
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow="Axes d'intervention"
            title="Quatre modes d'accompagnement selon votre maturité data & risques."
            description="Durée indicative : du sprint audit à plusieurs années COPIL stratégiques — périmètres contractualisés clairement."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {serviceModels.map((s, i) => (
              <AnimatedReveal key={s.title} delay={i * 0.05}>
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  Icon={s.icon}
                  href="/expertises"
                />
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Image feature 2 — Pourquoi K'BIO */}
      <section className="relative bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-32">
          <ImageFeature
            eyebrow="Pourquoi K'BIO"
            title="Rigueur consulting & sens du plateau technique."
            reverse
            image={images.equipmentClose.src}
            imageAlt={images.equipmentClose.alt}
            description={
              <p>
                Pas de généralités PowerPoint creuses : nous travaillons avec données terrain,
                nomenclatures explicables et dossiers AO ou bailleurs vérifiables point par point.
              </p>
            }
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

      {/* Méthode */}
      <section id="methode" className="relative">
        <Container className="py-24 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Méthode"
              title="Cinq étapes structurées, du cadrage à la capitalisation données."
              description="Une démarche lisible équipes médicales, achats et bailleurs — avec fichiers vivants évolutifs."
            />
            <ButtonLink href="/methode" variant="ghost" size="md" className="self-start md:self-auto">
              Méthode détaillée
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-14">
            <MethodTimeline />
          </div>
        </Container>
      </section>

      <LogoWall />

      {/* Références / secteurs */}
      <section className="relative">
        <Container className="py-24 md:py-32">
          <SectionHeading
            eyebrow="Secteurs accompagnés"
            title="Une même exigence — contextes très différents."
            description="Missions publique nationale, projet bailleur UNICEF/FSE ou clinique groupe privé européenne."
          />
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
                  imageAlt={`Illustration — ${r.type}`}
                />
              </AnimatedReveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/projets" variant="ghost" size="md">
              Nos projets & missions types
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Premier échange"
        title="Structurer vos données équipements & votre stratégie investissement?"
        description="Une visio de pré-cadrage avec un consultant K'BIO permet d'estimer volumétrie, délais indicative et niveau livrables sans engagement."
        primaryHref="/contact"
        primaryLabel="Planifier un échange confidentiel"
        secondaryHref="/expertises"
        secondaryLabel="Voir les expertises"
      />
    </>
  );
}
