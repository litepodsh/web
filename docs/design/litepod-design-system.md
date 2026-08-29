# Litepod design system

Reusable UI language for Litepod products. Apply these rules to landing pages,
dashboards, docs and product surfaces so they read as one brand.

## Principles

- Technical, calm and direct; never generic SaaS gloss.
- Soft, machined surfaces with rounded geometry—not hard neobrutalist blocks.
- Signal Oxide is a functional accent, not decoration.
- Product UI and commands are evidence; use them instead of ornamental art.

## Color tokens

### Light

| Token | Value | Use |
| --- | --- | --- |
| `--lp-bg` | `#F4F0E9` | Main canvas |
| `--lp-surface` | `#FFFDF8` | Cards, menus, inputs |
| `--lp-deep` | `#EBE7DF` | Outer bezel, recessed areas |
| `--lp-ink` | `#1A2520` | Primary text, strong controls |
| `--lp-muted` | `#53635B` | Secondary text |
| `--lp-accent` | `#D84B2A` | Main CTA, state and compact label |
| `--lp-accent-ink` | `#FFFAF3` | Text over accent |

### Dark

| Token | Value | Use |
| --- | --- | --- |
| `--lp-bg` | `#101512` | Main canvas |
| `--lp-surface` | `#17201A` | Cards, menus, inputs |
| `--lp-deep` | `#0C110E` | Outer bezel, recessed areas |
| `--lp-ink` | `#F2F0E9` | Primary text |
| `--lp-muted` | `#B7C0B8` | Secondary text |
| `--lp-accent` | `#F06A48` | Main CTA, state and compact label |
| `--lp-accent-ink` | `#20100B` | Text over accent |

Rules:

- Never use the accent for long text on a light surface.
- Use one accent per screen. Do not add gradients, glows or a second bright
  color.
- `lp-deep` is for a frame/recess, not a normal card background.

## Typography

- Sans: `Geist`, then `Satoshi`, then system sans.
- Mono: system monospace for commands, timestamps, indexes and small labels.
- Headlines use tight tracking (`-0.04em` to `-0.07em`) and normal-to-medium
  weight. Do not compensate with huge type.
- Body copy uses `lp-muted`, comfortable line-height and a readable width.
- Labels are mono, uppercase, compact and letter-spaced. Accent labels use
  `lp-accent` only in dark mode; use a darker accessible variant in light mode.

## Radius and surfaces

| Element | Radius | Construction |
| --- | --- | --- |
| Button, nav, filter | `9999px` | Pill |
| Input, compact control | `0.875rem` | Single surface |
| Product/media container | `1.8125rem` outer | `lp-deep` shell with `p-2.5` |
| Product/media inner core | `1.25rem` | `lp-surface` content area |
| Large section | `1.5rem`–`2rem` | Use only when elevation helps grouping |

Use the double-bezel only for important product, media or decision surfaces:

```txt
outer: bg-lp-deep + subtle ink hairline + p-2.5 + rounded-[1.8125rem]
inner: bg-lp-surface + rounded-[1.25rem] + p-7
```

Avoid stacking cards inside cards. Prefer whitespace and separators for normal
content groups.

## Buttons and controls

All actionable controls are rounded and tactile.

| Variant | Background | Text | Intended use |
| --- | --- | --- | --- |
| Primary | `lp-accent` | `lp-accent-ink` | One dominant action per view |
| Secondary | `lp-ink` | `lp-bg` | Strong alternative action |
| Quiet | `lp-surface` | `lp-ink` | Navigation and low-priority action |
| Ghost | transparent | `lp-muted` | Supporting links/actions |

- Button padding: compact `0.625rem 0.75rem`; standard `0.75rem 1rem`;
  primary CTA `0.75rem 1.125rem`.
- On hover, shift color subtly. On press, use `scale(0.98)` or a 1px
  transform. Maintain visible keyboard focus.
- If a button has a trailing icon, place it in its own small circular inset.
- A command copy control can be rectangular with a soft `0.5rem` radius inside
  a dark monospace command field; it is still visually tied to the primary CTA.
- Inputs have labels above them, helper/error text below, and never rely on
  placeholder text as the label.

## Spacing and layout

- Use a constrained content width (about `86.25rem` for marketing; narrower
  for reading views) and generous outer gutter.
- Major sections: `6rem`–`9rem` vertical spacing on desktop; reduce cleanly on
  mobile.
- Prefer editorial left-aligned heroes and asymmetric two-column choices.
- Below `768px`, collapse asymmetry to one column and remove overlap/rotation.
- Navigation is a floating rounded island, not an edge-to-edge bar.

## Borders, depth and graphic details

- Hairlines use low-opacity ink or warm neutral, never generic gray.
- Shadows are wide and soft, tinted to the canvas; never black or glow-like.
- Use a hatch, offset rule or small signal shape at most once per section to
  add tension. This is the complete neobrutalist allowance.
- No gradient text, neon, heavy dark shadows, thick black outlines or
  decorative bento grids.

## Motion and accessibility

- Animate only `transform` and `opacity`, using a soft custom curve such as
  `cubic-bezier(0.32, 0.72, 0, 1)`.
- Respect `prefers-reduced-motion`.
- Preserve accessible contrast, focus states, semantic headings and keyboard
  access. Motion never carries information by itself.
