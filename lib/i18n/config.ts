export const locales = ["fr", "en"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "fr";

export function isAppLocale(s: string | undefined): s is AppLocale {
  return s === "fr" || s === "en";
}

export function normalizeLocale(s: string | undefined): AppLocale {
  return s === "en" ? "en" : "fr";
}
