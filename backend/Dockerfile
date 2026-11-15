# ==========================================
# Hardman & Reed API Production Runtime
# Lightweight Node 20 Alpine
# ==========================================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=256"

# Install production dependencies only (5 packages: express, cors, helmet, dotenv, pg)
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy pre-compiled JavaScript application
COPY dist ./dist

# Security hardening: Run as non-root user
USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/security/health || exit 1

CMD ["node", "dist/index.js"]
