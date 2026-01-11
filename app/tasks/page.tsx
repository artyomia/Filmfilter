import Link from 'next/link';
import { getProjects, getTasks } from '@/lib/data';
import { StatusBadge } from '@/components/status-badge';
import { TaskForm } from './task-form';

export default async function TasksPage() {
  const [projects, tasks] = await Promise.all([getProjects(), getTasks()]);

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-semibold">Content tasks</h1>
        <p className="mt-2 text-sm text-slate-300">
          Create new tasks, assign keywords, and track workflow status.
        </p>
        <div className="mt-6">
          <TaskForm projectOptions={projects} />
        </div>
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold">Active tasks</h2>
        <div className="mt-4 space-y-4">
          {tasks.length === 0 && <p className="text-sm text-slate-300">No tasks created yet.</p>}
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-xl border border-slate-800 p-4">
              <div>
                <p className="text-sm font-medium text-white">{task.primary_keyword}</p>
                <p className="text-xs text-slate-500">Project {task.project_id}</p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={task.status} />
                <Link className="button-secondary" href={`/tasks/${task.id}`}>
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
