import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { CTASection } from "@/components/CTASection";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { buildMetadata } from "@/lib/seo";
import { offers } from "@/lib/site-data";
import { images } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "Offres et contrats",
  description:
    "Trois formats d'engagement K'BIO : audit stratégique, wave terrain diagnostic + unblock, ou cadre pluriannel COPIL & reporting données.",
  path: "/offres",
});

const compareRows: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "Inventaire physique des équipements", values: [true, true, true] },
  { label: "Contrôle visuel et fonctionnel", values: [true, true, true] },
  { label: "Rapport technique structuré", values: [true, true, true] },
  { label: "Priorisation des urgences", values: [true, true, true] },
  { label: "Maintenance curative immédiate (selon faisabilité)", values: [false, true, true] },
  { label: "Liste argumentée des pièces nécessaires", values: [false, true, true] },
  { label: "Plan préventif annuel structuré", values: [false, false, true] },
  { label: "Visites programmées sur site", values: [false, false, true] },
  { label: "Reporting trimestriel", values: [false, false, true] },
  { label: "Tableau de bord client en ligne", values: [false, false, true] },
  { label: "Accompagnement budgétaire", values: [false, false, true] },
];

export default function OffresPage() {
  return (
    <>
      <PageHero
        eyebrow="Offres & contrats"
        title="Trois formats d'engagement, un seul niveau d'exigence."
        description="Du diagnostic ponctuel au contrat pluriannuel : choisissez l'intensité d'accompagnement qui correspond à la maturité technique et au programme d'investissement de votre établissement."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Offres & contrats" }]}
        image={images.monitor.src}
        imageAlt={images.monitor.alt}
      />

      <section>
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {offers.map((o, i) => (
              <AnimatedReveal key={o.slug} delay={i * 0.06}>
                <OfferCard offer={o} featured={i === 1} />
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-soft)]">
        <Container className="py-24 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">Tableau comparatif</p>
            <h2 className="display mt-4 text-3xl md:text-[40px]">
              Ce qui est inclus dans chacune de nos offres.
            </h2>
            <p className="mt-5 text-[16px] text-[color:var(--color-muted-strong)]">
              Une vue synthétique pour faciliter votre arbitrage. Le périmètre détaillé est validé
              avec votre direction technique avant le démarrage.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-[color:var(--color-soft)] text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                    <th className="py-5 px-6 font-medium">Inclusion</th>
                    {offers.map((o) => (
                      <th key={o.slug} className="py-5 px-6 font-medium text-[color:var(--color-ink)]">
                        {o.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--color-line)]">
                  {compareRows.map((row) => (
                    <tr key={row.label} className="text-[14.5px]">
                      <td className="py-4 px-6 text-[color:var(--color-muted-strong)]">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="py-4 px-6">
                          {v ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]">
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-soft)] text-[color:var(--color-muted)]">
                              <Minus className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Études personnalisées"
        title="Vous avez un cahier des charges ou un dossier de bailleur en cours ?"
        description="Nous adaptons nos formats à vos contraintes contractuelles, à votre périmètre multi-sites et à vos exigences de reporting."
        primaryHref="/contact"
        primaryLabel="Demander une étude"
      />
    </>
  );
}
