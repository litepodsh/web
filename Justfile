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
# Bump de versiones del manifest.
#
# Solo se toca apps/web/public/version.json (ademas actualiza released_at a la hora actual,
# UTC). Los instaladores leen las versiones de ese archivo al ejecutarse y no guardan copia.
# Despues hace commit (solo de version.json) y push; el push a main despliega litepod.sh.
#
# Componentes aceptados (con alias):
#   litepod | litepd   -> channels.<canal>.version
#   dfly    | dragonfly -> channels.<canal>.dragonfly.tag
#   caddy              -> channels.<canal>.caddy.tag
#
# Para litepod en stable tambien se actualiza el version/released_at de nivel raiz.
# litepod se normaliza SIEMPRE con una "v" inicial (las tags de docker.io/litepod/litepod
# son v0.1.67, y install.sh valida ^v[0-9]+\.[0-9]+\.[0-9]+$). dfly/caddy se escriben
# tal cual los pases (dragonfly usa "v", caddy no).
# ─────────────────────────────────────────────────────────────────────────────
version-file := "apps/web/public/version.json"

# Bump de un componente en el canal STABLE.
#   just bump litepod v0.1.67
#   just bump dfly    v1.41.0
#   just bump caddy   2.11.5
bump component version:
    @just _bump stable {{component}} {{version}}

# Igual, pero en el canal NEXT.
#   just bump-next litepod v0.1.12-next.1
#   just bump-next dfly    v1.41.0
#   just bump-next caddy   2.11.5
bump-next component version:
    @just _bump next {{component}} {{version}}

# Helper interno: _bump <stable|next> <componente> <version>
_bump channel component version:
    #!/usr/bin/env bash
    set -euo pipefail
    channel='{{channel}}'
    component='{{component}}'
    version='{{version}}'
    file='{{version-file}}'
    now="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

    case "$component" in
        litepod|litepd) key=version ;;
        dfly|dragonfly) key=dragonfly ;;
        caddy)          key=caddy ;;
        *) echo "unknown component: $component (use litepod|dfly|caddy)" >&2; exit 1 ;;
    esac

    # litepod: normalizar a una sola "v" inicial (tags docker.io/litepod/litepod + regex install.sh).
    if [ "$key" = version ]; then
        while [ "${version#v}" != "$version" ]; do version="${version#v}"; done
        version="v${version}"
    fi

    # Antes de escribir: la version debe existir donde la descargan los instaladores y el
    # actualizador, para que un error de tipeo o un release incompleto no se publique.
    fail() { echo "no se publica: $*" >&2; exit 1; }
    hub_tag() {
        local code
        code="$(curl -s -o /dev/null -w '%{http_code}' "https://hub.docker.com/v2/repositories/$1/tags/$2")"
        [ "$code" = 200 ] || fail "docker.io/$1:$2 no existe (HTTP $code)"
    }
    case "$key" in
        version)
            if [ "$channel" = stable ]; then re='^v[0-9]+\.[0-9]+\.[0-9]+$'; else re='^v[0-9]+\.[0-9]+\.[0-9]+-next\.[0-9]+$'; fi
            [[ "$version" =~ $re ]] || fail "$version no es un tag de $channel"
            hub_tag litepod/litepod "$version"
            assets="$(curl -fsS "https://api.github.com/repos/litepodsh/litepod/releases/tags/$version" | jq -r '.assets[].name')" ||
                fail "no hay release de GitHub $version"
            # Lo que descargan install-freebsd.sh e install-openbsd.sh, con su checksum.
            for want in "litepod-$version-x86_64-unknown-freebsd.tar.gz" "litepod-$version-x86_64-unknown-openbsd*.tar.gz"; do
                for suffix in "" .sha256; do
                    found=false
                    while IFS= read -r name; do [[ "$name" == $want$suffix ]] && found=true; done <<<"$assets"
                    $found || fail "al release $version le falta $want$suffix"
                done
            done
            ;;
        caddy) hub_tag library/caddy "$version" ;;
        dragonfly)
            # docker.dragonflydb.io sirve desde ghcr.io, que pide un token anonimo.
            token="$(curl -fsS "https://ghcr.io/token?scope=repository:dragonflydb/dragonfly:pull" | jq -r .token)"
            code="$(curl -s -o /dev/null -w '%{http_code}' -I -H "Authorization: Bearer $token" \
                -H 'Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.list.v2+json' \
                "https://ghcr.io/v2/dragonflydb/dragonfly/manifests/$version")"
            [ "$code" = 200 ] || fail "dragonfly:$version no existe (HTTP $code)"
            ;;
    esac

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

    # Commit solo de version.json (lo demas pendiente no entra) y push: el push a main despliega litepod.sh.
    case "$key" in version) name=litepod ;; *) name="$key" ;; esac
    git commit -q -m "bump(${name}): ${channel} channel ${version}" -- "$file"
    git push -q origin HEAD
    echo "commit + push: bump(${name}): ${channel} channel ${version}"
