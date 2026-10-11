import Image from "next/image";

const shots = {
  home: [1800, 1125],
  overview: [1800, 1125],
  deployments: [1800, 1125],
  analytics: [1800, 1125],
  metrics: [1800, 1125],
  terminal: [1800, 1125],
  volumes: [1800, 1125],
  fleet: [1800, 1125],
  templates: [1800, 346],
} as const;

type ScreenshotProps = {
  /** Which console screen to show; light and dark versions swap with the theme. */
  name: keyof typeof shots;
  alt: string;
  caption?: string;
};

/**
 * A console screenshot in the product's double-bezel frame: a recessed tray
 * holding a raised plate, the same Surface the console and landing page use.
 */
export function Screenshot({ name, alt, caption }: ScreenshotProps) {
  const [width, height] = shots[name];
  const image = "block h-auto w-full rounded-[calc(1.5rem-0.5rem)]";

  return (
    <figure className="not-prose my-8">
      <div className="lp-float rounded-[1.5rem] border border-fd-border bg-[var(--lp-deep)] p-2">
        <div className="lp-raised overflow-hidden rounded-[calc(1.5rem-0.5rem)] border border-fd-border">
          <Image
            src={`/screenshots/${name}-light.webp`}
            alt={alt}
            width={width}
            height={height}
            className={`${image} dark:hidden`}
          />
          <Image
            src={`/screenshots/${name}-dark.webp`}
            alt={alt}
            width={width}
            height={height}
            className={`${image} hidden dark:block`}
          />
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-xs text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
