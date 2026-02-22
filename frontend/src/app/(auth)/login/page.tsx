import { LoginForm } from '../../../components/forms/login-form';

export default function LoginPage() {
  return (
    <main className="container-shell py-16">
      <section className="mx-auto max-w-md glass rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <LoginForm />
      </section>
    </main>
  );
}
