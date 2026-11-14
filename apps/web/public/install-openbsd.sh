#!/bin/sh
# litepod installer for OpenBSD (amd64), run as root:
#
#   ftp -o - https://litepod.sh/install-openbsd.sh | sh
#   ftp -o - https://litepod.sh/install-openbsd.sh | sh -s -- --next
#
# OpenBSD has no Podman, so litepod runs here as the control panel only: the API is
# an OpenBSD binary supervised by rc.d (`rcctl ... litepod`), Redis from packages
# stands in for Dragonfly, and Caddy from packages serves the panel. Applications
# run on Linux servers that litepod reaches over SSH (Servers > Add server).
#
# Re-running it upgrades in place and keeps the data and secrets.
#
# LITEPOD_OPENBSD_TARBALL overrides the release archive (a local path or URL)
# for testing a build that is not published yet. LITEPOD_HTTP_PORT and
# LITEPOD_HTTPS_PORT (80 and 443) move Caddy when another web server keeps them.

set -eu

etc_dir=/etc/litepod
libexec_dir=/usr/local/libexec/litepod
share_dir=/usr/local/share/litepod
data_dir=/var/db/litepod
env_file="${etc_dir}/litepod.env"
caddy_admin_socket=/var/caddy/admin.sock
release_base=https://github.com/litepodsh/litepod/releases/download
http_port=${LITEPOD_HTTP_PORT:-80}
https_port=${LITEPOD_HTTPS_PORT:-443}

die() {
	printf 'litepod: %s\n' "$*" >&2
	exit 1
}

say() {
	printf '==> %s\n' "$*"
}

channel=stable
for argument in "$@"; do
	case "${argument}" in
		--next) channel=next ;;
		--stable) channel=stable ;;
		--help | -h)
			sed -n '2,16p' "$0" 2>/dev/null || true
			exit 0
			;;
		*) die "unknown option: ${argument}" ;;
	esac
done

[ "$(uname -s)" = OpenBSD ] || die "this installer is for OpenBSD; on Linux use https://litepod.sh/install.sh"
[ "$(id -u)" = 0 ] || die "run it as root"
[ "$(uname -m)" = amd64 ] || die "only amd64 is supported"
# OpenBSD changes its libc ABI between releases, so each release gets its own build.
release=$(uname -r)

# Keeps what an earlier run wrote, so re-running never rotates the secrets.
env_value() {
	[ -f "${env_file}" ] || return 0
	sed -n "s/^$1=//p" "${env_file}" | head -n 1
}

# duckdb is linked from packages: its bundled C++ does not build on OpenBSD.
say "Installing packages"
pkg_add -I caddy redis jq curl git git-lfs xmlsec duckdb >/dev/null ||
	die "pkg_add failed; check /etc/installurl and that $(uname -r) packages are reachable"

manifest_url=${LITEPOD_VERSION_MANIFEST_URL:-$(env_value LITEPOD_VERSION_MANIFEST_URL)}
manifest_url=${manifest_url:-https://litepod.sh/version.json}
say "Resolving the ${channel} release"
manifest=$(curl -fsS --max-time 15 "${manifest_url}") || die "could not download ${manifest_url}"
version=$(printf '%s' "${manifest}" | jq -r --arg c "${channel}" '.channels[$c].version // empty')
[ -n "${version}" ] || die "the version manifest has no ${channel} release"

work=$(mktemp -d /tmp/litepod-install.XXXXXX)
trap 'rm -rf "${work}"' EXIT

archive="${work}/litepod.tar.gz"
if [ -n "${LITEPOD_OPENBSD_TARBALL:-}" ]; then
	say "Using ${LITEPOD_OPENBSD_TARBALL}"
	case "${LITEPOD_OPENBSD_TARBALL}" in
		http://* | https://*) curl -fsSL -o "${archive}" "${LITEPOD_OPENBSD_TARBALL}" ;;
		*) cp "${LITEPOD_OPENBSD_TARBALL}" "${archive}" ;;
	esac
