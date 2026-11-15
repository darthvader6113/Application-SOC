# ==========================================
# STAGE 1: Build Stage & Production Dependencies
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Cap Node memory strictly to 256MB to fit within 2GB RAM VPS
ENV NODE_OPTIONS="--max-old-space-size=256"

# Install dependencies using package-lock without running heavy scripts
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit --no-fund --ignore-scripts || npm install --prefer-offline --no-audit --no-fund --ignore-scripts

# Copy source and build TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev --ignore-scripts && npm cache clean --force

# ==========================================
# STAGE 2: Ultra-Lightweight Production Runtime
# (No npm install in this stage — copies pre-pruned modules)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
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
