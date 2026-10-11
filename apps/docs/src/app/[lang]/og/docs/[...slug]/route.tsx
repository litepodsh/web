import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPageImageUrl, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { halftoneSvg } from "@/lib/halftone";

export const revalidate = false;

const asset = (name: string) => readFile(join(process.cwd(), "src/og", name));

// Same palette as the console and landing page (dark theme).
const c = {
  bg: "#101512",
  surface: "#17201a",
  deep: "#0c110e",
  ink: "#f2f0e9",
  muted: "#b7c0b8",
  accent: "#f06a48",
};

const mark = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect x="10" y="10" width="100" height="100" rx="26" fill="${c.accent}"/><rect x="34" y="42" width="52" height="36" rx="18" fill="${c.bg}" transform="rotate(-24 60 60)"/></svg>`,
).toString("base64")}`;

// The logo's halftone, growing toward the top-right corner, behind the console peek.
const halftone = `data:image/svg+xml;base64,${Buffer.from(
  halftoneSvg({ width: 1200, height: 630, spacing: 18, color: c.accent, opacity: 0.55, reach: 0.85 }),
).toString("base64")}`;

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/og/docs/[...slug]">) {
  const { slug, lang } = await params;
  const page = source.getPage(slug.slice(0, -1), lang);
  if (!page) notFound();

  const [sans, mono, peek] = await Promise.all([
    asset("Geist-Medium.ttf"),
    asset("GeistMono-Regular.ttf"),
    asset("peek-dark.jpg"),
  ]);
  const title = page.data.title ?? "Litepod Docs";
  const description = page.data.description ?? "";
  const section = page.slugs.length ? page.slugs.join(" / ") : lang === "es" ? "inicio" : "introduction";
  const titleSize = title.length > 34 ? 60 : title.length > 22 ? 72 : 84;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: c.bg,
        color: c.ink,
        fontFamily: "Geist",
        overflow: "hidden",
      }}
    >
      <img
        src={halftone}
        width={1200}
        height={630}
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      <div
        style={{
          position: "absolute",
          left: 660,
          top: 120,
          width: 760,
          display: "flex",
          padding: 12,
          borderRadius: 34,
          background: c.deep,
          border: `1px solid ${c.ink}1a`,
          transform: "rotate(-3deg)",
          boxShadow: "0 40px 80px -30px rgba(0,0,0,.6)",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${peek.toString("base64")}`}
          width={736}
          height={460}
          style={{ borderRadius: 24, opacity: 0.92 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${c.bg} 0%, ${c.bg} 50%, ${c.bg}00 78%)`,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          width: 720,
          height: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={mark} width={44} height={44} />
          <span style={{ fontSize: 30, letterSpacing: "-0.04em" }}>litepod</span>
          <span
            style={{
              marginLeft: 6,
              fontFamily: "Geist Mono",
              fontSize: 16,
              color: c.muted,
              padding: "6px 12px",
              borderRadius: 999,
              background: c.surface,
              border: `1px solid ${c.ink}1f`,
            }}
          >
            docs
          </span>
        </div>
        <div
          style={{
            marginTop: 72,
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 18,
            color: c.accent,
          }}
        >
          {section}
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            fontSize: titleSize,
            lineHeight: 0.98,
            letterSpacing: "-0.06em",
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              marginTop: 26,
              display: "flex",
              fontSize: 25,
              lineHeight: 1.4,
              color: c.muted,
              maxWidth: 580,
            }}
          >
            {description.length > 110 ? `${description.slice(0, 107).trimEnd()}…` : description}
          </div>
        ) : null}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "Geist Mono",
            fontSize: 17,
            color: c.muted,
          }}
        >
          <span style={{ color: c.ink }}>litepod.sh/docs</span>
          <span style={{ width: 5, height: 5, borderRadius: 9, background: `${c.ink}4d` }} />
          <span>Self-host or Cloud</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
