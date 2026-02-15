'use client';

import { useEffect, useState } from 'react';
import { DepositForm } from '../../../components/forms/deposit-form';
import { getWalletSummaryApi } from '../../../lib/api/wallet';
import { WalletSummary } from '../../../types/wallet';

export default function WalletPage() {
  const [summary, setSummary] = useState<WalletSummary | null>(null);

  useEffect(() => {
    getWalletSummaryApi().then(setSummary).catch(() => setSummary({ balance: 0, transactions: [] }));
  }, []);

  return (
    <section className="glass rounded-2xl p-6">
      <h1 className="text-2xl font-semibold">Wallet</h1>
      <p className="mt-2 text-slate-400">Current balance: ₹{summary?.balance?.toFixed(2) ?? '0.00'}</p>
      <div className="mt-5 space-y-2 text-sm text-slate-300">
        {summary?.transactions.map((txn) => (
          <div key={txn.id} className="flex justify-between rounded-lg bg-soft px-3 py-2">
            <span>{txn.description || txn.type}</span>
            <span>{txn.direction === 'credit' ? '+' : '-'}₹{txn.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Create Deposit</h2>
        <DepositForm />
      </div>
    </section>
  );
}
