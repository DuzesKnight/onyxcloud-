'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetch('/api/servers')
      .then((res) => res.json())
      .then((data) => setServers(data.servers || []))
      .catch(() => setServers([]));
  }, []);

  return (
    <main className="container py-16">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-slate-300">Manage servers, billing, and credentials.</p>
      <div className="mt-8 grid gap-6">
        {servers.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-slate-300">No servers provisioned yet.</p>
          </div>
        ) : (
          servers.map((server) => (
            <div key={server.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold text-white">{server.name}</h2>
              <p className="text-sm text-slate-300">{server.serviceType}</p>
              <p className="text-sm text-slate-400">Status: {server.status}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-full border border-white/20 px-4 py-2 text-sm">Start</button>
                <button className="rounded-full border border-white/20 px-4 py-2 text-sm">Stop</button>
                <button className="rounded-full border border-white/20 px-4 py-2 text-sm">Restart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
