'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={onSubmit}>
      <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      <Button type="submit" className="w-full">{loading ? 'Signing in...' : 'Sign In'}</Button>
    </form>
  );
}
