import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages: { fr: `${site.url}/fr`, ar: `${site.url}/ar` } },
  }));
}
