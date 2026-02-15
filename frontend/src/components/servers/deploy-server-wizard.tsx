import { DeployServerForm } from '../forms/deploy-server-form';

export function DeployServerWizard() {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Deploy New Server</h2>
      <p className="mt-1 text-sm text-slate-400">Choose a plan and game to provision instantly.</p>

      <div className="mt-5">
        <DeployServerForm />
      </div>
    </div>
  );
}
