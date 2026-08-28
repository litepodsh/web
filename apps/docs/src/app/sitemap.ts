import { source } from "@/lib/source";
import { i18n } from "@/lib/i18n";
import { siteUrl } from "@/lib/shared";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const lang of i18n.languages) {
    urls.push({
      url: `${siteUrl}/${lang}`,
      changeFrequency: "weekly",
      priority: 1,
    });

    for (const page of source.getPages(lang)) {
      const languages: Record<string, string> = {};
      for (const l of i18n.languages) {
        const localized = source.getPage(page.slugs, l);
        languages[l] = `${siteUrl}${localized?.url ?? page.url}`;
      }

      urls.push({
        url: `${siteUrl}${page.url}`,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${siteUrl}${page.url}`,
          },
        },
      });
    }
  }

  return urls;
}
