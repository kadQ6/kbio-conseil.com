import type { AppLocale } from "./config";

/** Remove leading /en from the pathname; result always starts with /. */
export function stripLocalePath(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(4);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/** Public href for a path without locale prefix (FR default) or with /en (EN). */
export function localizeHref(locale: AppLocale, path: string): string {
  const raw = path.startsWith("/") ? path : `/${path}`;
  const base = stripLocalePath(raw);
  if (locale === "fr") return base === "//" ? "/" : base;
  if (base === "/" || base === "") return "/en";
  return `/en${base}`;
}

export function switchLocaleHref(pathname: string, target: AppLocale): string {
  const base = stripLocalePath(pathname);
  return localizeHref(target, base);
}

/** Canonical path segment for metadata (e.g. /contact, /en/contact). */
export function canonicalPathForLocale(locale: AppLocale, pathSansLocale: string): string {
  const p = pathSansLocale.startsWith("/") ? pathSansLocale : `/${pathSansLocale}`;
  return localizeHref(locale, p);
}
