"use client";

import { AssetRecordType, createShapeId, Tldraw, toRichText, type Editor } from "tldraw";

type ArchitectureDiagramProps = {
  locale?: "en" | "es";
};

const colors = {
  blue: "blue" as const,
  violet: "violet" as const,
  green: "green" as const,
  orange: "orange" as const,
};

const iconSources = {
  litepod: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect x="10" y="10" width="100" height="100" rx="26" fill="#5B5FEF"/><rect x="34" y="42" width="52" height="36" rx="18" fill="#FFFFFF" transform="rotate(-24 60 60)"/></svg>`,
  react: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="none" stroke="#61DAFB" stroke-width="3"><ellipse cx="32" cy="32" rx="28" ry="11"/><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(120 32 32)"/></g><circle cx="32" cy="32" r="4" fill="#61DAFB"/></svg>`,
  database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><ellipse cx="32" cy="14" rx="22" ry="8" fill="#8B5CF6"/><path d="M10 14v36c0 4.4 9.8 8 22 8s22-3.6 22-8V14" fill="#8B5CF6"/><path d="M10 14c0 4.4 9.8 8 22 8s22-3.6 22-8M10 32c0 4.4 9.8 8 22 8s22-3.6 22-8" fill="none" stroke="#fff" stroke-width="3"/></svg>`,
};

function dataUrl(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function createArchitectureDiagram(editor: Editor, locale: "en" | "es") {
  const copy =
    locale === "es"
      ? {
          user: "User",
          vps: "Tu VPS alquilado",
          litepod: "Litepod\nControl plane",
          caddy: "Caddy\nReverse proxy",
          letsEncrypt: "Let's Encrypt\nSSL",
          application: "Application",
          database: "Base de datos",
        }
      : {
          user: "User",
          vps: "Your rented VPS",
          litepod: "Litepod\nControl plane",
          caddy: "Caddy\nReverse proxy",
          letsEncrypt: "Let's Encrypt\nSSL",
          application: "Application",
          database: "Database",
        };

  const userId = createShapeId("architecture-user");
  const vpsId = createShapeId("architecture-vps");
  const litepodAssetId = AssetRecordType.createId("litepod-icon");
  const reactAssetId = AssetRecordType.createId("react-icon");
  const databaseAssetId = AssetRecordType.createId("database-icon");

  editor.createAssets([
    {
      id: litepodAssetId,
      type: "image",
      typeName: "asset",
      props: {
        w: 64,
        h: 64,
        name: "litepod-icon.svg",
        isAnimated: false,
        mimeType: "image/svg+xml",
        src: dataUrl(iconSources.litepod),
      },
      meta: {},
    },
    {
      id: reactAssetId,
      type: "image",
      typeName: "asset",
      props: {
        w: 64,
        h: 64,
        name: "react-icon.svg",
        isAnimated: false,
        mimeType: "image/svg+xml",
        src: dataUrl(iconSources.react),
      },
      meta: {},
    },
    {
      id: databaseAssetId,
      type: "image",
      typeName: "asset",
      props: {
        w: 64,
        h: 64,
        name: "database-icon.svg",
        isAnimated: false,
        mimeType: "image/svg+xml",
        src: dataUrl(iconSources.database),
      },
      meta: {},
    },
  ]);

  const node = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    color: keyof typeof colors,
  ) => ({
    id: createShapeId(id),
    type: "geo" as const,
    x,
    y,
    props: {
      geo: "rectangle" as const,
      w,
      h,
      color: colors[color],
      fill: "solid" as const,
      size: "m" as const,
      richText: toRichText(""),
    },
  });

  const image = (
    id: string,
    assetId: typeof litepodAssetId,
    x: number,
    y: number,
    size: number,
  ) => ({
    id: createShapeId(id),
    type: "image" as const,
    x,
    y,
    props: {
      assetId,
      w: size,
      h: size,
      crop: null,
      flipX: false,
      flipY: false,
      altText: id,
    },
  });

  const label = (id: string, text: string, x: number, y: number) => ({
    id: createShapeId(id),
    type: "text" as const,
    x,
    y,
    props: {
      color: "black" as const,
      size: "m" as const,
      font: "draw" as const,
      textAlign: "middle" as const,
      autoSize: true,
      scale: 1,
      richText: toRichText(text),
    },
  });

  const arrow = (
    id: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: keyof typeof colors,
  ) => ({
    id: createShapeId(id),
    type: "arrow" as const,
    x: startX,
    y: startY,
    props: {
      start: { x: 0, y: 0 },
      end: { x: endX - startX, y: endY - startY },
      arrowheadEnd: "triangle" as const,
      color: colors[color],
      dash: "solid" as const,
      size: "l" as const,
      bend: 0,
      richText: toRichText(""),
    },
  });

  editor.createShapes([
    {
      id: userId,
      type: "geo",
      x: 40,
      y: 190,
      props: {
        geo: "rectangle",
        w: 190,
        h: 80,
        color: colors.blue,
        fill: "solid",
        size: "m",
        align: "middle",
        verticalAlign: "middle",
        richText: toRichText(copy.user),
      },
    },
    {
      id: vpsId,
      type: "geo",
      x: 330,
      y: 60,
      props: {
        geo: "rectangle",
        w: 700,
        h: 400,
        color: colors.orange,
        fill: "none",
        dash: "dashed",
        size: "s",
        align: "start",
        verticalAlign: "start",
        richText: toRichText(copy.vps),
      },
    },
    node("architecture-litepod", 525, 105, 260, 115, "violet"),
    node("architecture-caddy", 395, 280, 180, 100, "orange"),
    node("architecture-application", 600, 280, 180, 105, "green"),
    node("architecture-database", 820, 280, 180, 105, "green"),
    node("architecture-lets-encrypt", 1060, 105, 180, 90, "blue"),
    image("architecture-litepod-image", litepodAssetId, 631, 125, 48),
    label("architecture-litepod-label", copy.litepod, 585, 178),
    label("architecture-caddy-label", copy.caddy, 430, 325),
    image("architecture-react-image", reactAssetId, 666, 290, 48),
    label("architecture-application-label", copy.application, 640, 350),
    image("architecture-database-image", databaseAssetId, 886, 290, 48),
    label("architecture-database-label", copy.database, 860, 350),
    label("architecture-lets-encrypt-label", copy.letsEncrypt, 1085, 133),
    arrow("architecture-user-to-litepod", 230, 230, 525, 162, "blue"),
    arrow("architecture-litepod-to-caddy", 655, 220, 485, 280, "violet"),
    arrow("architecture-litepod-to-application", 655, 220, 690, 280, "violet"),
    arrow("architecture-litepod-to-database", 655, 220, 910, 280, "violet"),
    arrow("architecture-caddy-to-application", 575, 330, 600, 332, "orange"),
    arrow("architecture-ssl-to-application", 1060, 150, 780, 280, "blue"),
  ]);

  editor.bringToFront(
    [
      "architecture-litepod-image",
      "architecture-litepod-label",
      "architecture-caddy-label",
      "architecture-react-image",
      "architecture-application-label",
      "architecture-database-image",
      "architecture-database-label",
      "architecture-lets-encrypt-label",
    ].map((id) => createShapeId(id)),
  );
}

export function ArchitectureDiagram({ locale = "en" }: ArchitectureDiagramProps) {
  return (
    <div className="my-8 h-[clamp(360px,55vw,520px)] w-full overflow-hidden rounded-xl border border-fd-border">
      <Tldraw
        hideUi
        persistenceKey={`litepod-architecture-v4-${locale}`}
        onMount={(editor) => {
          if (editor.getCurrentPageShapeIds().size === 0) {
            createArchitectureDiagram(editor, locale);
          }
          editor.zoomToFit({ animation: { duration: 0 } });
        }}
      />
    </div>
  );
}
