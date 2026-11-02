import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { benefits, installCommand, links, locales, mediaSlots } from "../src/data/landing.mjs";

const globalCss = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");
const hero = readFileSync(new URL("../src/components/Hero.astro", import.meta.url), "utf8");
const choices = readFileSync(
  new URL("../src/components/PlatformChoice.astro", import.meta.url),
  "utf8",
);

assert.equal(links.github, "https://github.com/litepodsh/litepod");
assert.equal(links.docs, "https://docs.litepod.sh");
assert.equal(links.templates, "https://templates.litepod.sh");
assert.equal(
  links.cloud,
  "https://app.litepod.sh/register?utm_source=landing&utm_medium=cta&utm_campaign=cloud",
);
assert.equal(installCommand, "curl -fsSL https://litepod.sh/install.sh | bash");
assert.match(locales.en.selfTitle, /Install on your own server/i);
assert.match(locales.en.heroTitle, /\n/);
assert.match(locales.es.heroTitle, /\n/);
assert.match(locales.en.selfBody, /control plane/i);
assert.match(locales.en.cloudTitle, /Bring your own server/i);
assert.match(locales.en.cloudBody, /manage the control plane/i);
assert.match(locales.en.heroCommandNote, /installer/i);
assert.match(globalCss, /--lp-bg:\s*#fafafa/i);
assert.match(globalCss, /--lp-ink:\s*#0f0f0f/i);
assert.match(globalCss, /--lp-accent:\s*#d4410b/i);
assert.match(hero, /data-copy-command/);
assert.match(hero, /id="install-command"/);
assert.match(hero, /63<span/);
assert.match(hero, /"dragonfly", 21\.82/);
assert.match(hero, /data-i18n="heroTitle"/);
assert.match(locales.en.statsNote, /RAM/);
assert.match(locales.es.statsNote, /RAM/);
assert.match(globalCss, /prefers-reduced-motion:\s*reduce/);
assert.doesNotMatch(choices, /data-copy-command/);
assert.match(choices, /data-i18n="selfBody"/);
assert.match(choices, /data-i18n="cloudBody"/);
assert.match(choices, /sm:grid-cols-\[1\.25fr_\.75fr\]/);

const componentSources = [
  "Header.astro",
  "Hero.astro",
  "PlatformChoice.astro",
  "Showcase.astro",
  "MediaShot.astro",
  "Footer.astro",
  "Landing.astro",
]
  .map((name) => readFileSync(new URL(`../src/components/${name}`, import.meta.url), "utf8"))
  .join("\n");
assert.doesNotMatch(componentSources, /lp-acid/);
assert.equal(benefits.en.length, 3);
assert.equal(benefits.es.length, 3);
assert.match(benefits.en[2][1], /control plane/i);
assert.doesNotMatch(benefits.en[2][1], /\$5/);
assert.equal(mediaSlots.en.length, 9);
assert.equal(mediaSlots.es.length, 9);

console.log("landing content checks passed");
