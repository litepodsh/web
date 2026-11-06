import { source } from "@/lib/source";
import { siteUrl } from "@/lib/shared";
import { llms } from "fumadocs-core/source";

export const revalidate = false;

export function GET() {
  const index = llms(source).index();
  const optional = [
    "## Optional",
    "",
    `- [Full documentation](${siteUrl}/llms-full.txt): every page in one Markdown file.`,
    `- [Markdown for each page](${siteUrl}/en/llms.mdx/docs/get-started/content.md): append \`content.md\` to the page path under \`/llms.mdx/docs\`, or request any page with \`Accept: text/markdown\`.`,
  ].join("\n");

  return new Response(`${index}\n\n${optional}\n`);
}
