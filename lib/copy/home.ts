import type { AppLocale } from "@/lib/i18n/config";

export type HeroCopyStrings = {
  badge: string;
  titleLead: string;
  titleAccent: string;
  intro: [string, string];
  ctaPrimary: string;
  ctaSecondary: string;
  /** Textes alternatifs des 3 illustrations sous le hero (audit, terrain, données). */
  trustImageAlts: readonly [string, string, string];
  visualEyebrow: string;
  visualLive: string;
  kpiActiveProjects: string;
  kpiAvgProgress: string;
  kpiWatchpoints: string;
  kpiMilestones: string;
  chartEyebrow: string;
  chartTitle: string;
  chartSubtitle: string;
  chartAria: string;
  rowBio: string;
  rowArchi: string;
  countriesEyebrow: string;
  sideCardEyebrow: string;
  sideCardMetric: string;
  sideCardUnit: string;
};

const heroFr = {
  badge: "France - Afrique - Moyen Orient",
  titleLead: "Transformer la gestion biomédicale en levier de",
  titleAccent: "performance hospitalière",
  intro: [
    "K'BIO structure des missions d'audit biomédical, des programmes d'équipement multisites et des études d'architecture hospitalière pour les acteurs publics, les bailleurs et les opérateurs privés de santé.",
    "Nous transformons les constats techniques en données fiables, chiffrées et opposables pour éclairer les décisions, sécuriser les investissements et renforcer la continuité des soins.",
  ],
  ctaPrimary: "Demander un RDV",
  ctaSecondary: "Découvrir nos expertises",
  trustImageAlts: [
    "Illustration — audit documentaire, vérification et conformité",
    "Illustration — ingénierie biomédicale et intervention sur le terrain",
    "Illustration — pilotage de projet et analyse des données de santé",
  ],
  visualEyebrow: "Tableau de bord projets",
  visualLive: "K'BIO · Live",
  kpiActiveProjects: "Projets actifs",
  kpiAvgProgress: "Avancement moyen",
  kpiWatchpoints: "Points vigilance",
  kpiMilestones: "Jalons sous 45 j",
  chartEyebrow: "Projets en cours",
  chartTitle: "Répartition biomédical / architecture",
  chartSubtitle: "actifs",
  chartAria:
    "{total} projets en cours : {bio} engagements en ingénierie biomédicale et {archi} engagements en architecture hospitalière",
  rowBio: "Ingénierie biomédicale",
  rowArchi: "Architecture hospitalière",
  countriesEyebrow: "Pays avec projets en cours",
  sideCardEyebrow: "Livrables en cours",
  sideCardMetric: "14",
  sideCardUnit: " dossiers",
} satisfies HeroCopyStrings;

const heroEn = {
  badge: "France · Africa · Middle East",
  titleLead: "Turn biomedical governance into leverage for",
  titleAccent: "hospital performance",
  intro: [
    "K'BIO structures biomedical PSA audits, multisite hospital equipment portfolios and perioperative engineering studies for public authorities, bilateral donors and private operators.",
    "We convert technical observations into audited, monetised datasets that inform decisions, de-risk capex cycles and underpin continuity of care.",
  ],
  ctaPrimary: "Request a meeting",
  ctaSecondary: "Explore our expertise",
  trustImageAlts: [
    "Illustration — documentation audit, verification and compliance",
    "Illustration — biomedical engineering and field operations",
    "Illustration — programme steering and health data analytics",
  ],
  visualEyebrow: "Portfolio dashboard",
  visualLive: "K'BIO · Live",
  kpiActiveProjects: "Active engagements",
  kpiAvgProgress: "Avg. progress",
  kpiWatchpoints: "Attention items",
  kpiMilestones: "≤45-day milestones",
  chartEyebrow: "Live engagements",
  chartTitle: "Biomedical vs hospital architecture split",
  chartSubtitle: "active",
  chartAria:
    "{total} engagements in flight: {bio} biomedical workloads and {archi} architecture workloads",
  rowBio: "Biomedical engineering",
  rowArchi: "Healthcare architecture",
  countriesEyebrow: "Countries with ongoing projects",
  sideCardEyebrow: "Deliverables in progress",
  sideCardMetric: "14",
  sideCardUnit: " work packages",
} satisfies HeroCopyStrings;

export function getHeroCopy(locale: AppLocale): HeroCopyStrings {
  return locale === "en" ? heroEn : heroFr;
}
