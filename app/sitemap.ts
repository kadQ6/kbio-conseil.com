import type { MetadataRoute } from "next";
import { navigation, site } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return navigation.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
