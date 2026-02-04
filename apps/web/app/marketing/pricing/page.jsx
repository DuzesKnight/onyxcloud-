import PricingCards from '../../../components/PricingCards';

export default function PricingPage() {
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold text-white">Pricing</h1>
      <p className="mt-2 text-slate-300">Flexible monthly or yearly billing with instant provisioning.</p>
      <div className="mt-8">
        <PricingCards />
      </div>
    </main>
  );
}
