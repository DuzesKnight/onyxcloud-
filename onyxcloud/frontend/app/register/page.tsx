export default function Register() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <div className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-black">Create your account</h1>
        <p className="mt-2 text-slate-300">Start with instant provisioning and seamless UPI billing.</p>
        <form className="mt-6 space-y-4">
          <input placeholder="Full name" className="w-full rounded-lg border border-white/20 bg-white/5 p-3" />
          <input placeholder="Email" className="w-full rounded-lg border border-white/20 bg-white/5 p-3" />
          <input placeholder="Password" type="password" className="w-full rounded-lg border border-white/20 bg-white/5 p-3" />
          <button className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 py-3 font-bold text-slate-950">Create account</button>
        </form>
      </div>
    </main>
  );
}
