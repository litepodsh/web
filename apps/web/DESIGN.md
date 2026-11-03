---
name: Litepod Landing
description: The public Litepod site, where one measured memory figure sits on a full-bleed orange field above flat neutral bands.
colors:
  accent: "#d4410b"
  accent-dark: "#ff6a1f"
  accent-ink: "#ffffff"
  accent-ink-dark: "#140700"
  label-ink: "#b83a00"
  label-ink-dark: "#ff6a1f"
  ok: "#24704c"
  ok-dark: "#5fbf8f"
  bg: "#fafafa"
  bg-dark: "#000000"
  surface: "#ffffff"
  surface-dark: "#111111"
  raised: "#ffffff"
  raised-dark: "#1a1a1a"
  deep: "#f0f0f0"
  deep-dark: "#0a0a0a"
  ink: "#0f0f0f"
  ink-dark: "#ffffff"
  muted: "#5e5e5e"
  muted-dark: "#b0b0b0"
typography:
  figure:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(7.5rem, min(27vw, 34svh), 20rem)"
    fontWeight: 560
    lineHeight: 0.82
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  headline-hero:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)"
    fontWeight: 560
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline-section:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 560
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline-close:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 560
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline-sub:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 560
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  metric-value:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 550
    lineHeight: 1.05
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  title-card:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 560
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  title-row:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 560
    letterSpacing: "-0.035em"
  body-lead:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-card:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  action:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    letterSpacing: "-0.015em"
  nav:
    fontFamily: "Geist Variable, Geist, Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  segment-value:
    fontFamily: "Commit Mono, ui-monospace, SF Mono, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  command-mono:
    fontFamily: "Commit Mono, ui-monospace, SF Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
  label-mono:
    fontFamily: "Commit Mono, ui-monospace, SF Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
rounded:
  bar: "0.4rem"
  badge: "0.5rem"
  control-header: "0.5625rem"
  control: "0.75rem"
  well: "0.875rem"
  card: "1rem"
  pill: "9999px"
spacing:
  hairline: "1px"
  gutter-sm: "1rem"
  gutter-lg: "1.5rem"
  card-sm: "1.5rem"
  card-lg: "2rem"
  section-sm: "4rem"
  section-lg: "5rem"
  header: "4rem"
  container: "72rem"
components:
  button-field:
    backgroundColor: "{colors.accent-ink}"
    textColor: "{colors.accent}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "3rem"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "3rem"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-header:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control-header}"
    padding: "0 0.875rem"
    height: "2.25rem"
  scale-segment:
    backgroundColor: "{colors.accent-ink}"
    textColor: "{colors.accent}"
    typography: "{typography.segment-value}"
    padding: "0.75rem 0.875rem"
    height: "5rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-lg}"
  status-badge:
    textColor: "{colors.ok}"
    rounded: "{rounded.badge}"
    padding: "0.25rem 0.5rem"
  header:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    height: "{spacing.header}"
---

# Design System: Litepod Landing

## Overview

**Creative North Star: "The Measured Field"**

The site is testing Cloud first: it opens on the offer, "Deploy to your own server. We run the panel.", set large on a full-bleed Signal Oxide field. The 63 MB figure and its to-scale bar live in the self-hosted card, and the original figure-led hero is kept in `src/components/HeroMeasured.astro`. The field is the system's one loud gesture.

Below the field the page is flat and plain: single hairline cards on neutrals, alternating full-bleed bands, and hairline rows. The landing runs hero, metrics, operating paths, deploy, templates, servers, showcase, demo, then a closing Cloud field. The color tokens match the Litepod console at `litepod/apps/ui/DESIGN.md`, but the landing no longer uses the console's relief or double bezel.

The site runs dark by default and supports light. Every color role therefore has a light and a dark value, and the accent and its ink swap together. The binding brand constraints come from the owner: orange stays the brand color, and gradients are allowed only when subtle.

**Key Characteristics:**
- A full-bleed accent field at the top and again at the Cloud close, with neutral sections between them.
- A to-scale bar in which width encodes measured memory.
- A flat full-width header that is transparent over the field.
- Single hairline cards at 1rem, never nested in a tray.
- Controls at .75rem with a bare trailing arrow.
- Full-bleed alternate bands instead of decorative texture.
- Geist for words at a tight, medium weight. Commit Mono for what a machine measured or runs.

## Colors

True neutrals with one orange, plus a muted green reserved for healthy state. Each role below is listed as light, then dark, and the two swap together under the `.dark` class.

