import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { apiRateLimit } from './middleware/rate-limit.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { apiRouter } from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(apiRateLimit);

app.use(env.API_PREFIX, apiRouter);

app.use(errorMiddleware);

export { app };
