'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 px-6 py-14 lg:grid-cols-2">
      <section>
        <h1 className="text-5xl font-black">Welcome back to <span className="gradient-text">OnyxCloud</span></h1>
        <p className="mt-4 text-slate-300">Track billing, manage servers, and launch infrastructure in seconds.</p>
      </section>
      <section className="glass rounded-3xl p-8">
        <h2 className="text-2xl font-bold">Sign in</h2>
        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input className="w-full rounded-lg border border-white/20 bg-white/5 p-3 outline-none focus:border-cyan-300" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input type="password" className="w-full rounded-lg border border-white/20 bg-white/5 p-3 outline-none focus:border-cyan-300" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 py-3 font-bold text-slate-950">Sign in</button>
        </form>
      </section>
    </main>
  );
}
