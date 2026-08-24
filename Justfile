default:
    @just --list

web:
    @if [ ! -x apps/web/node_modules/.bin/astro ]; then cd apps/web && bun i; fi
    cd apps/web && bun run dev

clean:
    rm -rf apps/web/node_modules apps/web/dist apps/web/.astro

docs:
    @just docs-install
    cd apps/docs && bun run dev

docs-install:
    cd apps/docs && bun i

docs-clean:
    cd apps/docs && rm -rf node_modules .next bun.lock && bun i
