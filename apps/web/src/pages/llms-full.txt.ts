import type { APIRoute } from "astro";
import { llmsFullMarkdown } from "../lib/markdown.mjs";

// Every marketing page as one Markdown corpus for LLM crawlers.
export const GET: APIRoute = () =>
  new Response(llmsFullMarkdown(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