else
	name="litepod-${version}-x86_64-unknown-openbsd${release}.tar.gz"
	say "Downloading litepod ${version}"
	curl -fsSL -o "${archive}" "${release_base}/${version}/${name}" ||
		die "no build for OpenBSD ${release} was published for ${version}"
	curl -fsSL -o "${archive}.sha256" "${release_base}/${version}/${name}.sha256" ||
		die "the OpenBSD build of ${version} has no checksum"
	expected=$(cut -d ' ' -f 1 < "${archive}.sha256")
	[ "$(sha256 -q "${archive}")" = "${expected}" ] || die "checksum mismatch for ${name}"
fi
tar -xzf "${archive}" -C "${work}"
[ -x "${work}/litepod-api" ] && [ -d "${work}/ui" ] && [ -d "${work}/migrations" ] ||
	die "the archive has no litepod-api, ui/ and migrations/"
if [ -f "${work}/openbsd-release" ] && [ "$(cat "${work}/openbsd-release")" != "${release}" ]; then
	die "this build is for OpenBSD $(cat "${work}/openbsd-release"), not ${release}"
fi

say "Configuring Redis"
install -d -m 0700 "${etc_dir}" "${data_dir}"
redis_password=$(env_value DRAGONFLY_URL | sed -n 's|^redis://:\([^@]*\)@.*|\1|p')
redis_password=${redis_password:-$(openssl rand -hex 24)}
redis_conf=/etc/redis/redis.conf
if grep -q '^requirepass ' "${redis_conf}"; then
	sed -i -e "s|^requirepass .*|requirepass ${redis_password}|" "${redis_conf}"
else
	printf 'requirepass %s\n' "${redis_password}" >> "${redis_conf}"
fi
# The stock config loads Redis 8 modules the package does not ship, so Redis aborts at start.
sed -i -e 's|^loadmodule \./modules/|# &|' "${redis_conf}"
# The file now holds the password; only Redis's group may read it.
chown root:_redis "${redis_conf}"
chmod 0640 "${redis_conf}"
rcctl enable redis >/dev/null
rcctl restart redis >/dev/null

say "Configuring Caddy"
# Ports below 1024 need root on OpenBSD, and litepod's routes listen on 80 and 443.
rcctl stop litepod_caddy >/dev/null 2>&1 || true
# The package's own caddy service would fight litepod's for the ports.
rcctl stop caddy >/dev/null 2>&1 || true
rcctl disable caddy >/dev/null 2>&1 || true
busy=$(netstat -an -f inet -p tcp; netstat -an -f inet6 -p tcp) || true
busy=$(printf '%s\n' "${busy}" | awk -v h="${http_port}" -v s="${https_port}" \
	'$NF == "LISTEN" && ($4 ~ "[.:]" h "$" || $4 ~ "[.:]" s "$") { print $4 }' | sort -u | tr '\n' ' ')
[ -z "${busy}" ] || die "ports ${http_port} and ${https_port} are taken (${busy}); stop that service (rcctl stop <name>) or set LITEPOD_HTTP_PORT and LITEPOD_HTTPS_PORT"
install -d -m 0755 "${etc_dir}/caddy"
if [ ! -f "${etc_dir}/caddy/Caddyfile" ]; then
	cat > "${etc_dir}/caddy/Caddyfile" <<EOF
{
	# Unix socket only root reaches; the API configures Caddy through it.
	admin unix/${caddy_admin_socket}|0600
	http_port ${http_port}
	https_port ${https_port}
}

:${http_port} {
	reverse_proxy 127.0.0.1:6001
}
EOF
fi
# Its own service instead of the package's: litepod's routes live only in Caddy's
# autosaved config, which `--resume` reloads, and the package's configtest rejects it.
cat > /etc/rc.d/litepod_caddy <<EOF
#!/bin/ksh
# Managed by litepod: the installer rewrites this file.

daemon="/usr/local/bin/caddy"
daemon_flags="--config ${etc_dir}/caddy/Caddyfile --adapter caddyfile"
daemon_logger="daemon.info"

. /etc/rc.d/rc.subr

pexp="\${daemon} run --resume \${daemon_flags}"
rc_bg=YES
rc_reload=NO

rc_start() {
	rc_exec "\${daemon} run --resume \${daemon_flags}"
}

rc_configtest() {
	rc_exec "\${daemon} validate \${daemon_flags}"
}