### Primary
- **Signal Oxide**: The hero and Cloud close fields, the primary button fill, ticks, and the logo. Outside those two fields it stays scarce.
- **Accent Ink**: All type and controls on Signal Oxide. It reaches 4.6:1 on the field in light and 6.92:1 in dark.
- **Label Oxide**: Small oxide text on neutrals, such as the `deploy_type` value and link hovers. In light it holds at least 5.06:1 on every neutral, where the brighter accent only reaches 4.41:1 on the canvas.

### Secondary
- **Healthy Green**: Live or healthy status only, as a badge or a small dot. It is state, not decoration.

### Neutral
- **Canvas**: The page ground and the header once it leaves the field.
- **Surface**: Cards, framed screenshots, and the selected deployment row.
- **Raised**: Small things on a card or band: ticks, chips, the theme toggle, and active capsule indicators.
- **Recess**: Capsule tracks, the language switch, and inset wells. A band is Recess mixed 55% into Canvas.
- **Ink**: Primary text and the secondary button fill. At 10 to 14% opacity it draws every hairline on neutrals.
- **Muted**: Body copy, quiet nav items, and footer links. It holds at least 5.69:1 on neutrals.

### Named Rules
**The Two Fields Rule.** The full-bleed accent field opens the landing and closes it at the Cloud band, and nowhere else. Sections between them and other pages stay on neutrals.

**The Inversion Rule.** On the field, controls and the scale bar invert: Accent Ink fill with Signal Oxide type. The primary button's oxide fill is never placed on the oxide field.

**The Full-Strength Ink Rule.** Text on the field uses Accent Ink at full opacity. In light it reaches only 4.6:1, so any tint drops it below AA. Tints on the field are for hairlines, not for text.

**The Subtle Gradient Rule.** Gradients are allowed when they are barely noticed, as with the primary button's top light (12% white mix). The field itself is a flat solid.

## Typography

**Display Font:** Geist Variable (with Geist, Satoshi, then system sans)
**Body Font:** Geist Variable (same stack)
**Label/Mono Font:** Commit Mono (with ui-monospace, SF Mono, monospace), Regular face only

**Character:** Geist at a custom 560 weight, tracked tightly, reads as engineered rather than editorial. Commit Mono supplies the instrument voice for readings and commands.

### Hierarchy
- **Figure** (560, clamp up to 20rem, 0.82): The headline figure on the hero and nothing else. The unit sits on the same baseline at 0.42em and weight 500. The clamp also limits it by viewport height, so the bar stays in the first viewport.
- **Headline, hero** (560, clamp up to 3.5rem, 1.02): The page h1, deliberately subordinate to the figure.
- **Headline, section** (560, clamp(2rem, 3.4vw, 2.75rem), 1.05, -.04em): Every section h2 on neutrals, with no per-section step-ups.
- **Headline, close** (560, clamp up to 3.75rem, 1.02): The Cloud close h2 on the accent field only.
- **Headline, sub** (560, clamp up to 2rem, 1.1): A subsection h3 inside a section, such as the stack list.
- **Metric value** (550, clamp up to 3.25rem, 1.05): Metric readings in Geist with tabular figures, above a 0.875rem Muted description.
- **Title, card** (560, 1.5rem, 1.15): Headlines inside cards.
- **Title, row** (560, 1.125rem): Deployment type rows, stack rows, server modes, and benefits.
- **Body** (400, 1rem, 1.6): Muted on neutrals, held to 32 to 36rem. Cards step down to 0.9375rem or 0.875rem. The hero intro and Cloud close body use the lead step (1.0625rem, 1.55) at full-strength Accent Ink.
- **Caption and action** (500 at 0.875rem; 600 at 0.9375rem): The RAM caption and supporting lines; button labels.
- **Label, mono** (400, 0.6875rem, sentence case): Scale bar names on phones, the language switch, and footer metadata. Status badges use 0.625rem, and table images and ports use 0.75rem. This site's labels are not uppercase, which differs from the console.

### Named Rules
**The 63 MB Rule.** The footprint is always written as 63 MB, in `HeroMeasured.astro`, the self-hosted card and the metrics row. It is never computed from the segments, which sum to 62.73, and only the owner changes it.

**The Measured Mono Rule.** Commit Mono carries bar readings, commands, table values, and compact labels. Sentences stay in Geist, even in the hero's RAM caption. The giant figure and metric values stay in Geist too.

**The Single Headline Scale Rule.** A section earns weight from its content, not a larger h2. Only the hero and the Cloud close leave the section step.

## Layout

