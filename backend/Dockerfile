# ==========================================
# STAGE 1: Build Stage
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first for Docker caching
COPY package.json ./
RUN npm install

# Copy source code and build TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ==========================================
# STAGE 2: Lightweight Production Runtime
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
# Restrict Node memory ceiling to 256MB to avoid exhausting 2GB VPS
ENV NODE_OPTIONS="--max-old-space-size=256"

# Install production dependencies only
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built code from builder
COPY --from=builder /app/dist ./dist

# Security hardening: Run as non-root user
USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/security/health || exit 1

CMD ["node", "dist/index.js"]

