export const links = {
  templates: "https://templates.litepod.sh",
  demo: "https://demo.litepod.sh",
  cloud: "https://app.litepod.sh/register?utm_source=landing&utm_medium=cta&utm_campaign=cloud",
  docs: "https://docs.litepod.sh",
  github: "https://github.com/litepodsh/litepod",
  license: "https://github.com/litepodsh/litepod/blob/main/LICENSE",
};

// Internal comparison pages (src/pages/alternatives). Linked from the footer on every page.
export const comparePages = [
  ["/alternatives", "All alternatives"],
  ["/alternatives/vercel", "Vercel alternative"],
  ["/alternatives/coolify", "Coolify alternative"],
  ["/alternatives/dokploy", "Dokploy alternative"],
];

export const installCommand = "curl -fsSL https://litepod.sh/install.sh | bash";

export const locales = {
  en: {
    languageName: "ES",
    nav: {
      pricing: "Pricing",
      templates: "Templates",
      cloud: "Cloud",
      docs: "Docs",
      demo: "Demo",
      github: "GitHub",
      selfHost: "Self-host",
      cloudCta: "Try Cloud",
    },
    eyebrow: "Self-hosted PaaS · MCP + AI assistant built in",
    heroTitle: "Host your apps.\nKeep control.",
    heroLead: "Host your",
    heroTerms: ["apps.", "databases.", "services.", "infrastructure."],
    heroClose: "Keep control.",
    heroAccessible: "Host your apps, databases, services, and infrastructure. Keep control.",
    intro:
      "Deploy apps, databases, and services on any VPS you control: a lightweight, self-hosted alternative to Vercel, Coolify, and Dokploy, without building your own control plane.",
    trust: ["Apache 2.0", "~63 MB", "Rootless Podman", "MCP executes actions"],
    heroCommandNote: "Installer works on root or rootless.",
    statsNote: "Fresh installation footprint, measured with podman stats.",
    statsTotal: "Sum of memory used across the three containers: 62.73MB.",
    pathsEyebrow: "Operating paths",
    pathsTitle: "Choose how you want to operate.",
    selfLabel: "02 / Self-hosted",
    selfTitle: "Install on your own server.",
    selfBody: "Run Litepod directly on infrastructure you control, including the control plane.",
    selfCta: "Install on my server",
    cloudLabel: "01 / Litepod Cloud / BYOS",
    cloudTitle: "Bring your own server.",
    cloudBody:
      "Connect your server to Litepod Cloud. We manage the control plane, so you do not have to.",
    cloudCta: "Start on Litepod Cloud",
    cloudBadge: "Now open",
    cloudPoints: [
      "Managed control plane, updates and backups",
      "Your server, your data, your bill",
      "Connect a machine in one command",
    ],
    heroCloudCta: "Start on Cloud",
    heroSelfCta: "or self-host it",
    heroDemoCta: "Try the live demo",
    demoNote: "Static demo at demo.litepod.sh — sign in with any username and password.",
    metrics: {
      eyebrow: "The numbers",
      title: "Small footprint. Real capacity.",
      items: [
        ["~63 MB", "Control plane on a fresh install"],
        ["4", "Deploy paths: Git, Compose, image, static"],
        ["~100", "Open-source apps in the catalog"],
        ["6", "Database engines built in"],
      ],
    },
    ctaEyebrow: "Litepod Cloud",
    ctaTitle: "Your server. Our control plane.",
    ctaBody:
      "Register, connect a machine you already pay for, and deploy your first app in minutes. Move back to self-hosting whenever you want.",
    ctaSecondary: "Read the docs",
    copy: "Copy",
    copied: "Copied",
    commandNote: "Installer works on root or rootless.",
    copyUnavailable: "Clipboard unavailable — select the command manually.",
    showcaseEyebrow: "Made for the long run",
    showcaseTitle: "One place for the apps you actually use.",
    showcaseIntro:
      "Deploy from a template, edit a volume, or open a shell — every container on your server from one panel.",
    demoEyebrow: "Live demo",
    demoTitle: "See it before you install.",
    demoBody:
      "A static demo of the Litepod panel — open a project, browse the templates, and get a feel for the control plane without touching a server.",
    demoHint: "No sign-up. Enter with any username and password.",
    demoCta: "Open the demo",
    demoSecondary: "Read the docs",
    openSource: "Open source · Apache 2.0",
    deploy: {
      eyebrow: "Deployment types",
      title: "Four ways in. One rollout.",
      intro:
        "Every application has one deploy type. It only decides what you hand Litepod; after that, env vars, volumes, domains and resource limits behave the same for all four.",
      provide: "You provide",
      bestFor: "Good for",
      buildMethods: "Build method",
      types: [
        {
          title: "Git repository",
          tagline: "Push to deploy",
          body: "Connect GitHub or any Git URL, pick a branch, and Litepod builds the image on your server. Turn on auto-deploy to ship every push, and follow the build log live.",
          needs: ["Repository URL", "Branch", "Container port"],
          bestFor: "Your own code: Next.js, Rails, Django, Go or Rust services.",
        },
        {
          title: "Docker Compose",
          tagline: "Paste a stack",
          body: "Paste or edit a compose.yml in the panel. Litepod runs every service as one application, on one network, on rootless Podman, with the domains you attach.",
          needs: ["A compose.yml", "The public service, if it gets a domain"],
          bestFor: "Multi-container stacks and self-hosted apps with their own sidecars.",
        },
        {
          title: "Registry image",
          tagline: "Pull and run",
          body: "Point at a prebuilt image on any registry, public or private. The target server pulls it, with your credentials when needed, and runs it like any image Litepod built.",
          needs: ["Image reference, e.g. ghcr.io/owner/app:tag", "Container port", "Registry credentials, if private"],
          bestFor: "Images built in your CI, vendor images and pinned releases.",
        },
        {
          title: "Static upload",
          tagline: "Upload a folder",
          body: "Upload your build output as an archive. Litepod serves it from a Caddy container with HTTPS on your domain. Nothing is built on the server.",
          needs: ["An archive of your build output"],
          bestFor: "Docs, landing pages and SPA builds from Vite, Astro or Hugo.",
        },
      ],
      methods: [
        ["Railpack", "Zero-config. Detects the language and builds an image. No Dockerfile needed."],
        ["Dockerfile", "Builds the Dockerfile at the path you set in the repository."],
        ["Compose", "Builds the compose.yml in the repository; you choose the public service."],
      ],
      rolloutTitle: "Every deploy, whatever the type",
      rolloutNote:
        "The serving release keeps answering until its isolated replacement is ready. If the new one never gets there, it is discarded and the old one keeps running.",
      rollout: ["Queued", "Build or pull", "Start candidate", "Ready check", "Swap traffic"],
      stackEyebrow: "What you can deploy",
      stackMore: "and more",
      stackRailpack: "If Railpack supports it, Litepod deploys it",
      stackTitle: "If it builds, it ships.",
      stackIntro:
        "Railpack detects most stacks from the repository, with no Dockerfile. Anything else ships as a Dockerfile, a Compose file or an image, and it all runs on rootless Podman.",
      stack: [
        ["Static sites and SPAs", "Upload the build output, or push the repo: Railpack detects Vite, Astro, Angular and React Router builds and serves them with Caddy."],
        ["Full-stack JavaScript", "Push the repo and Railpack installs, builds and runs your start script on Node, Bun or Deno."],
        ["Backends and APIs", "Python, Ruby, PHP, Go, Rust, Java and .NET services build from the repository with Railpack."],
        ["Anything in a container", "Bring a Dockerfile, a Compose file or a prebuilt image from any registry. Everything runs on rootless Podman, so Docker images and Compose files work as they are."],
      ],
    },
    servers: {
      eyebrow: "Where it runs",
      title: "Runs on servers in your account.",
      body: "Litepod never hosts your workloads. Connect Debian, Ubuntu, Fedora or Arch machines over key-only SSH, from Hetzner, DigitalOcean, OVHcloud, IONOS, Azure, AWS or a box under your desk. Your provider bills you; Litepod only drives the containers.",
      modesTitle: "Pick how each server takes traffic",
      modes: [
        ["Public edge", "DNS points straight at the server. Caddy runs there and terminates TLS."],
        ["Private relay", "DNS points at Litepod; traffic is relayed over SSH. Nothing on the server is exposed."],
        ["Private only", "No public domains. Reachable only from inside Litepod."],
      ],
      groups: "Server groups deploy one application as an independent replica on every member server, so the panel shows “2 of 3 running” instead of a single status.",
      rootless: "Rootless Podman by default",
    },
    kits: {
      eyebrow: "Templates",
      title: "Two kinds of templates.",
      intro:
        "Internal templates are built into Litepod and managed by it. Catalog templates are open-source apps you deploy as an editable Compose stack.",
      internalLabel: "01 / Internal",
      internalTitle: "Managed databases, built in.",
      internalBody:
        "Shipped inside Litepod, not fetched from a catalog. Litepod writes the service, generates the password, mounts a persistent volume and hands you the connection string. Swap the image or open a public port when you need to.",
      engine: "Engine",
      image: "Default image",
      port: "Port",
      catalogLabel: "02 / Catalog",
      catalogTitle: "Open-source apps, one form away.",
      catalogBody:
        "Close to 100 apps at templates.litepod.sh. Each one is a compose file, an env file and an icon. Fill the variables it asks for and it deploys as a Compose application you can edit afterwards.",
      catalogCta: "Browse the catalog",
    },
  },
  es: {
    languageName: "EN",
    nav: {
      pricing: "Precios",
      templates: "Plantillas",
      cloud: "Nube",
      docs: "Documentación",
      demo: "Demo",
      github: "GitHub",
      selfHost: "Autoalojar",
      cloudCta: "Probar Cloud",
    },
    eyebrow: "PaaS autoalojado · MCP + asistente de IA integrado",
    heroTitle: "Aloja tus apps.\nMantén el control.",
    heroLead: "Aloja tus",
    heroTerms: ["apps.", "bases de datos.", "servicios.", "infraestructura."],
    heroClose: "Mantén el control.",
    heroAccessible:
      "Aloja tus apps, bases de datos, servicios e infraestructura. Mantén el control.",
    intro:
      "Despliega apps, bases de datos y servicios en cualquier VPS que controlas: una alternativa ligera y autoalojada a Vercel, Coolify y Dokploy, sin montar tu propio control plane.",
    trust: ["Apache 2.0", "~63 MB", "Rootless Podman", "MCP ejecuta acciones"],
    heroCommandNote: "El instalador funciona con root o sin root.",
    statsNote: "Uso de una instalación nueva, medido con podman stats.",
    statsTotal: "Suma de memoria usada por los tres contenedores: 62.73MB.",
    pathsEyebrow: "Formas de operar",
    pathsTitle: "Elige cómo quieres operar.",
    selfLabel: "02 / Autoalojado",
    selfTitle: "Instala en tu propio servidor.",
    selfBody:
      "Ejecuta Litepod directamente en infraestructura que controlas, incluido el control plane.",
    selfCta: "Instalar en mi servidor",
    cloudLabel: "01 / Litepod Cloud / BYOS",
    cloudTitle: "Trae tu propio servidor.",
    cloudBody:
      "Conecta tu servidor a Litepod Cloud. Nosotros gestionamos el control plane para que no tengas que hacerlo.",
    cloudCta: "Empezar en Litepod Cloud",
    cloudBadge: "Ya disponible",
    cloudPoints: [
      "Control plane gestionado, actualizaciones y backups",
      "Tu servidor, tus datos, tu factura",
      "Conecta una máquina con un comando",
    ],
    heroCloudCta: "Empezar en Cloud",
    heroSelfCta: "o autoalójalo",
    heroDemoCta: "Probar la demo en vivo",
    demoNote: "Demo estática en demo.litepod.sh — entra con cualquier usuario y contraseña.",
    metrics: {
      eyebrow: "Los números",
      title: "Huella pequeña. Capacidad real.",
      items: [
        ["~63 MB", "Control plane en instalación nueva"],
        ["4", "Vías de despliegue: Git, Compose, imagen, estático"],
        ["~100", "Apps open source del catálogo"],
        ["6", "Motores de base de datos incluidos"],
      ],
    },
    ctaEyebrow: "Litepod Cloud",
    ctaTitle: "Tu servidor. Nuestro control plane.",
    ctaBody:
      "Regístrate, conecta una máquina que ya pagas y despliega tu primera app en minutos. Vuelve a autoalojar cuando quieras.",
    ctaSecondary: "Leer la documentación",
    copy: "Copiar",
    copied: "Copiado",
    commandNote: "El instalador funciona con root o sin root.",
    copyUnavailable: "Portapapeles no disponible — selecciona el comando manualmente.",
    showcaseEyebrow: "Hecho para durar",
    showcaseTitle: "Un lugar para las aplicaciones que realmente usas.",
    showcaseIntro:
      "Despliega desde una plantilla, edita un volumen o abre una shell — todos los contenedores de tu servidor desde un panel.",
    demoEyebrow: "Demo en vivo",
    demoTitle: "Míralo antes de instalarlo.",
    demoBody:
      "Una demo estática del panel de Litepod — abre un proyecto, explora las plantillas y hazte una idea del control plane sin tocar un servidor.",
    demoHint: "Sin registro. Entra con cualquier usuario y contraseña.",
    demoCta: "Abrir la demo",
    demoSecondary: "Leer la documentación",
    openSource: "Open source · Apache 2.0",
    deploy: {
      eyebrow: "Tipos de despliegue",
      title: "Cuatro formas de entrar. Un solo rollout.",
      intro:
        "Cada aplicación tiene un tipo de despliegue. Solo decide qué le entregas a Litepod; después, variables, volúmenes, dominios y límites de recursos funcionan igual en los cuatro.",
      provide: "Tú aportas",
      bestFor: "Ideal para",
      buildMethods: "Método de build",
      types: [
        {
          title: "Repositorio Git",
          tagline: "Push para desplegar",
          body: "Conecta GitHub o cualquier URL Git, elige una rama y Litepod construye la imagen en tu servidor. Activa el auto-deploy para publicar cada push y sigue el log del build en vivo.",
          needs: ["URL del repositorio", "Rama", "Puerto del contenedor"],
          bestFor: "Tu propio código: Next.js, Rails, Django, servicios en Go o Rust.",
        },
        {
          title: "Docker Compose",
          tagline: "Pega un stack",
          body: "Pega o edita un compose.yml en el panel. Litepod ejecuta todos los servicios como una sola aplicación, en una red, sobre Podman rootless, con los dominios que le asignes.",
          needs: ["Un compose.yml", "El servicio público, si lleva dominio"],
          bestFor: "Stacks multi-contenedor y apps autoalojadas con sus propios sidecars.",
        },
        {
          title: "Imagen de registro",
          tagline: "Descarga y ejecuta",
          body: "Apunta a una imagen ya construida en cualquier registro, público o privado. El servidor destino la descarga, con tus credenciales si hace falta, y la ejecuta como cualquier imagen construida por Litepod.",
          needs: ["Referencia de imagen, p. ej. ghcr.io/owner/app:tag", "Puerto del contenedor", "Credenciales del registro, si es privado"],
          bestFor: "Imágenes construidas en tu CI, imágenes de terceros y versiones fijadas.",
        },
        {
          title: "Subida estática",
          tagline: "Sube una carpeta",
          body: "Sube el resultado de tu build como archivo comprimido. Litepod lo sirve desde un contenedor Caddy con HTTPS en tu dominio. No se construye nada en el servidor.",
          needs: ["Un archivo con el resultado del build"],
          bestFor: "Documentación, landings y SPAs de Vite, Astro o Hugo.",
        },
      ],
      methods: [
        ["Railpack", "Sin configuración. Detecta el lenguaje y construye la imagen. No necesitas Dockerfile."],
        ["Dockerfile", "Construye el Dockerfile en la ruta que indiques dentro del repositorio."],
        ["Compose", "Construye el compose.yml del repositorio; tú eliges el servicio público."],
      ],
      rolloutTitle: "Cada despliegue, sea del tipo que sea",
      rolloutNote:
        "La versión activa sigue respondiendo hasta que su reemplazo aislado está listo. Si el nuevo nunca lo logra, se descarta y la versión anterior sigue funcionando.",
      rollout: ["En cola", "Build o pull", "Arranca candidato", "Comprobación", "Cambio de tráfico"],
      stackEyebrow: "Qué puedes desplegar",
      stackMore: "y más",
      stackRailpack: "Si Railpack lo soporta, Litepod lo despliega",
      stackTitle: "Si compila, se despliega.",
      stackIntro:
        "Railpack detecta la mayoría de stacks desde el repositorio, sin Dockerfile. Todo lo demás se despliega como Dockerfile, archivo Compose o imagen, y todo corre sobre Podman rootless.",
      stack: [
        ["Sitios estáticos y SPAs", "Sube el resultado del build o haz push del repo: Railpack detecta builds de Vite, Astro, Angular y React Router y los sirve con Caddy."],
        ["JavaScript full-stack", "Haz push del repo y Railpack instala, construye y ejecuta tu script de inicio en Node, Bun o Deno."],
        ["Backends y APIs", "Servicios en Python, Ruby, PHP, Go, Rust, Java y .NET se construyen desde el repositorio con Railpack."],
        ["Cualquier cosa en un contenedor", "Trae un Dockerfile, un archivo Compose o una imagen ya construida de cualquier registro. Todo corre sobre Podman rootless, así que las imágenes de Docker y los archivos Compose funcionan tal cual."],
      ],
    },
    servers: {
      eyebrow: "Dónde se ejecuta",
      title: "Se ejecuta en servidores de tu cuenta.",
      body: "Litepod nunca aloja tus cargas. Conecta máquinas Debian, Ubuntu, Fedora o Arch por SSH solo con llave, de Hetzner, DigitalOcean, OVHcloud, IONOS, Azure, AWS o un equipo bajo tu escritorio. Tu proveedor te factura; Litepod solo maneja los contenedores.",
      modesTitle: "Elige cómo recibe tráfico cada servidor",
      modes: [
        ["Edge público", "El DNS apunta directo al servidor. Caddy corre ahí y termina TLS."],
        ["Relay privado", "El DNS apunta a Litepod; el tráfico se reenvía por SSH. Nada del servidor queda expuesto."],
        ["Solo privado", "Sin dominios públicos. Solo accesible desde dentro de Litepod."],
      ],
      groups: "Los grupos de servidores despliegan una aplicación como réplica independiente en cada servidor miembro, y el panel muestra “2 de 3 en ejecución” en lugar de un único estado.",
      rootless: "Podman rootless por defecto",
    },
    kits: {
      eyebrow: "Plantillas",
      title: "Dos tipos de plantillas.",
      intro:
        "Las plantillas internas vienen dentro de Litepod y él las gestiona. Las del catálogo son apps open source que despliegas como un stack Compose editable.",
      internalLabel: "01 / Internas",
      internalTitle: "Bases de datos gestionadas, incluidas.",
      internalBody:
        "Vienen dentro de Litepod, no se descargan de un catálogo. Litepod escribe el servicio, genera la contraseña, monta un volumen persistente y te da la cadena de conexión. Cambia la imagen o abre un puerto público cuando lo necesites.",
      engine: "Motor",
      image: "Imagen por defecto",
      port: "Puerto",
      catalogLabel: "02 / Catálogo",
      catalogTitle: "Apps open source, a un formulario.",
      catalogBody:
        "Cerca de 100 apps en templates.litepod.sh. Cada una es un archivo compose, un archivo env y un icono. Rellena las variables que pide y se despliega como una aplicación Compose que puedes editar después.",
      catalogCta: "Ver el catálogo",
    },
  },
};

