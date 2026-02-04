export default function VpsPage() {
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold text-white">VPS Hosting</h1>
      <p className="mt-2 text-slate-300">NVMe storage, instant snapshots, and global IP allocations.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">Root access</div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">DDOS protection</div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">Custom OS images</div>
      </div>
    </main>
  );
}
