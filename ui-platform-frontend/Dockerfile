# --- Stage 1: Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm for efficient package management
RUN npm install -g pnpm

# Copy package descriptors first to maximize Docker layer cache hits
COPY package.json pnpm-lock.yaml ./

# Install dependencies under clean reproducible environment
RUN pnpm install --frozen-lockfile

# Copy remaining source code and config files
COPY . .

# Build Vite application
RUN pnpm build

# --- Stage 2: Serve Stage ---
FROM nginx:alpine

# Copy compiled static assets from the build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace standard Nginx config with our custom high-performance version
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
