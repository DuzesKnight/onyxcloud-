import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-slate-700 bg-soft px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 focus:border-brand focus:outline-none"
    />
  );
}
