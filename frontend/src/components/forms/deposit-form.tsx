'use client';

import { FormEvent, useState } from 'react';
import { createDepositApi } from '../../lib/api/deposits';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function DepositForm() {
  const [amount, setAmount] = useState('');
  const [utr, setUtr] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createDepositApi({ amount: Number(amount), utr });
    setMessage('Deposit request submitted for admin approval.');
    setAmount('');
    setUtr('');
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <Input type="number" min="1" placeholder="Amount in INR" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <Input placeholder="UPI UTR" value={utr} onChange={(e) => setUtr(e.target.value)} required />
      {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
      <Button type="submit">Create Deposit Request</Button>
    </form>
  );
}