export const benefits = {
  en: [
    [
      "Bring your own machine",
      "Deploy onto infrastructure you control, without a black box between you and your apps.",
    ],
    [
      "Start from a template",
      "Choose a known stack, set the variables, and keep moving instead of assembling a server from scratch.",
    ],
    [
      "Cloud, without the control plane",
      "Bring your own server to Litepod Cloud when you want us to operate the control plane.",
    ],
  ],
  es: [
    [
      "Usa tu propia máquina",
      "Despliega en infraestructura que controlas, sin una caja negra entre tus aplicaciones y tú.",
    ],
    [
      "Empieza desde una plantilla",
      "Elige un stack conocido, define las variables y avanza sin montar un servidor desde cero.",
    ],
    [
      "Cloud, sin el control plane",
      "Trae tu propio servidor a Litepod Cloud cuando quieras que gestionemos el control plane.",
    ],
  ],
};

export const mediaSlots = {
  en: [
    ["home", "Home / projects, containers and recent activity at a glance"],
    ["overview", "Overview / status, deploy URL and compose in one view"],
    ["deployments", "Deployments / every build with its live log"],
    ["analytics", "Analytics / requests, errors and latency through the proxy"],
    ["metrics", "Metrics / CPU and memory per application"],
    ["terminal", "Terminal / a shell inside any container"],
    ["volumes", "Volumes / persistent storage and live mounts"],
    ["fleet", "Fleet / every server on one globe"],
    ["templates", "Templates / start from a known stack"],
  ],
  es: [
    ["home", "Inicio / proyectos, contenedores y actividad reciente de un vistazo"],
    ["overview", "Resumen / estado, URL de despliegue y compose en una vista"],
    ["deployments", "Despliegues / cada build con su log en vivo"],
    ["analytics", "Analíticas / peticiones, errores y latencia a través del proxy"],
    ["metrics", "Métricas / CPU y memoria por aplicación"],
    ["terminal", "Terminal / una shell dentro de cualquier contenedor"],
    ["volumes", "Volúmenes / almacenamiento persistente y montajes en vivo"],
    ["fleet", "Flota / todos tus servidores en un globo"],
    ["templates", "Plantillas / empieza desde un stack conocido"],
  ],
};

