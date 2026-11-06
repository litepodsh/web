// Markdown representations of the marketing pages, served as `text/markdown`
// and linked from each page with <link rel="alternate" type="text/markdown">.
// Everything is derived from src/data so the HTML and Markdown never drift.
import { about } from "../data/about.mjs";
import { alternativesEs, compareUi, litepodFactsEs } from "../data/alternatives.es.mjs";
import {
  alternatives as alternativesEn,
  litepodFacts as litepodFactsEn,
  reviewed,
} from "../data/alternatives.mjs";
import { installCommand, links, locales } from "../data/landing.mjs";
import { pricing } from "../data/pricing.mjs";

const SITE = "https://litepod.sh";

const frontmatter = ({ title, description, canonical, locale, updated }) =>
  [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `lang: ${locale}`,
    `canonical: ${canonical}`,
    ...(updated ? [`updated: ${updated}`] : []),
    "---",
  ].join("\n");

const table = (head, rows) => {
  const line = (cells) => `| ${cells.join(" | ")} |`;
  return [line(head), line(head.map(() => "---")), ...rows.map(line)].join("\n");
};

const oneLine = (text) => text.replace(/\s*\n\s*/g, " ");

const bullets = (items) => items.map((item) => `- ${item}`).join("\n");

const footer = () =>
  [
    "## Links",
    "",
    bullets([
      `[Documentation](${links.docs})`,
      `[Getting started](${links.docs}/en/get-started)`,
      `[Live demo](${links.demo})`,
      `[Templates catalog](${links.templates})`,
      `[Litepod Cloud](${links.cloud.split("?")[0]})`,
      `[Source code](${links.github})`,
      `[All content in one file](${SITE}/llms-full.txt)`,
      `[Site summary for LLMs](${SITE}/llms.txt)`,
    ]),
  ].join("\n");

export function homeMarkdown(locale) {
  const t = locales[locale];
  const { deploy, servers, kits } = t;
  const out = [
    frontmatter({
      title: "Litepod: Self-Hosted PaaS to Deploy Apps and Databases on Your VPS",
      description:
        "Self-host apps, databases and services on any VPS you control. A lightweight Vercel, Coolify and Dokploy alternative: rootless Podman, Caddy SSL, ~63 MB footprint.",
      canonical: `${SITE}/`,
      locale,
      updated: "2026-11-05",
    }),
    "",
    "# Litepod",
    "",
    `> ${oneLine(t.intro)}`,
    "",
    bullets([
      `Self-hosted: free and open source (Apache 2.0). Install with \`${installCommand}\`.`,
      `Cloud: ${oneLine(t.heroSub)}`,
      `Panel footprint: ${t.selfTitle}`,
      `Runs on rootless Podman, with Caddy for HTTPS and Let's Encrypt certificates.`,
      `Built-in AI assistant with your own API key, and an MCP server so agents can deploy and manage apps.`,
    ]),
    "",
    "## Deploy paths",
    "",
    ...deploy.types.map((type) =>
      [
        `### ${type.title}`,
        "",
        `_${type.tagline}_`,
        "",
        type.body,
        "",
        `- ${deploy.provide}: ${type.needs.join("; ")}`,
        `- ${deploy.bestFor}: ${type.bestFor}`,
        "",
      ].join("\n"),
    ),
    `Build methods: ${deploy.methods.map(([name, body]) => `${name} (${body})`).join(" ")}`,
    "",
    `### ${deploy.rolloutTitle}`,
    "",
    deploy.rolloutNote,
    "",
    `${deploy.rollout.join(" → ")}.`,
    "",
    `### ${deploy.stackTitle}`,
    "",
    deploy.stackIntro,
    "",
    table(
      ["Kind", "What it covers"],
      deploy.stack.map(([name, body]) => [name, oneLine(body)]),
    ),
    "",
    "## Servers",
    "",
    servers.title,
    "",
    servers.body,
    "",
    `- ${servers.modesTitle}: ${servers.modesNote}`,
    `- ${servers.groups}`,
    `- ${servers.rootless}`,
    "",
    "## Templates and databases",
    "",
    kits.intro,
    "",
    `### ${kits.internalTitle}`,
    "",
    kits.internalBody,
    "",
    `### ${kits.catalogTitle}`,
    "",
    kits.catalogBody,
    "",
    "## Metrics",
    "",
    `### ${t.metrics.title}`,
    "",
    table(
      ["Metric", "Meaning"],
      t.metrics.items.map(([value, label]) => [value, label]),
    ),
    "",
    "## Self-hosted or Cloud",
    "",
    `### ${t.selfTitle}`,
    "",
    t.selfBody,
    "",
    `### ${t.cloudTitle}`,
    "",
    t.cloudBody,
    "",
    bullets(t.cloudPoints),
    "",
    "## Install",
    "",
    "```bash",
    installCommand,
    "```",
    "",
    footer(),
    "",
  ];
  return out.join("\n");
}

export function pricingMarkdown(locale) {
  const t = pricing[locale];
  const out = [
    frontmatter({
      title: t.title,
      description: t.description,
      canonical: `${SITE}/pricing`,
      locale,
      updated: "2026-11-05",
    }),
    "",
    `# ${oneLine(t.h1)}`,
    "",
    t.lead,
    "",
    ...t.plans.flatMap((plan) => [
      `## ${plan.name}${plan.label !== plan.name ? ` (${plan.label})` : ""}`,
      "",
      `Price: ${plan.price}${plan.unit ? ` ${plan.unit}` : ""}${plan.key === "cloud" ? ` ${t.perMonth}` : ""}.`,
      "",
      plan.pitch,
      "",
      bullets(plan.features),
      "",
      `${plan.note}${plan.key === "cloud" ? ` ${t.taxNote}` : ""}`,
      "",
    ]),
    `## ${t.savesTitle}`,
    "",
    t.savesBody,
    "",
    table(t.savesCols, t.saves),
    "",
    `## ${t.faqTitle}`,
    "",
    ...t.faq.flatMap(([q, a]) => [`### ${q}`, "", a, ""]),
    footer(),
    "",
  ];
  return out.join("\n");
}

