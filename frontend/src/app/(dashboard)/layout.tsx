import { ReactNode } from 'react';
import { Sidebar } from '../../components/layout/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container-shell py-8">
      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <Sidebar />
        <div>{children}</div>
      </div>
    </main>
  );
}
