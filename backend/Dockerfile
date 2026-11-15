# ==========================================
# STAGE 1: Build Stage & Production Dependencies
# Stable Node 20 LTS Alpine
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install typescript compiler globally so tsc is unconditionally available
RUN npm install -g typescript --no-audit --no-fund

# Install project runtime and build dependencies
COPY package.json package-lock.json* ./
RUN npm install --prefer-offline --no-audit --no-fund

# Copy source and compile TypeScript directly with tsc
COPY tsconfig.json ./
COPY src ./src
RUN tsc && npm prune --omit=dev && npm cache clean --force

# ==========================================
# STAGE 2: Ultra-Lightweight Production Runtime
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
# Restrict Node memory ceiling to 256MB to avoid exhausting 2GB VPS
ENV NODE_OPTIONS="--max-old-space-size=256"

# Copy pre-pruned production dependencies and compiled artifacts from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Security hardening: Run as non-root user
USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/security/health || exit 1

CMD ["node", "dist/index.js"]
