default:
    @just --list

docs:
    @just docs-install
    cd docs && bun run dev

docs-install:
    cd docs && bun i

docs-clean:
    cd docs && rm -rf node_modules .next bun.lock && bun i