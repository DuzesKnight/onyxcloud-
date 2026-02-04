import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(express.json());

const baseUrl = process.env.PTERO_BASE_URL;
const adminKey = process.env.PTERO_ADMIN_API_KEY;

function pteroHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${adminKey}`,
    Accept: 'Application/vnd.pterodactyl.v1+json'
  };
}

app.get('/catalog', async (_req, res) => {
  res.json({
    locations: [{ id: 1, name: 'Mumbai' }, { id: 2, name: 'Singapore' }],
    plans: [
      { code: 'mc-basic', name: 'Minecraft Basic', memory: 4096, cpu: 200, disk: 20000, price: 12 },
      { code: 'vps-pro', name: 'VPS Pro', memory: 8192, cpu: 400, disk: 80000, price: 24 }
    ]
  });
});

app.post('/users', async (req, res) => {
  const payload = req.body;
  const response = await fetch(`${baseUrl}/api/application/users`, {
    method: 'POST',
    headers: pteroHeaders(),
    body: JSON.stringify({
      email: payload.email,
      username: payload.username,
      first_name: payload.firstName,
      last_name: payload.lastName
    })
  });
  if (!response.ok) {
    return res.status(502).json({ message: 'Pterodactyl user creation failed' });
  }
  const data = await response.json();
  res.json({ id: data.attributes.id });
});

app.post('/servers', async (req, res) => {
  const payload = req.body;
  const response = await fetch(`${baseUrl}/api/application/servers`, {
    method: 'POST',
    headers: pteroHeaders(),
    body: JSON.stringify({
      name: payload.name,
      user: payload.pteroUserId,
      egg: 1,
      docker_image: 'ghcr.io/pterodactyl/yolks:java_17',
      startup: 'java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar',
      environment: {
        SERVER_JARFILE: 'server.jar'
      },
      limits: {
        memory: 4096,
        cpu: 200,
        disk: 20000,
        swap: 0,
        io: 500
      },
      feature_limits: {
        databases: 1,
        backups: 2
      },
      allocation: {
        default: 1
      }
    })
  });
  if (!response.ok) {
    return res.status(502).json({ message: 'Pterodactyl server creation failed' });
  }
  const data = await response.json();
  res.json({
    id: data.attributes.id,
    node: data.attributes.node,
    ip: data.attributes.allocation.ip,
    port: data.attributes.allocation.port,
    credentials: { panelUrl: baseUrl }
  });
});

app.post('/servers/:id/power', async (req, res) => {
  const response = await fetch(`${baseUrl}/api/client/servers/${req.params.id}/power`, {
    method: 'POST',
    headers: pteroHeaders(),
    body: JSON.stringify({ signal: req.body.action })
  });
  if (!response.ok) {
    return res.status(502).json({ message: 'Power command failed' });
  }
  res.json({ status: 'ok' });
});

const port = process.env.PTERO_SERVICE_PORT || 4100;
app.listen(port, () => {
  console.log(`Pterodactyl service running on :${port}`);
});
