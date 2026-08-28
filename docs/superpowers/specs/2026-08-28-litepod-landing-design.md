# Litepod landing page — design specification

## Purpose

Replace the Astro starter screen in `apps/web` with an editorial product landing page for Litepod: a service for self-hosting applications and, when users prefer less operational work, a Litepod Cloud server slot from $5.

The page must make the hosting model legible immediately. Self-hosting is the default and visually dominant option; Cloud is a clearly presented alternative rather than a secondary afterthought.

## Visual direction

The design combines the oversized, editorial rhythm requested from Tinycast with Taste Skill's precise technical product language:

- Dark forest base: `#080D09`.
- Surface: `#101B12`; deeper surface: `#0D140E`.
- Primary text: `#F0F5EF`; secondary text: `#8D9B8E`.
- One signal accent only: acid green `#C8FF3E`.
- Existing Litepod mark keeps its shape and is recoloured to acid-green outside with `#0B120D` inside.
- Large sans-serif display type; monospaced labels and commands. No Inter, gradients in heading text, purple/blue accents, generic feature cards, or global grain overlays.
- A fixed, non-interactive ambient background uses two blurred green orbs with slow transform-only motion (34–39 seconds, reduced-motion fallback). It sits behind the whole page and never contaminates cards, terminals, media panels, or screenshots.

Reference mockup is intentionally preserved at `.superpowers/brainstorm/9594-1787945266/content/slow-ambient-gradient.html`. `.superpowers/` is ignored by Git so the visual companion workspace stays local.

## Page structure

### 1. Floating navigation island

A detached, centered, sticky pill shows the recoloured Litepod mark, links to Templates, Cloud, Docs and GitHub, an `EN / ES` language control, and a Self-host CTA.

- Templates links to `https://templates.litepod.sh`.
- Cloud links to `https://app.litepod.sh`.
- Docs links to `https://docs.litepod.sh`.
- GitHub links to `https://github.com/litepodsh/web`, where issues are raised.
- The mobile bar collapses to mark, language control, and self-host CTA; no horizontal overflow.

### 2. Hero and platform choice

The hero is left-aligned and bilingual. English is the initial language; the same content is available in Spanish through the language control.

- English headline: “Run the internet on your terms.”
- Spanish headline: “Ejecuta internet bajo tus propios términos.”
- Supporting copy explains the choice without jargon: host your own applications if you want control; choose Cloud if you do not want to manage the machine.

Directly below it, an asymmetric two-choice section makes Self-hosted larger than Cloud.

- **Self-hosted:** “Your machine, your rules.” / “Self-host everything.”
- **Cloud:** “Skip the setup.” / “Use the cloud instead.”
- Cloud price copy: “from $5 / server slot” and Spanish equivalent.

The self-hosted panel contains an illustrative, copyable command:

```sh
curl -fsSL https://litepod.sh/install | bash
```

This is deliberately a presentation-only example while the installer endpoint does not yet exist. The page copies it to the clipboard but does not execute it. Its helper text must explicitly identify it as an upcoming install command, avoiding a promise that it works today.

The Copy button is compact and tactile. After a successful clipboard write, it changes to “Copied” with a check mark for 1.8 seconds, then returns to “Copy”. A visible fallback message is shown if the Clipboard API is unavailable.

### 3. Benefits and media-ready showcase

The lower section begins with “One place for the apps you actually use.” It contains a 1.36:0.64 asymmetric grid with three clean media placeholders:

1. A large dashboard overview slot.
2. A smaller installation-flow slot.
3. A smaller template-gallery slot.

Each placeholder keeps a nested, double-bezel surface and a discreet label identifying its intended replacement. Until real assets arrive, it renders semantic wireframe anatomy; later, a video or screenshot replaces only the inner media element, retaining the same aspect ratio and containment.

Following the media grid, three text-led benefits are separated with lines rather than generic cards:

- Bring your own machine.
- Start from a template.
- Cloud when it matters.

The final benefit makes the Cloud tradeoff concrete: users who do not want to deal with the setup can choose the $5 server slot.

## Interaction and accessibility

- Navigation and CTAs have custom cubic-bezier transitions and `:active` scale feedback.
- Slow ambient motion is disabled by `prefers-reduced-motion`.
- Copy feedback is announced through an `aria-live` region.
- Links and controls have visible keyboard focus states.
- All images and future video placeholders have intentional accessible names; decorative background effects remain hidden from assistive technology.
- No section depends on hover to reveal critical content.

## Implementation boundary

Implement the page with Astro components and scoped/native CSS. No third-party animation or icon package is required: the existing SVG mark is used and the copy confirmation uses a small inline SVG or CSS shape. The page is static aside from the language switcher and clipboard interaction, which should be isolated in a lightweight client script.

Expected files:

- `apps/web/src/pages/index.astro` — page composition.
- `apps/web/src/layouts/Layout.astro` — document metadata, language-ready title and global base styles.
- `apps/web/src/components/Header.astro` — floating navigation island.
- `apps/web/src/components/Welcome.astro` — replaced or repurposed as the landing content, or split into focused landing components if that improves readability.
- `apps/web/src/assets/litepod.svg` — recolour only; preserve geometry.

## Verification

- Run `bun run build` in `apps/web`.
- Verify both English and Spanish UI strings by switching language.
- Verify clipboard success and unavailable-clipboard fallback.
- Verify all four external destinations have the exact requested URLs and use safe external-link attributes.
- Verify 320px mobile, tablet, and desktop layouts: the hero, two platform choices, nav, media placeholders, and benefits have no horizontal overflow.
- Verify `prefers-reduced-motion` removes ambient background animation.

