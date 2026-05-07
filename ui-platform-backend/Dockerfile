# --- Stage 1: Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm for quick caching and builds
RUN npm install -g pnpm

# Copy locks and package profiles
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies for TypeScript compilation)
RUN pnpm install --frozen-lockfile

# Copy codebase and compile NestJS modules
COPY . .
RUN pnpm build

# Prune development dependencies to keep the image slim
RUN pnpm prune --prod

# --- Stage 2: Runtime Stage ---
FROM node:20-alpine

WORKDIR /app

# Copy production node_modules and compiled artifacts from Stage 1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Elevate safety standards by executing container as non-root user 'node'
USER node

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/main"]
