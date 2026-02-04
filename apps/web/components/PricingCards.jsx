const plans = [
  {
    name: 'Minecraft Basic',
    price: 12,
    description: 'Perfect for small SMPs and modpacks.',
    features: ['4GB RAM', 'Ryzen CPUs', 'NVMe storage', 'DDoS protection']
  },
  {
    name: 'Hytale Pro',
    price: 22,
    description: 'High performance for community hubs.',
    features: ['8GB RAM', 'Global edge routing', 'Instant backups', 'Dedicated IP']
  },
  {
    name: 'VPS Elite',
    price: 29,
    description: 'Dedicated compute for custom stacks.',
    features: ['8 vCPU', '80GB NVMe', '1Gbps uplink', 'Root access']
  }
];

export default function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand"
        >
          <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
          <p className="mt-2 text-3xl font-bold text-white">${plan.price}/mo</p>
          <p className="mt-2 text-sm text-slate-300">{plan.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {plan.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-full bg-brand px-4 py-2 text-sm">Deploy</button>
        </div>
      ))}
    </div>
  );
}
