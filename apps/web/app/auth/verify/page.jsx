'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { getCsrfToken } from '../../../lib/api';

export default function VerifyPage() {
  const search = useSearchParams();

  useEffect(() => {
    const token = search.get('token');
    if (!token) return;
    getCsrfToken().then((csrfToken) => {
      fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
        body: JSON.stringify({ token })
      })
        .then((res) => {
          if (res.ok) {
            toast.success('Email verified.');
          } else {
            toast.error('Verification failed.');
          }
        })
        .catch(() => toast.error('Verification failed.'));
    });
  }, [search]);

  return (
    <main className="container py-16">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-white">Verify your email</h1>
      <p className="mt-2 text-slate-300">We are verifying your account...</p>
    </main>
  );
}
