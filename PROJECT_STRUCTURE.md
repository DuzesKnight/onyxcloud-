# Project Folder Structure

```text
onyxcloud-/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── billing/
│   │   │   └── servers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── billing/
│   │   │   └── servers/
│   │   ├── routes/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── billing/
│   │   │   └── servers/
│   │   ├── services/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── deposits/
│   │   │   ├── pterodactyl/
│   │   │   ├── servers/
│   │   │   └── wallet/
│   │   ├── validations/
│   │   ├── utils/
│   │   ├── jobs/
│   │   ├── events/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── scripts/
│   └── docs/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   └── (dashboard)/
│   │   │       ├── wallet/
│   │   │       ├── servers/
│   │   │       ├── deposits/
│   │   │       └── admin/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── forms/
│   │   │   ├── layout/
│   │   │   ├── wallet/
│   │   │   ├── servers/
│   │   │   └── admin/
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── utils/
│   │   │   └── validators/
│   │   ├── hooks/
│   │   └── types/
│   ├── public/
│   └── tests/
│       ├── unit/
│       └── e2e/
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schemas/
├── shared/
│   ├── constants/
│   ├── schemas/
│   └── types/
├── infra/
│   ├── docker/
│   ├── nginx/
│   ├── monitoring/
│   └── github/workflows/
├── docs/
│   ├── api/
│   ├── architecture/
│   ├── security/
│   └── runbooks/
├── README.md
└── PROJECT_STRUCTURE.md
```

## Security-oriented design notes embedded in structure
- Wallet and billing logic are isolated in backend services/repositories for server-side-only balance operations.
- Financial logs are represented through dedicated ledger/deposit models, repositories, and migrations.
- Admin approval flows are separated into admin controllers/services/routes.
- Pterodactyl integration is isolated under `backend/src/services/pterodactyl` and server deployment services.
- Validation/middleware layers are explicitly split for JWT checks, input validation, and audit handling.