Content sits in one centered column up to 72rem, with gutters of 1rem on phones and 1.5rem from the `sm` breakpoint. The header is sticky, full width, and 4rem tall, with its row on the same column. The hero's background runs edge to edge and pulls up by 4rem to sit under the header, with top padding of 5.5rem, then 6rem.

Sections pad 4rem, then 5rem from `sm`. Metrics is tighter at 3.5rem, then 4rem. Separation comes from ground, not rules: operating paths, templates, and showcase are `.lp-band` sections, which extend their tinted ground past the column to both viewport edges while their content stays on the column. Section headings stack above their content at the left, with a 2rem gap or more.

Paired cards are deliberately uneven (`1.25fr / .75fr` or `1.2fr / .8fr`) and collapse to one column at the small end. The deployment picker splits `.8fr / 1.2fr` from `md`. Servers splits evenly from `md`. Demo and the Cloud close put copy against right-aligned actions from `md`. The hero's lower block splits `1.15fr / .85fr` from `lg`, aligned to the bottom edge. Metrics runs two columns, then four from `lg`.

Breakpoints are Tailwind's defaults (`sm` 640px, `md` 768px, `lg` 1024px). No custom breakpoints exist.

## Elevation & Depth

The system is flat. Depth comes from tonal grounds and 1px hairlines. Cards, chips, and screenshots cast no shadow, and there is no directional relief on them. The only remaining shadows belong to the filled buttons and the sliding capsule indicator.

### Shadow Vocabulary
- **Hairline ring** (an inset 1px ring of Ink at 10%): Chips, ticks, the theme toggle, framed screenshots, and the selected deployment row.
- **Button primary and ink** (a fine inner bevel and a small drop, with an accent-tinted pool on primary): Pressing replaces them with an inset shade.
- **Capsule indicator** (the hairline ring and a soft 4px by 12px drop): The sliding tab indicator only.

The exact values live in the sidecar's `extensions.shadows`.

### Named Rules
**The Flat Card Rule.** A card's boundary is a hairline and a Surface fill. A shadow never does that job.

**The Layered Utility Rule.** Rings and shadows are declared with `@utility`, so they land in Tailwind's utilities layer. Unlayered `box-shadow` outranks every layer and silently kills `ring-*` and `shadow-*`.

## Shapes

Radius follows the job. Cards and framed screenshots use 1rem. Controls and control-sized fields use 0.75rem: buttons, the install command field, deployment rows, and note boxes. The header's smaller 2.25rem button uses 0.5625rem. Small data keeps tight corners: the scale bar and ticks at 0.4rem, badges, nav links, and the copy button at 0.5rem. Full pills remain for chips, capsule tabs, the language switch, the theme toggle, and status dots.

Containers are never nested as a tray and plate. An inset well (0.875rem) may sit inside a card as content, such as the build methods.

## Components

### Buttons
Direct rounded rectangles with a bare trailing arrow.
- **Shape:** 0.75rem corners, 1.25rem side padding, and a 0.75rem icon gap. Heights are 3rem for field and primary, 2.75rem for ink, and 2.25rem in the header.
- **Field:** Accent Ink fill with Signal Oxide type, flat, on the accent field only.
- **Primary:** Signal Oxide with its faint top light, a fine bevel, and an accent-tinted pool, at one per section.
- **Ink:** Ink fill with Canvas type at 0.875rem, the alternative beside a primary path.
- **Arrow:** A 0.875rem stroke icon with no background. It nudges up and right on hover, or down for in-page anchors.
- **Hover / Focus:** Lift of 1px over 300ms. Press scales to 0.98. Focus is a 2px outline at a 3px offset, in accent at 70%, and in Accent Ink on the field.
- **Quiet link:** Small medium-weight text with the bare arrow. On neutrals it turns from Muted to Ink. On the field it stays full ink and gains an underline.

### Headline Figure
The site's signature. "63" at the Figure step, with "MB" at 0.42em on the shared baseline, nudged -0.04em left for optical alignment with the bar below. It rises 1.25rem on load but never starts transparent, because it holds the LCP.

### Scale Bar
A single rounded bar of three measured containers: caddy 24.7, dragonfly 21.82, api 16.21. Each grid track's `fr` value is the measured MB, so widths stay to scale at every viewport. One-pixel gaps act as dividers, showing the field through. Segments are inverted, 3.75rem tall on phones and 5rem from `sm`, with the name above its mono reading. They wipe in left to right with staggered 130ms delays, and appear without animation under reduced motion. The RAM caption always follows directly beneath, so the number says what it measures.

### Install Command
A 0.75rem hairline field in Accent Ink at 35% on the hero, with a non-selectable prompt, a horizontally scrolling command, and a 0.5rem copy button. On phones the command fades out at its right edge with a mask. The command's own note sits under it.

