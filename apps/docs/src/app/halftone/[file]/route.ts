import { notFound } from "next/navigation";
import { halftoneSvg } from "@/lib/halftone";

export const dynamic = "force-static";
export const revalidate = false;

// Page background corner, one file per theme (see `body` in global.css). Kept faint:
// the docs are for reading, so the dots stay out of the text column.
const themes = {
  "light.svg": { color: "#d84b2a", opacity: 0.13 },
  "dark.svg": { color: "#f06a48", opacity: 0.11 },
} as const;

export async function GET(_req: Request, { params }: RouteContext<"/halftone/[file]">) {
  const { file } = await params;
  const theme = themes[file as keyof typeof themes];
  if (!theme) notFound();

  return new Response(
    halftoneSvg({ width: 960, height: 640, spacing: 14, reach: 0.72, ...theme }),
    {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}

export function generateStaticParams() {
  return Object.keys(themes).map((file) => ({ file }));
}
