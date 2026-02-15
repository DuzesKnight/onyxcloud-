import { Button } from '../components/ui/button';

export default function HomePage() {
  return (
    <main className="container-shell py-16">
      <section className="glass rounded-3xl p-8 sm:p-12 shadow-glow">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan">Premium Game Hosting</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          Build and scale your game servers with <span className="text-violet-400">OnyxCloud</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Launch high-performance servers in seconds with wallet-based billing, instant deployments, and admin-backed payment approvals.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/pricing">View Pricing</Button>
          <Button href="/dashboard" className="bg-soft hover:bg-slate-700">
            Open Dashboard
          </Button>
        </div>
      </section>
    </main>
  );
}
