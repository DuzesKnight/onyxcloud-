'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { getCsrfToken } from '../../../lib/api';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export default function SignupPage() {
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const csrfToken = await getCsrfToken();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      toast.error('Signup failed');
      return;
    }
    toast.success('Check your email to verify.');
  };

  return (
    <main className="container py-16">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-8">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input className="rounded-xl bg-slate-950 p-3" placeholder="Full name" {...register('name')} />
          <input className="rounded-xl bg-slate-950 p-3" placeholder="Email" {...register('email')} />
          <input className="rounded-xl bg-slate-950 p-3" placeholder="Password" type="password" {...register('password')} />
          {formState.errors.password && <p className="text-sm text-red-400">Password too short.</p>}
          <button className="rounded-full bg-brand px-6 py-3 text-sm">Sign Up</button>
        </form>
      </div>
    </main>
  );
}