### Cards
A single Surface container with an Ink hairline at 10% and 1rem corners, padding 1.5rem, then 2rem from `sm`. Card lists divide with Ink hairlines at 10%. On a band, the Surface fill provides the lift.

### Bands
A section marked `.lp-band` extends a tinted ground to both viewport edges from inside the page column. Bands alternate with Canvas sections, so no extra divider is needed between them.

### Metrics
A single row of readings under a 14% Ink top hairline, with no cells or frame. Each pairs a Geist value with a Muted description beneath it.

### Chips and Badges
- **Provider and stack chips:** Raised pills with a hairline ring, a logo, and a small sans name, 2rem to 2.5rem tall. The logo is the only color.
- **Status badge:** 0.5rem corners, Healthy Green hairline at 25% and fill at 10%, with a pulsing dot.
- **Ticks:** 1.25rem Raised squares at 0.4rem, with a Signal Oxide stroke check. Every icon is inline SVG at a 1.5 to 2 stroke.

### Navigation
A flat, full-width sticky bar, 4rem tall, on Canvas with an Ink hairline at 10% below it. Over a page's accent hero it becomes transparent, drops the hairline, and remaps its tokens to the field's ink, so its CTA inverts automatically. A 250ms color transition restores the solid bar once the hero passes. Links are plain Muted text at 0.875rem with 0.5rem corners, turning to Ink on hover. The language switch is a mono capsule with a sliding raised indicator on the spring easing, reduced to a single button on phones.

### Capsule Tabs
A pill track with a hairline at 9% and Recess at 70%, with a raised indicator that springs to the selected tab. The Showcase uses it above a 16:10 framed screenshot. The deployment type picker is the vertical relative: 0.75rem rows that gain a Surface fill and hairline ring when selected, with a small circular arrow that turns oxide.

### Motion
Standard easing is `cubic-bezier(0.32, 0.72, 0, 1)`, and the spring (`0.3, 1.25, 0.4, 1`) is kept for indicators and logo hovers. State changes run 200 to 300ms and panel swaps 500ms. Scroll reveals run 900ms with a 2.5rem rise, a 6px blur, and a 90ms stagger, and the hidden state is gated on a `.js` class so content stays visible without scripts. A 2.4s breathing pulse is reserved for status dots. Reduced motion shortens all animation and transition durations to 1ms and removes the reveal and segment wipe.

## Do's and Don'ts

### Do:
- **Do** set the hero's headline figure as exactly 63 MB, in every locale and at every viewport.
- **Do** derive each scale bar track from its measured value, and keep the RAM caption directly under the bar.
- **Do** invert controls on the accent field: Accent Ink fill with Signal Oxide type.
- **Do** use Label Oxide for small oxide text on neutrals, and keep Signal Oxide for fills, marks, and ticks there.
- **Do** keep hero motion transform-only for the figure, so the LCP element is never painted at opacity 0.
- **Do** build cards as one hairline Surface container at 1rem, and controls at 0.75rem with a bare arrow.
- **Do** separate landing sections with `.lp-band` grounds, in the order hero, metrics, operating paths, deploy, templates, servers, showcase, demo, Cloud close.
- **Do** state in product copy that MCP executes actions, and name Vercel, Coolify, and Dokploy as the competitors.
- **Do** keep color tokens matched to the product UI.
- **Do** gate every animation on reduced motion, and leave content visible without scripts.
- **Do** give new touch targets on phones the console's 44px minimum. The 2rem small controls in this build are the shipped size, not a floor.

### Don't:
- **Don't** replace the headline figure with a re-measured value, the 62.73 MB segment total, or an approximation such as "~63 MB". Supporting copy may say "about 63 MB" or "~63 MB".
- **Don't** give a scale segment a minimum width or an equal share. A bar that is not to scale breaks the promise it exists to make.
- **Don't** add relief, shadows, or a gradient to the accent field.
- **Don't** dim text on the field, including on hover.
- **Don't** add a third full-bleed accent field or a field between the hero and the Cloud close.
- **Don't** use strongly marked gradients. Subtle gradients are allowed, by the owner's decision.
- **Don't** add a second bright accent. Green is for healthy state only.
- **Don't** uppercase labels on this site.
- **Don't** put a mono line above a heading.
- **Don't** nest a card in a tray or plate, or add directional lamp relief to a card.
- **Don't** add a halftone page field or a striped hatch. The logo keeps its own halftone pill.
- **Don't** wrap a call-to-action arrow in a circular chip.
