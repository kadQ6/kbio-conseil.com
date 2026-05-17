/**
 * Single source for K'BIO Conseil site content.
 */

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Building2,
  ClipboardCheck,
  Cpu,
  FileBarChart2,
  FileSearch,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  LineChart,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wrench,
} from "lucide-react";

export const site = {
  name: "K'BIO Conseil",
  longName: "Ingénierie biomédicale & architecture hospitalière",
  parent: "K'BIO Conseil",
  baseline: "Génie biomédical et ingénierie hospitalière terrain.",
  url: "https://kbio-conseil.com",
  locale: "fr-FR",
  contact: {
    email: "contact@kbio-conseil.com",
    phone: "+253 XX XX XX XX",
    whatsapp: "",
    address: "Accompagnement terrain — Île-de-France & Djibouti · missions Afrique subsaharienne",
    city: "Paris · Djibouti",
    country: "FR · DJ",
  },
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Expertises", href: "/expertises" },
  { label: "Offres & contrats", href: "/offres" },
  { label: "Méthode", href: "/methode" },
  { label: "Nos projets", href: "/projets" },
  { label: "Plateformes & PSA", href: "/plateformes" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof navigation)[number];

export const heroStats: ReadonlyArray<{
  value: string;
  suffix?: string;
  label: string;
  hint: string;
}> = [
  {
    value: "120",
    suffix: "+",
    label: "Missions livrées",
    hint: "audits PSA, études biomédicales, assistance bailleurs",
  },
  { value: " 2000", label: "Équipements cartographiés ou suivis", hint: "dans des programmes GMAO multisites" },
  { value: "15", suffix: "+", label: "Pays & territoires couverts", hint: "Est & Afrique subsaharienne" },
  {
    value: "48",
    suffix: " h",
    label: "Délai de réponse indicatif",
    hint: "premier retour projet sur demande précise",
  },
];

export type Expertise = {
  slug: string;
  title: string;
  short: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
};

export const expertises: Expertise[] = [
  {
    slug: "audit-technique",
    title: "Audit technique biomédical",
    short: "Diagnostic complet du parc et de la conformité technique.",
    description:
      "Évaluation terrain des dispositifs médicaux : performance, sécurité, IEC 60601 / IEC 62353, criticité OMS, risques pour le patient et la continuité de service — avec rapport priorisé pour investissement.",
    benefits: [
      "Cartographie factuelle multisite",
      "Arbitrages budgétaires argumentés",
      "Plan d'action chiffré",
      "Livrables utilisables bailleur / AO",
    ],
    icon: ClipboardCheck,
  },
  {
    slug: "inventaire-cartographie",
    title: "Inventaire & cartographie du parc",
    short: "Référentiel unique exploitable même avec des fichiers historiques épars.",
    description:
      "Identification physique, désignations normalisées, localisation département/service, historique interventions. Compatible import Excel terrain et migration vers GMAO.",
    benefits: [
      "Base unique multi-sites",
      "Réduction des « équipements fantômes »",
      "Socle données pour KPI",
      "Traçabilité audit",
    ],
    icon: LayoutDashboard,
  },
  {
    slug: "maintenance-preventive",
    title: "Maintenance préventive",
    short: "Programmes réalistes par criticité — contextes africains & ressources limitées.",
    description:
      "Construction de PMC/PMS harmonisées, visite préventive, contrôles électrique & métrologiques selon criticité IEC 62353.",
    benefits: ["Pannes critiques réduites", "Calendriers prévisibles cliniques", "Documentation bailleur", "Passation aux équipes locales"],
    icon: ShieldCheck,
  },
  {
    slug: "maintenance-curative",
    title: "Maintenance curative & pilotage interventions",
    short: "Méthodologie d'escalade pièces, fabricants et clôture des incidents.",
    description:
      "Standardisation rapports terrain, SLA indicatifs, coordination fournisseur / donateur, mise à jour registre équipements.",
    benefits: [
      "Délais mieux suivis",
      "Traçabilité complète par DM",
      "Capitalisation anomalies",
      "Support direction technique",
    ],
    icon: Wrench,
  },
  {
    slug: "gestion-risques",
    title: "Gestion risques équipements & continuité de service",
    short: "Hiérarchisation clinique budgétique alignée NF S99-170 et bonnes pratiques OMS.",
    description:
      "Cartographie défauts probables, scénarios d'immobilisation et plans de mitigation acceptables sur site.",
    benefits: ["Priorités cliniques vs coûts", "Plans réalistes ressources", "Matériel audits internes"],
    icon: HeartPulse,
  },
  {
    slug: "accompagnement-achat",
    title: "Accompagnement achat & réception technique",
    short: "Cahiers des charges, mise en conformité livraisons, mise en service et formation.",
    description:
      "Comparatif technique hors marketing, aide réception physique & documentation, mise en exploitation sécurisée.",
    benefits: ["Spécifications opposables", "Réception neutre traçée", "Mise en service documentée"],
    icon: FileBarChart2,
  },
  {
    slug: "formation-utilisateurs",
    title: "Formation utilisateurs & techniques",
    short: "Module court pour soignants, biomédical et équipes maintenance niveau 1.",
    description:
      "Supports en français ou bilingues, mise en avant signaux précoces panne et procédures d'alerte.",
    benefits: ["Moins erreurs utilisateur", "Remontées qualité terrain", "Autonomie N1 là où possible"],
    icon: GraduationCap,
  },
  {
    slug: "mise-en-place-gmao",
    title: "GMAO biomédical & dashboards",
    short: "Dispositifs métiers sous Excel évolutifs ou préparation données app.",
    description:
      "Structure type inventaire / PMC / tableau de bord, cohérence formules KPI (disponibilité, MTBF, MTTR).",
    benefits: ["Pilotage données partagées", "Exports bailleur", "Scalabilité numérique future"],
    icon: Cpu,
  },
  {
    slug: "structuration-departement",
    title: "Structuration département biomédical",
    short: "Organisation, staffing, interfaces achats / bloc / IT.",
    description:
      "Matrice RACI indicative, roadmap compétences, modèles PV & fiches mission pour institution.",
    benefits: ["Gouvernance claire", "Processus auditables", "Montée charge progressive"],
    icon: Microscope,
  },
  {
    slug: "architecture-hospitaliere",
    title: "Architecture hospitalière & fluides médicaux",
    short: "APS/APD bloc, salles techniques, générateurs médicaux, conformité indicative.",
    description:
      "Notes de synthèse dimensionnement réseaux O₂ / air médical, cohérence programme fonctionnel blocs ISO 14644 NF S90-351, assistance arbitrage équipements périphériques bloc.",
    benefits: ["Alignement clinique-ingénierie", "Référentiels normatifs cités", "Pré-risk investissement infrastructure"],
    icon: Building2,
  },
  {
    slug: "methodologie-appels-offres",
    title: "Appels d'offres & dossiers équipements",
    short: "Matrices conformité TABORD/MINIFS, équivalences techniques réglementaires.",
    description:
      "Lecture CDT/DPF, tableau offre/conformité, sourcing multi-fabricants médical & laboratoire, lettres équivalence.",
    benefits: ["Dépouillement décision rapide", "Traçabilité argumentaire", "Prix par devise projet"],
    icon: FileSearch,
  },
];

export type Offer = {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  highlight?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const offers: Offer[] = [
  {
    slug: "audit-simple",
    name: "Audit stratégique",
    tagline: "État des lieux chiffré du parc et des risques critiques.",
    duration: "Mission ciblée",
    features: [
      "Atelier direction & périmètre",
      "Échantillonnage visites ou audit complet selon sizing",
      "Rapport priorisé urgences/clinique",
      "Synthèse investissement indicative",
      "Option restitution bailleur",
    ],
    ctaLabel: "Demander un entretien",
    ctaHref: "/contact?offre=audit-simple",
  },
  {
    slug: "audit-curatif",
    name: "Audit + relance corrective",
    tagline: "Diagnostiquer et débloquer immobilisations majeures factuellement.",
    duration: "Wave terrain étendue",
    highlight: "Demandé PSA & renouvellement parc",
    features: [
      "Cartographie + focus pannes critiques",
      "Plans action court terme avec coûts pièces",
      "Rapport médiation direction / fournisseur",
      "Mise à jour registre équipements",
    ],
    ctaLabel: "Planifier une mission",
    ctaHref: "/contact?offre=audit-curatif",
  },
  {
    slug: "contrat-3-ans",
    name: "Accompagnement triennal",
    tagline: "Cadence d'expertise, mise à niveau méthodes & reporting consolidé bailleur.",
    duration: "36 mois (avenant)",
    features: [
      "Feuilles de route annuelles",
      "Révisions PMC & rapports réguliers",
      "Astreinte conseil niveau stratégique",
      "Exports Excel standardisés",
      "Pont vers microsite PSA projet si pertinent",
      "Réunions COPIL trimestrielles",
    ],
    ctaLabel: "Étudier un cadre",
    ctaHref: "/contact?offre=contrat-3-ans",
  },
];

export type ServiceModel = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const serviceModels: ServiceModel[] = [
  {
    title: "Audit PSA & mise en disponibilité",
    description:
      "Préparation et restitution audits multi-sites (FSE / bailleurs) avec KPI consolidés disponibilité & criticité.",
    icon: ClipboardCheck,
  },
  {
    title: "Support correctif & escalation",
    description:
      "Méthodologie incidents majeurs pièces / fabricants, documentation pour financement urgent.",
    icon: Wrench,
  },
  {
    title: "Programmes GMAO & maintenance",
    description:
      "Structuration PMC curative/préventive, tableaux de bord ministère ou opérateur privé harmonisés.",
    icon: ShieldCheck,
  },
  {
    title: "Architecture & dossiers AO",
    description:
      "Ingénierie salles critiques, dossiers équipements, analyses conformité réglementaire projet.",
    icon: Building2,
  },
];

export type WhyPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyKbio: WhyPoint[] = [
  {
    title: "Rigueur normative terrain",
    description:
      "IEC 62353 / 60601, NF hospitable pertinentes citées là où ça aide la décision — pas de paperasse décorative.",
    icon: ShieldCheck,
  },
  {
    title: "Lisibilité pour la direction",
    description:
      "Arbitrages chiffrés & priorisation clinique : investir au bon moment, pas seulement remplacer à l'émotion.",
    icon: LineChart,
  },
  {
    title: "Continuité de soins",
    description:
      "Chaque recommandation est testée contre la capacité locale réelle maintenance & approvisionnement.",
    icon: HeartPulse,
  },
  {
    title: "Interop bailleurs & financeurs",
    description:
      "Formats livrables alignés UNICEF ENABEL Banques Islamiques ministères.",
    icon: Activity,
  },
  {
    title: "Traçabilité complète mission",
    description:
      "PV visites interventions rapports versioning nommage standard fichier.",
    icon: FileBarChart2,
  },
  {
    title: "Data pour décider",
    description:
      "Indicateurs par site agrégés multi devise possible pour tableau situation investissement pluriannuel.",
    icon: Cpu,
  },
];

export type MethodStep = {
  number: string;
  title: string;
  description: string;
  details: string[];
};

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    title: "Cadrage projet",
    description:
      "Périmètre technique & politique disponibilités ressources humaines données existantes livrées client.",
    details: ["Atelier direction générale biomédical", "Lecture derniers audits", "Définir SLA communication"],
  },
  {
    number: "02",
    title: "Collecte terrain / remotely",
    description:
      "Inventaires visites dossiers équipements import Excel consolidation.",
    details: ["Identifiants normalisés", "Photos état équipements", "Liaison localisation géographique"],
  },
  {
    number: "03",
    title: "Cartographie criticité et risques",
    description:
      "Positionnement fonction clinique niveau défaut plausible impact disponibilité lits bloc dialyse etc.",
    details: ["Matrices OMS IEC", "Synthèse quick wins sécurité", "Alignement ministère projet"],
  },
  {
    number: "04",
    title: "Recommandations & scénarios",
    description:
      "Plusieurs niveaux budgets investissement curatif préventif human capital.",
    details: ["Tranche urgences T0/T1", "Programme rolling 36 mois", "Option AO fournisseur"],
  },
  {
    number: "05",
    title: "Exécution & capitalisation",
    description:
      "Workshops mise à niveau équipes rapports versioning microsite projet si inclus.",
    details: ["COPILs planifiées", "Base Excel maître versionnée", "Transfert compétences signé"],
  },
];

