'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-slate-800/80 bg-bg/70 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-wide text-white">
          OnyxCloud
        </Link>

        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        <div className="flex gap-2">
          {isAuthenticated ? (
            <Button className="bg-soft hover:bg-slate-700" onClick={logout}>Logout</Button>
          ) : (
            <>
              <Button href="/login" className="bg-soft hover:bg-slate-700">Login</Button>
              <Button href="/register">Get Started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
