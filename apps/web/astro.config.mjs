// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://litepod.sh",
  output: "server",
  // Canonicals have no trailing slash; keep sitemap URLs and routing identical.
  trailingSlash: "never",
  // The stylesheet is small; inlining it removes the render-blocking request.
  build: { inlineStylesheets: "always" },
  integrations: [
    sitemap({
      // SSR dynamic routes are not discovered automatically.
      customPages: ["vercel", "coolify", "dokploy", "heroku"].map(
        (slug) => `https://litepod.sh/alternatives/${slug}`,
      ),
      changefreq: "monthly",
      priority: 0.5,
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === "/") return { ...item, changefreq: "weekly", priority: 1 };
        if (path.startsWith("/alternatives")) return { ...item, changefreq: "monthly", priority: 0.8 };
        return item;
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
