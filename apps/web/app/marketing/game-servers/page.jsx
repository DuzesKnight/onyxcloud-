export default function GameServersPage() {
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold text-white">Game Servers</h1>
      <p className="mt-2 text-slate-300">
        Minecraft, Hytale, Valheim and more with instant modpack installation.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Minecraft Hosting</h2>
          <p className="mt-2 text-sm text-slate-300">Paper, Spigot, Fabric, Forge support with 1-click modpacks.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Hytale Ready</h2>
          <p className="mt-2 text-sm text-slate-300">Future-proofed infrastructure ready for next-gen servers.</p>
        </div>
      </div>
    </main>
  );
}
