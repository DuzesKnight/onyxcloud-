# OnyxCloud Hosting Platform

Production-ready monorepo for a game hosting + VPS provider inspired by modern hosting UX patterns. Includes a Next.js marketing + customer dashboard frontend, Node.js API, Pterodactyl microservice, billing webhooks, and infrastructure automation.

## Stack
- **Frontend**: Next.js 14 (App Router), TailwindCSS, React Hook Form, Zod
- **Backend API**: Node.js + Express, Prisma ORM, PostgreSQL
- **Queue/Cache**: Redis + BullMQ
- **Payments**: Stripe + PayPal + UPI (Razorpay placeholder)
- **Pterodactyl**: Service integration microservice
- **Infra**: Docker Compose, NGINX, Let's Encrypt, GitHub Actions CI

## Local development

### Requirements
- Node.js 20+
- Docker + Docker Compose

### Environment variables
Copy `.env.example` to `.env` and update values.

### Start stack
```bash
./scripts/dev.sh
```

### Migrate database
```bash
./scripts/migrate.sh
```

### Seed demo data
```bash
./scripts/seed.sh
```

## Production deployment
- Docker Compose: `./scripts/deploy.sh`
- Kubernetes manifests in `infra/k8s`
- NGINX reverse proxy in `infra/nginx`

## Services
- `apps/web`: Marketing site + customer dashboard
- `services/api`: Core API (auth, billing, provisioning)
- `services/pterodactyl`: Pterodactyl integration (users, servers, nodes)
- `services/webhooks`: Payment + Pterodactyl event listeners

## Security
- CSRF protection, secure cookies, rate limiting
- Helmet for headers, validation with Zod
- Secrets must never be committed

## Documentation
- `docs/architecture.md`
- `docs/deployment.md`
- `docs/api.md` (OpenAPI)
- `docs/postman_collection.json`

## Notes
- Payment providers require configuring webhooks and secret keys.
- Pterodactyl admin API key required for provisioning.

