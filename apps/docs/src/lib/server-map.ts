// Topology maps for the two self-hosted setups. Litepod Cloud is left out on purpose.
// apps/web and apps/docs build separately, so each one keeps an identical copy of this file.

export type MapLocale = "en" | "es";
export type MapHost = "remote" | "single";
export type MapMode = "public" | "relay" | "private";

const ICONS = {
  "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" />",
  "you": "<circle cx=\"12\" cy=\"8\" r=\"5\" /><path d=\"M20 21a8 8 0 0 0-16 0\" />",
  "caddy": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /><path d=\"m9 12 2 2 4-4\" />",
  "apps": "<path d=\"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z\" /><path d=\"m7 16.5-4.74-2.85\" /><path d=\"m7 16.5 5-3\" /><path d=\"M7 16.5v5.17\" /><path d=\"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z\" /><path d=\"m17 16.5-5-3\" /><path d=\"m17 16.5 4.74-2.85\" /><path d=\"M17 16.5v5.17\" /><path d=\"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z\" /><path d=\"M12 8 7.26 5.15\" /><path d=\"m12 8 4.74-2.85\" /><path d=\"M12 13.5V8\" />",
  "panel": "<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\" /><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\" /><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\" /><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\" />",
  "server": "<rect width=\"20\" height=\"8\" x=\"2\" y=\"2\" rx=\"2\" ry=\"2\" /><rect width=\"20\" height=\"8\" x=\"2\" y=\"14\" rx=\"2\" ry=\"2\" /><line x1=\"6\" x2=\"6.01\" y1=\"6\" y2=\"6\" /><line x1=\"6\" x2=\"6.01\" y1=\"18\" y2=\"18\" />"
} as const;

const COPY = {
  en: {
    hostLabel: "Where Litepod runs",
    modeLabel: "How traffic reaches your app",
    hosts: { remote: "Self-hosted + remote", single: "All on one server" },
    modes: { public: "Public edge", relay: "Private relay", private: "Private only" },
    legend: { traffic: "Visitor traffic", manage: "Management", none: "No public route" },
    clients: "Clients",
    anywhere: "Anywhere on the internet",
    visitor: ["Visitor", "Opens your domain"],
    you: ["You", "Browser or agent"],
    panel: ["Litepod panel", "Operated by you"],
    panelSingle: ["Litepod panel", "About 63 MB of RAM"],
    podman: ["Podman", "Rootless containers"],
    caddy: ["Caddy", "TLS ends here"],
    app: ["Your app", "On your server"],
    appPrivate: ["Your app", "No public domain"],
    apps: ["Your apps", "On this server"],
    others: ["Other apps", "Same network"],
    zoneLitepod: ["Your Litepod server", "You run it, about 63 MB of RAM", "You run it"],
    zoneRemote: ["Your remote server", "Any provider. Your apps and data stay here", "Your apps and data stay here"],
    zoneSingle: ["Your server", "Litepod and your apps share one machine"],
    https: "HTTPS",
    straight: "HTTPS goes straight to your server",
    relayed: "Relayed over SSH",
    ssh: "Key-only SSH",
    vpn: "VPN or private link, always on",
    noRoute: "No public route",
    proxies: "Proxies to your app",
    manages: "Deploys and manages",
    runs: "Runs",
    aria: "Map of how a visitor reaches your app and how Litepod manages your server",
    read: {
      dns: "DNS points at",
      tls: "TLS ends at",
      open: "Open on the server",
      good: "Good for",
    },
    rows: {
      single: ["This server", "Caddy on this server", "Ports 80 and 443, plus SSH if you use it", "One machine doing everything."],
      public: ["Your remote server", "Caddy on your remote server", "Ports 80, 443 and SSH", "Servers with a public IP. The most direct path."],
      relay: ["Your Litepod server", "Caddy on your Litepod server", "No web ports. SSH only", "Servers with closed web ports."],
      private: ["No public domains", "None", "No web ports. Private link only", "Servers with no public IP, or connected over a VPN or another private path. The connection to the control plane stays up."],
    },
  },
  es: {
    hostLabel: "Dónde corre Litepod",
    modeLabel: "Cómo llega el tráfico a tu app",
    hosts: { remote: "Autoalojado + remoto", single: "Todo en un servidor" },
    modes: { public: "Edge público", relay: "Relay privado", private: "Solo privado" },
    legend: { traffic: "Tráfico de visitantes", manage: "Gestión", none: "Sin ruta pública" },
    clients: "Clientes",
    anywhere: "En cualquier lugar de internet",
    visitor: ["Visitante", "Abre tu dominio"],
    you: ["Tú", "Navegador o agente"],
    panel: ["Panel de Litepod", "Lo operas tú"],
    panelSingle: ["Panel de Litepod", "Unos 63 MB de RAM"],
    podman: ["Podman", "Contenedores rootless"],
    caddy: ["Caddy", "TLS termina aquí"],
    app: ["Tu app", "En tu servidor"],
    appPrivate: ["Tu app", "Sin dominio público"],
    apps: ["Tus apps", "En este servidor"],
    others: ["Otras apps", "Misma red"],
    zoneLitepod: ["Tu servidor Litepod", "Lo operas tú, unos 63 MB de RAM", "Lo operas tú"],
    zoneRemote: ["Tu servidor remoto", "Cualquier proveedor. Tus apps y datos se quedan aquí", "Tus apps y datos se quedan aquí"],
    zoneSingle: ["Tu servidor", "Litepod y tus apps comparten una máquina"],
    https: "HTTPS",
    straight: "HTTPS va directo a tu servidor",
    relayed: "Reenviado por SSH",
    ssh: "SSH solo con llave",
    vpn: "VPN o vía privada, siempre activa",
    noRoute: "Sin ruta pública",
    proxies: "Proxy a tu app",
    manages: "Despliega y gestiona",
    runs: "Ejecuta",
    aria: "Mapa de cómo un visitante llega a tu app y cómo Litepod gestiona tu servidor",
    read: {
      dns: "El DNS apunta a",
      tls: "TLS termina en",
      open: "Abierto en el servidor",
      good: "Sirve para",
    },
    rows: {
      single: ["Este servidor", "Caddy en este servidor", "Puertos 80 y 443, más SSH si lo usas", "Una sola máquina que hace todo."],
      public: ["Tu servidor remoto", "Caddy en tu servidor remoto", "Puertos 80, 443 y SSH", "Servidores con IP pública. El camino más directo."],
      relay: ["Tu servidor Litepod", "Caddy en tu servidor Litepod", "Ningún puerto web. Solo SSH", "Servidores con los puertos web cerrados."],
      private: ["Sin dominios públicos", "Ninguno", "Ningún puerto web. Solo vía privada", "Servidores sin IP pública, o conectados por VPN u otra vía privada. La conexión con el control plane se mantiene activa."],
    },
  },
} as const;

