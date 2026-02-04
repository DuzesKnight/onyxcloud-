# Deployment

## Docker Compose
```bash
cp .env.example .env
./scripts/deploy.sh
```

## TLS
Use certbot to generate `infra/ssl/fullchain.pem` and `infra/ssl/privkey.pem` for NGINX.

## Kubernetes
Apply manifests in `infra/k8s` and configure secrets for API keys.
