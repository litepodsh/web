// Spanish copy for /alternatives. Same shape and keys as alternatives.mjs; keep both in step.
export const litepodFactsEs = {
  hosting: "Tu propio VPS o servidor (cualquier máquina Linux)",
  selfHost: "Sí, instalación con un comando",
  runtime: "Podman, rootless por defecto",
  proxy: "Caddy con SSL automático de Let's Encrypt",
  deploy: "Repositorio Git (Railpack, Dockerfile o Compose), Docker Compose, imagen de registro, subida estática",
  databases: "Plantillas de bases de datos en el mismo servidor",
  minimum: "1 CPU, 800 MB de RAM (recomendado 2 CPU, 4 GiB)",
  footprint: "Unos 63 MB de RAM en los contenedores base, instalación nueva",
  managed: "Litepod Cloud: trae tu propio servidor, control plane gestionado",
  license: "Open source, Apache 2.0 (SSO enterprise bajo licencia comercial)",
  pricing: "La factura de tu servidor; Litepod Cloud es opcional",
  ai: "Asistente de IA integrado con tu propia clave de API (OpenAI, Anthropic, OpenRouter, Ollama…)",
  mcp: "Servidor MCP integrado por organización con inicio de sesión OAuth, sin token que pegar. Los agentes despliegan sitios estáticos, crean bases de datos y apps del catálogo desde plantillas, editan archivos Compose, redespliegan, gestionan variables de entorno y dominios, y arrancan o detienen apps; todo lo que no sea arrancar o detener espera la confirmación de una persona. Vienen más herramientas",
};

const mcpCan =
  "desplegar sitios estáticos, crear bases de datos y apps del catálogo desde plantillas, editar archivos Compose, redesplegar, gestionar variables de entorno y dominios, y arrancar o detener apps";

