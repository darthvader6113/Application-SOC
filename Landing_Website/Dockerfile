# ==========================================
# High-Performance Alpine Nginx
# Serves pre-built production bundle directly (zero npm/DNS required)
# ==========================================
FROM nginx:alpine

# Remove default nginx config and replace with optimized reverse proxy config
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy production build directly
COPY dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
