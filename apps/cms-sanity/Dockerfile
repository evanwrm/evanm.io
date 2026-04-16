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
ARG PACKAGE_MANAGER=pnpm
ARG NODE_ENV=production
ENV PACKAGE_MANAGER=$PACKAGE_MANAGER \
    NODE_ENV=$NODE_ENV

# Install build dependencies
RUN npm install -g pnpm

# ---------------------------------------------------------------------------------------------------------------------
# Stage 1: build studio
# ---------------------------------------------------------------------------------------------------------------------
FROM build-base AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc /app/
COPY apps/cms-sanity /app/apps/cms-sanity/
RUN $PACKAGE_MANAGER install --frozen-lockfile
RUN $PACKAGE_MANAGER --filter ./apps/cms-sanity run build

# ---------------------------------------------------------------------------------------------------------------------
# Stage 2: runtime image
# ---------------------------------------------------------------------------------------------------------------------
FROM nginx:1.29-alpine AS runner

COPY apps/cms-sanity/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/cms-sanity/dist /usr/share/nginx/html

EXPOSE 80
