export const links = {
  templates: "https://templates.litepod.sh",
  cloud:
    "https://app.litepod.sh/register?utm_source=landing&utm_medium=cta&utm_campaign=cloud",
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
      github: "GitHub",
      selfHost: "Self-host",
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
    selfLabel: "01 / Self-hosted",
    selfTitle: "Install on your own server.",
    selfBody: "Run Litepod directly on infrastructure you control, including the control plane.",
    selfCta: "Install on my server",
    cloudLabel: "02 / Litepod Cloud / BYOS",
    cloudTitle: "Bring your own server.",
    cloudBody:
      "Connect your server to Litepod Cloud. We manage the control plane, so you do not have to.",
    cloudCta: "Use Litepod Cloud",
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
      github: "GitHub",
      selfHost: "Autoalojar",
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
    selfLabel: "01 / Autoalojado",
    selfTitle: "Instala en tu propio servidor.",
    selfBody:
      "Ejecuta Litepod directamente en infraestructura que controlas, incluido el control plane.",
    selfCta: "Instalar en mi servidor",
    cloudLabel: "02 / Litepod Cloud / BYOS",
    cloudTitle: "Trae tu propio servidor.",
    cloudBody:
      "Conecta tu servidor a Litepod Cloud. Nosotros gestionamos el control plane para que no tengas que hacerlo.",
    cloudCta: "Usar Litepod Cloud",
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
    ["apps", "Applications / project environment"],
    ["volume", "Volumes / edit files in place"],
    ["shell", "Shell / attach to any container"],
  ],
  es: [
    ["apps", "Aplicaciones / entorno del proyecto"],
    ["volume", "Volúmenes / edita archivos en vivo"],
    ["shell", "Shell / conéctate a cualquier contenedor"],
  ],
};
