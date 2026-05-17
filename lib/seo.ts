import type { Metadata } from "next";
import { site } from "./site-data";

const DEFAULT_DESCRIPTION =
  "K'BIO Conseil — ingénierie biomédicale & architecture hospitalière. Audits PSA, programmes GMAO multisites, accompagnement bailleurs UNICEF/FSE/AO, bloc opératoire & fluides médicaux. Paris · Djibouti · Afrique subsaharienne.";

const DEFAULT_KEYWORDS = [
  "ingénierie biomédicale international",
  "audit PSA équipements médicaux",
  "GMAO hospitalière Afrique",
  "architecture hospitalière bloc opératoire",
  "fluides médicaux NF EN ISO",
  "appels d'offres biomédical",
  "K'BIO Conseil",
];

export type PageMetaInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
}: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = title === site.name ? `${site.name} — ${site.longName}` : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    keywords: Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])),
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: `${site.name} — ${site.longName}`,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    authors: [{ name: site.name }],
    creator: site.parent,
    publisher: site.parent,
  };
}

export function organizationJsonLd() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: `${site.name} — ${site.longName}`,
    url: site.url,
    description: DEFAULT_DESCRIPTION,
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Djibouti",
        addressCountry: "DJ",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.contact.email,
        ...(site.contact.phone.includes("X") ? {} : { telephone: site.contact.phone }),
        areaServed: ["FR", "DJ", "RW", "SO", "GA", "ET", "KE", "KM", "CD"],
        availableLanguage: ["fr", "en"],
      },
    ],
  };
  return org;
}

export function professionalServiceJsonLd() {
  const svc = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — ${site.longName}`,
    url: site.url,
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.city,
      streetAddress: site.contact.address,
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Djibouti" },
      { "@type": "Country", name: "Rwanda" },
      { "@type": "Country", name: "Somalie" },
      { "@type": "Country", name: "Gabon" },
    ],
    serviceType: [
      "Ingénierie biomédicale",
      "Audits équipements hospitaliers",
      "Programmes maintenance biomédicale",
      "Architecture hospitalière APS/APD",
      "Fluides médicaux & blocs opératoires",
    ],
    priceRange: "Sur devis",
  };
  return svc;
}
