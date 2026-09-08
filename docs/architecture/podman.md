# Podman

Litepod containers are based on [podman](https://podman.io/). There is no Docker daemon in the stack: every service runs as a podman-managed container, root or rootless, matching the installer (`root@litepod:~#` or an unprivileged user).

## Containers

A fresh install runs three containers, all managed by podman:

| Container | Role |
| --- | --- |
| `litepod-caddy` | Reverse proxy / TLS termination |
| `litepod-dragonfly` | In-memory cache |
| `litepod-api` | Litepod API |

## Footprint

Measured with `podman stats --no-stream` on a fresh installation:

```
NAME                CPU %     MEM USAGE / LIMIT    BLOCK IO
litepod-caddy       2.24%     24.7MB / 16.7GB      0B / 0B
litepod-dragonfly   3.94%     21.82MB / 16.7GB     0B / 0B
litepod-api         1.77%     16.21MB / 16.7GB     0B / 0B
```

Sum of memory used across the three containers: **62.73MB**.

This figure is the one shown on the landing page (`apps/web/src/components/Hero.astro`, string `statsTotal` in `apps/web/src/data/landing.mjs`). If container memory usage changes, update both the terminal output and the `statsTotal` strings, and keep this doc in sync.
