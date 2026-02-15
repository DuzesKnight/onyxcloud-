import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export default function RegisterPage() {
  return (
    <main className="container-shell py-16">
      <section className="mx-auto max-w-md glass rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="mt-4 space-y-3">
          <Input placeholder="Full name" />
          <Input type="email" placeholder="you@example.com" />
          <Input type="password" placeholder="Create password" />
          <Button className="w-full">Create Account</Button>
        </div>
      </section>
    </main>
  );
}
