'use client';

import { FormEvent, useEffect, useState } from 'react';
import { deployServerApi, listAvailablePlansApi } from '../../lib/api/servers';
import { Plan } from '../../types/servers';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function DeployServerForm() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [serverName, setServerName] = useState('');
  const [game, setGame] = useState('Minecraft');
  const [planId, setPlanId] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    listAvailablePlansApi()
      .then((data) => {
        setPlans(data);
        if (data.length > 0) {
          setPlanId(String(data[0].id));
        }
      })
      .catch(() => setPlans([]));
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await deployServerApi({
      serverName,
      game,
      planId: Number(planId)
    });
    setMessage(`Server deployed successfully (ID: ${result.serverId})`);
    setServerName('');
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <Input placeholder="Server Name" value={serverName} onChange={(e) => setServerName(e.target.value)} required />
      <Input placeholder="Game" value={game} onChange={(e) => setGame(e.target.value)} required />
      <select
        className="w-full rounded-xl border border-slate-700 bg-soft px-4 py-2.5 text-sm"
        value={planId}
        onChange={(e) => setPlanId(e.target.value)}
        required
      >
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>{plan.name} - ₹{plan.price}/mo ({plan.ram}MB RAM / {plan.cpu}% CPU)</option>
        ))}
      </select>
      {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
      <Button type="submit">Buy & Deploy</Button>
    </form>
  );
}
