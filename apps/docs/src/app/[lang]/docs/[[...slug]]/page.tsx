import { getPageImageUrl, getPageMarkdownUrl, source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { gitConfig, siteUrl } from "@/lib/shared";
import { i18n } from "@/lib/i18n";

export default async function Page(props: PageProps<"/[lang]/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const pageUrl = `${siteUrl}${page.url}`;
  const crumbs = [
    { name: "Litepod Docs", url: `${siteUrl}/${page.locale}` },
    ...page.slugs.map((_, i) => {
      const parent = source.getPage(page.slugs.slice(0, i + 1), page.locale);
      return { name: parent?.data.title ?? page.data.title, url: `${siteUrl}${parent?.url ?? page.url}` };
    }),
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: page.data.seoTitle ?? page.data.title,
        description: page.data.description,
        url: pageUrl,
        inLanguage: page.locale,
        image: `${siteUrl}${getPageImageUrl(page).url}`,
        about: { "@type": "SoftwareApplication", name: "Litepod", url: "https://litepod.sh" },
        publisher: { "@type": "Organization", name: "Litepod", url: "https://litepod.sh" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    ],
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams("slug", "lang");
}

export async function generateMetadata(
  props: PageProps<"/[lang]/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const languages: Record<string, string> = {};
  for (const lang of i18n.languages) {
    const localized = source.getPage(page.slugs, lang);
    if (localized) languages[lang] = localized.url;
  }

  const title = page.data.seoTitle ?? page.data.title;
  const image = getPageImageUrl(page).url;

  return {
    // the docs home carries the full title itself, without the template suffix
    title: page.slugs.length === 0 ? { absolute: title } : title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
      languages: {
        ...languages,
        "x-default": languages[i18n.defaultLanguage] ?? page.url,
      },
    },
    openGraph: {
      type: "article",
      url: page.url,
      title,
      description: page.data.description,
      locale: page.locale === "es" ? "es_ES" : "en_US",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.data.description,
      images: image,
    },
  };
}
