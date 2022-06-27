# Multistage Docker build for monorepos
# 
# Inspired from: https://github.com/belgattitude/nextjs-monorepo-example/blob/main/Dockerfile
# Used for Railway deploys 
#

# System args
ARG NODE_VERSION=16
ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as base
WORKDIR /app 

# Custom args
ARG PACKAGE_MANAGER=pnpm \
    ROOT_DIR=apps/api
ENV PACKAGE_MANAGER=$PACKAGE_MANAGER

# Railway args
ARG PGDATABASE PGHOST PGPASSWORD PGPORT PGUSER \
    CLOUDINARY_KEY CLOUDINARY_NAME CLOUDINARY_SECRET \
    PORT NODE_ENV ADMIN_JWT_SECRET JWT_SECRET API_TOKEN_SALT=4ca1f272d08361f63d9fefd4a4df5c98
ENV PGDATABASE=$PGDATABASE PGHOST=$PGHOST PGPASSWORD=$PGPASSWORD PGPORT=$PGPORT PGUSER=$PGUSER \
    CLOUDINARY_KEY=$CLOUDINARY_KEY CLOUDINARY_NAME=$CLOUDINARY_NAME CLOUDINARY_SECRET=$CLOUDINARY_SECRET \
    PORT=$PORT NODE_ENV=$NODE_ENV ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET JWT_SECRET=$JWT_SECRET API_TOKEN_SALT=$API_TOKEN_SALT

#
# Stage 1: dependency resolution
#
FROM base as deps

# Install build dependencies
RUN apk add --no-cache rsync
RUN npm install -g pnpm 

# Project install metadata 
# workspace configs, .npmrc, package.json, ...
RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
    --exclude="node_modules" --exclude="*/node_modules" \
    --exclude=".cache" --exclude="*/.cache" --exclude=".next" --exclude="*/.next" \
    --include="package.json" --include ".npmrc" \
    --include "package-lock.json" \
    --include "yarn.lock" \
    --include "pnpm-workspace.yaml" --include "pnpm-lock.yaml" \
    --include="*/" --exclude="*" \
    /docker-context/ /app/

# Install project dependencies
RUN $PACKAGE_MANAGER install 

#
# Stage 2: project builder
# 
FROM base as builder

# Copy project files, and node_modules from deps
COPY . .
COPY --from=deps /app ./

# Build project
WORKDIR /app/$ROOT_DIR
RUN pwd && ls
RUN $PACKAGE_MANAGER run build

#
# Stage 3: production environment
#
FROM base as runner
WORKDIR /app/$ROOT_DIR

COPY --from=builder /app/$ROOT_DIR/ /app/$ROOT_DIR/
COPY --from=builder /app/node_modules/ /app/node_modules/

EXPOSE $PORT
CMD ["/bin/sh", "-c", "$PACKAGE_MANAGER run start"]