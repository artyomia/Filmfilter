import { getDashboardSummary } from '@/lib/data';

export default async function DashboardPage() {
  const { statusCounts, auditLogs } = await getDashboardSummary();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="card">
            <p className="text-xs text-slate-400">{status.replaceAll('_', ' ')}</p>
            <p className="mt-2 text-3xl font-semibold">{count}</p>
          </div>
        ))}
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          {auditLogs.length === 0 && <p>No recent activity yet.</p>}
          {auditLogs.map((log) => (
            <div key={`${log.action}-${log.created_at}`} className="flex items-center justify-between">
              <span>{log.action.replaceAll('_', ' ')}</span>
              <span className="text-xs text-slate-500">{new Date(log.created_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
