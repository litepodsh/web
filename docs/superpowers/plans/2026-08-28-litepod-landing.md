# Litepod Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, media-ready Litepod landing page that defaults users to Self-hosted while making Litepod Cloud's $5 server slot a clear alternative.

**Architecture:** Astro renders a static landing from one locale/content module. Focused Astro components own the floating navigation, reusable media placeholders, and page composition. A small inline client script changes language and controls clipboard feedback; all visual motion is CSS transform/opacity only.

**Tech Stack:** Astro 7, native scoped CSS, native browser APIs, Node `node:assert` test script. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-28-litepod-landing-design.md`

## Global Constraints

- Work only on the current `main` branch; do not create, switch, or merge branches.
- Do not run `git commit`; leave every implementation change local.
- Use existing Litepod SVG geometry and recolour it only: exterior `#C8FF3E`, interior `#0B120D`.
- Use `#080D09` background, `#101B12` surface, `#0D140E` deeper surface, `#F0F5EF` foreground, `#8D9B8E` muted text, and `#C8FF3E` as the only accent.
- Avoid Inter, purple/blue accents, outer neon glows, gradient heading text, generic three-card grids, and global grain overlays.
- Use no third-party packages; confirm `apps/web/package.json` remains dependency-neutral.
- Keep media surfaces clean. The only atmospheric treatment is two ambient background orbs; animate only `transform` and `opacity`, and disable motion under `prefers-reduced-motion`.
- Use exact external URLs: templates `https://templates.litepod.sh`, Cloud `https://app.litepod.sh`, Docs `https://docs.litepod.sh`, GitHub `https://github.com/litepodsh/web`.
- The install command is visual/clipboard-only until its endpoint exists. Its helper copy must clearly say so.
- Preserve the companion example at `.superpowers/brainstorm/9594-1787945266/content/slow-ambient-gradient.html`; it remains ignored by Git.

---

## File Structure

- Create `apps/web/src/data/landing.mjs` — bilingual copy, navigation destinations, install command, benefit data, and media-slot labels.
- Create `apps/web/src/components/MediaPlaceholder.astro` — clean double-bezel wireframe media slot with a caption and variant-specific anatomy.
- Create `apps/web/src/components/Hero.astro` — editorial hero heading and introductory copy.
- Create `apps/web/src/components/PlatformChoice.astro` — asymmetric Self-hosted/Cloud choice and copyable install command.
- Create `apps/web/src/components/Showcase.astro` — media-ready wireframe grid and line-separated benefits.
- Create `apps/web/src/components/LandingControls.astro` — isolated language and clipboard client behavior.
- Create `apps/web/src/components/Landing.astro` — ambient background and composition of focused landing sections.
- Modify `apps/web/src/components/Header.astro` — floating navigation island using the shared navigation data.
- Modify `apps/web/src/pages/index.astro` — compose header and landing instead of Astro starter content.
- Modify `apps/web/src/layouts/Layout.astro` — Litepod metadata, description, language-ready base document styling.
- Modify `apps/web/src/assets/litepod.svg` — brand recolour while preserving its paths and radii.
- Create `apps/web/scripts/test-landing.mjs` — dependency-free assertions for required links, locale data, copyable command, and pricing copy.
- Modify `apps/web/package.json` — add the `test:landing` script only.

### Task 1: Define landing content and executable copy checks

**Files:**
- Create: `apps/web/src/data/landing.mjs`
- Create: `apps/web/scripts/test-landing.mjs`
- Modify: `apps/web/package.json`

**Interfaces:**
- Produces `links`, `installCommand`, `locales`, `benefits`, and `mediaSlots` from `landing.mjs`.
- Consumed by `Header.astro`, `Landing.astro`, and `test-landing.mjs`.

- [ ] **Step 1: Add the source-level test before content exists.**

```js
// apps/web/scripts/test-landing.mjs
import assert from 'node:assert/strict';
import { benefits, installCommand, links, locales, mediaSlots } from '../src/data/landing.mjs';

assert.equal(links.github, 'https://github.com/litepodsh/web');
assert.equal(links.docs, 'https://docs.litepod.sh');
assert.equal(links.templates, 'https://templates.litepod.sh');
assert.equal(links.cloud, 'https://app.litepod.sh');
assert.equal(installCommand, 'curl -fsSL https://litepod.sh/install | bash');
assert.match(locales.en.cloudPrice, /\$5/);
assert.match(locales.es.cloudPrice, /\$5/);
assert.equal(benefits.en.length, 3);
assert.equal(benefits.es.length, 3);
assert.equal(mediaSlots.en.length, 3);
assert.equal(mediaSlots.es.length, 3);
console.log('landing content checks passed');
```

