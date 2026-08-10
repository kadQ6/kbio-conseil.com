import type { MetadataRoute } from "next";
import { locales, type AppLocale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/paths";
import { publicPaths, siteUrl } from "@/lib/site-routes";

export const dynamic = "force-static";
export const revalidate = 86400;

function absoluteLocalizedUrl(locale: AppLocale, path: string): string {
  return new URL(localizeHref(locale, path), siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const path of publicPaths) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale === "fr" ? "fr-FR" : "en-US"] = absoluteLocalizedUrl(locale, path);
    }
    languages["x-default"] = absoluteLocalizedUrl("fr", path);

    for (const locale of locales) {
      out.push({
        url: absoluteLocalizedUrl(locale, path),
        lastModified,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : path === "/contact" ? 0.8 : 0.7,
        alternates: { languages },
      });
    }
  }

  return out;
}
