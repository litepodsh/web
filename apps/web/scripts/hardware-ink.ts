// Precomputes the halftone ink for each hero device (public/hardware/v*.webp) into
// public/hardware/v*.ink.json, so the browser never reads canvas pixels back.
// Firefox and Safari add noise to canvas readback (fingerprinting protection), which
// turned the transparent background opaque and drew the device as a solid square.
//
// Run after changing a device image (needs ImageMagick):
//   node scripts/hardware-ink.ts
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const DIR = new URL("../public/hardware/", import.meta.url);
const DEVICES = ["v1", "v2", "v3", "v4"];
// 220 samples across is finer than the 5.2 px dot grid at any hero size.
const WIDTH = 220;

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

for (const name of DEVICES) {
	const file = new URL(`${name}.webp`, DIR).pathname;
	const [iw, ih] = execFileSync("magick", ["identify", "-format", "%w %h", file], { encoding: "utf8" })
		.split(" ")
		.map(Number);
	const w = WIDTH;
	const h = Math.round((WIDTH * ih) / iw);
	const px = execFileSync("magick", [file, "-resize", `${w}x${h}!`, "-depth", "8", "rgba:-"], {
		maxBuffer: 1 << 26,
	});

	// Luminance range over opaque pixels, between the 4th and 96th percentiles: the
	// chassis is nearly black, so min/max would flatten it into one blob of dots.
	const lum: number[] = [];
	let sx = 0;
	let sy = 0;
	let leds = 0;
	for (let i = 0; i < w * h; i++) {
		const [r, g, b, a] = [px[i * 4], px[i * 4 + 1], px[i * 4 + 2], px[i * 4 + 3]];
		if (a > 200) lum.push((r * 0.3 + g * 0.59 + b * 0.11) / 255);
		// Power LED: warm, saturated pixels.
		if (a > 200 && r > 170 && r - b > 100 && g > 50 && g < 190) {
			sx += i % w;
			sy += Math.floor(i / w);
			leds++;
		}
	}
	lum.sort((x, y) => x - y);
	const lo = lum[Math.floor(lum.length * 0.04)] ?? 0;
	const hi = lum[Math.floor(lum.length * 0.96)] ?? 1;
	const range = Math.max(0.05, hi - lo);

	// 16 ink levels, two samples per byte (high nibble first): dot radii only need that.
	const ink = new Uint8Array(Math.ceil((w * h) / 2));
	for (let i = 0; i < w * h; i++) {
		const a = px[i * 4 + 3] / 255;
		if (a < 0.1) continue;
		const l = (px[i * 4] * 0.3 + px[i * 4 + 1] * 0.59 + px[i * 4 + 2] * 0.11) / 255;
		const level = Math.round(15 * a * (1 - 0.88 * clamp((l - lo) / range) ** 0.6));
		ink[i >> 1] |= i & 1 ? level : level << 4;
	}

	const out = {
		w,
		h,
		led: leds ? [+((sx / leds + 0.5) / w).toFixed(4), +((sy / leds + 0.5) / h).toFixed(4)] : null,
		ink: Buffer.from(ink).toString("base64"),
	};
	writeFileSync(new URL(`${name}.ink.json`, DIR), JSON.stringify(out));
	console.log(`${name}: ${w}x${h}, led ${out.led ? out.led.join(",") : "none"}`);
}