- [ ] **Step 2: Run the missing-module test.**

Run: `bun run test:landing` from `apps/web`.

Expected: failure because `src/data/landing.mjs` does not exist and `test:landing` is not yet registered.

- [ ] **Step 3: Add the content module and package script.**

```js
// apps/web/src/data/landing.mjs
export const links = {
  templates: 'https://templates.litepod.sh',
  cloud: 'https://app.litepod.sh',
  docs: 'https://docs.litepod.sh',
  github: 'https://github.com/litepodsh/web',
};

export const installCommand = 'curl -fsSL https://litepod.sh/install | bash';

export const locales = {
  en: {
    languageName: 'ES',
    nav: { templates: 'Templates', cloud: 'Cloud', docs: 'Docs', github: 'GitHub', selfHost: 'Self-host' },
    heroLead: 'Run the internet', heroAccent: 'on your terms.',
    intro: 'Host your apps on infrastructure you control, or choose Cloud when you do not want to manage the machine.',
    selfLabel: '01 / Your machine, your rules', selfTitle: 'Self-host everything.',
    cloudLabel: '02 / Skip the setup', cloudTitle: 'Use the cloud instead.',
    selfCta: 'Start self-hosting', cloudCta: 'Choose Cloud', cloudPrice: 'from $5 / server slot', copy: 'Copy', copied: 'Copied',
    commandNote: 'Example install command — installer coming soon.',
  },
  es: {
    languageName: 'EN',
    nav: { templates: 'Plantillas', cloud: 'Nube', docs: 'Documentación', github: 'GitHub', selfHost: 'Autoalojar' },
    heroLead: 'Ejecuta internet', heroAccent: 'bajo tus términos.',
    intro: 'Hospeda tus aplicaciones en infraestructura propia o elige Cloud si no quieres administrar la máquina.',
    selfLabel: '01 / Tu máquina, tus reglas', selfTitle: 'Autoaloja todo.',
    cloudLabel: '02 / Evita la configuración', cloudTitle: 'Usa la nube.',
    selfCta: 'Empezar a autoalojar', cloudCta: 'Elegir Cloud', cloudPrice: 'desde $5 / servidor', copy: 'Copiar', copied: 'Copiado',
    commandNote: 'Comando de ejemplo — el instalador llegará pronto.',
  },
};

export const benefits = {
  en: [
    ['Bring your own machine', 'Deploy onto infrastructure you control.'],
    ['Start from a template', 'Choose a known stack and keep moving.'],
    ['Cloud when it matters', 'Choose a $5 server slot when you want Litepod to carry the operational weight.'],
  ],
  es: [
    ['Usa tu propia máquina', 'Despliega sobre infraestructura que controlas.'],
    ['Empieza desde una plantilla', 'Elige un stack conocido y sigue avanzando.'],
    ['Cloud cuando lo necesitas', 'Elige un servidor de $5 cuando quieras que Litepod gestione la operación.'],
  ],
};

export const mediaSlots = {
  en: [['dashboard', 'Media placeholder / dashboard overview'], ['install', 'Media placeholder / install flow'], ['templates', 'Media placeholder / template gallery']],
  es: [['dashboard', 'Marcador multimedia / panel principal'], ['install', 'Marcador multimedia / flujo de instalación'], ['templates', 'Marcador multimedia / galería de plantillas']],
};
```

Add this script to `apps/web/package.json`:

```json
"test:landing": "node scripts/test-landing.mjs"
```

- [ ] **Step 4: Run the content checks.**

Run: `bun run test:landing` from `apps/web`.

Expected: `landing content checks passed`.

- [ ] **Step 5: Inspect the local diff.**

Run: `git diff --check` and `git diff -- apps/web/package.json apps/web/src/data/landing.mjs apps/web/scripts/test-landing.mjs`.

Expected: no whitespace errors; do not commit.

### Task 2: Establish document metadata and the Litepod brand mark

**Files:**
- Modify: `apps/web/src/layouts/Layout.astro`
- Modify: `apps/web/src/assets/litepod.svg`

