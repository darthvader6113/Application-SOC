# ==========================================
# STAGE 1: Build React Production Bundle
# Stable Node 20 LTS Alpine
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=development
# Allocate safe memory for Vite bundling
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Install all packages (React, Mantine, Vite, TypeScript)
COPY package.json package-lock.json* ./
RUN npm install --prefer-offline --no-audit --no-fund

COPY tsconfig.json vite.config.ts postcss.config.cjs index.html ./
COPY public ./public
COPY src ./src

RUN npm run build

# ==========================================
# STAGE 2: High-Performance Alpine Nginx
# ==========================================
FROM nginx:alpine AS runner

# Remove default nginx config and replace with optimized reverse proxy config
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy production build from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
