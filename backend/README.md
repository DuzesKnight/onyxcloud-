# Backend Base (Node.js + Express)

## MVC-oriented structure

```text
backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   ├── env.ts
│   │   ├── db.ts
│   │   ├── jwt.ts
│   │   ├── logger.ts
│   │   └── index.ts
│   ├── controllers/
│   │   └── auth/
│   ├── models/
│   │   └── user.model.ts
│   ├── repositories/
│   │   └── auth/
│   ├── routes/
│   │   ├── index.ts
│   │   └── auth/
│   ├── services/
│   │   └── auth/
│   ├── validations/
│   │   └── auth.validation.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── admin.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── error.middleware.ts
│   └── utils/
│       └── errors.ts
├── package.json
├── tsconfig.json
└── .env.example
```

## Secure auth included
- User registration (`POST /api/v1/auth/register`)
- User login (`POST /api/v1/auth/login`)
- Password hashing with bcrypt
- JWT generation + verification
- Auth middleware (Bearer token)
- Strong email/password validation
- Duplicate email prevention (DB + service check)
- Login-specific rate limiting (`5 attempts / 15 min`)
