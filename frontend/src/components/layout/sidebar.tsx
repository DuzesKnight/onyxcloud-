import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/wallet', label: 'Wallet' },
  { href: '/dashboard/deploy', label: 'Deploy Server' },
  { href: '/dashboard/servers', label: 'My Servers' }
];

export function Sidebar() {
  return (
    <aside className="glass rounded-2xl p-4">
      <p className="mb-4 text-xs uppercase tracking-widest text-slate-400">Control Panel</p>
      <nav className="space-y-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-soft hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
