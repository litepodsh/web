FROM oven/bun:latest AS deps
WORKDIR /app

COPY apps/web/package.json ./
RUN bun install

FROM oven/bun:latest AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY apps/web/ .
RUN bun run build

FROM oven/bun:latest AS runner
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["bun", "./dist/server/entry.mjs"]
