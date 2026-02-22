import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, href, className = '', type = 'button', ...buttonProps }: Props) {
  const base = `inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${base} bg-brand text-white hover:bg-violet-500`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={`${base} bg-brand text-white hover:bg-violet-500`} {...buttonProps}>
      {children}
    </button>
  );
}
