'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/tasks', label: 'Tasks' }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-200">
              B2B SEO Studio
            </div>
          </div>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium text-slate-300 transition hover:text-white',
                  pathname.startsWith(item.href) && 'text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="button-secondary" href="/login">
            Account
          </Link>
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  );
}