**Interfaces:**
- Produces a language-ready page shell and rendered Litepod mark consumed by `Header.astro`.

- [ ] **Step 1: Write visual acceptance checks in the page shell comments.**

Add a short non-rendered comment directly above the global style block:

```astro
<!-- Base tokens: #080D09, #101B12, #0D140E, #F0F5EF, #8D9B8E, #C8FF3E. -->
```

- [ ] **Step 2: Replace starter metadata with Litepod metadata.**

Use this head content in `Layout.astro`:

```astro
<title>Litepod — Run the internet on your terms</title>
<meta name="description" content="Self-host your applications or choose a Litepod Cloud server slot from $5." />
<meta name="theme-color" content="#080D09" />
```

Set `<html lang="en">`, preserve the existing favicon and analytics scripts, and give `body` this baseline:

```css
html { background: #080d09; }
body { margin: 0; min-width: 320px; background: #080d09; color: #f0f5ef; }
```

- [ ] **Step 3: Recolour only the SVG fills.**

```svg
<rect x="10" y="10" width="100" height="100" rx="26" fill="#C8FF3E"/>
<rect x="34" y="42" width="52" height="36" rx="18" fill="#0B120D" transform="rotate(-24 60 60)"/>
```

- [ ] **Step 4: Build the app.**

Run: `bun run build` from `apps/web`.

Expected: successful Astro production build.

- [ ] **Step 5: Inspect the local diff.**

Run: `git diff --check`.

Expected: no whitespace errors; do not commit.

### Task 3: Build the floating navigation island

**Files:**
- Modify: `apps/web/src/components/Header.astro`

**Interfaces:**
- Consumes: `links` from `../data/landing.mjs` and `litepod.svg`.
- Produces: a `<header>` with `[data-language-toggle]` for `Landing.astro` to control.

- [ ] **Step 1: Replace the existing header with semantic navigation.**

```astro
---
import logo from '../assets/litepod.svg';
import { links } from '../data/landing.mjs';
---

<header class="site-header">
  <nav aria-label="Primary navigation">
    <a class="brand" href="#top"><img src={logo.src} alt="Litepod" /> <span>litepod</span></a>
    <div class="nav-links">
      <a href={links.templates} target="_blank" rel="noreferrer" data-i18n="nav.templates">Templates</a>
      <a href={links.cloud} target="_blank" rel="noreferrer" data-i18n="nav.cloud">Cloud</a>
      <a href={links.docs} target="_blank" rel="noreferrer" data-i18n="nav.docs">Docs</a>
      <a href={links.github} target="_blank" rel="noreferrer" data-i18n="nav.github">GitHub</a>
    </div>
    <button type="button" class="language" data-language-toggle aria-label="Switch language">ES</button>
    <a class="self-host" href="#self-host" data-i18n="nav.selfHost">Self-host</a>
  </nav>
</header>
```

- [ ] **Step 2: Add isolated header styling.**

Implement the detached centered pill with `position: sticky; top: 18px`, a 999px radius, translucent `#101B12` background, a one-pixel low-contrast edge, inner highlight, and custom `cubic-bezier(.32,.72,0,1)` transitions. At `max-width: 760px`, hide `.nav-links`, retain the brand, language control, and self-host CTA.

- [ ] **Step 3: Verify destinations and mobile collapse.**

Run: `bun run test:landing && bun run build` from `apps/web`.

Expected: both commands succeed. Open 320px responsive mode and confirm no horizontal scrollbar.

- [ ] **Step 4: Inspect the local diff.**

Run: `git diff --check`.

Expected: no whitespace errors; do not commit.

### Task 4: Create the reusable clean media wireframe

**Files:**
- Create: `apps/web/src/components/MediaPlaceholder.astro`

**Interfaces:**
- Consumes props `variant: 'dashboard' | 'install' | 'templates'` and `caption: string`.
- Produces a clean, labelled, fixed-ratio media slot used by `Landing.astro`.

- [ ] **Step 1: Create the explicit component contract and markup.**

```astro
---
interface Props { variant: 'dashboard' | 'install' | 'templates'; caption: string; }
const { variant, caption } = Astro.props;
---

<figure class:list={['media-slot', `media-slot--${variant}`]} aria-label={caption}>
  <figcaption>{caption}</figcaption>
  {variant === 'install' ? <div class="terminal-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div> : <div class="app-wireframe" aria-hidden="true"><b></b><div><i></i><span><i></i><i></i><i></i><i></i><i></i><i></i></span></div></div>}
</figure>
```

