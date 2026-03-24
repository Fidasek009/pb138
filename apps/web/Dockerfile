# Stage 1: Install dependencies
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY bun.lock package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/db/package.json ./packages/db/
COPY packages/shared/package.json ./packages/shared/
COPY packages/widget/package.json ./packages/widget/
RUN bun install --frozen-lockfile

# Stage 2: Build
FROM deps AS builder
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
COPY packages/shared/ ./packages/shared/
RUN cd packages/shared && bun run build
COPY apps/web/ ./apps/web/
RUN cd apps/web && bun run build

# Stage 3: Serve with nginx
FROM nginx:1.28.2-alpine AS runner
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid
USER nginx
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
