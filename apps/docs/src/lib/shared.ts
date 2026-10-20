export const appName = "Litepod Docs";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";
const defaultSiteUrl = "https://docs.litepod.sh";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "litepodsh",
  repo: "web",
  branch: "main",
};