- [ ] **Step 2: Add the double-bezel and clean-surface styles.**

The outer figure uses `padding: 10px`, `border-radius: 29px`, and `background: #0A100B`. Its inner surface uses `background: #0D140E`, no noise image, and `overflow: hidden`. Caption is a low-contrast pill. Use `aspect-ratio: 16 / 10` for dashboard and `16 / 8` for each smaller slot.

- [ ] **Step 3: Build the app.**

Run: `bun run build` from `apps/web`.

Expected: successful build with no Astro prop or markup errors.

- [ ] **Step 4: Inspect the local diff.**

Run: `git diff --check`.

Expected: no whitespace errors; do not commit.

### Task 5: Compose the landing, language toggle, copy control, and slow ambient motion

**Files:**
- Create: `apps/web/src/components/Landing.astro`
- Modify: `apps/web/src/pages/index.astro`

**Interfaces:**
- Consumes: `Header`, `MediaPlaceholder`, `benefits`, `installCommand`, `locales`, and `mediaSlots`.
- Produces: `[data-i18n]`, `[data-language-toggle]`, `[data-copy-command]`, `[data-copy-status]`, and `#self-host` hooks.

- [ ] **Step 1: Compose the page hierarchy.**

```astro
---
import { benefits, installCommand, locales, mediaSlots } from '../data/landing.mjs';
import MediaPlaceholder from './MediaPlaceholder.astro';
const initial = locales.en;
---

<div class="ambient" aria-hidden="true"><i class="orb orb-a"></i><i class="orb orb-b"></i></div>
<main id="top">
  <section class="hero" aria-labelledby="hero-title">…</section>
  <section id="self-host" class="platform-choice">…</section>
  <section class="showcase" aria-labelledby="showcase-title">…</section>
</main>
```

Render the hero as separate `[data-i18n]` spans for the two-line heading and introductory paragraph. Render Self-hosted first and give it the 1.4 share of the two-column grid. Render Cloud second with exact `cloudPrice`. Place the command in a `<code>` and use a `<button data-copy-command>` labelled by the current locale.

- [ ] **Step 2: Add the client behavior with resilient clipboard feedback.**

```astro
<script define:vars={{ locales, benefits, mediaSlots, installCommand }}>
  let locale = 'en';
  const status = document.querySelector('[data-copy-status]');
  const copy = document.querySelector('[data-copy-command]');
  const message = (key) => key.split('.').reduce((value, part) => value?.[part], locales[locale]);
  const setIndexedText = (selector, source) => {
    document.querySelectorAll(selector).forEach((node) => {
      const [title, body] = source[Number(node.dataset.index)];
      node.querySelector('[data-title]').textContent = title;
      node.querySelector('[data-body]').textContent = body;
    });
  };
  const applyLocale = () => {
    const text = locales[locale];
    document.documentElement.lang = locale;
    document.querySelector('[data-language-toggle]').textContent = text.languageName;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = message(node.dataset.i18n);
    });
    setIndexedText('[data-benefit-index]', benefits[locale]);
    document.querySelectorAll('[data-media-index]').forEach((node) => {
      const figure = node.querySelector('figure');
      figure.setAttribute('aria-label', mediaSlots[locale][Number(node.dataset.mediaIndex)][1]);
      figure.querySelector('figcaption').textContent = mediaSlots[locale][Number(node.dataset.mediaIndex)][1];
    });
  };
  document.querySelector('[data-language-toggle]').addEventListener('click', () => {
    locale = locale === 'en' ? 'es' : 'en'; applyLocale();
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      copy.dataset.state = 'copied'; copy.textContent = locales[locale].copied;
      status.textContent = locales[locale].copied;
    } catch {
      status.textContent = 'Clipboard unavailable — select the command manually.';
    }
    window.setTimeout(() => { copy.dataset.state = 'idle'; copy.textContent = locales[locale].copy; }, 1800);
  });
</script>
```

Add `<p data-copy-status aria-live="polite"></p>` next to the command. Render the install helper copy from `commandNote`; it must never claim the endpoint exists. Map active benefits to `<article data-benefit-index={index}><strong data-title></strong><p data-body></p></article>` and media to `<div data-media-index={index}><MediaPlaceholder ... /></div>` wrappers so the script updates every visible string in both languages.

