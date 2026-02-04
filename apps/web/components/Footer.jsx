export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 text-sm text-slate-400">
      <div className="container grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-white">OnyxCloud</h3>
          <p className="mt-2">Premium game hosting and VPS infrastructure.</p>
        </div>
        <div className="space-y-2">
          <p>support@onyxcloud.test</p>
          <p>+91 90000 00000</p>
          <p>Mumbai • Singapore • Frankfurt</p>
        </div>
        <div className="space-y-2">
          <p>Terms • Privacy • Status</p>
          <p>© 2025 OnyxCloud</p>
        </div>
      </div>
    </footer>
  );
}
