# Architecture

## Services
- **Web**: Next.js marketing and dashboard.
- **API**: Express API with Prisma and session auth.
- **Pterodactyl**: Microservice for panel API calls.
- **Webhooks**: Payment and panel event listeners.

## Data Flow
1. User registers and verifies email.
2. Payment checkout creates invoice.
3. Webhook confirms payment -> API provisions server -> Pterodactyl service.
4. Lifecycle worker handles suspensions and renewals.
