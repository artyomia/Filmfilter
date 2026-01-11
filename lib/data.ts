import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { TaskStatus } from '@/lib/types';

export async function getDashboardSummary() {
  const supabase = createSupabaseServerClient();

  const { data: tasks } = await supabase.from('content_tasks').select('status');
  const { data: auditLogs } = await supabase
    .from('audit_logs')
    .select('action,created_at,meta')
    .order('created_at', { ascending: false })
    .limit(5);

  const statusCounts = (tasks ?? []).reduce<Record<string, number>>((acc, task) => {
    const status = task.status as TaskStatus;
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  }, {});

  return {
    statusCounts,
    auditLogs: auditLogs ?? []
  };
}

export async function getProjects() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('projects_public').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

export async function getTasks() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from('content_tasks')
    .select('id,primary_keyword,status,project_id,created_at')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export async function getTask(taskId: string) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('content_tasks').select('*').eq('id', taskId).single();
  return data;
}
