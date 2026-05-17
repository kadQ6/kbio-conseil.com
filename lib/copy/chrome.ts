import { footerColumns, navigation } from "@/lib/site-data";
import type { AppLocale } from "@/lib/i18n/config";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const navigationEn = [
  { label: "Home", href: "/" },
  { label: "About", href: "/a-propos" },
  { label: "Expertise", href: "/expertises" },
  { label: "Method", href: "/methode" },
  { label: "Projects", href: "/projets" },
  { label: "Contact", href: "/contact" },
] as const;

const footerColumnsEn: FooterColumn[] = [
  {
    title: "Firm",
    links: [
      { label: "About", href: "/a-propos" },
      { label: "Method", href: "/methode" },
      { label: "Projects", href: "/projets" },
    ],
  },
  {
    title: "Services",
    links: [{ label: "Expertise", href: "/expertises" }],
  },
  {
    title: "Resources",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Request an audit assignment", href: "/contact?offre=audit-simple" },
    ],
  },
];

export type ChromeStrings = {
  /** First line below logo — replaces site.longName in footer on EN. */
  firmDescriptor: string;
  navigation: typeof navigation | typeof navigationEn;
  footerColumns: typeof footerColumns | FooterColumn[];
  skipToContent: string;
  headerCtaRdv: string;
  mobileMenuClose: string;
  mobileMenuOpen: string;
  langGoEn: string;
  langGoFr: string;
  langAriaToEn: string;
  langAriaToFr: string;
  /** Libellé court affiché dans l’interrupteur FR / EN. */
  langShortFr: string;
  langShortEn: string;
  langSwitcherNavAria: string;
  footerBlurbSuffix: string;
  footerLegalCities: string;
  logoAriaHome: string;
};

const chromeFr = {
  firmDescriptor: "Ingénierie biomédicale & architecture hospitalière",
  navigation,
  footerColumns,
  skipToContent: "Aller au contenu",
  headerCtaRdv: "Demander un RDV",
  mobileMenuClose: "Fermer le menu",
  mobileMenuOpen: "Ouvrir le menu",
  langGoEn: "English",
  langGoFr: "Français",
  langAriaToEn: "View the site in English",
  langAriaToFr: "Voir le site en français",
  langShortFr: "FR",
  langShortEn: "EN",
  langSwitcherNavAria: "Choisir la langue du site",
  footerBlurbSuffix:
    "Missions PSA, dossiers AO, bloc opératoire & fluides médicaux, avec des livrables compatibles bailleurs et audits internationaux.",
  footerLegalCities: "Paris · Djibouti · missions internationales",
  logoAriaHome: "K'BIO — Accueil",
} satisfies ChromeStrings;

const chromeEn = {
  firmDescriptor: "Biomedical engineering & healthcare architecture",
  navigation: navigationEn,
  footerColumns: footerColumnsEn,
  skipToContent: "Skip to content",
  headerCtaRdv: "Request a meeting",
  mobileMenuClose: "Close menu",
  mobileMenuOpen: "Open menu",
  langGoEn: "English",
  langGoFr: "Français",
  langAriaToEn: "View the site in English",
  langAriaToFr: "Voir le site en français",
  langShortFr: "FR",
  langShortEn: "EN",
  langSwitcherNavAria: "Site language",
  footerBlurbSuffix:
    "PSA missions, tenders, surgical suite & medical fluids, with deliverables tailored to donors and international audits.",
  footerLegalCities: "Paris · Djibouti · international engagements",
  logoAriaHome: "K'BIO — Home",
} satisfies ChromeStrings;

export function getChrome(locale: AppLocale): ChromeStrings {
  return locale === "en" ? chromeEn : chromeFr;
}
