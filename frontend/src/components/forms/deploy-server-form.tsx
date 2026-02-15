'use client';

import { FormEvent, useState } from 'react';
import { deployServerApi } from '../../lib/api/servers';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function DeployServerForm() {
  const [serverName, setServerName] = useState('');
  const [game, setGame] = useState('Minecraft');
  const [planId, setPlanId] = useState('1');
  const [message, setMessage] = useState<string | null>(null);

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
      <Input type="number" min="1" placeholder="Plan ID" value={planId} onChange={(e) => setPlanId(e.target.value)} required />
      {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
      <Button type="submit">Buy & Deploy</Button>
    </form>
  );
}
