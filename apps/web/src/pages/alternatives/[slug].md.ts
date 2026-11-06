import type { APIRoute } from "astro";
import { alternativeMarkdown } from "../../lib/markdown.mjs";

export const GET: APIRoute = ({ cookies, params }) => {
  const locale = cookies.get("litepod-locale")?.value === "es" ? "es" : "en";
  const markdown = alternativeMarkdown(params.slug ?? "", locale);

  if (!markdown) return new Response(null, { status: 404 });

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
