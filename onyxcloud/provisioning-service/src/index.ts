import express from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bullmq';

const prisma = new PrismaClient();
const queue = new Queue('provisioning', { connection: { url: process.env.REDIS_URL } });
const app = express();
app.use(express.json());

async function ptero(path: string, method: 'GET'|'POST', data?: unknown) {
  const url = `${process.env.PTERODACTYL_BASE_URL}/api/application/${path}`;
  return axios({ url, method, data, headers: { Authorization: `Bearer ${process.env.PTERODACTYL_API_KEY}`, Accept: 'Application/vnd.pterodactyl.v1+json' } });
}

app.post('/provision', async (req, res) => {
  await queue.add('provision-server', req.body, { attempts: 3, backoff: { type: 'exponential', delay: 3000 } });
  res.json({ status: 'queued' });
});

app.post('/server/:id/power', async (req, res) => {
  const { signal } = req.body;
  const server = await prisma.server.findUnique({ where: { id: req.params.id } });
  if (!server?.pterodactyl_server_id) return res.status(404).json({ message: 'missing server id' });
  await axios.post(`${process.env.PTERODACTYL_CLIENT_URL}/api/client/servers/${server.pterodactyl_server_id}/power`, { signal }, { headers: { Authorization: `Bearer ${process.env.PTERODACTYL_API_KEY}` } });
  res.json({ ok: true });
});

app.listen(4020, () => console.log('provisioning-service :4020'));
export { ptero };
