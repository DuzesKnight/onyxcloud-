'use client';

import { useEffect, useState } from 'react';
import { listAvailablePlansApi } from '../../lib/api/servers';
import { Plan } from '../../types/servers';

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    listAvailablePlansApi().then(setPlans).catch(() => setPlans([]));
  }, []);

  return (
    <main className="container-shell py-16">
      <h1 className="text-3xl font-bold text-white">Pricing</h1>
      <p className="mt-2 text-slate-400">Choose the right server plan for your game.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.id} className="glass rounded-2xl p-5">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-2xl font-bold">₹{plan.price}/mo</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              <li>RAM: {plan.ram} MB</li>
              <li>CPU: {plan.cpu}%</li>
              <li>Disk: {plan.disk} MB</li>
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
