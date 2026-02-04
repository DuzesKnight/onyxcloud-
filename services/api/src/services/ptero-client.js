const baseUrl = process.env.PTERO_SERVICE_URL || 'http://pterodactyl:4100';

export async function createPteroUser({ email, username, firstName, lastName }) {
  const res = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, firstName, lastName })
  });
  if (!res.ok) {
    throw new Error('Failed to create Pterodactyl user');
  }
  return res.json();
}

export async function provisionServer(payload) {
  const res = await fetch(`${baseUrl}/servers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error('Failed to provision server');
  }
  return res.json();
}

export async function controlServer(serverId, action) {
  const res = await fetch(`${baseUrl}/servers/${serverId}/power`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  });
  if (!res.ok) {
    throw new Error('Failed to control server');
  }
  return res.json();
}

export async function listCatalog() {
  const res = await fetch(`${baseUrl}/catalog`);
  if (!res.ok) {
    throw new Error('Failed to load catalog');
  }
  return res.json();
}
