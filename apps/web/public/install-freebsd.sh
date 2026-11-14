#!/bin/sh
# litepod installer for FreeBSD (amd64, 14 or later), run as root:
#
#   fetch -o - https://litepod.sh/install-freebsd.sh | sh
#   fetch -o - https://litepod.sh/install-freebsd.sh | sh -s -- --next
#
# FreeBSD runs litepod natively instead of as a container: the API is a FreeBSD
# binary supervised by rc.d (`service litepod`), Valkey from packages stands in
# for Dragonfly, and Caddy runs as a container on litepod-network so it reaches
# applications by name, as on Linux. Applications are Linux images run by
# Podman through FreeBSD's Linux layer.
#
# Re-running it upgrades in place and keeps the data and secrets.
#
# LITEPOD_FREEBSD_TARBALL overrides the release archive (a local path or URL)
# for testing a build that is not published yet. LITEPOD_HTTP_PORT and
# LITEPOD_HTTPS_PORT (80 and 443) move Caddy when another web server keeps them.

set -eu

etc_dir=/usr/local/etc/litepod
libexec_dir=/usr/local/libexec/litepod
share_dir=/usr/local/share/litepod
data_dir=/var/db/litepod
env_file="${etc_dir}/litepod.env"
host_script=/usr/local/lib/litepod/freebsd-host
release_base=https://github.com/litepodsh/litepod/releases/download
fallback_caddy_tag=2.11.9
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

[ "$(uname -s)" = FreeBSD ] || die "this installer is for FreeBSD; on Linux use https://litepod.sh/install.sh"
[ "$(id -u)" = 0 ] || die "run it as root"
[ "$(uname -m)" = amd64 ] || die "only amd64 is supported"
major=$(freebsd-version -u | cut -d . -f 1)
[ "${major}" -ge 14 ] || die "FreeBSD 14 or later is required (this is $(freebsd-version -u))"

# Keeps what an earlier run wrote, so re-running never rotates the secrets.
env_value() {
	[ -f "${env_file}" ] || return 0
	sed -n "s/^$1=//p" "${env_file}" | head -n 1
}

say "Installing packages"
env ASSUME_ALWAYS_YES=yes pkg bootstrap -f >/dev/null 2>&1 || true
pkg install -y podman-suite sysutils/cni-dnsname textproc/jq ftp/curl \
	sysutils/podman-compose databases/valkey devel/git devel/git-lfs security/xmlsec1 >/dev/null
# The release binary is built on FreeBSD 14; later releases run it with 14's base libraries.
if [ "${major}" -gt 14 ]; then
	pkg install -y misc/compat14x >/dev/null
fi

manifest_url=${LITEPOD_VERSION_MANIFEST_URL:-$(env_value LITEPOD_VERSION_MANIFEST_URL)}
manifest_url=${manifest_url:-https://litepod.sh/version.json}
say "Resolving the ${channel} release"
manifest=$(curl -fsS --max-time 15 "${manifest_url}") || die "could not download ${manifest_url}"
version=$(printf '%s' "${manifest}" | jq -r --arg c "${channel}" '.channels[$c].version // empty')
caddy_tag=$(printf '%s' "${manifest}" | jq -r --arg c "${channel}" '.channels[$c].caddy.tag // empty')
[ -n "${version}" ] || die "the version manifest has no ${channel} release"
caddy_tag=${caddy_tag:-${fallback_caddy_tag}}

work=$(mktemp -d /tmp/litepod-install.XXXXXX)
trap 'rm -rf "${work}"' EXIT

archive="${work}/litepod.tar.gz"
if [ -n "${LITEPOD_FREEBSD_TARBALL:-}" ]; then
	say "Using ${LITEPOD_FREEBSD_TARBALL}"
	case "${LITEPOD_FREEBSD_TARBALL}" in
		http://* | https://*) curl -fsSL -o "${archive}" "${LITEPOD_FREEBSD_TARBALL}" ;;
		*) cp "${LITEPOD_FREEBSD_TARBALL}" "${archive}" ;;
	esac
