import type { APIRoute } from "astro";
import { homeMarkdown } from "../lib/markdown.mjs";

// Same locale selection as the page: the visitor's cookie decides the language.
export const GET: APIRoute = ({ cookies }) => {
  const locale = cookies.get("litepod-locale")?.value === "es" ? "es" : "en";

  return new Response(homeMarkdown(locale), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
