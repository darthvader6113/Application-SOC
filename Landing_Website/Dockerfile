# ==========================================
# STAGE 1: Build React Production Bundle
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

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

