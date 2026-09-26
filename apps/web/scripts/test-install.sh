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

# Load just the service generator, which is normally declared inside main.
eval "$(sed -n '/^configure_rootless_stack_service() {$/,/^}$/p' "$1")"
service_test_dir="$(mktemp -d)"
trap 'rm -rf -- "${service_test_dir}"' EXIT
podman_user=tester
install_dir="${service_test_dir}/litepod"
compose_file="${install_dir}/podman-compose-prod.yml"
getent() { printf 'tester:x:1000:1000::%s:/bin/bash\n' "${service_test_dir}"; }
as_root_run() { [[ "$1" == chown ]]; }
podman_user_run() {
    if [[ "$1" == systemctl ]]; then
        printf '%s\n' "$*" >> "${service_test_dir}/systemctl-calls"
    else
        "$@"
    fi
}
podman() { printf '%s\n' "$*" >> "${service_test_dir}/podman-calls"; }
configure_rootless_stack_service
unit="${service_test_dir}/.config/systemd/user/litepod-stack.service"
start_line="$(sed -n '/^ExecStart=/p' "${unit}")"
stop_line="$(sed -n '/^ExecStop=/p' "${unit}")"
[[ "${start_line}" == 'ExecStart=podman start litepod-dragonfly litepod-caddy litepod-api' ]]
[[ "${stop_line}" == 'ExecStop=podman stop litepod-api litepod-caddy litepod-dragonfly' ]]
! rg -q '^Exec(Start|Stop)=.*(compose|--all|--remove-orphans)' "${unit}"
read -r -a start_command <<< "${start_line#ExecStart=}"
"${start_command[@]}"
[[ "$(cat "${service_test_dir}/podman-calls")" == 'start litepod-dragonfly litepod-caddy litepod-api' ]]
rg -Fq 'systemctl --user enable --now litepod-stack.service' "${service_test_dir}/systemctl-calls"
CHECK_BOOT
done
printf '%s\n' 'installer recovery checks passed'
