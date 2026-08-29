# Litepod visual tokens

Reusable visual language for Litepod web properties. The active palette is
**Signal Oxide**; see `litepod-design-system.md` for component rules.

## Color

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `lp-bg` | `#F4F0E9` | `#101512` | Page background |
| `lp-surface` | `#FFFDF8` | `#17201A` | Raised inner surface |
| `lp-deep` | `#EBE7DF` | `#0C110E` | Outer bezel / media well |
| `lp-ink` | `#1A2520` | `#F2F0E9` | Primary text and terminal |
| `lp-muted` | `#53635B` | `#B7C0B8` | Supporting copy |
| `lp-accent` | `#D84B2A` | `#F06A48` | Main CTA and compact status |
| `lp-accent-ink` | `#FFFAF3` | `#20100B` | Text on accent |

Use `#A9381E` for compact oxide labels on a light background. Accent text is
not used for long light-mode copy.

## Shape and elevation

- Navigation island and buttons: `rounded-full`.
- Outer product/media bezel: `rounded-[1.8125rem] p-2.5` using `lp-deep`.
- Inner core: `rounded-[1.25rem] p-7` using `lp-surface`.
- Compact command/control: `rounded-[.875rem]`.
- Use the outer and inner shells together only for product, media and decision
  surfaces. Normal content groups use whitespace or a low-contrast separator.

```txt
outer: border border-lp-ink/12 bg-lp-deep p-2.5
inner: w-full rounded-[1.25rem] bg-lp-surface p-7
```

## Motion

- Ambient background uses two fixed blurred orbs behind content.
- Animate only transform and opacity: 14s and 17s alternating cycles.
- Respect `prefers-reduced-motion`.
- Theme toggle uses a 600ms circular View Transition from the toggle button.

## Accent usage

- Give each view one dominant accent action.
- Use an offset hatch or signal shape at most once per section.
- Do not use gradients, neon glows, thick black borders or generic card grids.

## Mark and favicon

Keep the Litepod geometry unchanged. The outer form is Signal Oxide `#D84B2A`
and the inner form is Surface `#FFFDF8` in both `src/assets/litepod.svg` and
`public/favicon.svg`.
