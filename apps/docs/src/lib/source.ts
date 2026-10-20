import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docsContentRoute, docsImageRoute } from "./shared";
import { i18n } from "./i18n";
import { defineDocs } from "fumadocs-mdx/macro";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { transformerShell } from "./shell-transformer";
import { z } from "zod";

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    // `seoTitle` overrides the <title> tag; `title` stays the H1 and sidebar label.
    schema: pageSchema.extend({ seoTitle: z.string().optional() }),
    // Fumadocs defaults plus the shell transformer that turns bash blocks into the terminal.
    mdxOptions: applyMdxPreset({
      rehypeCodeOptions: {
        ...rehypeCodeDefaultOptions,
        transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerShell],
      },
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "",
  source: docs.toFumadocsSource(),
  i18n,
  plugins: [lucideIconsPlugin()],
});

export function getPageImageUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: "/" + [page.locale, ...docsImageRoute.split("/"), ...segments].filter(Boolean).join("/"),
  };
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: "/" + [page.locale, ...docsContentRoute.split("/"), ...segments].filter(Boolean).join("/"),
  };
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