export type Sector = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const sectors: Sector[] = [
  {
    title: "CHU & hôpitaux nationaux",
    description: "Parcs >500 DM maintenance fragmentée forte dépendance dons.",
    icon: HeartPulse,
  },
  {
    title: "Programmes bailleurs",
    description: "UNICEF FSE IDA Banques Islamiques exigences reporting.",
    icon: Stethoscope,
  },
  { title: "Cliniques & groupes", description: "Imagerie dialyse laboratoires rentabilité équipements.", icon: ShieldCheck },
  { title: "Blocs opératoires", description: "Tables scialytiques fluides médicaux monitoring.", icon: Sparkles },
  { title: "Imagerie", description: "Modalités diverses métrologie arrêts critiques.", icon: Microscope },
  { title: "Laboratoires", description: "Automates chaîne valeur biologique urgences.", icon: Cpu },
];

export type PortalFeature = {
  title: string;
  description: string;
};

export const portalFeatures: PortalFeature[] = [
  {
    title: "Microsites mission PSA",
    description: "Espace projet dédié (ex. Rwanda) diffusion contrôlée tableaux disponibilités consolidés bailleur.",
  },
  { title: "Centralisation livrables", description: "Rapports audits GMAO fiches synthèses versions nommées [ENTITE]-KBIO conventions." },
  { title: "Suivi KPI multi-sites", description: "Agrégation indicateurs téléchargement audits internes." },
  { title: "Piste anomalies", description: "Historique anomalies majeures fermées ou escaladées avec preuves." },
  {
    title: "Exports standardisés",
    description: "Excel PDF packés conformément exigences programmatiques externes.",
  },
];