export const alternativesEs = {
  vercel: {
    name: "Vercel",
    mcp: "Servidor MCP alojado en mcp.vercel.com con OAuth, para la propia plataforma de Vercel",
    title: "Alternativa autoalojada a Vercel: despliega en tu propio VPS",
    h1: "La alternativa autoalojada a Vercel",
    description:
      "¿Buscas una alternativa autoalojada a Vercel? Litepod despliega apps, APIs, workers y bases de datos en tu propio VPS, con un precio de servidor predecible y sin facturas por uso.",
    answer:
      "Litepod es una alternativa autoalojada a Vercel. En lugar de ejecutar tu código en la plataforma serverless gestionada de Vercel, instalas Litepod en un VPS que alquilas, despliegas apps desde Git, un Dockerfile o Docker Compose, y ejecutas bases de datos en el mismo servidor. Pagas el servidor, no el ancho de banda ni las invocaciones de funciones.",
    rows: [
      ["Dónde se ejecutan tus apps", "litepod.hosting", "La infraestructura gestionada de Vercel"],
      ["Autoalojable", "litepod.selfHost", "No"],
      ["Modelo de precios", "litepod.pricing", "Planes por usuario más uso (ancho de banda, cómputo, funciones)"],
      ["Cargas de trabajo", "Contenedores de larga duración: apps web, APIs, workers, cron, bases de datos", "Frameworks frontend, funciones serverless y edge"],
      ["Orígenes de despliegue", "litepod.deploy", "Git con presets de frameworks, CLI"],
      ["Bases de datos", "litepod.databases", "Proveedores externos a través del marketplace"],
      ["Ubicación de los datos", "Tu servidor, tu región, tu proveedor", "Regiones de Vercel"],
    ],
    pickThem: [
      "Quieres una red edge global y ningún servidor que operar.",
      "Tu app es un frontend o un sitio Next.js que encaja en funciones serverless.",
      "Con tu tráfico, la facturación por uso sale más barata que un servidor.",
    ],
    pickUs: [
      "Quieres un coste mensual fijo: un VPS de Hetzner, DigitalOcean, OVH o cualquier proveedor.",
      "Ejecutas procesos de larga duración, WebSockets, colas, workers o tareas en segundo plano.",
      "Quieres PostgreSQL, MySQL, Redis u otras bases de datos junto a tu app, en tu servidor.",
      "Tus datos tienen que quedarse en infraestructura que controlas.",
      "Quieres que Claude Code o Cursor desplieguen y operen apps en tu propio servidor por MCP, iniciando sesión con OAuth.",
    ],
    migrate: [
      "Alquila un VPS Linux (2 CPU y 4 GiB de RAM es un buen inicio) y apunta un dominio a él.",
      "Instala Litepod con el instalador de una línea y crea tu cuenta de administrador.",
      "Crea un proyecto y conecta tu repositorio Git. Añade un Dockerfile si tu framework necesita un build propio.",
      "Define tus variables de entorno, asigna tu dominio y Caddy emite el certificado SSL.",
      "Mueve tu base de datos a una plantilla de Litepod en el mismo servidor y cambia el DNS.",
    ],
    faq: [
      [
        "¿Puedo autoalojar Vercel?",
        "No. Vercel es una plataforma gestionada y no se puede instalar en tu propio servidor. Litepod te da un flujo parecido de push para desplegar en un VPS que controlas.",
      ],
      [
        "¿Litepod puede ejecutar Next.js?",
        "Sí. Next.js corre como servidor Node.js en un contenedor, desplegado desde Git o un Dockerfile. Las funciones ligadas a la red edge de Vercel, como su CDN de imágenes, necesitan tu propia configuración.",
      ],
      [
        "¿Autoalojar es más barato que Vercel?",
        "Depende del tráfico. Con Litepod pagas un precio fijo de servidor, así que el coste no cambia cuando crecen el ancho de banda o las invocaciones de funciones.",
      ],
      [
        "¿Litepod tiene un servidor MCP como Vercel?",
        `Sí. Cada organización tiene su propio endpoint MCP en tu instancia de Litepod, y Claude Code, Cursor y otros clientes inician sesión con OAuth. Tu agente puede ${mcpCan}. Todo cambio que no sea arrancar o detener es una propuesta que confirmas en Litepod. Vienen más herramientas; abre un issue en GitHub para pedir las que necesites.`,
      ],
    ],
  },
  coolify: {
    name: "Coolify",
    mcp: "Endpoint MCP integrado, se activa por instancia; se autentica con un token de API de Coolify",
    title: "Alternativa a Coolify: PaaS autoalojado y ligero con Podman",
    h1: "Una alternativa ligera a Coolify",
    description:
      "¿Comparando alternativas a Coolify? Litepod es un PaaS autoalojado para tu VPS con Podman rootless, SSL con Caddy y un control plane de 63 MB. Mira cómo se comparan.",
    answer:
      "Litepod es una alternativa a Coolify para quien quiere un control plane más pequeño y rootless en su VPS. Los dos son PaaS autoalojados que despliegan apps y bases de datos en tu propio servidor. Coolify corre sobre Docker con Traefik; Litepod corre sobre Podman rootless con Caddy y usa unos 63 MB de RAM en sus contenedores base en una instalación nueva.",
    rows: [
      ["PaaS autoalojado", "Sí", "Sí"],
      ["Runtime de contenedores", "litepod.runtime", "Docker"],
      ["Usuario de instalación", "Rootless o root", "Root"],
      ["Proxy inverso", "litepod.proxy", "Traefik (Caddy opcional)"],
      ["Orígenes de despliegue", "litepod.deploy", "Git (Nixpacks, Dockerfile), Docker Compose, servicios de un clic"],
      ["Servidor mínimo documentado", "litepod.minimum", "2 CPU, 2 GB de RAM"],
      ["Opción gestionada", "litepod.managed", "Coolify Cloud: trae tu propio servidor"],
      ["Licencia", "litepod.license", "Open source, Apache 2.0"],
    ],
    pickThem: [
      "Quieres un catálogo grande de servicios de un clic hoy.",
      "Quieres una trayectoria larga en producción y una comunidad grande.",
      "Tu equipo ya estandariza en Docker y Traefik.",
    ],
    pickUs: [
      "La RAM está cada vez más cara y quieres gastarla en tus apps, no en el control plane.",
      "Prefieres contenedores rootless con Podman.",
      "Quieres SSO con OIDC, SAML y SCIM para tu organización.",
      "Quieres backups a S3 del control plane con un flujo de restauración documentado.",
      "Quieres un servidor MCP integrado al que tus agentes entran con OAuth y que despliega sitios estáticos, plantillas y stacks Compose por ti.",
    ],
    migrate: [
      "Instala Litepod en un VPS nuevo, o en el mismo servidor una vez detenido Coolify.",
      "Recrea cada proyecto y despliega desde el mismo repositorio Git, Dockerfile o archivo Docker Compose.",
      "Copia las variables de entorno y secretos de Coolify a cada aplicación de Litepod.",
      "Haz un volcado de cada base de datos, créala desde una plantilla de Litepod y restaura el volcado.",
      "Asigna tus dominios en Litepod y cambia el DNS cuando el nuevo despliegue esté sano.",
    ],
    faq: [
      [
        "¿Litepod es un fork de Coolify?",
        "No. Litepod es un código aparte construido sobre Podman, Caddy y Dragonfly, pero se inspiró en Coolify: la misma idea de un PaaS autoalojado en tu propio servidor, con un control plane más pequeño y rootless.",
      ],
      [
        "¿Puedo usar mis archivos Docker Compose de Coolify?",
        "Sí. Litepod despliega archivos Docker Compose, así que la mayoría de servicios basados en Compose se mueven con sus variables de entorno.",
      ],
      [
        "¿Cuál usa menos RAM?",
        "Los contenedores base de Litepod usaron unos 63 MB de memoria en una instalación nueva, medidos con podman stats. Coolify documenta 2 GB de RAM como tamaño mínimo de servidor. Con la RAM cada vez más cara (el \"RAMpocalypse\"), cada megabyte que no usa el control plane queda para tus propios sitios y apps. Mide los dos en tu servidor con tus cargas.",
      ],
      [
        "¿Cómo se compara el servidor MCP de Litepod con el de Coolify?",
        `Los dos vienen integrados. El endpoint MCP de Coolify usa un token de API de Coolify. Los clientes de Litepod inician sesión con OAuth, así que no queda un token de larga duración en un archivo de configuración. A través de él tu agente puede ${mcpCan}, y todo cambio que no sea arrancar o detener espera la confirmación de una persona.`,
      ],
    ],
  },
  dokploy: {
    name: "Dokploy",
    mcp: "Servidor MCP aparte (Dokploy/mcp) que ejecutas en local con una API key de Dokploy",
    title: "Alternativa a Dokploy: PaaS autoalojado para apps y bases de datos",
    h1: "Una alternativa rootless a Dokploy",
    description:
      "¿Necesitas una alternativa a Dokploy? Litepod despliega apps y bases de datos en tu VPS con Podman rootless en lugar de Docker Swarm, además de SSL con Caddy y backups a S3.",
    answer:
      "Litepod es una alternativa a Dokploy que corre sobre Podman rootless en lugar de Docker Swarm. Los dos son PaaS autoalojados para desplegar aplicaciones, stacks Docker Compose y bases de datos en tu propio VPS. Litepod se centra en un control plane pequeño, unos 63 MB de RAM en una instalación nueva, con Caddy para SSL automático.",
    rows: [
      ["PaaS autoalojado", "Sí", "Sí"],
      ["Runtime de contenedores", "litepod.runtime", "Docker con Docker Swarm"],
      ["Usuario de instalación", "Rootless o root", "Root"],
      ["Proxy inverso", "litepod.proxy", "Traefik"],
      ["Orígenes de despliegue", "litepod.deploy", "Git (Nixpacks, Dockerfile, Buildpacks), Docker Compose, plantillas"],
      ["Bases de datos", "litepod.databases", "PostgreSQL, MySQL, MariaDB, MongoDB, Redis"],
      ["Opción gestionada", "litepod.managed", "Dokploy Cloud: trae tu propio servidor"],
      ["Licencia", "litepod.license", "Código en GitHub, consulta la licencia del repositorio"],
    ],
    pickThem: [
      "Necesitas clustering con Docker Swarm en varios nodos.",
      "Quieres soporte de Buildpacks integrado.",
      "Ya ejecutas Traefik y Swarm en producción.",
    ],
    pickUs: [
      "Usas un solo VPS y quieres el control plane más pequeño, para que la RAM vaya a tus apps.",
      "Prefieres Podman rootless a un daemon de Docker como root.",
      "Quieres SSO con OIDC, SAML y SCIM.",
      "Quieres backups a S3 del control plane con un flujo de restauración documentado.",
      "Quieres un servidor MCP integrado al que tus agentes entran con OAuth y que despliega sitios estáticos, plantillas y stacks Compose por ti.",
    ],
    migrate: [
      "Instala Litepod en un VPS nuevo con el instalador de una línea.",
      "Recrea cada aplicación desde el mismo repositorio Git, Dockerfile o archivo Docker Compose.",
      "Copia las variables de entorno de Dokploy a cada aplicación de Litepod.",
      "Haz un volcado de cada base de datos, créala desde una plantilla de Litepod y restaura el volcado.",
      "Asigna tus dominios en Litepod y cambia el DNS cuando el nuevo despliegue esté sano.",
    ],
    faq: [
      [
        "¿Litepod es un fork de Dokploy?",
        "No. Litepod es un código aparte construido sobre Podman, Caddy y Dragonfly, pero se inspiró en Dokploy: la misma idea de desplegar apps, stacks Compose y bases de datos en tu propio VPS, sin Docker Swarm.",
      ],
      [
        "¿Litepod necesita Docker?",
        "No. Litepod instala y gestiona Podman, y corre rootless por defecto.",
      ],
      [
        "¿Puedo desplegar stacks Docker Compose?",
        "Sí. Litepod despliega archivos Docker Compose además de repositorios Git, Dockerfiles y subidas estáticas.",
      ],
      [
        "¿Puedo ejecutar bases de datos con Litepod?",
        "Sí. Litepod despliega bases de datos desde plantillas en el mismo servidor que tus apps. Respalda sus volúmenes aparte de los backups a S3 de Litepod.",
      ],
      [
        "¿Litepod tiene un servidor MCP como Dokploy?",
        `Sí, y viene integrado: no hay un paquete aparte que instalar. Cada organización tiene su propio endpoint MCP y los clientes inician sesión con OAuth en lugar de una API key. Tu agente puede ${mcpCan}; todo cambio que no sea arrancar o detener es una propuesta que confirma una persona.`,
      ],
    ],
  },
};

