# Multistage Docker build for monorepos
# 
# Inspired from: 
#   - https://turborepo.org/blog/turbo-0-4-0#experimental-pruned-workspaces
#   - https://github.com/belgattitude/nextjs-monorepo-example/blob/main/Dockerfile
# 
# Used for Railway deploys 
#

# System args
ARG NODE_VERSION=16
ARG ALPINE_VERSION=3.15

# ---------------------------------------------------------------------------------------------------------------------
# Stage 0: base image
# 
# Purpose: Allow default env variables, and build tools
# ---------------------------------------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as base
RUN apk update
WORKDIR /app 

# Custom args
ARG PACKAGE_MANAGER=pnpm \
    SCOPE=evanmio-api
ENV PACKAGE_MANAGER=$PACKAGE_MANAGER \
    SCOPE=$SCOPE

# Railway args
ARG PGDATABASE PGHOST PGPASSWORD PGPORT PGUSER \
    CLOUDINARY_KEY CLOUDINARY_NAME CLOUDINARY_SECRET \
    PORT NODE_ENV ADMIN_JWT_SECRET JWT_SECRET API_TOKEN_SALT=4ca1f272d08361f63d9fefd4a4df5c98
ENV PGDATABASE=$PGDATABASE PGHOST=$PGHOST PGPASSWORD=$PGPASSWORD PGPORT=$PGPORT PGUSER=$PGUSER \
    CLOUDINARY_KEY=$CLOUDINARY_KEY CLOUDINARY_NAME=$CLOUDINARY_NAME CLOUDINARY_SECRET=$CLOUDINARY_SECRET \
    PORT=$PORT NODE_ENV=$NODE_ENV ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET JWT_SECRET=$JWT_SECRET API_TOKEN_SALT=$API_TOKEN_SALT

# Install build dependencies
RUN npm install -g pnpm turbo

# ---------------------------------------------------------------------------------------------------------------------
# Stage 1: workspace pruner
# ---------------------------------------------------------------------------------------------------------------------
FROM base as pruner

# Turbo docs recommend this, is there a better option?
COPY . .

# Prune repo to project scope
# turbo only supports Yarn currently
# TODO: allow other package managers when available
RUN turbo prune --scope=$SCOPE --docker

# ---------------------------------------------------------------------------------------------------------------------
# Stage 2: dependency resolution
# ---------------------------------------------------------------------------------------------------------------------
FROM base as installer

# TODO: split this into dev, and prod stages

# Copy project files from deps
COPY --from=pruner /app/out/json/ .
# TODO: copy other lock files, and configs such as .npmrc, and pnpm-workspace.yml
COPY --from=pruner /app/out/yarn.lock ./yarn.lock

# Install project dependencies
RUN $PACKAGE_MANAGER install 

# ---------------------------------------------------------------------------------------------------------------------
# Stage 3: project builder
# ---------------------------------------------------------------------------------------------------------------------
FROM base as builder

# Copy Installed dependencies and source code
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
# Optionally add .git folder (faster object hashing for turbo), Railway doesn't allow this
COPY --from=pruner /app/[.]git ./.git

# Build the scoped project
RUN $PACKAGE_MANAGER run turbo:build --filter=$SCOPE

# ---------------------------------------------------------------------------------------------------------------------
# Stage 4: production environment
# ---------------------------------------------------------------------------------------------------------------------
FROM base as runner

COPY --from=builder /app/ .

EXPOSE $PORT
CMD ["/bin/sh", "-c", "$PACKAGE_MANAGER run turbo:start --filter=$SCOPE"]