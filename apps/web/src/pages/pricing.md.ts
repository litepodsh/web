import type { APIRoute } from "astro";
import { pricingMarkdown } from "../lib/markdown.mjs";

export const GET: APIRoute = ({ cookies }) => {
  const locale = cookies.get("litepod-locale")?.value === "es" ? "es" : "en";

  return new Response(pricingMarkdown(locale), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
