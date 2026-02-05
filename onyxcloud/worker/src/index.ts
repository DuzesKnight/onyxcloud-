import { PrismaClient } from '@prisma/client';
import { Worker, Queue, QueueEvents } from 'bullmq';
import axios from 'axios';

const prisma = new PrismaClient();
const connection = { url: process.env.REDIS_URL };
new QueueEvents('provisioning', { connection });

new Worker('provisioning', async job => {
  const { subscriptionId, userId } = job.data;
  const sub = await prisma.subscription.findUnique({ where: { id: subscriptionId }, include: { plan: true } });
  if (!sub) throw new Error('subscription not found');
  const node = await prisma.node.findFirst();
  const egg = await prisma.egg.findFirst();
  const allocation = await prisma.allocation.findFirst({ where: { is_assigned: false, node_id: node?.id } });
  if (!node || !egg || !allocation) throw new Error('capacity unavailable');
  const pUser = await prisma.user.findUnique({ where: { id: userId } });
  const pteroUserId = pUser?.pterodactyl_user_id || 1;
  const created = await axios.post(`${process.env.PTERODACTYL_BASE_URL}/api/application/servers`, { name: `srv-${sub.id.slice(0,8)}`, user: pteroUserId, egg: egg.pterodactyl_egg_id, docker_image: egg.docker_image, limits: { cpu: sub.plan.cpu_limit, memory: sub.plan.memory_mb, disk: sub.plan.disk_mb }, allocation: { default: Number(allocation.port) } }, { headers: { Authorization: `Bearer ${process.env.PTERODACTYL_API_KEY}`, Accept: 'Application/vnd.pterodactyl.v1+json' } });
  await prisma.allocation.update({ where: { id: allocation.id }, data: { is_assigned: true } });
  await prisma.server.create({ data: { user_id: userId, subscription_id: sub.id, node_id: node.id, egg_id: egg.id, allocation_id: allocation.id, pterodactyl_server_id: String(created.data.attributes.identifier), name: created.data.attributes.name, status: 'running' } });
}, { connection });

const scheduler = new Queue('lifecycle', { connection });
setInterval(async () => {
  await scheduler.add('hourly-reminders', {}, { removeOnComplete: true });
}, 60 * 60 * 1000);
setInterval(async () => {
  await scheduler.add('daily-enforcement', {}, { removeOnComplete: true });
}, 24 * 60 * 60 * 1000);

new Worker('lifecycle', async job => {
  if (job.name === 'hourly-reminders') {
    const upcoming = await prisma.subscription.findMany({ where: { next_billing_date: { lte: new Date(Date.now() + 24*60*60*1000) }, status: 'active' } });
    for (const s of upcoming) console.log('reminder', s.id);
  }
  if (job.name === 'daily-enforcement') {
    const overdue = await prisma.subscription.findMany({ where: { status: 'overdue' }, include: { servers: true } });
    for (const sub of overdue) {
      const graceEnds = new Date(sub.next_billing_date.getTime() + sub.grace_period_days * 86400000);
      if (Date.now() > graceEnds.getTime()) {
        await prisma.subscription.update({ where: { id: sub.id }, data: { status: 'suspended' } });
        for (const server of sub.servers) await prisma.server.update({ where: { id: server.id }, data: { status: 'suspended' } });
      }
    }
  }
}, { connection });

console.log('worker running');
