# API

OpenAPI summary for core endpoints.

## Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- POST `/api/auth/verify-email`
- POST `/api/auth/password/request`
- POST `/api/auth/password/reset`
- POST `/api/auth/2fa/setup`
- POST `/api/auth/2fa/verify`

## Billing
- POST `/api/billing/checkout`
- GET `/api/billing/history`

## Servers
- GET `/api/servers/catalog`
- GET `/api/servers`
- POST `/api/servers/provision`
- POST `/api/servers/:id/power`
