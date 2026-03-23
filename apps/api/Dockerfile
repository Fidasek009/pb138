# Stage 1: Base
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Stage 2: Install production dependencies
FROM base AS deps
COPY bun.lock package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
COPY packages/widget/package.json ./packages/widget/
RUN bun install --frozen-lockfile --production

# Stage 3: Build shared packages
FROM base AS builder
COPY bun.lock package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
COPY packages/widget/package.json ./packages/widget/
RUN bun install --frozen-lockfile
COPY packages/shared/ ./packages/shared/
RUN cd packages/shared && bun run build
COPY apps/api/ ./apps/api/

# Stage 4: Runner
FROM base AS runner
RUN addgroup -S -g 1000 appgroup && adduser -S -u 1000 -G appgroup appuser
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/apps/api/src ./apps/api/src
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/package.json ./
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["bun", "run", "apps/api/src/index.ts"]
