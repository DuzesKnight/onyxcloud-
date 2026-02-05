import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import csrf from 'csurf';
import authRoutes from './routes/auth.routes';
import purchaseRoutes from './routes/purchase.routes';
import adminRoutes from './routes/admin.routes';
import { auth, admin } from './middleware/auth';
import { env } from './utils/env';

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60_000, limit: 300 }));
app.use(csrf({ cookie: true }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/purchase', auth, purchaseRoutes);
app.use('/admin', auth, admin, adminRoutes);

app.listen(env.port, () => console.log(`backend running on ${env.port}`));
