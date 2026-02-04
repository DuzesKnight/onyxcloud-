import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import Redis from 'ioredis';
import { RedisStore } from './lib/redis-store.js';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { doubleCsrf } from 'csrf-csrf';
import { prisma } from './lib/prisma.js';
import { authRouter } from './routes/auth.js';
import { billingRouter } from './routes/billing.js';
import { serverRouter } from './routes/servers.js';
import { adminRouter } from './routes/admin.js';

dotenv.config();

const app = express();
const redis = new Redis(process.env.REDIS_URL);

const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => process.env.SESSION_SECRET,
  cookieName: 'csrf-token',
  cookieOptions: { sameSite: 'lax', secure: process.env.NODE_ENV === 'production' },
  size: 32
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  })
);
app.use(
  session({
    store: new RedisStore(redis),
    name: 'onyx_session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/csrf', (req, res) => {
  res.json({ csrfToken: generateToken(req, res) });
});

app.use('/api/auth', doubleCsrfProtection, authRouter);
app.use('/api/billing', doubleCsrfProtection, billingRouter);
app.use('/api/servers', doubleCsrfProtection, serverRouter);
app.use('/api/admin', doubleCsrfProtection, adminRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected error' });
});

const port = process.env.PORT || 4000;
app.listen(port, async () => {
  await prisma.$connect();
  console.log(`API running on :${port}`);
});