const factsFor = (locale) => (locale === "es" ? litepodFactsEs : litepodFactsEn);
const alternativesFor = (locale) => (locale === "es" ? alternativesEs : alternativesEn);

export function alternativesIndexMarkdown(locale) {
  const ui = compareUi[locale];
  const page = ui.index;
  const alternatives = alternativesFor(locale);
  const facts = factsFor(locale);
  const out = [
    frontmatter({
      title: page.title,
      description: page.description,
      canonical: `${SITE}/alternatives`,
      locale,
      updated: reviewed,
    }),
    "",
    `# ${page.h1}`,
    "",
    page.intro,
    "",
    `## ${page.compare}`,
    "",
    ...Object.entries(alternatives).map(
      ([slug, alt]) =>
        `- [${ui.versus(alt.name)}](${SITE}/alternatives/${slug}.md): ${alt.description}`,
    ),
    "",
    `## ${page.whatYouGet}`,
    "",
    bullets(page.facts.map(([label, key]) => `**${label}:** ${facts[key]}.`)),
    "",
    `## ${page.managedTitle}`,
    "",
    page.managedBody,
    "",
    "## Install",
    "",
    "```bash",
    installCommand,
    "```",
    "",
    footer(),
    "",
  ];
  return out.join("\n");
}

export function alternativeMarkdown(slug, locale) {
  const alternatives = alternativesFor(locale);
  const alt = Object.hasOwn(alternatives, slug) ? alternatives[slug] : undefined;
  if (!alt) return undefined;

  const ui = compareUi[locale];
  const facts = factsFor(locale);
  const cell = (value) => (value.startsWith("litepod.") ? facts[value.slice(8)] : value);
  const others = Object.entries(alternatives).filter(([key]) => key !== slug);

  const out = [
    frontmatter({
      title: alt.title,
      description: alt.description,
      canonical: `${SITE}/alternatives/${slug}`,
      locale,
      updated: reviewed,
    }),
    "",
    `# ${alt.h1}`,
    "",
    alt.answer,
    "",
    `## ${ui.atAGlance(alt.name)}`,
    "",
    table(
      ["", "Litepod", alt.name],
      [
        ...alt.rows.map(([label, ours, theirs]) => [label, cell(ours), cell(theirs)]),
        [ui.mcpRow, facts.mcp, alt.mcp],
        [ui.aiRow, facts.ai, ui.seeDocs(alt.name)],
      ],
    ),
    "",
    ui.sourceNote(alt.name),
    "",
    `## ${ui.chooseThem(alt.name)}`,
    "",
    bullets(alt.pickThem),
    "",
    `## ${ui.chooseUs}`,
    "",
    bullets(alt.pickUs),
    "",
    `## ${ui.migrate(alt.name)}`,
    "",
    alt.migrate.map((step, i) => `${i + 1}. ${step}`).join("\n"),
    "",
    `## ${ui.faq}`,
    "",
    ...alt.faq.flatMap(([q, a]) => [`### ${q}`, "", a, ""]),
    `## ${ui.others}`,
    "",
    bullets([
      ...others.map(([key, other]) => `[${ui.versus(other.name)}](${SITE}/alternatives/${key}.md)`),
      `[${ui.all}](${SITE}/alternatives.md)`,
    ]),
    "",
    "## Install",
    "",
    "```bash",
    installCommand,
    "```",
    "",
    footer(),
    "",
  ];
  return out.join("\n");
}

export function aboutMarkdown(locale) {
  const t = about[locale];
  const out = [
    frontmatter({
      title: t.title,
      description: t.description,
      canonical: `${SITE}/about`,
      locale,
      updated: "2026-11-05",
    }),
    "",
    `# ${t.title}`,
    "",
    ...t.intro.flatMap((paragraph) => [paragraph, ""]),
    `## ${t.relatedTitle}`,
    "",
    t.relatedLead,
    "",
    bullets(t.related.map(([name, url, body]) => `[${name}](${url}): ${body}`)),
    "",
    `## ${t.contactTitle}`,
    "",
    `${t.contactLead} [${t.contactEmail}](mailto:${t.contactEmail}).`,
    "",
    footer(),
    "",
  ];
  return out.join("\n");
}

/** English corpus of every page, for /llms-full.txt. */
export function llmsFullMarkdown() {
  return [
    "# Litepod: full site content",
    "",
    "> Every page of https://litepod.sh as Markdown, in one file. Per-page files are available at `/index.md`, `/pricing.md`, `/about.md`, `/alternatives.md` and `/alternatives/<name>.md`. Documentation lives at https://docs.litepod.sh/llms-full.txt.",
    "",
    homeMarkdown("en"),
    "",
    pricingMarkdown("en"),
    "",
    alternativesIndexMarkdown("en"),
    "",
    alternativeMarkdown("vercel", "en"),
    "",
    alternativeMarkdown("coolify", "en"),
    "",
    alternativeMarkdown("dokploy", "en"),
    "",
    aboutMarkdown("en"),
    "",
  ].join("\n");
}
