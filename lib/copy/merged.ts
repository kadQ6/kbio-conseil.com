import type { AppLocale } from "@/lib/i18n/config";
import type { Expertise, MethodStep, Reference, Sector, ServiceModel } from "@/lib/site-data";
import {
  expertises as expertisesFr,
  heroStats as heroStatsFr,
  methodSteps as methodStepsFr,
  references as referencesFr,
  sectors as sectorsFr,
  serviceModels as serviceModelsFr,
  testimonials as testimonialsFr,
  whyKbio as whyKbioFr,
} from "@/lib/site-data";

const heroStatsEn = [
  {
    value: "25",
    suffix: "+",
    label: "Completed assignments",
    hint: "PSA audits, biomedical studies, donor support",
  },
  {
    value: "15 000",
    label: "Devices mapped or under follow‑up",
    hint: "across CMMS multisite programmes",
  },
  { value: "12", suffix: "+", label: "Countries & territories", hint: "Eastern Africa & SSA" },
  {
    value: "48",
    suffix: " h",
    hint: "Target first response on qualified requests",
    label: "Indicative reply time",
  },
] satisfies typeof heroStatsFr;

const serviceModelsEn: { title: string; description: string }[] = [
  {
    title: "PSA audit & readiness",
    description:
      "Prepare and deliver multisite PSA audits (FSE / donor) with consolidated availability & criticality KPIs.",
  },
  {
    title: "Corrective support & escalation",
    description:
      "Approach for major incidents (parts/OEM trails) plus documentation when urgent financing is needed.",
  },
  {
    title: "Biomedical CMMS & maintenance programmes",
    description:
      "Structure preventive/corrective PM workflows and dashboards for Ministries or harmonised operators.",
  },
  {
    title: "Architecture & tenders",
    description:
      "Critical room engineering, procurement packages, regulatory alignment for institutional projects.",
  },
];

const whyKbioEn: { title: string; description: string }[] = [
  {
    title: "Codified norms on the ground",
    description:
      "IEC 62353 / 60601 and relevant hospital standards cited wherever they materially support decisions—not decorative paperwork.",
  },
  {
    title: "Executive clarity",
    description:
      "Budgeted trade‑offs & clinical prioritisation: invest where it counts, beyond emotional replacement cycles.",
  },
  {
    title: "Continuity of care",
    description:
      "Every recommendation is stress‑tested against real local servicing & supply capacity.",
  },
  {
    title: "Interop with donor templates",
    description:
      "Deliverable formats tuned to UNICEF, ENABL, Islamic development banks and Ministries.",
  },
  {
    title: "Mission traceability",
    description:
      "Visit reports & interventions versioning with standard naming so audits stay straightforward.",
  },
  {
    title: "Data for decisions",
    description:
      "Site‑level KPIs plus multi‑currency roll‑ups for multi‑year capex dashboards where needed.",
  },
];

const sectorsEn: { title: string; description: string }[] = [
  {
    title: "National teaching hospitals",
    description: ">500‑device fleets, fragmented upkeep, dependence on donor equipment.",
  },
  {
    title: "Multilateral donor programmes",
    description: "UNICEF, FSE, IDA & Islamic‑bank portfolios with stringent reporting loops.",
  },
  {
    title: "Hospital groups",
    description: "Imaging, dialysis & lab assets where equipment economics matter.",
  },
  {
    title: "Operating suites",
    description: "Surgical luminaires, medical gases infrastructure & clinical monitoring stacks.",
  },
  {
    title: "Imaging",
    description: "Multiple modalities—metrology and downtime are safety critical.",
  },
  {
    title: "Laboratory",
    description: "Automation lines bridging urgent pathology workloads.",
  },
];

const testimonialsEn = [
  {
    quote:
      "K'BIO reports accelerated our capex approvals without overstating unrealistic on‑site uptime.",
    author: "Head of technical services",
    role: "Institution — East Africa",
    note: "Feedback — PSA audit cycle",
  },
  {
    quote:
      "Harmonising our multisite spreadsheets finally stabilized conversations with donors using different Excel templates.",
    author: "Medico‑technical coordinator",
    role: "Multisite health programme",
    note: "Feedback — donor data conformance",
  },
] satisfies typeof testimonialsFr;

