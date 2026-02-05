export default function Admin() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-4xl font-black">Admin Control Center</h1>
      <p className="mt-3 text-slate-300">Monitor users, enforce billing, and manage provisioning operations.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-5"><h2 className="font-bold">Users</h2><p className="text-slate-300 mt-2">Search, suspend, and role-manage users.</p></div>
        <div className="glass rounded-2xl p-5"><h2 className="font-bold">Servers</h2><p className="text-slate-300 mt-2">Force suspend/delete and inspect capacity.</p></div>
        <div className="glass rounded-2xl p-5"><h2 className="font-bold">Revenue</h2><p className="text-slate-300 mt-2">Track monthly recurring revenue and refunds.</p></div>
      </div>
    </main>
  );
}