rc_cmd \$1
EOF
chmod 0555 /etc/rc.d/litepod_caddy
rcctl enable litepod_caddy >/dev/null
rcctl start litepod_caddy >/dev/null || die "Caddy did not start; run: rcctl -d start litepod_caddy"

say "Installing litepod ${version}"
install -d -m 0755 "${libexec_dir}" "${share_dir}"
# The API reads its migrations from the directory next to the binary.
rm -rf "${libexec_dir}/migrations.new"
cp -R "${work}/migrations" "${libexec_dir}/migrations.new"
rm -rf "${libexec_dir}/migrations"
mv "${libexec_dir}/migrations.new" "${libexec_dir}/migrations"
install -o 0 -g 0 -m 0755 "${work}/litepod-api" "${libexec_dir}/.litepod-api.new"
mv "${libexec_dir}/.litepod-api.new" "${libexec_dir}/litepod-api"
rm -rf "${share_dir}/ui.new"
cp -R "${work}/ui" "${share_dir}/ui.new"
rm -rf "${share_dir}/ui.old"
[ -d "${share_dir}/ui" ] && mv "${share_dir}/ui" "${share_dir}/ui.old"
mv "${share_dir}/ui.new" "${share_dir}/ui"
rm -rf "${share_dir}/ui.old"

say "Configuring the host console"
# The console reaches this host over SSH, as a remote one. The API runs as root, so the
# console signs in as root, with a key that only works from this machine.
console_dir="${etc_dir}/host-console"
install -d -m 0700 "${console_dir}"
[ -s "${console_dir}/id_ed25519" ] ||
	ssh-keygen -q -t ed25519 -N '' -C litepod-local-console -f "${console_dir}/id_ed25519"
chmod 0600 "${console_dir}/id_ed25519"
rcctl enable sshd >/dev/null
rcctl check sshd >/dev/null 2>&1 || rcctl start sshd >/dev/null
install -d -m 0700 /root/.ssh
touch /root/.ssh/authorized_keys
chmod 0600 /root/.ssh/authorized_keys
sed -i '/ litepod-local-console$/d' /root/.ssh/authorized_keys
printf 'from="127.0.0.1,::1",no-port-forwarding,no-agent-forwarding,no-X11-forwarding,no-user-rc %s\n' \
	"$(cat "${console_dir}/id_ed25519.pub")" >> /root/.ssh/authorized_keys
root_login=$(sshd -T -C user=root,host=localhost,addr=127.0.0.1 | awk '$1 == "permitrootlogin" { print $2 }')
case "${root_login}" in
	yes | prohibit-password | without-password) ;;
	*)
		grep -q '^# litepod: host console' /etc/ssh/sshd_config ||
			printf '\n# litepod: host console, root with a key from this machine only.\nMatch Address 127.0.0.1,::1 User root\n\tPermitRootLogin prohibit-password\n' \
				>> /etc/ssh/sshd_config
		sshd -t || die "/etc/ssh/sshd_config does not validate after allowing the host console"
		rcctl reload sshd >/dev/null
		;;
esac
ssh_port=$(sshd -T -C user=root,host=localhost,addr=127.0.0.1 | awk '$1 == "port" { print $2; exit }')
ssh_port=${ssh_port:-22}
host_key=/etc/ssh/ssh_host_ed25519_key.pub
[ -s "${host_key}" ] || die "sshd has no ED25519 host key (${host_key})"
if [ "${ssh_port}" = 22 ]; then
	known_host=127.0.0.1
else
	known_host="[127.0.0.1]:${ssh_port}"
fi
printf '%s %s\n' "${known_host}" "$(cut -d ' ' -f 1-2 < "${host_key}")" > "${console_dir}/known_hosts"
ssh_fingerprint=$(ssh-keygen -lf "${host_key}" -E sha256 | awk '{ print $2 }')

