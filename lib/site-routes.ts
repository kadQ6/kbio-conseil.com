/**
 * Routes & URL de base pour metadata (sitemap, robots) sans importer lucide-react via site-data.
 */
export const siteUrl = "https://kbio-conseil.com" as const;

/** Chemins publics sans préfixe locale (FR = URLs sans /fr). */
export const publicPaths = [
  "/",
  "/a-propos",
  "/expertises",
  "/methode",
  "/projets",
  "/contact",
] as const;
