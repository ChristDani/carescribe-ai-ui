#!/bin/sh
set -e

# Default domain if not provided
: "${DOMAIN:=}"
: "${EMAIL:=}"

mkdir -p /var/www/certbot

# Helper to detect if DOMAIN is an IP address
is_ip() {
  case "$1" in
    '' ) return 1 ;;
    *[!0-9.]*) return 1 ;;
    *) return 0 ;;
  esac
}

# Choose template:
# - If DOMAIN is empty or an IP, use no-ssl template (serve HTTP on port 80).
# - Otherwise, if certs exist for DOMAIN, render SSL template; else use no-ssl.
if is_ip "$DOMAIN" || [ -z "$DOMAIN" ]; then
  echo "DOMAIN is empty or an IP: $DOMAIN"
  # For IP deployments prefer serving HTTP only to avoid forcing HTTPS on port 443.
  # Still create a self-signed cert for optional manual HTTPS testing, but do not switch nginx to SSL mode.
  if [ -n "$DOMAIN" ] && [ ! -f /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ]; then
    echo "Generating self-signed certificate for ${DOMAIN} (testing only)"
    mkdir -p /etc/letsencrypt/live/${DOMAIN}
    openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
      -subj "/CN=${DOMAIN}" \
      -keyout /etc/letsencrypt/live/${DOMAIN}/privkey.pem \
      -out /etc/letsencrypt/live/${DOMAIN}/fullchain.pem
    chmod 600 /etc/letsencrypt/live/${DOMAIN}/privkey.pem
  fi

  # Always use the no-SSL template for IP deployments to keep port 80 serving HTTP.
  echo "Using no-SSL nginx configuration for IP deployment"
  envsubst '${DOMAIN} ${EMAIL}' < /etc/nginx/conf.d/default.conf.no-ssl.template > /etc/nginx/conf.d/default.conf
else
  if [ -f /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ]; then
    echo "Certificates found for ${DOMAIN}, using SSL nginx configuration"
    envsubst '${DOMAIN} ${EMAIL}' < /etc/nginx/conf.d/default.conf.ssl.template > /etc/nginx/conf.d/default.conf
  else
    echo "No certificates for ${DOMAIN} yet — starting without SSL"
    envsubst '${DOMAIN} ${EMAIL}' < /etc/nginx/conf.d/default.conf.no-ssl.template > /etc/nginx/conf.d/default.conf
  fi
fi

exec "$@"
