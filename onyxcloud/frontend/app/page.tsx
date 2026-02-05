const products = [
  { title: 'Game Servers', desc: 'Minecraft, Rust, CS2 with instant deployment and DDoS filtering.' },
  { title: 'VPS Hosting', desc: 'Managed KVM VPS with SSD storage and one-click app templates.' },
  { title: 'Add-ons', desc: 'Automated backups, premium support, and advanced monitoring packs.' }
];

const pricing = [
  { name: 'Starter', price: '₹299/mo', specs: ['2 vCPU', '4 GB RAM', '50 GB NVMe'] },
  { name: 'Pro', price: '₹799/mo', specs: ['4 vCPU', '8 GB RAM', '120 GB NVMe'] },
  { name: 'Enterprise', price: '₹1,699/mo', specs: ['8 vCPU', '16 GB RAM', '300 GB NVMe'] }
];

export default function Home() {
  return (
    <main>
      <section className="hero-grid relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">Automated hosting SaaS</p>
            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              Power your servers with <span className="gradient-text">OnyxCloud</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">A premium cloud control plane for game hosting and VPS infrastructure with real-time billing, provisioning, and lifecycle automation.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#pricing" className="rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 font-bold text-slate-950">View Pricing</a>
              <a href="#features" className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-slate-200">Explore Features</a>
            </div>
          </div>
          <div className="glass card-3d rounded-3xl p-6">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-cyan-200">Live Infrastructure Snapshot</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white/5 p-4"><p className="text-slate-400">Active Nodes</p><p className="mt-1 text-2xl font-bold">18</p></div>
                <div className="rounded-xl bg-white/5 p-4"><p className="text-slate-400">Provision Time</p><p className="mt-1 text-2xl font-bold">42s</p></div>
                <div className="rounded-xl bg-white/5 p-4"><p className="text-slate-400">Uptime</p><p className="mt-1 text-2xl font-bold">99.98%</p></div>
                <div className="rounded-xl bg-white/5 p-4"><p className="text-slate-400">Auto-healing</p><p className="mt-1 text-2xl font-bold">Enabled</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold">Products built for scale</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.title} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-slate-300">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-3xl font-bold">Transparent pricing</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pricing.map((tier) => (
            <article key={tier.name} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/40">
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <p className="mt-2 text-3xl font-black gradient-text">{tier.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {tier.specs.map((s) => <li key={s}>• {s}</li>)}
              </ul>
              <button className="mt-6 w-full rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 py-2 font-bold text-slate-950">Deploy now</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
