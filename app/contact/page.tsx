import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";
import { images } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contacter K'BIO Conseil — audit PSA biomédical, programmes GMAO multisites, assistance AO & architecture bloc. Réponse indicative sous ~48 h ouvrées.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Échangeons sur votre besoin biomédical."
        description="Une personne projet K'BIO revient sous ~48 heures ouvrées. Joignez si possible périmètre équipements, pays, fenêtre temps & bailleur potentiel pour un premier niveau pertinent."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        image={images.djiboutiCity.src}
        imageAlt={images.djiboutiCity.alt}
      />

      <section>
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <AnimatedReveal>
                <div className="flex flex-col gap-6">
                  <ContactCard
                    Icon={Phone}
                    title="Téléphone"
                    primary={site.contact.phone}
                    secondary="Du dimanche au jeudi, 8h–17h (heure de Djibouti)."
                    href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                  />
                  <ContactCard
                    Icon={Mail}
                    title="Email"
                    primary={site.contact.email}
                    secondary="Réponse sous 48h ouvrées."
                    href={`mailto:${site.contact.email}`}
                  />
                  <ContactCard
                    Icon={MessageCircle}
                    title="WhatsApp"
                    primary={site.contact.whatsapp}
                    secondary="Pour les urgences techniques."
                    href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                  />
                  <ContactCard
                    Icon={MapPin}
                    title="Adresse"
                    primary={site.contact.address}
                    secondary={`${site.contact.city}, ${site.contact.country}`}
                  />
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.1}>
                <div className="mt-8 overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white">
                  <MapVisual />
                </div>
              </AnimatedReveal>
            </div>

            <div className="lg:col-span-7">
              <AnimatedReveal delay={0.05}>
                <ContactForm />
              </AnimatedReveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactCard({
  Icon,
  title,
  primary,
  secondary,
  href,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  primary: string;
  secondary: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-[color:var(--color-line)] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
      <span
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--color-teal-100)] text-[color:var(--color-teal-700)]"
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{title}</p>
        <p className="mt-1 text-[15.5px] font-semibold text-[color:var(--color-ink)] num-tabular">
          {primary}
        </p>
        <p className="mt-1 text-[13px] text-[color:var(--color-muted)]">{secondary}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">
      {inner}
    </a>
  ) : (
    inner
  );
}

function MapVisual() {
  return (
    <div className="relative h-56 w-full overflow-hidden bg-[color:var(--color-soft)]">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
      <svg
        aria-hidden
        viewBox="0 0 600 220"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="g-loc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M0,160 C120,140 220,180 320,155 C420,130 520,150 600,135 L600,220 L0,220 Z"
          fill="rgba(11,37,69,0.06)"
        />
        <path
          d="M0,180 C140,160 240,200 340,175 C440,150 540,170 600,155 L600,220 L0,220 Z"
          fill="rgba(11,37,69,0.10)"
        />
        <circle cx="380" cy="110" r="60" fill="url(#g-loc)" />
        <circle cx="380" cy="110" r="6" fill="var(--color-teal-700)" />
        <circle cx="380" cy="110" r="11" fill="none" stroke="var(--color-teal-700)" strokeWidth="1.5" />
      </svg>
      <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 text-[12px] text-[color:var(--color-ink)] backdrop-blur">
        Djibouti — Corne de l'Afrique
      </div>
    </div>
  );
}
