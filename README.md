# web

Monorepo for the Litepod web presence: the marketing site ([litepod.sh](https://litepod.sh)) and the documentation site ([docs.litepod.sh](https://docs.litepod.sh)).

Both apps are deployed separately; they only share this repository for tooling and versioning.

- **Landing** → [github.com/litepod/litepod](https://github.com/litepod/litepod)
- **Docs** → [github.com/litepod/litepod](https://github.com/litepod/litepod)

## Stack

| App     | Path         | Framework                                | Output                                     |
| ------- | ------------ | ---------------------------------------- | ------------------------------------------ |
| `web`   | `apps/web`   | Astro 7 + Tailwind 4 (`@astrojs/node`)  | SSR standalone server                      |
| `docs`  | `apps/docs`  | Next.js 16 + Fumadocs (MDX) + Tailwind 4 | Standalone Next build (Dockerfile)          |

Package manager: **bun**. Task runner: **just**. Lint/format: **oxlint**, **oxfmt**, **biome** (landing only).

## Requirements

- [bun](https://bun.sh) (>= 1.x)
- [just](https://github.com/casey/just) (optional — raw `bun run` works too)

## Getting started

Install both apps:

```bash
(cd apps/web && bun i)
(cd apps/docs && bun i)
```

Run the landing site (http://localhost:4321):

```bash
just web
```

Run the docs site (http://localhost:3000):

```bash
just docs
```

## Common tasks

```bash
just --list          # show every recipe
just web             # dev server for apps/web (installs deps on first run)
just docs            # dev server for apps/docs
just clean           # remove apps/web node_modules, dist and .astro cache
just docs-clean      # wipe apps/docs node_modules/.next/lockfile and reinstall
```

Inside `apps/web`:

```bash
bun run dev            # astro dev
bun run build          # astro build (standalone server)
bun run preview        # serve the production build
bun run test:landing   # smoke test for the landing page
bun run lint           # oxlint
bun run format         # oxfmt + biome
```

Inside `apps/docs`:

```bash
bun run dev            # next dev
bun run build          # next build
bun run types:check    # next typegen + tsc --noEmit
bun run lint           # oxlint
```

## Version bumps

`apps/web` also hosts the install scripts that `curl …/install.sh | sh` resolves against, so releases here are driven by `apps/web/public/version.json` and the `just bump` recipes.

```bash
just bump litepod v0.1.67      # stable channel: version.json + install + install.sh
just bump dfly    v1.41.0
just bump caddy   2.11.5

just bump-alpha litepod v0.1.12-alpha.1   # alpha channel: version.json only
```

Accepted component aliases: `litepod|litepd`, `dfly|dragonfly`, `caddy`. Litepod versions are normalized to a single leading `v`; stable bumps also refresh `released_at` and the installer `FALLBACK_*_IMAGE_TAG` constants.

## Layout

```
apps/web        Astro landing site (SSR) + install scripts + version.json
apps/docs       Fumadocs documentation site, MDX content in apps/docs/content/docs
docs/           Internal design & architecture notes
Justfile        All dev/release recipes
AGENTS.md       Agent + contributor instructions
```

Docs content is bilingual: every page has an `.mdx` and an `.es.mdx` variant, registered in `content/docs/meta.json` / `meta.es.json`.

## Deployment

- `apps/docs` ships a multi-stage `Dockerfile` (bun → Next standalone, port 3000).
- `apps/web` builds with `@astrojs/node` in `standalone` mode; serve the generated `dist/server/entry.mjs`.

## License

[MIT](./LICENSE)