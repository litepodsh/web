# Litepod landing redesign handoff

Use this as the source of truth for redesigning `apps/web`. The product is
**self-hosting first**. Do not turn it into a generic cloud SaaS page.

## Design intent

Reference the **structure** of Oxc: direct technical typography, a simple
editorial page flow, capabilities shown in sequence, and real product UI as
proof. Do not copy its colors or branding.

Litepod should feel calm, capable and owned by its user. Add only a restrained
neobrutalist edge through a small hatch, offset rule or high-contrast command
surface. Do not use thick black borders, excessive shadows, sticker-like UI or
rainbow decoration.

## Color tokens: Signal Oxide

### Light mode

| Token | Value | Purpose |
| --- | --- | --- |
| `lp-bg` | `#F4F0E9` | Canvas |
| `lp-surface` | `#FFFDF8` | Elevated, readable surface |
| `lp-deep` | `#EBE7DF` | Recessed section / outer bezel |
| `lp-ink` | `#1A2520` | Headings, terminal, strong UI |
| `lp-muted` | `#53635B` | Supporting copy |
| `lp-accent` | `#D84B2A` | Primary action and tiny signal details |
| `lp-accent-ink` | `#FFFAF3` | Text on accent |

### Dark mode

Keep the same signal relationship; do not introduce a new color family.

| Token | Value | Purpose |
| --- | --- | --- |
| `lp-bg` | `#101512` | Canvas |
| `lp-surface` | `#17201A` | Elevated surface |
| `lp-deep` | `#0C110E` | Recessed section / outer bezel |
| `lp-ink` | `#F2F0E9` | Primary text |
| `lp-muted` | `#B7C0B8` | Supporting copy |
| `lp-accent` | `#F06A48` | Primary action / signal |
| `lp-accent-ink` | `#20100B` | Text on accent |

Use the accent only for the command-copy control, primary actions, labels and
one restrained graphic detail. It is never a text color on a light background
and never a full-page background.

## Type, shape and motion

- Use the existing premium sans (`Geist`, `Satoshi`, system fallback) and a
  monospace face for commands, indexes and compact labels. No serif and no
  Inter.
- Hero heading: large but not theatrical; tight tracking and approximately
  2–3 short lines. Keep it left aligned.
- Navigation and buttons are rounded pills. Product/media shells use a soft
  double bezel: `lp-deep` outer shell, `lp-surface` inner core.
- Use thin low-contrast rules; do not use generic gray card borders or heavy
  drop shadows.
- Motion is optional and minimal: transform/opacity reveals only, with
  reduced-motion support. Do not add a dependency just for animation.

## Homepage composition

1. **Navigation island** — Litepod mark; Templates, Docs and GitHub; compact
   self-host link.
2. **Hero** — eyebrow `Infrastructure without a black box`; direct
   self-hosting headline; explanatory copy; install command with a visible
   `Copy command` control. The copy command is the dominant CTA.
3. **Operating paths** — asymmetric pair beneath the hero:
   - **Self-hosted** (larger, first): `Install on your own server.` The
     customer operates their infrastructure and Litepod control plane.
   - **Litepod Cloud / BYOS** (smaller, second): `Bring your own server.` The
     customer connects their server while Litepod runs the control plane; they
     do not administer it.
4. **Product proof** — installation, templates and dashboard visuals. Prefer
   actual screenshots/videos over abstract bento-card art.
5. **Cloud** remains a convenient secondary option, never equal to the
   self-hosting hero promise.

On mobile, collapse all asymmetry to one column. Keep the self-hosted card
before Cloud/BYOS and make the command fully usable without horizontal scroll.

## Copy rules

- Make claims specific and technical; avoid generic SaaS language.
- Keep the product's current bilingual content model.
- Preserve these meanings exactly:
  - Self-hosted = install Litepod directly on a server you control.
  - Cloud/BYOS = bring your server to Litepod Cloud; Litepod manages the
    control plane.

## Implementation boundaries

- Reuse Astro, Tailwind and existing components. Do not add packages unless a
  requirement cannot be met with the current stack.
- Preserve the install command copy feedback, theme toggle, language toggle
  and responsive behavior.
- Update `docs/design/litepod-visual-tokens.md` only when the implementation
  changes the active token set, so the shared visual language stays accurate.
