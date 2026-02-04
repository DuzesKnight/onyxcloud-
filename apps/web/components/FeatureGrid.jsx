const features = [
  { title: 'Sub-10ms latency', description: 'Optimized routing with premium peering.' },
  { title: '99.99% uptime', description: 'Redundant datacenters and failover.' },
  { title: 'Ryzen 9 processors', description: 'Next-gen compute for smooth ticks.' },
  { title: 'Global locations', description: 'Mumbai, Singapore, Frankfurt, Ashburn.' }
];

export default function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <div key={feature.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
