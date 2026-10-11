// The logo's halftone as an SVG: dots on a grid rotated -24°, growing toward the
// top-right corner. Shared by the page background route and the OG images, so the
// docs carry the same material as the landing page (apps/web/src/scripts/halftone.ts).

type HalftoneOptions = {
  width: number;
  height: number;
  /** Grid pitch in px. */
  spacing: number;
  color: string;
  opacity: number;
  /** Share of the diagonal the dots reach before fading out (0–1). */
  reach: number;
};

const ANGLE = (-24 * Math.PI) / 180;
const COS = Math.cos(ANGLE);
const SIN = Math.sin(ANGLE);

export function halftoneSvg({ width, height, spacing, color, opacity, reach }: HalftoneOptions) {
  const diagonal = Math.hypot(width, height);
  const radius = diagonal / 2 + spacing;
  const steps = Math.ceil(radius / spacing);
  const circles: string[] = [];

  for (let i = -steps; i <= steps; i++) {
    for (let j = -steps; j <= steps; j++) {
      const gx = i * spacing;
      const gy = j * spacing;
      const x = width / 2 + gx * COS - gy * SIN;
      const y = height / 2 + gx * SIN + gy * COS;
      if (x < -spacing || y < -spacing || x > width + spacing || y > height + spacing) continue;

      const v = Math.max(0, 1 - Math.hypot(width - x, y) / (diagonal * reach)) ** 1.25;
      const r = v * spacing * 0.42;
      if (r < 0.4) continue;
      circles.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><g fill="${color}" fill-opacity="${opacity}">${circles.join("")}</g></svg>`;
}