// Internal database templates shipped in the API (litepod/apps/api/src/templates/internal_templates).
// Keep in step with each template's DEFAULT_IMAGE and PORT.
// Each entry: [engine, light icon file, dark icon file or null, default image, port].
export const internalTemplates = [
  ["PostgreSQL", "postgres", "postgres_dark", "postgres:17.2", "5432"],
  ["MariaDB", "mariadb", "mariadb_dark", "mariadb:11.8", "3306"],
  ["MongoDB", "mongodb", null, "mongo:8.0", "27017"],
  ["DragonflyDB", "dragonfly", "dragonfly_dark", "dragonflydb/dragonfly", "6379"],
  ["KeyDB", "keydb", "keydb_dark", "eqalpha/keydb", "6379"],
  ["SQL Server", "sqlserver", "sqlserver_dark", "mssql/server:2025-latest", "1433"],
];

// A sample of the catalog at templates.litepod.sh, shown as chips on the landing page.
// Each entry: [name, template id, icon url]. Ids and icons come from the catalog
// manifests (litepod/templates/templates/<id>/template.toml).
export const catalogSample = [
  ["Uptime Kuma", "uptime-kuma", "https://raw.githubusercontent.com/louislam/uptime-kuma/master/public/icon.svg"],
  ["n8n", "n8n", "https://github.com/n8n-io.png"],
  ["Plausible", "plausible", "https://github.com/plausible.png"],
  ["Immich", "immich", "https://github.com/immich-app.png"],
  ["Vaultwarden", "vaultwarden", "https://templates.litepod.sh/api/v1/templates/vaultwarden/icon"],
  ["Supabase", "supabase", "https://github.com/supabase.png"],
  ["Ghost", "ghost", "https://github.com/TryGhost.png"],
  ["Gitea", "gitea-postgres", "https://github.com/go-gitea.png"],
  ["Outline", "outline", "https://github.com/outline.png"],
  ["authentik", "authentik", "https://github.com/goauthentik.png"],
  ["Grafana", "grafana", "https://github.com/grafana.png"],
  ["Home Assistant", "homeassistant", "https://github.com/home-assistant.png"],
];

