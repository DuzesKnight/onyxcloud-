import './globals.css';
import Link from 'next/link';

const nav = [
  { href: '#products', label: 'Products' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQ' }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-wide">
              <span className="gradient-text">OnyxCloud</span>
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-slate-300 hover:text-cyan-300">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-cyan-300 hover:text-cyan-300">Login</Link>
              <Link href="/register" className="rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-slate-950">Get Started</Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
