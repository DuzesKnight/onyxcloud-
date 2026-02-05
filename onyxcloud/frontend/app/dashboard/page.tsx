const stats = [
  ['Active Servers', '6'],
  ['Monthly Spend', '₹3,195'],
  ['Next Renewal', '3 days'],
  ['Tickets Open', '1']
];

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-4xl font-black">User Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k} className="glass rounded-2xl p-5">
            <p className="text-sm text-slate-400">{k}</p>
            <p className="mt-1 text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6"><h2 className="text-xl font-bold">Servers</h2><p className="mt-2 text-slate-300">Start/stop/restart controls and status timeline.</p></div>
        <div className="glass rounded-2xl p-6"><h2 className="text-xl font-bold">Invoices</h2><p className="mt-2 text-slate-300">Invoice history, payment status, and downloadable receipts.</p></div>
      </section>
    </main>
  );
}
