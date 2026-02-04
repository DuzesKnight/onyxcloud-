import FeatureGrid from '../components/FeatureGrid';
import PricingCards from '../components/PricingCards';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand">Premium hosting</p>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Game & VPS hosting built for unstoppable communities
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Launch Minecraft, Hytale, and VPS workloads on blazing-fast Ryzen infrastructure with global locations and
              instant scaling.
            </p>
            <div className="mt-6 flex gap-4">
              <Link className="rounded-full bg-brand px-6 py-3 text-sm" href="/marketing/pricing">
                View Pricing
              </Link>
              <Link className="rounded-full border border-white/20 px-6 py-3 text-sm" href="/marketing/game-servers">
                Explore Game Servers
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg">
            <h2 className="text-lg font-semibold text-white">Deployment Highlights</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• One-click modpack installer and backups</li>
              <li>• Dedicated IPv4 + IPv6 support</li>
              <li>• Built-in DDoS protection and WAF</li>
              <li>• Managed SLA and proactive monitoring</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-3xl font-semibold text-white">Why teams choose OnyxCloud</h2>
        <p className="mt-2 text-slate-300">
          Low latency, high availability, and premium hardware for every plan.
        </p>
        <div className="mt-8">
          <FeatureGrid />
        </div>
      </section>

      <section className="bg-slate-950 py-16">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-white">Flexible pricing</h2>
              <p className="mt-2 text-slate-300">Switch between monthly and yearly plans anytime.</p>
            </div>
            <div className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200">
              Monthly • Yearly • Promotions
            </div>
          </div>
          <div className="mt-8">
            <PricingCards />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h3 className="text-xl font-semibold text-white">Customer stories</h3>
            <p className="mt-3 text-slate-300">
              “Our modded Minecraft network doubled in size without lag. The OnyxCloud team handled migration in 30
              minutes.”
            </p>
            <p className="mt-4 text-sm text-slate-400">— VelocityCraft Studios</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h3 className="text-xl font-semibold text-white">Dedicated support</h3>
            <p className="mt-3 text-slate-300">
              24/7 response teams, automated scaling, and proactive incident management.
            </p>
            <p className="mt-4 text-sm text-slate-400">— 99.99% uptime verified</p>
          </div>
        </div>
      </section>

      <section className="bg-brand py-12">
        <div className="container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-semibold text-white">Ready to launch?</h2>
            <p className="mt-2 text-white/80">Start with a 24-hour free migration plan.</p>
          </div>
          <Link className="rounded-full bg-white px-6 py-3 text-sm text-brand" href="/auth/signup">
            Create Account
          </Link>
        </div>
      </section>
    </main>
  );
}
