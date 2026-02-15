'use client';

import { useEffect, useState } from 'react';
import { listMyServersApi } from '../../../lib/api/servers';
import { GameServer } from '../../../types/servers';

export default function ServersPage() {
  const [servers, setServers] = useState<GameServer[]>([]);

  useEffect(() => {
    listMyServersApi().then(setServers).catch(() => setServers([]));
  }, []);

  return (
    <section className="glass rounded-2xl p-6">
      <h1 className="text-2xl font-semibold">My Servers</h1>
      <div className="mt-4 space-y-3">
        {servers.map((server) => (
          <div key={server.id} className="rounded-lg bg-soft p-3">
            <p className="font-medium">{server.name}</p>
            <p className="text-sm text-slate-400">
              {server.game} • {server.status} • ₹{server.monthlyPrice}/mo
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
