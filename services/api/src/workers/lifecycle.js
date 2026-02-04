import dotenv from 'dotenv';
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { prisma } from '../lib/prisma.js';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL);
const queue = new Queue('lifecycle', { connection: redis });

export async function scheduleLifecycle() {
  await queue.add('check-renewals', {}, { repeat: { pattern: '0 * * * *' } });
}

const worker = new Worker(
  'lifecycle',
  async (job) => {
    if (job.name === 'check-renewals') {
      const now = new Date();
      const expiring = await prisma.server.findMany({
        where: { expiresAt: { lt: now }, status: 'ACTIVE' }
      });
      for (const server of expiring) {
        await prisma.server.update({
          where: { id: server.id },
          data: { status: 'SUSPENDED' }
        });
      }
    }
  },
  { connection: redis }
);

worker.on('failed', (job, err) => {
  console.error('Lifecycle job failed', job?.id, err);
});
