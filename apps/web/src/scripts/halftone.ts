// Halftone identity: the logo's dot pattern, rotated -24°, used as page material.
// - Background field: dots fade from the top-right corner, swell slowly, lift near the cursor.
// - Hero hardware: device cut-outs re-sampled into dots, rotating at random with a dissolve,
//   a scan sweep along the -24° axis and a pulsing power LED.
// - Spec plate for the node on screen, with a live uptime.
// - Live terminal: types `podman stats`, then breathes around the measured footprint.
// - Card corners: the logo pill in halftone.
// Everything draws once and stays still under prefers-reduced-motion.

export {};

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;
const ANG = (-24 * Math.PI) / 180;
const COS = Math.cos(ANG);
const SIN = Math.sin(ANG);
const TAU = Math.PI * 2;
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

let dpr = Math.min(window.devicePixelRatio || 1, 2);
interface Colors {
	accent: string;
	ink: string;
	field: number;
	art: number;
}
let colors: Colors = { accent: "", ink: "", field: 0, art: 0 };
const readColors = () => {
	const css = getComputedStyle(root);
	const dark = root.classList.contains("dark");
	colors = {
		accent: css.getPropertyValue("--lp-accent").trim(),
		ink: css.getPropertyValue("--lp-ink").trim(),
		field: dark ? 0.16 : 0.2,
		art: dark ? 0.75 : 0.9,
	};
};
readColors();

const redraws = new Set<() => void>();
new MutationObserver(() => {
	readColors();
	redraws.forEach((fn) => fn());
}).observe(root, { attributes: true, attributeFilter: ["class"] });

let mx = -1;
let my = -1;
addEventListener(
	"pointermove",
	(event) => {
		mx = event.clientX;
		my = event.clientY;
	},
	{ passive: true },
);

