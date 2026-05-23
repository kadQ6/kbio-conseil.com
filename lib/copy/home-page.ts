import type { AppLocale } from "@/lib/i18n/config";

type HomeSections = {
  introEyebrow: string;
  introTitle: string;
  introP1: string;
  introP2: string;
  fieldEyebrow: string;
  fieldTitle: string;
  fieldP1: string;
  fieldP2: string;
  fieldStats: { value: string; label: string }[];
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDesc: string;
  whyEyebrow: string;
  whyTitle: string;
  whyLead: string;
  methodEyebrow: string;
  methodTitle: string;
  methodDesc: string;
  methodBtn: string;
  sectorsEyebrow: string;
  sectorsTitle: string;
  sectorsDesc: string;
  refAltPrefix: string;
  projectsBtn: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
  logoWallEyebrow: string;
  logoWallTitle: string;
  logoWallSubtitle: string;
  logoWallDisclaimer: string;
  serviceMore: string;
  refMaskedBadge: string;
};

const FR: HomeSections = {
  introEyebrow: "Le cabinet",
  introTitle: "Ingénierie biomédicale structurée, du terrain aux dossiers bailleurs.",
  introP1:
    "K'BIO soutient ministères de santé, directions techniques hospitalières et bailleurs sur des périmètres multisites : mise en disponibilité, audit PSA, fichiers Excel GMAO industrialisés, assistance architecture bloc & fluides médicaux.",
  introP2:
    "Méthodes alignées OMS/IEC où utile, livrables versionnés, exports conformes audits — sans sur-promettre des disponibilités impossibles sur le terrain réel des sites.",
  fieldEyebrow: "Sur le terrain",
  fieldTitle: "Présence technique qui transforme l'état du parc en plan d'arbitrage.",
  fieldP1:
    "Déplacements sur sites critiques (blocs, dialyse, imagerie, laboratoires) comme appui à distance lorsque la mission est structurée en vagues locales. Visites documentées, nomenclatures homogènes, criticité fonctionnelle.",
  fieldP2:
    "Vous obtenez une base unique pour KPI consolidés ministère ou bailleur, et des chiffrages d'investissement comparables dans le temps.",
  fieldStats: [
    { value: "120+", label: "Audits PSA & missions livrées" },
    { value: "> 3200 DM", label: "Ex. programme Rwanda PSA" },
    { value: "UNICEF", label: "& bailleurs multiformats Excel" },
  ],
  servicesEyebrow: "Axes d'intervention",
  servicesTitle: "Quatre modes d'accompagnement selon votre maturité data & risques.",
  servicesDesc:
    "Durée indicative : du sprint audit à plusieurs années COPIL stratégiques — périmètres contractualisés clairement.",
  whyEyebrow: "Pourquoi K'BIO",
  whyTitle: "Rigueur consulting & sens du plateau technique.",
  whyLead:
    "Pas de généralités PowerPoint creuses : nous travaillons avec données terrain, nomenclatures explicables et dossiers AO ou bailleurs vérifiables point par point.",
  methodEyebrow: "Méthode",
  methodTitle: "Cinq étapes structurées, du cadrage à la capitalisation données.",
  methodDesc:
    "Une démarche lisible équipes médicales, achats et bailleurs — avec fichiers vivants évolutifs.",
  methodBtn: "Méthode détaillée",
  sectorsEyebrow: "Secteurs accompagnés",
  sectorsTitle: "Une même exigence — contextes très différents.",
  sectorsDesc:
    "Missions publique nationale, projet bailleur UNICEF/FSE ou clinique groupe privé européenne.",
  refAltPrefix: "Illustration —",
  projectsBtn: "Nos projets & missions types",
  ctaEyebrow: "Premier échange",
  ctaTitle: "Structurer vos données équipements & votre stratégie investissement?",
  ctaDesc:
    "Une visio de pré-cadrage avec un consultant K'BIO permet d'estimer volumétrie, délais indicative et niveau livrables sans engagement.",
  ctaPrimary: "Planifier un échange confidentiel",
  ctaSecondary: "Voir les expertises",
  logoWallEyebrow: "Confiance",
  logoWallTitle: "Ils nous font confiance",
  logoWallSubtitle:
    "Exemples de programme : bailleurs institutionnels, ministères de santé, opérateurs privés multisites.",
  logoWallDisclaimer: "Logos d'illustration — à remplacer par les références réelles.",
  serviceMore: "En savoir plus",
  refMaskedBadge: "Mission anonymisée",
};