export type Reference = {
  type: string;
  description: string;
  metrics: { label: string; value: string }[];
};

export const references: Reference[] = [
  {
    type: "Rwanda — Programme PSA FSE (CHUK • Byumba • Kabgayi • Kibilizi)",
    description:
      "Coordination audits biomédical multi-sites suivi mise en disponibilité rapports agrégés bailleur — micro-diffusion projet dédiée.",
    metrics: [
      { label: "Sites couverts", value: "4 hôpitaux" },
      { label: "Parc équipements", value: "> 3200 DM" },
      { label: "Livrables fusionnés Excel", value: "Mensuelle" },
    ],
  },
  {
    type: "Somalie — Générateurs O₂ UNICEF NOVAIR (8 sites)",
    description:
      "Structuration PMC terrain, rapports UNICEF, KPI disponibilité & consommables, visites correctives planifiées.",
    metrics: [
      { label: "Sites", value: "8" },
      { label: "Modalité", value: "PMS mensuelle + curatif" },
      { label: "Statut rapport", value: "Validé bailleur 2026" },
    ],
  },
  {
    type: "Djibouti — Projets équipements CHUD",
    description:
      "Assistance dossiers critiques dialyse et imagerie préparation mise conformité équipements dons multiples.",
    metrics: [
      { label: "Contexte AO", value: "Fonds Saoudien / IsDB" },
      { label: "Livrables", value: "Notes techniques AO" },
      { label: "Phase", value: "Exécution & suivi" },
    ],
  },
  {
    type: "Somalie — Stérilwave BERTIN (+10 sites terrain)",
    description:
      "Suivi équipements stérilisation ondule planning curatif maintenance préventive standardisée rapport groupe.",
    metrics: [
      { label: "Sites", value: "13 suivis terrain" },
      { label: "Machines référencées", value: "SW100 / SW250" },
      { label: "Rythme", value: "Ondulant regional" },
    ],
  },
  {
    type: "France — Réseaux hospitaliers & grandes cliniques",
    description:
      "Expertise architecture fluides critiques blocs et imagerie aide arbitrage équipements périphériques.",
    metrics: [
      { label: "Typologie missions", value: "APS contrôle état lieu" },
      { label: "Zones", value: "IDF Auvergne Rhône" },
      { label: "Livrables", value: "Notes calcul synthèses" },
    ],
  },
  {
    type: "Gabon — Inventaires multi-provinciaux consolidés",
    description:
      "Fichiers Excel multisites harmonisation nomenclature pour pilotage investissement ministère santé tiers.",
    metrics: [
      { label: "Sites inventoriés", value: "11" },
      { label: "Livrables", value: "GMAO synthèses consolidées" },
      { label: "Horizon", value: "Programme multisites" },
    ],
  },
];

export const testimonials: ReadonlyArray<{
  quote: string;
  author: string;
  role: string;
  note: string;
}> = [
  {
    quote:
      "Les rapports K'BIO ont permis d'accélérer notre décision d'investissement sans sur-promettre disponibilités impossibles sur site.",
    author: "Responsable technique",
    role: "Institution — Afrique de l'Est",
    note: "Retour projet — audits PSA",
  },
  {
    quote:
      "La homogénéisation de nos données multi-sites a enfin stabilisé le dialogue avec deux bailleurs ayant des templates différents.",
    author: "Coordinateur médico-technique",
    role: "Programme santé multisites",
    note: "Retour — mise en conformité données",
  },
];

export type FooterLink = { label: string; href: string };

export const footerColumns: ReadonlyArray<{
  title: string;
  links: FooterLink[];
}> = [
  {
    title: "Cabinet",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Méthode", href: "/methode" },
      { label: "Nos projets", href: "/projets" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Expertises", href: "/expertises" },
      { label: "Offres & contrats", href: "/offres" },
      { label: "Plateformes & PSA", href: "/plateformes" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Demander une mission audit", href: "/contact?offre=audit-simple" },
    ],
  },
];
