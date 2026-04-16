# System args
ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.22

# ---------------------------------------------------------------------------------------------------------------------
# Stage 0: build base
#
# Purpose: shared base image with common build args and env defaults
# ---------------------------------------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build-base
RUN apk update && \
    apk add --no-cache libc6-compat
WORKDIR /app

# Custom args
ARG PACKAGE_MANAGER=pnpm \
    NODE_ENV=production \
    ASTRO_ADAPTER=node
ENV PACKAGE_MANAGER=$PACKAGE_MANAGER \
    NODE_ENV=$NODE_ENV \
    ASTRO_ADAPTER=$ASTRO_ADAPTER

# Install build dependencies
RUN npm install -g pnpm

# ---------------------------------------------------------------------------------------------------------------------
# Stage 1: build app
# ---------------------------------------------------------------------------------------------------------------------
FROM build-base AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc /app/
COPY apps/web /app/apps/web/
RUN $PACKAGE_MANAGER install --frozen-lockfile
RUN $PACKAGE_MANAGER --filter ./apps/web run build

# ---------------------------------------------------------------------------------------------------------------------
# Stage 2: production dependencies
# ---------------------------------------------------------------------------------------------------------------------
FROM build-base AS prod-deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc /app/
COPY apps/web/package.json /app/apps/web/package.json
RUN $PACKAGE_MANAGER install --frozen-lockfile --prod --filter ./apps/web

# ---------------------------------------------------------------------------------------------------------------------
# Stage 3: runtime image
# ---------------------------------------------------------------------------------------------------------------------
FROM build-base AS runner

ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

WORKDIR /app/apps/web

COPY --from=prod-deps --chown=astro:nodejs /app/node_modules /app/node_modules
COPY --from=prod-deps --chown=astro:nodejs /app/apps/web/node_modules ./node_modules
COPY --from=prod-deps --chown=astro:nodejs /app/apps/web/package.json ./package.json
COPY --from=builder --chown=astro:nodejs /app/apps/web/dist ./dist

USER astro

EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
