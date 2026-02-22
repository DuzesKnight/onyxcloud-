'use client';

import { useEffect, useState } from 'react';
import { listMyServersApi } from '../../lib/api/servers';
import { getWalletSummaryApi } from '../../lib/api/wallet';

export default function DashboardPage() {
  const [walletBalance, setWalletBalance] = useState('0.00');
  const [serverCount, setServerCount] = useState(0);

  useEffect(() => {
    getWalletSummaryApi()
      .then((data) => setWalletBalance(data.balance.toFixed(2)))
      .catch(() => setWalletBalance('0.00'));

    listMyServersApi()
      .then((servers) => setServerCount(servers.length))
      .catch(() => setServerCount(0));
  }, []);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        ['Wallet Balance', `₹${walletBalance}`],
        ['Active Servers', String(serverCount)],
        ['Pending Deposits', 'Check Wallet page']
      ].map(([label, value]) => (
        <article key={label} className="glass rounded-2xl p-6">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </article>
      ))}
    </section>
  );
}