public_ip=${LITEPOD_PUBLIC_IP:-$(env_value LITEPOD_PUBLIC_IP)}
if [ -z "${public_ip}" ]; then
	public_ip=$(curl -fsS --max-time 5 https://api.ipify.org 2>/dev/null || true)
fi
if [ -z "${public_ip}" ]; then
	egress=$(route -n get default | awk '/interface:/ { print $2 }')
	public_ip=$(ifconfig "${egress}" inet | awk '/inet / { print $2; exit }')
fi
public_url=$(env_value PUBLIC_URL)
if [ "${http_port}" = 80 ]; then
	public_url=${public_url:-http://${public_ip}}
else
	public_url=${public_url:-http://${public_ip}:${http_port}}
fi
hash_secret=$(env_value HASH_SECRET)
encryption_key=$(env_value ENCRYPTION_KEY)
metrics_password=$(env_value METRICS_PASSWORD)
setup_token=$(env_value SETUP_TOKEN)
umask 077
cat > "${env_file}.new" <<EOF
APP_ENV=production
PORT=6001
LITEPOD_LISTEN_ADDRESS=127.0.0.1
UI_DIST_PATH=${share_dir}/ui
DATABASE_PATH=${data_dir}/litepod.db
LITEPOD_DATA_DIR=${data_dir}
HASH_SECRET=${hash_secret:-$(openssl rand -hex 32)}
ENCRYPTION_KEY=${encryption_key:-$(openssl rand -hex 32)}
SETUP_TOKEN=${setup_token:-$(openssl rand -hex 32)}
METRICS_USERNAME=metrics
METRICS_PASSWORD=${metrics_password:-$(openssl rand -hex 16)}
CADDY_URL=http://127.0.0.1:${http_port}
CADDY_ADMIN_URL=unix://${caddy_admin_socket}
CADDY_SERVER_UPSTREAM=127.0.0.1:6001
DRAGONFLY_URL=redis://:${redis_password}@127.0.0.1:6379
LITEPOD_CONTAINER_NAME=litepod-api
LITEPOD_PUBLIC_IP=${public_ip}
PUBLIC_URL=${public_url}
CORS_ORIGINS=${public_url}
LITEPOD_LOCAL_SSH_HOST=127.0.0.1
LITEPOD_LOCAL_SSH_PORT=${ssh_port}
LITEPOD_LOCAL_SSH_USER=root
LITEPOD_LOCAL_SSH_KEY_FILE=${console_dir}/id_ed25519
LITEPOD_LOCAL_SSH_KNOWN_HOSTS_FILE=${console_dir}/known_hosts
LITEPOD_LOCAL_SSH_FINGERPRINT=${ssh_fingerprint}
LITEPOD_VERSION=${version}
LITEPOD_UPDATE_CHANNEL=${channel}
LITEPOD_VERSION_MANIFEST_URL=${manifest_url}
# The self-updater replaces containers; a native install upgrades by re-running this installer.
LITEPOD_UPDATE_INTERVAL=0
EOF
mv "${env_file}.new" "${env_file}"
umask 022

# rc.d does not read env files, so a wrapper loads it and then becomes the API.
cat > "${libexec_dir}/litepod-run" <<EOF
#!/bin/sh
# Managed by litepod: the installer rewrites this file.
set -a
. ${env_file}
set +a
cd ${data_dir}
exec ${libexec_dir}/litepod-api >> /var/log/litepod.log 2>&1
EOF
chmod 0555 "${libexec_dir}/litepod-run"

# shortcut: rc.d does not restart the API if it crashes; add a supervisor if that shows up in practice.
cat > /etc/rc.d/litepod <<EOF
#!/bin/ksh
# Managed by litepod: the installer rewrites this file.

daemon="${libexec_dir}/litepod-run"

. /etc/rc.d/rc.subr

pexp="${libexec_dir}/litepod-api"
rc_bg=YES
rc_reload=NO

rc_cmd \$1
EOF
chmod 0555 /etc/rc.d/litepod
rcctl enable litepod >/dev/null
rcctl restart litepod >/dev/null

say "Waiting for litepod to answer"
ready=false
for _ in $(jot 60); do
	if curl -fs --max-time 2 -o /dev/null "http://127.0.0.1:6001/health"; then
		ready=true
		break
	fi
	sleep 2
done
[ "${ready}" = true ] || die "litepod did not answer; see /var/log/litepod.log"

printf '\nlitepod %s is running (control panel only: OpenBSD has no Podman).\n' "${version}"
printf 'Add a Linux server under Servers to deploy applications.\n'
printf 'Open %s and finish setup with this token:\n\n    %s\n\n' "${public_url}" "$(env_value SETUP_TOKEN)"
