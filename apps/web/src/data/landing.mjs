export const links = {
  templates: "https://templates.litepod.sh",
  demo: "https://demo.litepod.sh",
  cloud: "https://app.litepod.sh/register?utm_source=landing&utm_medium=cta&utm_campaign=cloud",
  docs: "https://docs.litepod.sh",
  github: "https://github.com/litepodsh/web",
};

export const installCommand = "curl -fsSL https://litepod.sh/install.sh | bash";

export const locales = {
  en: {
    languageName: "ES",
    nav: {
      templates: "Templates",
      cloud: "Cloud",
      docs: "Docs",
      demo: "Demo",
      github: "GitHub",
      selfHost: "Self-host",
      cloudCta: "Try Cloud",
    },
    eyebrow: "Infrastructure without a black box.",
    heroTitle: "Host your apps.\nKeep control.",
    heroLead: "Host your",
    heroTerms: ["apps.", "databases.", "services.", "infrastructure."],
    heroClose: "Keep control.",
    heroAccessible: "Host your apps, databases, services, and infrastructure. Keep control.",
    intro:
      "Deploy applications, databases, and services on a machine you control without building your own control plane from scratch.",
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
  },
  es: {
    languageName: "EN",
    nav: {
      templates: "Plantillas",
      cloud: "Nube",
      docs: "Documentación",
      demo: "Demo",
      github: "GitHub",
      selfHost: "Autoalojar",
      cloudCta: "Probar Cloud",
    },
    eyebrow: "Infraestructura sin una caja negra.",
    heroTitle: "Aloja tus apps.\nMantén el control.",
    heroLead: "Aloja tus",
    heroTerms: ["apps.", "bases de datos.", "servicios.", "infraestructura."],
    heroClose: "Mantén el control.",
    heroAccessible:
      "Aloja tus apps, bases de datos, servicios e infraestructura. Mantén el control.",
    intro:
      "Despliega aplicaciones, bases de datos y servicios en una máquina que controlas sin montar tu propio control plane desde cero.",
    heroCommandNote: "El instalador llegará pronto — el comando es una vista previa.",
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
    ctaEyebrow: "Litepod Cloud",
    ctaTitle: "Tu servidor. Nuestro control plane.",
    ctaBody:
      "Regístrate, conecta una máquina que ya pagas y despliega tu primera app en minutos. Vuelve a autoalojar cuando quieras.",
    ctaSecondary: "Leer la documentación",
    copy: "Copiar",
    copied: "Copiado",
    commandNote: "Comando de ejemplo — el instalador llegará pronto.",
    copyUnavailable: "Portapapeles no disponible — selecciona el comando manualmente.",
    showcaseEyebrow: "Hecho para durar",
    showcaseTitle: "Un lugar para las aplicaciones que realmente usas.",
    showcaseIntro:
      "Despliega desde una plantilla, edita un volumen o abre una shell — todos los contenedores de tu servidor desde un panel.",
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