const EN: HomeSections = {
  introEyebrow: "About us",
  introTitle:
    "Structured biomedical engineering—from ward rounds to financier‑ready dossiers.",
  introP1:
    "K'BIO backs Ministries of Health, biomedical engineering divisions and bilateral donors across multisite programmes: PSA readiness, audited spreadsheets, perioperative architectures & regulated medical fluids.",
  introP2:
    "WHO/IEC-aligned methods where meaningful, gated deliverables, audit-grade exports—and no fake uptime promises versus real‑world maintenance capacity.",
  fieldEyebrow: "Ground presence",
  fieldTitle:
    "Field intelligence that translates fleet reality into defensible capex ladders.",
  fieldP1:
    "On‑site bursts in critical areas (suites, dialysis, imaging, labs) supplemented by disciplined remote pulses when mobilised in regional waves.",
  fieldP2:
    "Leadership obtains a consolidated backbone for Ministries or donor KPI dashboards with comparable capex ladders over time.",
  fieldStats: [
    { value: "120+", label: "Biomedical PSA assignments delivered" },
    { value: ">3200 regulated devices", label: "Rwanda PSA cohort" },
    { value: "UNICEF+", label: "Donor-tailored Excel dossiers" },
  ],
  servicesEyebrow: "Engagement pillars",
  servicesTitle:
    "Four service modes aligned with your data maturity and clinical risk posture.",
  servicesDesc:
    "Indicative spans from tactical audit sprints through multi‑year COPIL mandates—explicit scopes in contracting.",
  whyEyebrow: "Why K'BIO",
  whyTitle:
    "Boardroom‑grade diligence coupled with visceral bedside engineering literacy.",
  whyLead:
    "No ornamental slides: we tether decisions to reproducible nomenclatures, traceable artefacts and procurements auditors can reconcile line‑by‑line.",
  methodEyebrow: "Method",
  methodTitle:
    "Five articulated stages—from briefing to reproducible spreadsheets.",
  methodDesc:
    "Understandable cadence for clinicians, procurement and financiers—with living data files.",
  methodBtn: "Full methodology",
  sectorsEyebrow: "Healthcare segments",
  sectorsTitle: "Same bar—dramatically different settings.",
  sectorsDesc:
    "Nationwide Ministries, UNICEF/FSE pipelines and continental private hospital portfolios.",
  refAltPrefix: "Illustration —",
  projectsBtn: "See projects & mission patterns",
  ctaEyebrow: "First conversation",
  ctaTitle: "Sharpen biomedical data governance and capex signalling?",
  ctaDesc:
    "A K'BIO lead can scope workloads, pacing and deliverables in a confidentiality‑first briefing—without obligation.",
  ctaPrimary: "Schedule a confidential briefing",
  ctaSecondary: "Explore expertise clusters",
  logoWallEyebrow: "Trust",
  logoWallTitle: "Who relies on our teams",
  logoWallSubtitle:
    "Representative mandates: Ministries, UNICEF corridors, multisite donor programmes.",
  logoWallDisclaimer: "Monogram placeholders—replace as references clear legal review.",
  serviceMore: "Learn more",
  refMaskedBadge: "Anonymised mandate",
};

export function homeSections(locale: AppLocale): HomeSections {
  return locale === "en" ? EN : FR;
}
