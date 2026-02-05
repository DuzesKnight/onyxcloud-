# OnyxCloud

Production-focused SaaS monorepo for automated game server and VPS hosting.

## Services
- `frontend`: Next.js marketing + customer/admin dashboard.
- `backend`: Auth, users, plans, subscriptions, invoices, server lifecycle APIs.
- `billing-service`: UPI QR invoice lifecycle + payment webhook verification.
- `provisioning-service`: Pterodactyl orchestration and retries.
- `worker`: Redis/BullMQ background jobs for reminders, suspensions, terminations.
- `discord-bot`: Structured Discord event logger.
- `database`: Prisma schema and migrations.
- `nginx`: Reverse proxy and TLS-ready setup.

## Quick start
1. Copy envs: `cp .env.example .env` and propagate service-specific values.
2. Start infrastructure and services: `docker compose up --build -d`.
3. Run migrations: `docker compose exec backend npx prisma migrate deploy`.
4. Open `https://localhost`.

## Environment variables
See `.env.example` for required values including DB, Redis, JWT, CSRF, payment verification, and Pterodactyl credentials.

## Deployment
- Build and run with Docker Compose or convert to Kubernetes.
- GitHub Actions runs lint/tests and builds containers.
- NGINX handles TLS termination and reverse proxy to services.

## Security controls implemented
- Argon2 password hashing
- CSRF token validation
- Rate limiting
- Helmet/XSS sanitation
- Input validation with Zod
- HTTP-only secure cookies
- Audit/admin logs and IP capture

## Testing
- Unit tests for services.
- Integration tests for key API flows.
- E2E test for purchase flow.