const referencesEn = [
  {
    type: "Rwanda — FSE PSA programme (CHUK • Byumba • Kabgayi • Kibilizi)",
    description:
      "Coordinated multisite biomedical audits, PSA readiness milestones and aggregated donor dashboards—controlled project dissemination.",
    metrics: [
      { label: "Facilities covered", value: "4 hospitals" },
      { label: "Device fleet", value: ">3200 regulated devices" },
      { label: "Merged donor exports", value: "Monthly cadence" },
    ],
  },
  {
    type: "Somalia — UNICEF O₂ generators NOVAIR (8 facilities)",
    description:
      "Field PM programmes, UNICEF KPI packs, corrective visit planning and commodity monitoring.",
    metrics: [
      { label: "Sites", value: "8" },
      { label: "Mode", value: "Monthly preventive + corrective" },
      { label: "Report status", value: "Donor cleared (2026)" },
    ],
  },
  {
    type: "Djibouti — CHUD biomedical investments",
    description:
      "Support on dialysis/imaging dossiers ahead of conformance for multi‑wave donations.",
    metrics: [
      { label: "Tender context", value: "IsDB / Saudi Fund" },
      { label: "Deliverables", value: "Technical tender notes" },
      { label: "Phase", value: "Execution & monitoring" },
    ],
  },
  {
    type: "Somalia — BERTIN Stérilwave fleet",
    description:
      "Sterilisers tracked across rotational field visits plus harmonised corrective/preventive plans.",
    metrics: [
      { label: "Facilities monitored", value: "13 installations" },
      { label: "Equipment", value: "SW100 / SW250" },
      { label: "Cadence", value: "Regional wave planning" },
    ],
  },
  {
    type: "France — Hospital clusters & tertiary clinics",
    description:
      "Critical fluid architectures for theatres & imaging hubs and peripheral capex rationale.",
    metrics: [
      { label: "Mission types", value: "APS baseline reviews" },
      { label: "Regions", value: "Greater Paris • Auvergne‑Rhône" },
      { label: "Outputs", value: "Calc notes & executive summaries" },
    ],
  },
  {
    type: "Gabon — Consolidated Provincial inventories",
    description:
      "Multisite Excel harmonisation underpinning ministry investment trackers with third‑party QA.",
    metrics: [
      { label: "Sites inventoried", value: "11" },
      { label: "Deliverables", value: "CMMS aggregate briefs" },
      { label: "Horizon", value: "Multisite rollout" },
    ],
  },
] satisfies Reference[];

const methodStepsEn: Omit<MethodStep, "details" | "number">[] = [
  {
    title: "Project framing",
    description:
      "Technical perimeter, uptime policy, staffing and spreadsheets already handed over.",
  },
  {
    title: "Field capture / remote bursts",
    description:
      "Inventory visits, device files, chaotic Excel ingestion and reconciliation.",
  },
  {
    title: "Risk & criticality maps",
    description:
      "Clinical positioning, plausible failure modes, impact on dialysis/theatre throughput etc.",
  },
  {
    title: "Recommendations & capex ladders",
    description:
      "Multiple budget envelopes—corrective/preventive and human‑capital ramps.",
  },
  {
    title: "Execution & knowledge retention",
    description:
      "Workshops, versioned Excel masters, COPIL rhythms and formally signed transfers.",
  },
];

const expertiseTextEn: Record<
  string,
  { title: string; short: string; description: string; benefits: string[] }