else
	name="litepod-${version}-x86_64-unknown-freebsd.tar.gz"
	say "Downloading litepod ${version}"
	curl -fsSL -o "${archive}" "${release_base}/${version}/${name}" ||
		die "no FreeBSD build was published for ${version}"
	curl -fsSL -o "${archive}.sha256" "${release_base}/${version}/${name}.sha256" ||
		die "the FreeBSD build of ${version} has no checksum"
	expected=$(cut -d ' ' -f 1 < "${archive}.sha256")
	[ "$(sha256 -q "${archive}")" = "${expected}" ] || die "checksum mismatch for ${name}"
fi
tar -xzf "${archive}" -C "${work}"
[ -x "${work}/litepod-api" ] && [ -d "${work}/ui" ] && [ -d "${work}/migrations" ] ||
	die "the archive has no litepod-api, ui/ and migrations/"

say "Preparing the host (storage, pf, Linux layer, Podman)"
install -d -m 0755 "$(dirname "${host_script}")"
"${work}/litepod-api" freebsd-host-script > "${work}/freebsd-host"
install -o 0 -g 0 -m 0755 "${work}/freebsd-host" "${host_script}"
"${host_script}" podman

say "Configuring Valkey"
install -d -m 0700 "${etc_dir}" "${data_dir}"
valkey_password=$(env_value DRAGONFLY_URL | sed -n 's|^redis://:\([^@]*\)@.*|\1|p')
valkey_password=${valkey_password:-$(openssl rand -hex 24)}
valkey_conf=/usr/local/etc/valkey.conf
if grep -q '^requirepass ' "${valkey_conf}"; then
	sed -i '' -e "s|^requirepass .*|requirepass ${valkey_password}|" "${valkey_conf}"
else
	printf 'requirepass %s\n' "${valkey_password}" >> "${valkey_conf}"
fi
# The file now holds the password; only Valkey's group may read it.
if pw groupshow valkey >/dev/null 2>&1; then
	chown root:valkey "${valkey_conf}"
	chmod 0640 "${valkey_conf}"
fi
sysrc -q valkey_enable=YES >/dev/null
service valkey restart >/dev/null 2>&1 || service valkey start

say "Creating litepod-network and Caddy"
# A previous install's Caddy holds the ports through conmon; anything else listening
# there is another web server (a FreeBSD litepod remote runs its own Caddy) or an app.
podman rm -f litepod-caddy >/dev/null 2>&1 || true
busy=$(sockstat -46l -p "${http_port},${https_port}" | awk 'NR > 1 { print $2 }' | sort -u | tr '\n' ' ')
[ -z "${busy}" ] || die "ports ${http_port} and ${https_port} are taken by: ${busy}; stop it (service <name> stop) or set LITEPOD_HTTP_PORT and LITEPOD_HTTPS_PORT"
podman network exists litepod-network || podman network create litepod-network >/dev/null
gateway=$(podman network inspect litepod-network | jq -r '.[0].subnets[0].gateway')
caddy_ip=$(printf '%s' "${gateway}" | awk -F . '{ printf "%s.%s.%s.%d", $1, $2, $3, $4 + 1 }')
install -d -m 0755 "${etc_dir}/caddy"
if [ ! -f "${etc_dir}/caddy/Caddyfile" ]; then
	cat > "${etc_dir}/caddy/Caddyfile" <<'EOF'
{
	# Unix socket on a volume only Caddy and the host can reach.
	admin unix//run/caddy-admin/admin.sock
}