export const mapCopy = (locale: MapLocale) => COPY[locale];

// The field stays dark in both themes, like the fleet globe.
const INK = {
  field: "#0A0A0B",
  dot: "rgb(255 255 255 / .07)",
  zone: "rgb(255 255 255 / .025)",
  zoneLine: "rgb(255 255 255 / .22)",
  node: "#17181A",
  nodeLine: "rgb(255 255 255 / .2)",
  hot: "#21150E",
  accent: "#FF6A1F",
  accentText: "#FF9561",
  title: "#FFFFFF",
  sub: "#AEB2B6",
  label: "#C9CCCF",
  manage: "#9CA1A6",
  none: "#F2707D",
  noneText: "#F58B95",
};

const esc = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Pair = readonly [string, string] | readonly [string, string, string];
type Line = "traffic" | "tunnel" | "manage" | "none";

function scene(locale: MapLocale, host: MapHost, mode: MapMode, narrow: boolean) {
  const t = COPY[locale];
  const P = narrow ? { nodeH: 60, title: 14, sub: 11.5, label: 11.5, icon: 18, zt: 15, zs: 11.5 } : { nodeH: 64, title: 14.5, sub: 12.5, label: 12.5, icon: 20, zt: 16, zs: 12.5 };
  let zones = "";
  let lines = "";
  let nodes = "";

  const text = (x: number, y: number, value: string, size: number, fill: string, weight = 400, anchor = "start") =>
    `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`;

  const node = (x: number, cy: number, w: number, icon: keyof typeof ICONS, label: Pair, hot = false) => {
    const top = cy - P.nodeH / 2;
    const size = P.icon;
    nodes += `<g><rect x="${x}" y="${top}" width="${w}" height="${P.nodeH}" rx="12" fill="${hot ? INK.hot : INK.node}" stroke="${hot ? INK.accent : INK.nodeLine}" stroke-width="${hot ? 1.75 : 1}"/>`;
    nodes += `<svg x="${x + 12}" y="${cy - size / 2}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${hot ? INK.accentText : "#E8EAEC"}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</svg>`;
    nodes += text(x + 18 + size, cy - 3, label[0], P.title, INK.title, 550) + text(x + 18 + size, cy + 15, label[1], P.sub, INK.sub) + "</g>";
  };

  const line = (d: string, kind: Line, seconds = 0) => {
    const stroke = kind === "manage" ? INK.manage : kind === "none" ? INK.none : INK.accent;
    const width = kind === "tunnel" ? 5.5 : kind === "traffic" ? 3 : 2.25;
    const dash = kind === "manage" ? ' stroke-dasharray="6 6"' : kind === "none" ? ' stroke-dasharray="3 7" stroke-linecap="round"' : "";
    lines += `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}"${dash}/>`;
    if (seconds) lines += `<circle class="lp-map-packet" r="4" fill="#FFFFFF"><animateMotion dur="${seconds}s" repeatCount="indefinite" path="${d}"/></circle>`;
  };

  const label = (x: number, y: number, value: string, kind: Line, anchor = "middle") => {
    const fill = kind === "manage" ? INK.label : kind === "none" ? INK.noneText : INK.accentText;
    lines += `<text x="${x}" y="${y}" font-size="${P.label}" font-weight="500" fill="${fill}" text-anchor="${anchor}" paint-order="stroke" stroke="${INK.field}" stroke-width="5">${esc(value)}</text>`;
  };

  const zone = (x: number, y: number, w: number, h: number, title: string, sub: string, inset = 20) => {
    zones += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${INK.zone}" stroke="${INK.zoneLine}" stroke-width="1.25"/>`;
    zones += text(x + inset, y + (narrow ? 24 : 32), title, P.zt, INK.title, 560) + text(x + inset, y + (narrow ? 42 : 52), sub, P.zs, INK.sub);
  };

  const block = (x: number, cy: number) => {
    lines += `<g><circle cx="${x}" cy="${cy}" r="14" fill="#2A1215" stroke="${INK.none}" stroke-width="1.5"/><path d="M${x - 6} ${cy - 6} l12 12 M${x + 6} ${cy - 6} l-12 12" stroke="${INK.none}" stroke-width="2.25" fill="none" stroke-linecap="round"/></g>`;
  };

  let W: number;
  let H: number;

  if (!narrow) {
    W = 960;
    H = 440;
    const top = 150;
    const low = 340;
    zones += text(20, 58, t.clients, P.zt, INK.title, 560) + text(20, 78, t.anywhere, P.zs, INK.sub);
    node(20, top, 164, "globe", t.visitor);
    node(20, low, 164, "you", t.you);
    if (host === "single") {
      zone(224, 24, 716, 392, t.zoneSingle[0], t.zoneSingle[1]);
      line(`M184 ${top} H260`, "traffic", 1.1);
      label(222, top - 14, t.https, "traffic");
      line(`M486 ${top} H680`, "traffic", 1.4);
      label(583, top - 14, t.proxies, "traffic");
      line(`M184 ${low} H260`, "manage");
      label(222, low - 14, t.https, "manage");
      line(`M486 ${low} H680`, "manage");
      label(583, low - 14, t.manages, "manage");
      line(`M793 ${low - 32} V${top + 32}`, "manage");
      label(803, (top + low) / 2 + 4, t.runs, "manage", "start");
      node(260, top, 226, "caddy", t.caddy, true);
      node(680, top, 226, "apps", t.apps);
      node(260, low, 226, "panel", t.panelSingle);
      node(680, low, 226, "server", t.podman);
    } else {
      if (mode === "relay") zone(224, 24, 258, 392, t.zoneLitepod[0], t.zoneLitepod[1], 16);
      else zone(224, 220, 258, 196, t.zoneLitepod[0], t.zoneLitepod[1], 16);
      zone(520, 24, 420, 392, t.zoneRemote[0], t.zoneRemote[1]);
      line(`M184 ${low} H240`, "manage");
      label(212, low - 14, t.https, "manage");
      line(`M466 ${low} H738`, mode === "private" ? "tunnel" : "manage", mode === "private" ? 2.2 : 0);
      label(602, low - 14, mode === "private" ? t.vpn : t.ssh, mode === "private" ? "tunnel" : "manage");
      line(`M829 ${low - 32} V${top + 32}`, "manage");
      label(839, (top + low) / 2 + 4, t.runs, "manage", "start");
      node(240, low, 226, "panel", t.panel);
      node(738, low, 182, "server", t.podman);
      node(738, top, 182, "apps", mode === "private" ? t.appPrivate : t.app);
      if (mode === "public") {
        line(`M184 ${top} H540`, "traffic", 1.9);
        label(352, top - 14, t.straight, "traffic");
        line(`M690 ${top} H738`, "traffic", 0.6);
        node(540, top, 150, "caddy", t.caddy, true);
      } else if (mode === "relay") {
        line(`M184 ${top} H240`, "traffic", 0.8);
        label(212, top - 14, t.https, "traffic");
        line(`M466 ${top} H738`, "tunnel", 1.6);
        label(602, top - 14, t.relayed, "tunnel");
        node(240, top, 226, "caddy", t.caddy, true);
      } else {
        line(`M184 ${top} H490`, "none");
        label(337, top - 14, t.noRoute, "none");
        block(504, top);
        line(`M690 ${top} H738`, "manage");
        node(540, top, 150, "apps", t.others);
      }
    }
  } else {
    W = 380;
    const leftX = 16;
    const rightX = 200;
    const nodeW = 164;
    const leftLine = 28;
    const rightLine = 352;
    zones += text(12, 22, t.clients, P.zt, INK.title, 560);
    node(leftX, 72, nodeW, "globe", t.visitor);
    node(rightX, 72, nodeW, "you", t.you);
    if (host === "single") {
      H = 410;
      zone(8, 122, 364, 276, t.zoneSingle[0], t.zoneSingle[1], 36);
      line(`M${leftLine} 102 V212`, "traffic", 0.9);
      label(leftLine + 10, 116, t.https, "traffic", "start");
      line(`M${rightLine} 102 V212`, "manage");
      label(rightLine - 10, 116, t.https, "manage", "end");
      line("M98 242 V330", "traffic", 0.9);
      label(106, 276, t.proxies, "traffic", "start");
      line("M282 242 V330", "manage");
      label(274, 304, t.manages, "manage", "end");
      node(leftX, 212, nodeW, "caddy", t.caddy, true);
      node(rightX, 212, nodeW, "panel", t.panelSingle);
      node(leftX, 360, nodeW, "apps", t.apps);
      node(rightX, 360, nodeW, "server", t.podman);
    } else {
      H = 540;
      const row1 = 392;
      const row2 = 480;
      if (mode === "relay") zone(8, 122, 364, 136, t.zoneLitepod[0], t.zoneLitepod[2], 36);
      else zone(186, 122, 186, 136, t.zoneLitepod[0], t.zoneLitepod[2], 14);
      zone(8, 296, 364, 234, t.zoneRemote[0], t.zoneRemote[2], 36);
      line(`M${rightLine} 102 V182`, "manage");
      label(rightLine - 10, 116, t.https, "manage", "end");
      line(`M${rightLine} 242 V${row1 - 30}`, mode === "private" ? "tunnel" : "manage", mode === "private" ? 1.6 : 0);
      label(rightLine - 10, 282, mode === "private" ? t.vpn : t.ssh, mode === "private" ? "tunnel" : "manage", "end");
      line(`M282 ${row1 + 30} V${row2 - 30}`, "manage");
      label(292, row1 + 44, t.runs, "manage", "start");
      node(rightX, 212, nodeW, "panel", t.panel);
      node(rightX, row1, nodeW, "server", t.podman);
      node(rightX, row2, nodeW, "apps", mode === "private" ? t.appPrivate : t.app);
      if (mode === "public") {
        line(`M${leftLine} 102 V${row1 - 30}`, "traffic", 1.8);
        label(leftLine + 10, 200, t.https, "traffic", "start");
        line(`M98 ${row1 + 30} V${row2} H${rightX}`, "traffic", 1);
        node(leftX, row1, nodeW, "caddy", t.caddy, true);
      } else if (mode === "relay") {
        line(`M${leftLine} 102 V182`, "traffic", 0.7);
        label(leftLine + 10, 116, t.https, "traffic", "start");
        line(`M${leftLine} 242 V${row2} H${rightX}`, "tunnel", 1.8);
        label(leftLine + 10, 282, t.relayed, "tunnel", "start");
        node(leftX, 212, nodeW, "caddy", t.caddy, true);
      } else {
        line(`M${leftLine} 102 V252`, "none");
        label(leftLine + 10, 180, t.noRoute, "none", "start");
        block(leftLine, 270);
        line(`M180 ${row2} H${rightX}`, "manage");
        node(leftX, row2, nodeW, "apps", t.others);
      }
    }
  }

  const id = `lp-map-dots-${narrow ? "n" : "w"}`;
  return `<svg class="lp-map-svg ${narrow ? "lp-map-narrow" : "lp-map-wide"}" viewBox="0 0 ${W} ${H!}" role="img" aria-label="${esc(t.aria)}" style="display:block;width:100%;height:auto;font-family:inherit"><defs><pattern id="${id}" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="${INK.dot}"/></pattern></defs><rect width="${W}" height="${H!}" rx="16" fill="${INK.field}"/><rect width="${W}" height="${H!}" rx="16" fill="url(#${id})"/><g class="lp-map-zones">${zones}</g><g class="lp-map-lines">${lines}</g><g class="lp-map-nodes">${nodes}</g></svg>`;
}

/** Both geometries; the host page shows one with a container query on .lp-map-field. */
export const renderMap = (locale: MapLocale, host: MapHost, mode: MapMode) =>
  scene(locale, host, mode, false) + scene(locale, host, mode, true);

/** The facts under the map, as [label, value] pairs. */
export function mapFacts(locale: MapLocale, host: MapHost, mode: MapMode) {
  const t = COPY[locale];
  const row = t.rows[host === "single" ? "single" : mode];
  return [
    [t.read.dns, row[0]],
    [t.read.tls, row[1]],
    [t.read.open, row[2]],
    [t.read.good, row[3]],
  ] as const;
}

