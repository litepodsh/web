import Image from "next/image";

// Logos from svgl.app, self-hosted in public/stack. Same set as the landing page
// (apps/web/src/data/landing.mjs → stackLogos); keep both in step.
const groups = {
  static: [
    ["HTML5", "html5"],
    ["CSS", "css"],
    ["JavaScript", "javascript"],
    ["Astro", "astro-icon-light", "astro-icon-dark"],
    ["Vite", "vite"],
    ["Angular", "angular"],
    ["React", "react_light", "react_dark"],
    ["Hugo", "hugo"],
  ],
  fullstack: [
    ["Next.js", "nextjs_icon_dark"],
    ["Nuxt", "nuxt"],
    ["SvelteKit", "svelte"],
    ["Remix", "remix_light", "remix_dark"],
    ["Node.js", "nodejs"],
    ["Bun", "bun"],
    ["Deno", "deno", "deno_dark"],
    ["NestJS", "nestjs"],
    ["Express", "expressjs", "expressjs_dark"],
  ],
  backend: [
    ["Python", "python"],
    ["Django", "django"],
    ["FastAPI", "fastapi"],
    ["Flask", "flask-light", "flask-dark"],
    ["Ruby", "ruby"],
    ["Laravel", "laravel"],
    ["PHP", "php", "php_dark"],
    ["Go", "golang", "golang_dark"],
    ["Rust", "rust", "rust_dark"],
    ["Java", "java"],
    ["Spring", "spring"],
    [".NET", "dotnet"],
    ["C#", "csharp"],
  ],
  container: [
    ["Docker", "docker"],
    ["Podman", "podman", "podman_dark"],
    ["Compose", "compose"],
  ],
} satisfies Record<string, (readonly [string, string, string?])[]>;

type StackProps = {
  /** Which family of logos to show. */
  group: keyof typeof groups;
  /** Label for a trailing "and more" chip; omit to show only the logos. */
  more?: string;
};

/** A row of framework and language logos, with dark variants where svgl ships one. */
export function Stack({ group, more }: StackProps) {
  return (
    <ul className="not-prose my-4 flex flex-wrap gap-2">
      {groups[group].map(([name, light, dark]) => (
        <li
          key={name}
          className="lp-raised inline-flex h-9 items-center gap-2 rounded-full border border-fd-border bg-fd-card pr-3.5 pl-2.5 text-sm font-medium"
        >
          <Image
            src={`/stack/${light}.svg`}
            alt=""
            width={18}
            height={18}
            unoptimized
            className={`size-[18px] object-contain ${dark ? "dark:hidden" : ""}`}
          />
          {dark && (
            <Image
              src={`/stack/${dark}.svg`}
              alt=""
              width={18}
              height={18}
              unoptimized
              className="hidden size-[18px] object-contain dark:block"
            />
          )}
          {name}
        </li>
      ))}
      {more && (
        <li className="inline-flex h-9 items-center gap-2 rounded-full bg-fd-muted pr-3.5 pl-3 text-sm text-fd-muted-foreground">
          <span className="font-mono tracking-[.2em]" aria-hidden="true">
            ···
          </span>
          {more}
        </li>
      )}
    </ul>
  );
}