- [ ] **Step 3: Add responsive visual rules.**

Use a large left-aligned heading with `clamp(52px, 9vw, 128px)`, `letter-spacing: -.085em`, and no centered hero. Above 760px, use `grid-template-columns: 1.4fr .6fr` for platform choice and `1.36fr .64fr` for showcase. At 760px or below, use one column, `padding-inline: 20px`, remove nav link display, and avoid all negative margins.

Add only this ambient motion model:

```css
.ambient { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
.orb { position: absolute; width: 58vw; height: 58vw; border-radius: 50%; filter: blur(86px); opacity: .15; will-change: transform; }
.orb-a { background: #c8ff3e; animation: drift-a 34s cubic-bezier(.32,.72,0,1) infinite alternate; }
.orb-b { background: #376f45; animation: drift-b 39s cubic-bezier(.32,.72,0,1) infinite alternate; }
@media (prefers-reduced-motion: reduce) { .orb { animation: none; } }
```

Keep `.media-slot`, `.command`, and all product surfaces opaque so the orbs never visually appear inside them.

- [ ] **Step 4: Replace the starter page composition.**

```astro
---
import Header from '../components/Header.astro';
import Landing from '../components/Landing.astro';
import Layout from '../layouts/Layout.astro';
---
<Layout><Header /><Landing /></Layout>
```

Remove the now-unused `Welcome.astro` import. Keep the old file temporarily only if no imports remain; delete it in Task 6 once the build proves it is unused.

- [ ] **Step 5: Run automated and manual interaction checks.**

Run: `bun run test:landing && bun run build` from `apps/web`.

Then use `astro dev --background` from `apps/web` and verify:

1. EN/ES toggle updates hero, platform choice, command note, and copy button label.
2. Copy changes to the locale-specific confirmation for 1.8 seconds.
3. Denying clipboard permissions shows the fallback message.
4. At 320px, 768px, and desktop, no content overflows horizontally.
5. Reduced-motion setting leaves the background static.

Stop the server with `astro dev stop` after verification.

- [ ] **Step 6: Inspect the local diff.**

Run: `git diff --check` and `git status --short`.

Expected: only intended local files; do not commit.

### Task 6: Remove starter remnants and perform final regression checks

**Files:**
- Delete: `apps/web/src/components/Welcome.astro` (only if `rg -n "Welcome" apps/web/src` returns no imports)
- Modify: `apps/web/README.md`

**Interfaces:**
- Produces a repository whose web app documentation lists the new validation commands and contains no Astro starter UI.

- [ ] **Step 1: Prove the starter component is unused.**

Run: `rg -n "Welcome" apps/web/src`.

Expected: no import or component usage. If it finds usage, remove only that usage before deleting the file.

- [ ] **Step 2: Remove the unused starter file.**

Delete `apps/web/src/components/Welcome.astro` using `apply_patch`.

- [ ] **Step 3: Replace the starter README instructions with project-specific commands.**

Add this concise section to `apps/web/README.md`:

```md
## Validation

```sh
bun run test:landing
bun run build
astro dev --background
```

Stop the local server with `astro dev stop`.
```

- [ ] **Step 4: Run the full final check.**

Run: `bun run test:landing && bun run build` from `apps/web`, followed by `git diff --check` from the repository root.

Expected: content test passes, production build succeeds, and Git reports no whitespace errors.

- [ ] **Step 5: Review the local change set.**

Run: `git status --short` and `git diff --stat`.

Expected: all expected implementation files are local modifications/new files; do not commit.

## Plan Self-Review

- **Spec coverage:** Tasks 2–5 cover palette, mark recolour, floating navigation, all required external URLs, bilingual interface, self-host-first choice, $5 Cloud copy, slow background-only motion, copy confirmation/fallback, media placeholders, benefits, responsive behavior, and accessibility. Task 1 verifies high-value product copy and URLs; Tasks 5–6 verify behavior and build output.
- **Placeholder scan:** This plan contains no unfinished implementation markers. Media placeholders are a specified product feature with explicit component anatomy and captions.
- **Type consistency:** `landing.mjs` exports named values consumed consistently by `Header.astro`, `Landing.astro`, and `test-landing.mjs`; `MediaPlaceholder.astro` accepts the exact three variants emitted by `mediaSlots`.
