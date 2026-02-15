const plans = [
  { name: 'Starter', price: '₹499/mo', specs: '2 vCPU • 4GB RAM • 20GB SSD' },
  { name: 'Pro', price: '₹999/mo', specs: '4 vCPU • 8GB RAM • 60GB SSD' },
  { name: 'Extreme', price: '₹1899/mo', specs: '8 vCPU • 16GB RAM • 120GB SSD' }
];

export default function PricingPage() {
  return (
    <main className="container-shell py-16">
      <h1 className="text-4xl font-bold">Pricing</h1>
      <p className="mt-2 text-slate-400">Simple wallet-first pricing for every community size.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-2xl font-bold text-violet-300">{plan.price}</p>
            <p className="mt-2 text-sm text-slate-400">{plan.specs}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