// One 30fps loop for every animated layer, paused while the tab is hidden.
const layers = new Set<(t: number) => void>();
if (!reduce) {
	let last = 0;
	const loop = (t: number) => {
		if (!document.hidden && t - last > 33) {
			layers.forEach((fn) => fn(t));
			last = t;
		}
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}

// Visit every point of a -24° grid with spacing `s` that falls inside w×h.
type Visit = (x: number, y: number, gx: number, gy: number, R: number) => void;
const rotatedGrid = (w: number, h: number, s: number, visit: Visit) => {
	const R = Math.hypot(w, h) / 2 + s;
	const cx = w / 2;
	const cy = h / 2;
	const n = Math.ceil(R / s);
	for (let i = -n; i <= n; i++)
		for (let j = -n; j <= n; j++) {
			const gx = i * s;
			const gy = j * s;
			const x = cx + gx * COS - gy * SIN;
			const y = cy + gx * SIN + gy * COS;
			if (x >= 0 && y >= 0 && x < w && y < h) visit(x, y, gx, gy, R);
		}
};

const sizeCanvas = (canvas: HTMLCanvasElement, w: number, h: number): CanvasRenderingContext2D => {
	const pw = Math.round(w * dpr);
	const ph = Math.round(h * dpr);
	if (canvas.width !== pw || canvas.height !== ph) {
		canvas.width = pw;
		canvas.height = ph;
	}
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	return ctx;
};

/* Background field */
const field = document.querySelector<HTMLCanvasElement>("[data-halftone-field]");
if (field) {
	let W = 0;
	let H = 0;
	let ctx = sizeCanvas(field, 1, 1);
	const S = 13;
	const size = () => {
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		W = innerWidth;
		H = innerHeight;
		ctx = sizeCanvas(field, W, H);
	};
	const draw = (t: number) => {
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = colors.accent;
		ctx.globalAlpha = colors.field;
		ctx.beginPath();
		const diag = Math.hypot(W, H);
		const R = diag / 2 + S;
		const n = Math.ceil(R / S);
		for (let i = -n; i <= n; i++)
			for (let j = -n; j <= n; j++) {
				const gx = i * S;
				const gy = j * S;
				const x = W / 2 + gx * COS - gy * SIN;
				const y = H / 2 + gx * SIN + gy * COS;
				if (x < -S || y < -S || x > W + S || y > H + S) continue;
				let v = Math.max(0, 1 - (Math.hypot(W - x, y) / diag) * 1.55);
				v *= 0.62 + 0.38 * Math.sin(x * 0.006 + t * 0.00035) * Math.cos(y * 0.007 - t * 0.00028);
				if (mx >= 0) {
					const md = Math.hypot(x - mx, y - my);
					if (md < 170) v += (1 - md / 170) * 0.55;
				}
				const r = Math.min(v, 1) * S * 0.42;
				if (r < 0.35) continue;
				ctx.moveTo(x + r, y);
				ctx.arc(x, y, r, 0, TAU);
			}
		ctx.fill();
		ctx.globalAlpha = 1;
	};
	size();
	addEventListener("resize", () => {
		size();
		draw(0);
	});
	draw(0);
	redraws.add(() => draw(performance.now()));
	layers.add(draw);
}

/* Hero hardware */
const hardware = document.querySelector<HTMLCanvasElement>("[data-hardware]");
const spec = document.querySelector<HTMLElement>("[data-spec]");
if (hardware) {
	// Spec plates: id, hardware line, uptime in seconds at page load.
	const devices: Record<string, [id: string, hw: string, uptime: number]> = {
		v1: ["NODE-01", "x86_64 · 8 vCPU · 16.7 GB", 41 * 86400 + 22328],
		v2: ["NODE-02", "x86_64 · 4 vCPU · 8 GB", 12 * 86400 + 4021],
		v3: ["NODE-03", "x86_64 · 12 vCPU · 32 GB · 2× NVMe", 97 * 86400 + 61510],
		v4: ["NODE-04", "arm64 · 8 vCPU · 16 GB · 10 GbE", 6 * 86400 + 30977],
		rack: ["RACK-A", "4 nodes · 48 vCPU · 128 GB", 203 * 86400 + 8113],
	};
	const pool = Object.keys(devices);
	const inks: Record<string, { w: number; h: number; led: [number, number] | null; ink: Uint8Array }> = {};
	let variant = pool[Math.floor(Math.random() * pool.length)];
	type Point = [number, number];
	interface Scene {
		w: number;
		h: number;
		// x, y, radius, position along the -24° axis (0–1), dissolve seed (0–1)
		dots: Float32Array;
		leds: Point[];
		rack: boolean;
	}
	let scene: Scene | null = null;
	let prev: Scene | null = null;
	let tStart = 0;
	let bag: string[] = [];
	const nextRandom = () => {
		if (!bag.length) bag = pool.filter((v) => v !== variant).sort(() => Math.random() - 0.5);
		return bag.pop() ?? pool[0];
	};
	// Inside a rounded rectangle?
	const inRound = (px: number, py: number, x: number, y: number, w: number, h: number, r: number) => {
		const dx = Math.max(Math.abs(px - (x + w / 2)) - (w / 2 - r), 0);
		const dy = Math.max(Math.abs(py - (y + h / 2)) - (h / 2 - r), 0);
		return Math.abs(px - (x + w / 2)) <= w / 2 && Math.abs(py - (y + h / 2)) <= h / 2 && dx * dx + dy * dy <= r * r;
	};
	// The drawn rack, computed from its geometry: four 1U units with drive bays (each
	// with a dark drive face) and vent slots, inked darker toward the top-left.
	const rackOf = (w: number, h: number) => {
		const units = 4;
		const uh = h * 0.17;
		const gap = h * 0.035;
		const top = h * 0.1;
		const left = w * 0.06;
		const uw = w * 0.88;
		const leds: Point[] = [];
		for (let u = 0; u < units; u++) {
			const ly = top + u * (uh + gap) + uh / 2;
			leds.push([left + uw * 0.92, ly], [left + uw * 0.92 + 9, ly]);
		}
		const ink = (x: number, y: number) => {
			for (let u = 0; u < units; u++) {
				const y0 = top + u * (uh + gap);
				if (!inRound(x, y, left, y0, uw, uh, uh * 0.18)) continue;
				for (let b = 0; b < 6; b++) {
					const bx = left + uw * 0.055 + b * uw * 0.085;
					if (x >= bx && x <= bx + uw * 0.06 && y >= y0 + uh * 0.3 && y <= y0 + uh * 0.4) return 1;
				}
				for (let b = 0; b < 6; b++) {
					if (inRound(x, y, left + uw * 0.05 + b * uw * 0.085, y0 + uh * 0.22, uw * 0.07, uh * 0.56, 3)) return 0;
				}
				for (let v = 0; v < 9; v++) {
					const vx = left + uw * 0.6 + v * uw * 0.026;
					if (x >= vx && x <= vx + uw * 0.01 && y >= y0 + uh * 0.25 && y <= y0 + uh * 0.75) return 0;
				}
				return 0.85 * (1 - 0.3 * clamp((x * w + y * h) / (w * w + h * h)));
			}
			return 0;
		};
		return { leds, ink };
	};

	const prepare = (animate: boolean) => {
		const w = hardware.clientWidth;
		const h = hardware.clientHeight;
		if (!w || !h) return;
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		sizeCanvas(hardware, w, h);
		let leds: Point[] = [];
		let inkAt: (x: number, y: number) => number;
		const photo = variant !== "rack";
		if (photo) {
			const map = inks[variant];
			if (!map) return;
			// Same placement as the device art: 94% wide at most, 60% tall, 7% from the top.
			const rw = Math.min(w * 0.94, h * 0.6 * (map.w / map.h));
			const rh = rw * (map.h / map.w);
			const x0 = (w - rw) / 2;
			const y0 = h * 0.07;
			if (map.led) leds = [[x0 + map.led[0] * rw, y0 + map.led[1] * rh]];
			inkAt = (x, y) => {
				const u = (x - x0) / rw;
				const v = (y - y0) / rh;
				if (u < 0 || v < 0 || u >= 1 || v >= 1) return 0;
				return map.ink[Math.floor(v * map.h) * map.w + Math.floor(u * map.w)] / 255;
			};
		} else {
			const rack = rackOf(w, h * 0.66);
			leds = rack.leds;
			inkAt = rack.ink;
		}
		const dots: number[] = [];
		const S = 5.2;
		rotatedGrid(w, h, S, (x, y, gx, _gy, R) => {
			const r = inkAt(x, y) * S * 0.52;
			if (r < 0.3) return;
			const rnd = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
			dots.push(x, y, r, gx / (2 * R) + 0.5, rnd);
		});
		const next: Scene = { w, h, dots: new Float32Array(dots), leds, rack: !photo };
		if (animate && scene && !reduce) {
			prev = scene;
			tStart = performance.now();
		}
		scene = next;
		if (reduce) frame(0);
	};

	const ctx = hardware.getContext("2d") as CanvasRenderingContext2D;
	const layer = (sc: Scene, t: number, band: number, k: number, entering: boolean) => {
		const d = sc.dots;
		const hot: number[] = [];
		// Staggered dissolve: the old device clears over the first 60% of the transition,
		// the new one builds from 30% on, so the two never sit fully on top of each other.
		const phase = entering ? clamp((k - 0.3) / 0.7) : clamp(k / 0.6);
		ctx.fillStyle = colors.ink;
		ctx.globalAlpha = colors.art;
		ctx.beginPath();
		for (let i = 0; i < d.length; i += 5) {
			// Each dot flips at its own moment, sweeping left to right.
			const flip = clamp(phase * 2.2 - (d[i + 4] * 0.7 + d[i + 3] * 0.5));
			const q = entering ? flip : 1 - flip;
			let r = d[i + 2] * q;
			if (r < 0.2) continue;
			const x = d[i];
			const y = d[i + 1];
			const dist = Math.abs(d[i + 3] - band);
			// Scan sweep: a thin line of slightly larger dots, only its core turns oxide.
			if (dist < 0.035) {
				const s = 1 - dist / 0.035;
				r *= 1 + 0.22 * s;
				if (s > 0.7 && d[i + 4] > 0.35) {
					hot.push(x, y, r);
					continue;
				}
			}
			ctx.moveTo(x + r, y);
			ctx.arc(x, y, r, 0, TAU);
		}
		ctx.fill();
		ctx.fillStyle = colors.accent;
		ctx.globalAlpha = 0.7;
		ctx.beginPath();
		for (let i = 0; i < hot.length; i += 3) {
			ctx.moveTo(hot[i] + hot[i + 2], hot[i + 1]);
			ctx.arc(hot[i], hot[i + 1], hot[i + 2], 0, TAU);
		}
		ctx.fill();
		const p = reduce ? 0.6 : 0.5 + 0.5 * Math.sin(t / 420);
		sc.leds.forEach(([x, y], i) => {
			const q = (sc.rack && Math.sin(t / 300 + i * 1.7) <= -0.3 ? 0.15 : 1) * (entering ? phase : 1 - phase);
			const g = ctx.createRadialGradient(x, y, 0, x, y, 16 + 8 * p);
			g.addColorStop(0, colors.accent);
			g.addColorStop(1, "transparent");
			ctx.globalAlpha = (0.25 + 0.3 * p) * q;
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(x, y, 24, 0, TAU);
			ctx.fill();
			ctx.globalAlpha = q;
			ctx.fillStyle = colors.accent;
			ctx.beginPath();
			ctx.arc(x, y, 2.6, 0, TAU);
			ctx.fill();
		});
		ctx.globalAlpha = 1;
	};
	const frame = (t: number) => {
		if (!scene) return;
		ctx.clearRect(0, 0, scene.w, scene.h);
		const band = reduce ? -1 : ((t % 5200) / 5200) * 1.6 - 0.3;
		const k = prev ? clamp((performance.now() - tStart) / 1100) : 1;
		if (prev && k < 1) layer(prev, t, band, k, false);
		else prev = null;
		layer(scene, t, band, k, true);
		if (!reduce) {
			const fy = Math.sin(t / 1700) * 5;
			const px = mx >= 0 ? (mx / innerWidth - 0.5) * -12 : 0;
			const py = my >= 0 ? (my / innerHeight - 0.5) * -8 : 0;
			hardware.style.transform = `translate3d(${px.toFixed(1)}px, ${(fy + py).toFixed(1)}px, 0)`;
		}
	};

	/* Spec plate */
	const specId = spec?.querySelector("[data-spec-id]");
	const specHw = spec?.querySelector("[data-spec-hw]");
	const specUp = spec?.querySelector("[data-spec-up]");
	let upBase = 0;
	let upAt = 0;
	const two = (n: number) => String(Math.floor(n)).padStart(2, "0");
	const uptime = (s: number) =>
		`running · up ${Math.floor(s / 86400)}d ${two((s % 86400) / 3600)}:${two((s % 3600) / 60)}:${two(s % 60)}`;
	const setSpec = (animate: boolean) => {
		if (!spec || !specId || !specHw || !specUp) return;
		const [id, hw, up] = devices[variant];
		const apply = () => {
			specId.textContent = id;
			specHw.textContent = hw;
			upBase = up;
			upAt = Date.now();
			specUp.textContent = uptime(up);
			spec.classList.remove("is-swapping");
		};
		if (animate && !reduce) {
			spec.classList.add("is-swapping");
			setTimeout(apply, 380);
		} else apply();
	};

	const show = (v: string) => {
		variant = v;
		prepare(true);
		setSpec(true);
	};
	// Ink maps precomputed by scripts/hardware-ink.ts. Reading the device images back
	// from a canvas breaks in Firefox and Safari: their fingerprinting protection adds
	// noise to canvas readback, so the transparent background turned into a solid square.
	for (const key of pool.filter((v) => v !== "rack")) {
		fetch(`/hardware/${key}.ink.json`)
			.then((res) => res.json() as Promise<{ w: number; h: number; led: Point | null; ink: string }>)
			.then(({ w, h, led, ink }) => {
				inks[key] = { w, h, led, ink: Uint8Array.from(atob(ink), (c) => c.charCodeAt(0)) };
				if (key === variant && !scene) prepare(false);
			})
			.catch(() => {});
	}
	setSpec(false);
	new ResizeObserver(() => prepare(false)).observe(hardware);
	redraws.add(() => reduce && frame(0));
	layers.add(frame);
	if (!reduce) {
		setInterval(() => {
			if (!document.hidden) show(nextRandom());
		}, 7000);
		setInterval(() => {
			if (upAt && specUp) specUp.textContent = uptime(upBase + (Date.now() - upAt) / 1000);
		}, 1000);
	}
}

/* Live terminal */
const out = document.querySelector<HTMLElement>("[data-term-out]");
if (out && !reduce) {
	const cmd = "podman stats --no-stream";
	// Measured on a fresh install; the live view only breathes around these values.
	type Row = [name: string, cpu: number, mem: number];
	const rows: Row[] = [
		["caddy", 2.24, 24.7],
		["dragonfly", 3.94, 21.82],
		["api", 1.77, 16.21],
	];
	const history: number[][] = rows.map(() => []);
	const cells = [...document.querySelectorAll<HTMLElement>("[data-term-cell]")];
	const pad = (s: string, n: number) => `${s}${" ".repeat(n)}`.slice(0, n);
	const probe = document.createElement("span");
	probe.textContent = "0".repeat(20);
	probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
	const columns = () => {
		out.appendChild(probe);
		const cw = probe.getBoundingClientRect().width / 20;
		probe.remove();
		return Math.floor(out.clientWidth / (cw || 7));
	};
	const prompt = `<span class="text-[#f06a48]">root@litepod:~#</span> `;
	const head = (text: string) => `<span class="text-[#b7c0b8]/70">${text}</span>`;
	const caret = `<span class="lp-caret"></span>`;
	const table = (cur: Row[]) => {
		const c = columns();
		let header: string;
		let row: (r: Row) => string;
		if (c >= 62) {
			header = "NAME                CPU %     MEM USAGE / LIMIT    BLOCK IO";
			row = ([n, cpu, mem]) =>
				`${pad(`litepod-${n}`, 20)}${pad(`${cpu.toFixed(2)}%`, 10)}${pad(`${mem.toFixed(2)}MB / 16.7GB`, 21)}0B / 0B`;
		} else if (c >= 44) {
			header = "NAME                CPU %     MEM USAGE";
			row = ([n, cpu, mem]) => `${pad(`litepod-${n}`, 20)}${pad(`${cpu.toFixed(2)}%`, 10)}${mem.toFixed(2)}MB`;
		} else {
			header = "NAME        CPU%    MEM";
			row = ([n, cpu, mem]) => `${pad(n, 12)}${pad(`${cpu.toFixed(1)}%`, 8)}${mem.toFixed(1)}MB`;
		}
		return `${prompt}${c >= 40 ? cmd : "podman stats"}\n${head(header)}\n${cur.map(row).join("\n")}\n${prompt}${caret}`;
	};
	const tick = () => {
		const cur = rows.map(([n, cpu, mem], i): Row => {
			const c = Math.max(0.4, cpu + (Math.random() - 0.5) * 1.6);
			history[i].push(c);
			if (history[i].length > 28) history[i].shift();
			return [n, c, mem + (Math.random() - 0.5) * 0.6];
		});
		out.innerHTML = table(cur);
		cells.forEach((cell, i) => {
			const memNode = cell.querySelector("[data-term-mem]");
			const cpuNode = cell.querySelector("[data-term-cpu]");
			if (memNode) memNode.textContent = `${cur[i][2].toFixed(2)}MB`;
			if (cpuNode) cpuNode.textContent = `cpu ${cur[i][1].toFixed(2)}%`;
			const spark = cell.querySelector("canvas");
			if (!spark) return;
			const w = spark.clientWidth;
			const h = spark.clientHeight;
			if (!w) return;
			const c = sizeCanvas(spark, w, h);
			c.clearRect(0, 0, w, h);
			c.fillStyle = "#f06a48";
			const step = w / 28;
			history[i].forEach((v, k) => {
				c.globalAlpha = 0.35 + 0.65 * (k / history[i].length);
				c.beginPath();
				c.arc(k * step + step / 2, h / 2, Math.min(1, v / 6) * 2.4 + 0.4, 0, TAU);
				c.fill();
			});
		});
	};
	// Start typing once the terminal is on screen.
	const start = () => {
		const typed = columns() >= 40 ? cmd : "podman stats";
		let k = 0;
		const type = () => {
			out.innerHTML = `${prompt}${typed.slice(0, k)}${caret}`;
			if (k++ < typed.length) setTimeout(type, 38 + Math.random() * 50);
			else
				setTimeout(() => {
					tick();
					setInterval(() => !document.hidden && tick(), 1300);
				}, 350);
		};
		type();
	};
	const seen = new IntersectionObserver((entries) => {
		if (!entries.some((e) => e.isIntersecting)) return;
		seen.disconnect();
		start();
	});
	seen.observe(out);
}

/* Card corners: the logo pill in halftone */
const pills = [...document.querySelectorAll<HTMLCanvasElement>("[data-halfpill]")];
if (pills.length) {
	const draw = () =>
		pills.forEach((canvas) => {
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			if (!w) return;
			const c = sizeCanvas(canvas, w, h);
			c.clearRect(0, 0, w, h);
			c.fillStyle = colors.accent;
			c.globalAlpha = 0.55;
			const s = 7;
			const pw = w * 0.9;
			const rr = (h * 0.55) / 2;
			c.beginPath();
			for (let gx = -w; gx < w; gx += s)
				for (let gy = -h; gy < h; gy += s) {
					if (Math.hypot(Math.max(Math.abs(gx) - (pw / 2 - rr), 0), gy) >= rr) continue;
					const x = w / 2 + gx * COS - gy * SIN;
					const y = h / 2 + gx * SIN + gy * COS;
					const r = s * 0.38 * Math.max(0.15, 1 - (gx + pw / 2) / pw);
					c.moveTo(x + r, y);
					c.arc(x, y, r, 0, TAU);
				}
			c.fill();
		});
	draw();
	const card = pills[0].parentElement;
	if (card) new ResizeObserver(draw).observe(card);
	redraws.add(draw);
}
