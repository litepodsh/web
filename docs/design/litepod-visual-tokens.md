# Litepod visual tokens

Reusable visual language for Litepod web properties. The active palette is
**Carbon**: true neutrals with the Signal Oxide orange as the one accent; see `litepod-design-system.md` for component rules.

## Color

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `lp-bg` | `#FAFAFA` | `#000000` | Page background |
| `lp-surface` | `#FFFFFF` | `#111111` | Raised inner surface |
| `lp-deep` | `#F0F0F0` | `#0A0A0A` | Outer bezel / media well |
| `lp-ink` | `#0F0F0F` | `#FFFFFF` | Primary text and terminal |
| `lp-muted` | `#5E5E5E` | `#B0B0B0` | Supporting copy |
| `lp-accent` | `#D4410B` | `#FF6A1F` | Main CTA and compact status |
| `lp-accent-ink` | `#FFFFFF` | `#140700` | Text on accent |

Use `#B83A00` for compact oxide labels on a light background. Accent text is
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
- Gradients are allowed only when subtle, never as a visible effect.
- Do not use neon glows, thick black borders or generic card grids.

## Mark and favicon

Keep the Litepod geometry unchanged. The outer form is Signal Oxide `#D4410B`
and the inner form is Surface `#FFFFFF` in both `src/assets/litepod.svg` and
`public/favicon.svg`.