:80 {
	reverse_proxy litepod-api:6001
}
EOF
fi
podman volume exists litepod_caddy_admin || podman volume create litepod_caddy_admin >/dev/null
admin_socket_dir=$(podman volume inspect litepod_caddy_admin | jq -r '.[0].Mountpoint')
# `litepod-api` resolves to the host's address on litepod-network, where the API listens.
podman run -d --name litepod-caddy --restart always \
	--network litepod-network --ip "${caddy_ip}" \
	--add-host litepod-api:host-gateway \
	-p "${http_port}:80" -p "${https_port}:443" -p "${https_port}:443/udp" \
	-v "${etc_dir}/caddy:/etc/caddy:ro" \
	-v caddy_data:/data -v caddy_config:/config \
	-v litepod_caddy_admin:/run/caddy-admin \
	"docker.io/library/caddy:${caddy_tag}" \
	caddy run --resume --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null

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
# The console and disk actions reach the local server over SSH, as a remote one. Podman
# here is rootful and the API already runs as root, so the console signs in as root,
# with a key that only works from this machine.
console_dir="${etc_dir}/host-console"
install -d -m 0700 "${console_dir}"
[ -s "${console_dir}/id_ed25519" ] ||
	ssh-keygen -q -t ed25519 -N '' -C litepod-local-console -f "${console_dir}/id_ed25519"
chmod 0600 "${console_dir}/id_ed25519"
sysrc -q sshd_enable=YES >/dev/null
# Starting sshd the first time also generates its host keys.
service sshd status >/dev/null 2>&1 || service sshd start >/dev/null
install -d -m 0700 /root/.ssh
touch /root/.ssh/authorized_keys
chmod 0600 /root/.ssh/authorized_keys
sed -i '' '/ litepod-local-console$/d' /root/.ssh/authorized_keys
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
		service sshd reload >/dev/null
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
LITEPOD_LISTEN_ADDRESS=${gateway}
UI_DIST_PATH=${share_dir}/ui
DATABASE_PATH=${data_dir}/litepod.db
LITEPOD_DATA_DIR=${data_dir}
HASH_SECRET=${hash_secret:-$(openssl rand -hex 32)}
ENCRYPTION_KEY=${encryption_key:-$(openssl rand -hex 32)}
SETUP_TOKEN=${setup_token:-$(openssl rand -hex 32)}
METRICS_USERNAME=metrics
METRICS_PASSWORD=${metrics_password:-$(openssl rand -hex 16)}
CADDY_URL=http://${caddy_ip}:80
CADDY_ADMIN_URL=unix://${admin_socket_dir}/admin.sock
DRAGONFLY_URL=redis://:${valkey_password}@127.0.0.1:6379
PODMAN_SOCKET=unix:///var/run/podman/podman.sock
LITEPOD_PODMAN_NETWORK=litepod-network
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

cat > /usr/local/etc/rc.d/litepod <<'EOF'
#!/bin/sh
# Managed by litepod: the installer rewrites this file.
#
# PROVIDE: litepod
# REQUIRE: LOGIN NETWORKING podman podman_service valkey
# KEYWORD: shutdown

. /etc/rc.subr

name=litepod
rcvar=litepod_enable

load_rc_config $name

: ${litepod_enable:=NO}
: ${litepod_env_file:=/usr/local/etc/litepod/litepod.env}
: ${litepod_chdir:=/var/db/litepod}

pidfile=/var/run/${name}.pid
command=/usr/sbin/daemon
# daemon restarts the API if it exits; /usr/local/sbin first, where the podman
# shim pins image pulls to linux.
command_args="-r -R 5 -P ${pidfile} -o /var/log/litepod.log -H /usr/local/libexec/litepod/litepod-api"
litepod_env="PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin"

run_rc_command "$1"
EOF
chmod 0555 /usr/local/etc/rc.d/litepod
sysrc -q litepod_enable=YES >/dev/null
service litepod restart >/dev/null 2>&1 || service litepod start >/dev/null

say "Waiting for litepod to answer"
ready=false
for _ in $(seq 1 60); do
	if curl -fs --max-time 2 -o /dev/null "http://${gateway}:6001/health"; then
		ready=true
		break
	fi
	sleep 2
done
[ "${ready}" = true ] || die "litepod did not answer; see /var/log/litepod.log"

if [ "$(sysctl -n kern.racct.enable 2>/dev/null || echo 0)" != 1 ]; then
	printf '\nReboot once to turn on resource accounting (CPU and memory charts and limits).\n'
fi
printf '\nlitepod %s is running.\n' "${version}"
printf 'Open %s and finish setup with this token:\n\n    %s\n\n' "${public_url}" "$(env_value SETUP_TOKEN)"
