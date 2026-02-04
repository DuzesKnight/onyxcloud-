export default function FaqPage() {
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold text-white">FAQ</h1>
      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">How fast is provisioning?</h2>
          <p className="mt-2 text-sm text-slate-300">Most servers deploy in under 60 seconds.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Do you offer refunds?</h2>
          <p className="mt-2 text-sm text-slate-300">Yes, within 7 days on first-time purchases.</p>
        </div>
      </div>
    </main>
  );
}