// Interface strings for the comparison layout and pages.
export const compareUi = {
  en: {
    alternatives: "Alternatives",
    alternativeOf: (name) => `${name} alternative`,
    lastReviewed: "Last reviewed:",
    installTitle: "Install Litepod on your VPS",
    installBody: "Run the installer on a Linux server you control. It works as root or rootless.",
    cloudLead: "Prefer not to run the control plane yourself?",
    cloudLink: "Start on Litepod Cloud",
    cloudTail: "and connect your own server. Read the",
    guideLink: "getting started guide",
    demoLead: "or open the",
    demoLink: "live demo",
    atAGlance: (name) => `Litepod vs ${name} at a glance`,
    caption: (name) => `Litepod compared with ${name}`,
    mcpRow: "MCP for AI agents",
    aiRow: "AI assistant",
    seeDocs: (name) => `See ${name}'s docs`,
    sourceNote: (name) =>
      `${name} details come from its public documentation as of the review date. Check its docs for current specifics.`,
    chooseThem: (name) => `When to choose ${name}`,
    chooseUs: "When to choose Litepod",
    migrate: (name) => `How to migrate from ${name} to Litepod`,
    faq: "Frequently asked questions",
    others: "Other comparisons",
    versus: (name) => `Litepod vs ${name}`,
    all: "All self-hosted PaaS alternatives",
    index: {
      title: "Self-Hosted Alternatives to Vercel, Coolify and Dokploy | Litepod",
      h1: "Self-hosted PaaS alternatives",
      description:
        "Compare Litepod with Vercel, Coolify and Dokploy. Deploy apps and databases on your own VPS with a lightweight, rootless self-hosted PaaS.",
      intro:
        "Litepod is a self-hosted PaaS: you install it on a VPS or server you control and deploy applications, Docker Compose stacks and databases from one panel. It is an alternative to managed platforms like Vercel, Heroku, Render and Railway, and to other self-hosted tools like Coolify, Dokploy and CapRover.",
      compare: "Compare Litepod",
      whatYouGet: "What you get with Litepod",
      facts: [
        ["Hosting", "hosting"],
        ["Deploy from", "deploy"],
        ["Databases", "databases"],
        ["Runtime", "runtime"],
        ["SSL", "proxy"],
        ["Footprint", "footprint"],
        ["AI", "ai"],
        ["MCP", "mcp"],
        ["Managed option", "managed"],
      ],
      managedTitle: "Managed PaaS or self-hosted PaaS?",
      managedBody:
        "A managed PaaS runs your code on the vendor's servers and bills for usage. A self-hosted PaaS runs on your own VPS: you pay a flat server price, keep your data where you choose, and can run long-lived processes and databases next to your apps. The trade-off is that you operate the server, its backups and its monitoring.",
    },
  },
  es: {
    alternatives: "Alternativas",
    alternativeOf: (name) => `Alternativa a ${name}`,
    lastReviewed: "Última revisión:",
    installTitle: "Instala Litepod en tu VPS",
    installBody: "Ejecuta el instalador en un servidor Linux que controlas. Funciona con root o sin root.",
    cloudLead: "¿Prefieres no operar el control plane tú mismo?",
    cloudLink: "Empieza en Litepod Cloud",
    cloudTail: "y conecta tu propio servidor. Lee la",
    guideLink: "guía de inicio",
    demoLead: "o abre la",
    demoLink: "demo en vivo",
    atAGlance: (name) => `Litepod vs ${name} de un vistazo`,
    caption: (name) => `Litepod comparado con ${name}`,
    mcpRow: "MCP para agentes de IA",
    aiRow: "Asistente de IA",
    seeDocs: (name) => `Consulta la documentación de ${name}`,
    sourceNote: (name) =>
      `Los datos de ${name} vienen de su documentación pública a la fecha de revisión. Consulta su documentación para los detalles actuales.`,
    chooseThem: (name) => `Cuándo elegir ${name}`,
    chooseUs: "Cuándo elegir Litepod",
    migrate: (name) => `Cómo migrar de ${name} a Litepod`,
    faq: "Preguntas frecuentes",
    others: "Otras comparaciones",
    versus: (name) => `Litepod vs ${name}`,
    all: "Todas las alternativas de PaaS autoalojado",
    index: {
      title: "Alternativas autoalojadas a Vercel, Coolify y Dokploy | Litepod",
      h1: "Alternativas de PaaS autoalojado",
      description:
        "Compara Litepod con Vercel, Coolify y Dokploy. Despliega apps y bases de datos en tu propio VPS con un PaaS autoalojado, ligero y rootless.",
      intro:
        "Litepod es un PaaS autoalojado: lo instalas en un VPS o servidor que controlas y despliegas aplicaciones, stacks Docker Compose y bases de datos desde un panel. Es una alternativa a plataformas gestionadas como Vercel, Heroku, Render y Railway, y a otras herramientas autoalojadas como Coolify, Dokploy y CapRover.",
      compare: "Compara Litepod",
      whatYouGet: "Lo que obtienes con Litepod",
      facts: [
        ["Alojamiento", "hosting"],
        ["Despliega desde", "deploy"],
        ["Bases de datos", "databases"],
        ["Runtime", "runtime"],
        ["SSL", "proxy"],
        ["Consumo", "footprint"],
        ["IA", "ai"],
        ["MCP", "mcp"],
        ["Opción gestionada", "managed"],
      ],
      managedTitle: "¿PaaS gestionado o PaaS autoalojado?",
      managedBody:
        "Un PaaS gestionado ejecuta tu código en los servidores del proveedor y factura por uso. Un PaaS autoalojado corre en tu propio VPS: pagas un precio fijo de servidor, dejas tus datos donde elijas y puedes ejecutar procesos de larga duración y bases de datos junto a tus apps. A cambio, tú operas el servidor, sus backups y su monitorización.",
    },
  },
};
