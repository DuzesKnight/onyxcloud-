'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { getCsrfToken } from '../../../lib/api';

const schema = z.object({
  password: z.string().min(8)
});

export default function ResetPage() {
  const search = useSearchParams();
  const token = search.get('token');
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const csrfToken = await getCsrfToken();
    const res = await fetch('/api/auth/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
      body: JSON.stringify({ token, password: data.password })
    });
    if (!res.ok) {
      toast.error('Reset failed');
      return;
    }
    toast.success('Password updated');
  };

  return (
    <main className="container py-16">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-8">
        <h1 className="text-3xl font-bold text-white">Reset password</h1>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input className="rounded-xl bg-slate-950 p-3" placeholder="New password" type="password" {...register('password')} />
          <button className="rounded-full bg-brand px-6 py-3 text-sm">Reset</button>
        </form>
      </div>
    </main>
  );
}
