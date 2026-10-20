// Comparison pages under /alternatives. Competitor facts come from their public docs;
// keep `reviewed` current whenever a row changes, and never state numbers we did not measure.
export const reviewed = "2026-10-20";

export const litepodFacts = {
  hosting: "Your own VPS or server (any Linux machine)",
  selfHost: "Yes, one-command install",
  runtime: "Podman, rootless by default",
  proxy: "Caddy with automatic Let's Encrypt SSL",
  deploy: "Git repository, Dockerfile, Docker Compose, static upload",
  databases: "Database templates on the same server",
  minimum: "1 CPU, 800 MB RAM (2 CPU, 4 GiB recommended)",
  footprint: "About 63 MB RAM across core containers, fresh install",
  managed: "Litepod Cloud: bring your own server, managed control plane",
  license: "Source release planned under Apache 2.0",
  pricing: "Your server bill; Litepod Cloud is optional",
  ai: "Built-in AI assistant with your own API key (OpenAI, Anthropic, OpenRouter, Ollama…), plus an MCP server for Claude Code, Cursor and other agents",
};

export const alternatives = {
  vercel: {
    name: "Vercel",
    title: "Self-Hosted Vercel Alternative: Deploy on Your Own VPS",
    h1: "The self-hosted Vercel alternative",
    description:
      "Looking for a self-hosted Vercel alternative? Litepod deploys apps, APIs, workers and databases on your own VPS, with predictable server pricing and no usage bills.",
    answer:
      "Litepod is a self-hosted alternative to Vercel. Instead of running your code on Vercel's managed serverless platform, you install Litepod on a VPS you rent, then deploy apps from Git, a Dockerfile or Docker Compose, and run databases on the same server. You pay for the server, not for bandwidth or function invocations.",
    rows: [
      ["Where your apps run", "litepod.hosting", "Vercel's managed infrastructure"],
      ["Self-hostable", "litepod.selfHost", "No"],
      ["Pricing model", "litepod.pricing", "Per-seat plans plus usage (bandwidth, compute, functions)"],
      ["Workloads", "Long-running containers: web apps, APIs, workers, cron, databases", "Frontend frameworks, serverless and edge functions"],
      ["Deploy sources", "litepod.deploy", "Git with framework presets, CLI"],
      ["Databases", "litepod.databases", "External providers through the marketplace"],
      ["Data location", "Your server, your region, your provider", "Vercel regions"],
    ],
    pickThem: [
      "You want a global edge network and zero servers to operate.",
      "Your app is a frontend or Next.js site that fits serverless functions.",
      "Usage-based billing is cheaper than a server at your traffic.",
    ],
    pickUs: [
      "You want a fixed monthly cost: a VPS from Hetzner, DigitalOcean, OVH or any provider.",
      "You run long-lived processes, WebSockets, queues, workers or background jobs.",
      "You want PostgreSQL, MySQL, Redis or other databases next to your app, on your server.",
      "Your data has to stay on infrastructure you control.",
      "You want an AI assistant and MCP connection to your server, using your own API key.",
    ],
    migrate: [
      "Rent a Linux VPS (2 CPU and 4 GiB RAM is a good start) and point a domain at it.",
      "Install Litepod with the one-line installer and create your admin account.",
      "Create a project and connect your Git repository. Add a Dockerfile if your framework needs a custom build.",
      "Set your environment variables, attach your domain, and Caddy issues the SSL certificate.",
      "Move your database to a Litepod database template on the same server, then switch DNS.",
    ],
    faq: [
      [
        "Can I self-host Vercel?",
        "No. Vercel is a managed platform and cannot be installed on your own server. Litepod gives you a similar push-to-deploy workflow on a VPS you control.",
      ],
      [
        "Can Litepod run Next.js?",
        "Yes. Next.js runs as a Node.js server in a container, deployed from Git or a Dockerfile. Features tied to Vercel's edge network, such as its image CDN, need your own setup.",
      ],
      [
        "Is self-hosting cheaper than Vercel?",
        "It depends on traffic. With Litepod you pay a flat server price, so costs stay the same when bandwidth or function invocations grow.",
      ],
    ],
  },
  coolify: {
    name: "Coolify",
    title: "Coolify Alternative: Lightweight Self-Hosted PaaS with Podman",
    h1: "A lightweight Coolify alternative",
    description:
      "Comparing Coolify alternatives? Litepod is a self-hosted PaaS for your VPS with rootless Podman, Caddy SSL and a 63 MB control plane. See how they compare.",
    answer:
      "Litepod is a Coolify alternative for people who want a smaller, rootless control plane on their VPS. Both are self-hosted PaaS tools that deploy apps and databases on your own server. Coolify runs on Docker with Traefik; Litepod runs on rootless Podman with Caddy and uses about 63 MB of RAM for its core containers on a fresh install.",
    rows: [
      ["Self-hosted PaaS", "Yes", "Yes"],
      ["Container runtime", "litepod.runtime", "Docker"],
      ["Install user", "Rootless or root", "Root"],
      ["Reverse proxy", "litepod.proxy", "Traefik (Caddy optional)"],
      ["Deploy sources", "litepod.deploy", "Git (Nixpacks, Dockerfile), Docker Compose, one-click services"],
      ["Documented minimum server", "litepod.minimum", "2 CPU, 2 GB RAM"],
      ["Managed option", "litepod.managed", "Coolify Cloud: bring your own server"],
      ["License", "litepod.license", "Open source, Apache 2.0"],
    ],
    pickThem: [
      "You want a large catalog of one-click services today.",
      "You need a fully open-source codebase right now.",
      "Your team already standardizes on Docker and Traefik.",
    ],
    pickUs: [
      "You want the control plane to stay small on a cheap VPS.",
      "You prefer rootless containers with Podman.",
      "You want SSO with OIDC, SAML and SCIM for your organization.",
      "You want S3 backups of the control plane with a documented restore flow.",
      "You want a built-in AI assistant and MCP connection, using your own API key.",
    ],
    migrate: [
      "Install Litepod on a new VPS, or on the same server once Coolify is stopped.",
      "Recreate each project and deploy from the same Git repository, Dockerfile or Docker Compose file.",
      "Copy environment variables and secrets from Coolify into each Litepod application.",
      "Dump each database, create it from a Litepod template, and restore the dump.",
      "Attach your domains in Litepod and switch DNS once the new deploy is healthy.",
    ],
    faq: [
      [
        "Is Litepod a fork of Coolify?",
        "No. Litepod is a separate project built on Podman, Caddy and Dragonfly.",
      ],
      [
        "Can I use my Docker Compose files from Coolify?",
        "Yes. Litepod deploys Docker Compose files, so most Compose-based services move over with their environment variables.",
      ],
      [
        "Which one uses less RAM?",
        "Litepod's core containers used about 63 MB of memory on a fresh install, measured with podman stats. Coolify documents 2 GB of RAM as the minimum server size. Measure both on your server with your workloads.",
      ],
    ],
  },
  dokploy: {
    name: "Dokploy",
    title: "Dokploy Alternative: Self-Hosted PaaS for Apps and Databases",
    h1: "A rootless Dokploy alternative",
    description:
      "Need a Dokploy alternative? Litepod deploys apps and databases on your VPS with rootless Podman instead of Docker Swarm, plus Caddy SSL and S3 backups.",
    answer:
      "Litepod is a Dokploy alternative that runs on rootless Podman instead of Docker Swarm. Both are self-hosted PaaS tools for deploying applications, Docker Compose stacks and databases on your own VPS. Litepod focuses on a small control plane, about 63 MB of RAM on a fresh install, with Caddy for automatic SSL.",
    rows: [
      ["Self-hosted PaaS", "Yes", "Yes"],
      ["Container runtime", "litepod.runtime", "Docker with Docker Swarm"],
      ["Install user", "Rootless or root", "Root"],
      ["Reverse proxy", "litepod.proxy", "Traefik"],
      ["Deploy sources", "litepod.deploy", "Git (Nixpacks, Dockerfile, Buildpacks), Docker Compose, templates"],
      ["Databases", "litepod.databases", "PostgreSQL, MySQL, MariaDB, MongoDB, Redis"],
      ["Managed option", "litepod.managed", "Dokploy Cloud: bring your own server"],
      ["License", "litepod.license", "Source on GitHub, see repository license"],
    ],
    pickThem: [
      "You need Docker Swarm clustering across several nodes.",
      "You want the source code available today.",
      "You already run Traefik and Swarm in production.",
    ],
    pickUs: [
      "You run on a single VPS and want the smallest control plane.",
      "You prefer rootless Podman over a root Docker daemon.",
      "You want SSO with OIDC, SAML and SCIM.",
      "You want S3 backups of the control plane with a documented restore flow.",
      "You want a built-in AI assistant and MCP connection, using your own API key.",
    ],
    migrate: [
      "Install Litepod on a new VPS with the one-line installer.",
      "Recreate each application from the same Git repository, Dockerfile or Docker Compose file.",
      "Copy environment variables from Dokploy into each Litepod application.",
      "Dump each database, create it from a Litepod template, and restore the dump.",
      "Attach your domains in Litepod and switch DNS once the new deploy is healthy.",
    ],
    faq: [
      [
        "Does Litepod need Docker?",
        "No. Litepod installs and manages Podman, and runs rootless by default.",
      ],
      [
        "Can I deploy Docker Compose stacks?",
        "Yes. Litepod deploys Docker Compose files as well as Git repositories, Dockerfiles and static uploads.",
      ],
      [
        "Can I run databases with Litepod?",
        "Yes. Litepod deploys databases from templates on the same server as your apps. Back up their volumes separately from Litepod's own S3 backups.",
      ],
    ],
  },
};
