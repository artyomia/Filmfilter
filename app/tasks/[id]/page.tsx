import { getTask } from '@/lib/data';
import { TaskTabs } from './task-tabs';

interface TaskPageProps {
  params: { id: string };
}

export default async function TaskPage({ params }: TaskPageProps) {
  const task = await getTask(params.id);

  if (!task) {
    return <div className="card">Task not found.</div>;
  }

  return <TaskTabs task={task} />;
}
