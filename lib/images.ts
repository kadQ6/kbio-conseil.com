/**
 * Image catalog for kbio-conseil.com (Unsplash, free license).
 * Replace each URL with your own production assets when available.
 */

const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  hero: {
    src: u("photo-1538108149393-fbbd81895907", 1800),
    alt: "Professionnel de santé consultant des constantes patient sur moniteur biomédical.",
  },
  about: {
    src: u("photo-1551076805-e1869033e561", 1600),
    alt: "Couloir lumineux d'un établissement hospitalier moderne.",
  },
  audit: {
    src: u("photo-1631815589968-fdb09a223b1e", 1400),
    alt: "Technicien biomédical en intervention sur un équipement médical.",
  },
  equipmentClose: {
    src: u("photo-1576091160399-112ba8d25d1d", 1400),
    alt: "Plan rapproché d'équipement de soins critiques.",
  },
  laboratory: {
    src: u("photo-1581093458791-9d42cc4daa0d", 1400),
    alt: "Automate de laboratoire d'analyses biomédicales.",
  },
  imaging: {
    src: u("photo-1583912267550-d7c1ec2b1b50", 1400),
    alt: "Plateau d'imagerie médicale dans un hôpital moderne.",
  },
  team: {
    src: u("photo-1551601651-2a8555f1a136", 1400),
    alt: "Équipe biomédicale en réunion technique.",
  },
  surgery: {
    src: u("photo-1551601651-bc60f254d532", 1400),
    alt: "Bloc opératoire prêt pour intervention chirurgicale.",
  },
  monitor: {
    src: u("photo-1559757148-5c350d0d3c56", 1400),
    alt: "Service de soins intensifs avec moniteurs patients.",
  },
  techField: {
    src: u("photo-1581595220892-b0739db3ba8c", 1400),
    alt: "Ingénieur biomédical sur le terrain en hôpital.",
  },
  djiboutiCity: {
    src: u("photo-1565008447742-97f6f38c985c", 1600),
    alt: "Vue urbaine de Djibouti — Corne de l'Afrique.",
  },
  meeting: {
    src: u("photo-1556761175-5973dc0f32e7", 1400),
    alt: "Réunion stratégique en direction d'établissement de santé.",
  },
  blueprint: {
    src: u("photo-1581094794329-c8112a89af12", 1400),
    alt: "Planification d'un projet d'ingénierie hospitalière.",
  },
} as const;

export type CimbImage = (typeof images)[keyof typeof images];
