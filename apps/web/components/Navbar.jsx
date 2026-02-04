import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-white">
          OnyxCloud
        </Link>
        <div className="hidden gap-6 text-sm text-slate-200 md:flex">
          <Link href="/marketing/game-servers">Game Servers</Link>
          <Link href="/marketing/vps">VPS</Link>
          <Link href="/marketing/add-ons">Add-ons</Link>
          <Link href="/marketing/pricing">Pricing</Link>
          <Link href="/marketing/faq">FAQ</Link>
        </div>
        <div className="flex gap-3">
          <Link className="rounded-full border border-white/20 px-4 py-2 text-sm" href="/auth/login">
            Login
          </Link>
          <Link className="rounded-full bg-brand px-4 py-2 text-sm" href="/auth/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
