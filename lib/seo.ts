import type { Metadata } from "next";
import type { AppLocale } from "@/lib/i18n/config";
import { canonicalPathForLocale } from "@/lib/i18n/paths";
import { site } from "./site-data";

const DEFAULT_DESCRIPTION_FR =
  "K'BIO — ingénierie biomédicale & architecture hospitalière. Audits PSA, programmes GMAO multisites, accompagnement bailleurs UNICEF/FSE/AO, bloc opératoire & fluides médicaux. Paris · Djibouti · Afrique subsaharienne.";

const DEFAULT_DESCRIPTION_EN =
  "K'BIO — biomedical engineering & healthcare architecture. PSA readiness, multisite biomedical CMMS, donor-aligned deliverables UNICEF/FSE/tenders, operating suites & medical gas systems. Paris · Djibouti · Sub-Saharan Africa.";

const DEFAULT_KEYWORDS_FR = [
  "ingénierie biomédicale international",
  "audit PSA équipements médicaux",
  "GMAO hospitalière Afrique",
  "architecture hospitalière bloc opératoire",
  "fluides médicaux NF EN ISO",
  "appels d'offres biomédical",
  "K'BIO",
];

const DEFAULT_KEYWORDS_EN = [
  "biomedical engineering africa",
  "hospital PSA audit",
  "hospital CMMS programme",
  "operating room engineering",
  "medical gas ISO EN",
  "hospital tenders",
  "K'BIO",
];

const SITE_LINE_FR = `${site.name} — ${site.longName}`;
const SITE_LINE_EN = `${site.name} — Biomedical engineering & healthcare architecture`;

export type PageMetaInput = {
  title: string;
  description?: string;
  /** Toujours sans préfixe /en (ex. /contact). */
  path?: string;
  keywords?: string[];
  locale?: AppLocale;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  locale = "fr",
}: PageMetaInput): Metadata {
  const resolvedDescription =
    description ?? (locale === "en" ? DEFAULT_DESCRIPTION_EN : DEFAULT_DESCRIPTION_FR);

  const pathNorm = path.startsWith("/") ? path : `/${path}`;
  const canonicalPath = canonicalPathForLocale(locale, pathNorm);
  const canonicalUrl = new URL(canonicalPath, site.url).toString();
  const urlFr = new URL(canonicalPathForLocale("fr", pathNorm), site.url).toString();
  const urlEn = new URL(canonicalPathForLocale("en", pathNorm), site.url).toString();

  const siteLine = locale === "en" ? SITE_LINE_EN : SITE_LINE_FR;
  const fullTitle = title === site.name ? siteLine : `${title} | ${site.name}`;
  const baseKeywords = locale === "en" ? DEFAULT_KEYWORDS_EN : DEFAULT_KEYWORDS_FR;
  const ogLocale = locale === "en" ? "en_US" : "fr_FR";

  return {
    title: fullTitle,
    description: resolvedDescription,
    keywords: Array.from(new Set([...baseKeywords, ...keywords])),
    metadataBase: new URL(site.url),
    alternates: {
      canonical: canonicalUrl,
      languages: { "fr-FR": urlFr, "en-US": urlEn, "x-default": urlFr },
    },
    openGraph: {
      title: fullTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: siteLine,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: resolvedDescription,
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
    legalName: SITE_LINE_FR,
    url: site.url,
    description: DEFAULT_DESCRIPTION_FR,
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
    name: SITE_LINE_FR,
    url: site.url,
    description: DEFAULT_DESCRIPTION_FR,
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
