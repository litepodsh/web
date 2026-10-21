export const appName = "Litepod Docs";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";
const defaultSiteUrl = "https://docs.litepod.sh";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

// GitHub repo backing the "Edit this page on GitHub" links in the docs UI.
export const gitConfig = {
  user: "litepodsh",
  repo: "litepod",
  branch: "main",
};
