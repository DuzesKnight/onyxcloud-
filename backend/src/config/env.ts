import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  APP_NAME: z.string().default('OnyxCloud API'),
  API_PREFIX: z.string().default('/api/v1'),

  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_CONN_LIMIT: z.coerce.number().int().positive().default(10),

  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 chars'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  ADMIN_JWT_ACCESS_SECRET: z.string().min(32, 'ADMIN_JWT_ACCESS_SECRET must be at least 32 chars'),
  ADMIN_JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),

  PTERODACTYL_BASE_URL: z.string().url(),
  PTERODACTYL_API_KEY: z.string().min(20),
  PTERODACTYL_NEST_ID: z.coerce.number().int().positive(),
  PTERODACTYL_EGG_ID: z.coerce.number().int().positive(),
  PTERODACTYL_DEFAULT_NODE_ID: z.coerce.number().int().positive(),
  PTERODACTYL_DEFAULT_LOCATION_ID: z.coerce.number().int().positive(),
  PTERODACTYL_DEFAULT_ALLOCATION_ID: z.coerce.number().int().positive().optional(),
  PTERODACTYL_DEFAULT_DOCKER_IMAGE: z.string().default('ghcr.io/pterodactyl/yolks:java_17'),
  PTERODACTYL_DEFAULT_STARTUP: z.string().default('java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar'),

  SERVER_EXPIRY_CRON_INTERVAL_MS: z.coerce.number().int().positive().default(24 * 60 * 60 * 1000)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const message = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
  throw new Error(`Invalid environment configuration: ${message}`);
}

export const env = parsed.data;