// Logos from svgl.app, self-hosted in public/stack. Each entry: [name, light file, dark file?].
// Groups match `deploy.stack` in each locale.
export const stackLogos = [
  [
    ["HTML5", "html5"],
    ["CSS", "css"],
    ["JavaScript", "javascript"],
    ["Astro", "astro-icon-light", "astro-icon-dark"],
    ["Vite", "vite"],
    ["Angular", "angular"],
    ["React", "react_light", "react_dark"],
    ["Hugo", "hugo"],
  ],
  [
    ["Next.js", "nextjs_icon_dark"],
    ["Nuxt", "nuxt"],
    ["SvelteKit", "svelte"],
    ["Remix", "remix_light", "remix_dark"],
    ["Node.js", "nodejs"],
    ["Bun", "bun"],
    ["Deno", "deno", "deno_dark"],
    ["NestJS", "nestjs"],
    ["Express", "expressjs", "expressjs_dark"],
  ],
  [
    ["Python", "python"],
    ["Django", "django"],
    ["FastAPI", "fastapi"],
    ["Flask", "flask-light", "flask-dark"],
    ["Ruby", "ruby"],
    ["Laravel", "laravel"],
    ["PHP", "php", "php_dark"],
    ["Go", "golang", "golang_dark"],
    ["Rust", "rust", "rust_dark"],
    ["Java", "java"],
    ["Spring", "spring"],
    [".NET", "dotnet"],
    ["C#", "csharp"],
  ],
  [["Docker", "docker"], ["Podman", "podman", "podman_dark"], ["Compose", "compose"]],
];
