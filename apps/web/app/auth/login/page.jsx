'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { getCsrfToken } from '../../../lib/api';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional()
});

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const csrfToken = await getCsrfToken();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      toast.error('Login failed');
      return;
    }
    toast.success('Welcome back!');
  };

  return (
    <main className="container py-16">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-8">
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input className="rounded-xl bg-slate-950 p-3" placeholder="Email" {...register('email')} />
          <input className="rounded-xl bg-slate-950 p-3" placeholder="Password" type="password" {...register('password')} />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" {...register('rememberMe')} /> Remember me
          </label>
          {formState.errors.email && <p className="text-sm text-red-400">Invalid email.</p>}
          <button className="rounded-full bg-brand px-6 py-3 text-sm">Sign In</button>
        </form>
      </div>
    </main>
  );
}
