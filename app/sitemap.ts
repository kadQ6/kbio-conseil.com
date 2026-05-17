import type { MetadataRoute } from "next";
import { navigation, site } from "@/lib/site-data";
import { localizeHref } from "@/lib/i18n/paths";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const out: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const item of navigation) {
      const path = localizeHref(locale, item.href);
      out.push({
        url: new URL(path, site.url).toString(),
        lastModified,
        changeFrequency: item.href === "/" ? "weekly" : "monthly",
        priority: item.href === "/" ? 1 : 0.7,
      });
    }
  }
  return out;
}
