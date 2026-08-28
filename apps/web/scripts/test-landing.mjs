import assert from "node:assert/strict";
import { benefits, installCommand, links, locales, mediaSlots } from "../src/data/landing.mjs";

assert.equal(links.github, "https://github.com/litepodsh/web");
assert.equal(links.docs, "https://docs.litepod.sh");
assert.equal(links.templates, "https://templates.litepod.sh");
assert.equal(links.cloud, "https://app.litepod.sh");
assert.equal(installCommand, "curl -fsSL https://litepod.sh/install.sh | bash");
assert.match(locales.en.cloudPrice, /\$5/);
assert.match(locales.es.cloudPrice, /\$5/);
assert.equal(benefits.en.length, 3);
assert.equal(benefits.es.length, 3);
assert.equal(mediaSlots.en.length, 3);
assert.equal(mediaSlots.es.length, 3);

console.log("landing content checks passed");