> = {
  "audit-technique": {
    title: "Biomedical technical audit",
    short: "End‑to‑end fleet diagnosis and conformance snapshot.",
    description:
      "On‑site review of regulated devices: IEC 60601 / IEC 62353 performance & safety signals, WHO criticality tagging, downtime risk—with investable prioritisation.",
    benefits: [
      "Facts‑based multisite mapping",
      "Budget‑ready trade‑offs",
      "Costed action track",
      "Donor / tender artefacts",
    ],
  },
  "inventaire-cartographie": {
    title: "Inventory & geographical mapping",
    short: "A single truthful reference even when history is fragmented.",
    description:
      "Physical identification, normalised nomenclature, departmental location, interventions history—with Excel ingestion paths into CMMS.",
    benefits: [
      "Unified multi‑site backbone",
      "Fewer phantom assets",
      "KPI‑ready backbone",
      "Audit lineage",
    ],
  },
  "maintenance-preventive": {
    title: "Preventive maintenance",
    short: "Criticity‑graded programmes calibrated for African throughput.",
    description:
      "Harmonised PM/PMC bundles, preventive visits, IEC 62353 electrical & metrology checkpoints.",
    benefits: ["Fewer blackout failures", "Clinician‑visible calendars", "Donor documentation", "Local hand‑over"],
  },
  "maintenance-curative": {
    title: "Corrective maintenance & ticketing",
    short: "Structured escalation covering parts, OEMs & closure KPIs.",
    description:
      "Standardised interventions, SLA guidance, OEM/donor coordination and live equipment registry hygiene.",
    benefits: ["Clearer timelines", "Per‑device lineage", "Anomaly playbook", "Board reporting"],
  },
  "gestion-risques": {
    title: "Device risk management & uptime",
    short: "Clin vs budget ladders aligned NF S99‑170 style & WHO good practice.",
    description:
      "Failure mapping, sterilisation/down‑time drills and workable mitigations anchored to wards.",
    benefits: ["Clinical vs cost lens", "Resource‑honest backlog", "Internal audit dossiers"],
  },
  "accompagnement-achat": {
    title: "Procurement & receiving support",
    short: "Specs, compliant deliveries and supervised commissioning.",
    description:
      "Vendor‑neutral benchmarking, witnessing of factory acceptance/on‑site FAT, commissioning packs.",
    benefits: ["Negotiable specs", "Traceable witnessing", "Documented commissioning"],
  },
  "formation-utilisateurs": {
    title: "User & biomedical training",
    short: "Compressed modules for nursing, biomedical & level‑1 upkeep teams.",
    description:
      "French/English playbooks stressing early malfunction cues and alerting flows.",
    benefits: ["Safer bedside operation", "Quality signal capture", "N1 autonomy where feasible"],
  },
  "mise-en-place-gmao": {
    title: "Biomedical CMMS & dashboards",
    short: "Excel‑first tooling or ingestion prep for SaaS deployments.",
    description:
      "Inventory / PMC / KPI sheets with audited formulas—availability, MTBF, MTTR.",
    benefits: ["Shared programme view", "Donor‑ready dumps", "Future digital uplift"],
  },
  "structuration-departement": {
    title: "Biomedical department design",
    short: "Org chart, RACI arcs and Procurement / OT / IT interfaces.",
    description:
      "Indicative staffing matrix, skills roadmap and mission‑note templates tuned to Ministries.",
    benefits: ["Clear governance", "Auditable rituals", "Phased staffing"],
  },
  "architecture-hospitaliere": {
    title: "Hospital architecture & gas plants",
    short: "APS/APD theatres, sterile cores and generator sizing.",
    description:
      "Medical O₂/air sketch notes aligned with bloc functional briefs NF S90‑351 / ISO 14644‑1 references & capex deltas.",
    benefits: ["Clin ↔ engineering coherence", "Cited benchmarks", "Infra capex previews"],
  },
  "methodologie-appels-offres": {
    title: "Tenders & medical equipment bids",
    short: "Conformity matrices, TABORD/MINIFS, regulatory equivalences.",
    description:
      "CDT review, conformity tables, multisource vendor dossiers plus equivalence narratives.",
    benefits: ["Faster adjudication trails", "Line‑level traceability", "Multi‑currency grids"],
  },
};

export function getHeroStats(locale: AppLocale) {
  return locale === "en" ? heroStatsEn : heroStatsFr;
}

export function getServiceModels(locale: AppLocale): ServiceModel[] {
  if (locale === "fr") return serviceModelsFr;
  return serviceModelsFr.map((m, i) => ({
    ...m,
    title: serviceModelsEn[i]?.title ?? m.title,
    description: serviceModelsEn[i]?.description ?? m.description,
  }));
}

export function getWhyKbio(locale: AppLocale) {
  if (locale === "fr") return whyKbioFr;
  return whyKbioFr.map((row, i) => ({
    ...row,
    title: whyKbioEn[i]?.title ?? row.title,
    description: whyKbioEn[i]?.description ?? row.description,
  }));
}

export function getSectors(locale: AppLocale): Sector[] {
  if (locale === "fr") return sectorsFr;
  return sectorsFr.map((s, i) => ({
    ...s,
    title: sectorsEn[i]?.title ?? s.title,
    description: sectorsEn[i]?.description ?? s.description,
  }));
}

export function getReferences(locale: AppLocale): Reference[] {
  return locale === "en" ? referencesEn : referencesFr;
}

export function getTestimonials(locale: AppLocale) {
  return locale === "en" ? testimonialsEn : testimonialsFr;
}

export function getExpertises(locale: AppLocale): Expertise[] {
  if (locale === "fr") return expertisesFr;
  return expertisesFr.map((e) => {
    const t = expertiseTextEn[e.slug];
    if (!t) return e;
    return { ...e, ...t };
  });
}

export function getMethodSteps(locale: AppLocale): MethodStep[] {
  if (locale === "fr") return methodStepsFr;
  return methodStepsFr.map((step, idx) => {
    const t = methodStepsEn[idx];
    return t ? { ...step, title: t.title, description: t.description } : step;
  });
}
