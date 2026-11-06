// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { reviewed } from "./src/data/alternatives.mjs";
import { defaultUpdated, updated } from "./src/data/updated.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://litepod.sh",
  output: "server",
  // Canonicals have no trailing slash; keep sitemap URLs and routing identical.
  trailingSlash: "never",
  redirects: { "/alternatives/heroku": "/alternatives" },
  // The stylesheet is small; inlining it removes the render-blocking request.
  build: { inlineStylesheets: "always" },
  integrations: [
    sitemap({
      // SSR dynamic routes are not discovered automatically.
      customPages: ["vercel", "coolify", "dokploy"].map(
        (slug) => `https://litepod.sh/alternatives/${slug}`,
      ),
      changefreq: "monthly",
      priority: 0.5,
      serialize(item) {
        const path = new URL(item.url).pathname;
        // `lastmod` comes from the content dates in src/data, not the build time.
        const lastmod = path.startsWith("/alternatives")
          ? reviewed
          : (updated[path] ?? defaultUpdated);
        if (path === "/") return { ...item, lastmod, changefreq: "weekly", priority: 1 };
        if (path.startsWith("/alternatives"))
          return { ...item, lastmod, changefreq: "monthly", priority: 0.8 };
        return { ...item, lastmod };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({
    mode: "standalone",
  }),
});
