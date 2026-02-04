export default function ContactPage() {
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold text-white">Contact</h1>
      <p className="mt-2 text-slate-300">Reach our sales and support teams 24/7.</p>
      <form className="mt-8 grid gap-4">
        <input className="rounded-xl bg-slate-900/60 p-3" placeholder="Name" />
        <input className="rounded-xl bg-slate-900/60 p-3" placeholder="Email" />
        <textarea className="rounded-xl bg-slate-900/60 p-3" placeholder="Message" rows={4} />
        <button className="rounded-full bg-brand px-6 py-3 text-sm">Send Message</button>
      </form>
    </main>
  );
}
