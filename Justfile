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

# ─────────────────────────────────────────────────────────────────────────────
# Bump de versiones del manifest y de los instaladores.
#
# Archivos que se tocan:
#   - apps/web/public/version.json  (siempre; ademas actualiza released_at a la hora actual, UTC)
#   - apps/web/public/install       (solo canal stable; linea readonly FALLBACK_*_IMAGE_TAG)
#   - apps/web/public/install.sh    (idem)
#
# Componentes aceptados (con alias):
#   litepod | litepd   -> channels.<canal>.version   + FALLBACK_LITEPOD_IMAGE_TAG
#   dfly    | dragonfly -> channels.<canal>.dragonfly.tag + FALLBACK_DRAGONFLY_IMAGE_TAG
#   caddy              -> channels.<canal>.caddy.tag  + FALLBACK_CADDY_IMAGE_TAG
#
# Para litepod en stable tambien se actualiza el version/released_at de nivel raiz.
# litepod se normaliza SIEMPRE con una "v" inicial (las tags de docker.io/litepod/litepod
# son v0.1.67, y install.sh valida ^v[0-9]+\.[0-9]+\.[0-9]+$). dfly/caddy se escriben
# tal cual los pases (dragonfly usa "v", caddy no).
# ─────────────────────────────────────────────────────────────────────────────
version-file := "apps/web/public/version.json"
install-files := "apps/web/public/install apps/web/public/install.sh"

# Bump de un componente en el canal STABLE (actualiza version.json + install + install.sh).
#   just bump litepod v0.1.67
#   just bump dfly    v1.41.0
#   just bump caddy   2.11.5
bump component version:
    @just _bump stable {{component}} {{version}}

# Igual, pero en el canal ALPHA (solo se toca version.json, no los instaladores).
#   just bump-alpha litepod v0.1.12-alpha.1
#   just bump-alpha dfly    v1.41.0
#   just bump-alpha caddy   2.11.5
bump-alpha component version:
    @just _bump alpha {{component}} {{version}}

# Helper interno: _bump <stable|alpha> <componente> <version>
_bump channel component version:
    #!/usr/bin/env bash
    set -euo pipefail
    channel='{{channel}}'
    component='{{component}}'
    version='{{version}}'
    file='{{version-file}}'
    now="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

    case "$component" in
        litepod|litepd) key=version;   fallback=FALLBACK_LITEPOD_IMAGE_TAG ;;
        dfly|dragonfly) key=dragonfly; fallback=FALLBACK_DRAGONFLY_IMAGE_TAG ;;
        caddy)          key=caddy;     fallback=FALLBACK_CADDY_IMAGE_TAG ;;
        *) echo "unknown component: $component (use litepod|dfly|caddy)" >&2; exit 1 ;;
    esac

    # litepod: normalizar a una sola "v" inicial (tags docker.io/litepod/litepod + regex install.sh).
    if [ "$key" = version ]; then
        while [ "${version#v}" != "$version" ]; do version="${version#v}"; done
        version="v${version}"
    fi

    tmp="$(mktemp)"
    if [ "$key" = version ]; then
        jq -S --arg c "$channel" --arg v "$version" --arg now "$now" '
            .channels[$c].version = $v
            | .channels[$c].released_at = $now
            | if $c == "stable" then .version = $v | .released_at = $now else . end
        ' "$file" >"$tmp"
    else
        jq -S --arg c "$channel" --arg k "$key" --arg v "$version" --arg now "$now" '
            .channels[$c][$k].tag = $v
            | .channels[$c][$k].released_at = $now
        ' "$file" >"$tmp"
    fi
    mv "$tmp" "$file"
    echo "version.json: $channel/$component -> $version ($now)"

    # The installer fallback tags mirror the stable channel only.
    if [ "$channel" = stable ]; then
        for f in {{install-files}}; do
            t="$(mktemp)"
            sed -E "s|^(readonly ${fallback}=)\"[^\"]*\"|\1\"${version}\"|" "$f" >"$t"
            cat "$t" >"$f"
            rm -f "$t"
            echo "$f: ${fallback} -> ${version}"
        done
    fi
