import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="card space-y-4">
      <h1 className="text-3xl font-semibold">B2B SEO Studio</h1>
      <p className="text-sm text-slate-300">
        Manage multi-site SEO production with human-in-the-loop approvals and WordPress draft publishing.
      </p>
      <div className="flex gap-3">
        <Link className="button" href="/dashboard">
          Go to dashboard
        </Link>
        <Link className="button-secondary" href="/login">
          Sign in
        </Link>
      </div>
    </div>
  );
}
