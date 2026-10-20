import { source } from "@/lib/source";
import { i18n } from "@/lib/i18n";
import { siteUrl } from "@/lib/shared";
import type { MetadataRoute } from "next";

// `/` only redirects to a locale, so it is left out; each page lists its translations.
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of i18n.languages) {
    for (const page of source.getPages(lang)) {
      const languages: Record<string, string> = {};
      for (const l of i18n.languages) {
        const localized = source.getPage(page.slugs, l);
        if (localized) languages[l] = `${siteUrl}${localized.url}`;
      }

      urls.push({
        url: `${siteUrl}${page.url}`,
        changeFrequency: "weekly",
        priority: page.slugs.length === 0 ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            "x-default": languages[i18n.defaultLanguage] ?? `${siteUrl}${page.url}`,
          },
        },
      });
    }
  }

  return urls;
}
