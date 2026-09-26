#!/usr/bin/env bash
set -euo pipefail
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for installer in install install.sh; do
    bash -n "${script_dir}/../public/${installer}"
    bash -s -- "${script_dir}/../public/${installer}" <<'CHECK_BOOT'
set -euo pipefail
source "$1"
warning="$(warn_unless_stopped_boot_support '/usr/bin/podman start --all --filter restart-policy=always' 2>&1)"
[[ "${warning}" == *'may remain stopped'* ]]
warning="$(warn_unless_stopped_boot_support '' 2>&1)"
[[ "${warning}" == *'may remain stopped'* ]]
warning="$(warn_unless_stopped_boot_support '/usr/bin/podman start --all --filter should-start-on-boot=true' 2>&1)"
[[ -z "${warning}" ]]
rg -Fq 'command: ["caddy", "run", "--resume", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]' "$1"
CHECK_BOOT
done
printf '%s\n' 'installer recovery checks passed'
