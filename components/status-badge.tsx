import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  OUTLINE_PENDING: 'border-slate-600 text-slate-200',
  OUTLINE_GENERATED: 'border-indigo-400 text-indigo-200',
  OUTLINE_APPROVED: 'border-emerald-400 text-emerald-200',
  DRAFT_GENERATED: 'border-sky-400 text-sky-200',
  CONTENT_APPROVED: 'border-emerald-400 text-emerald-200',
  IMAGES_READY: 'border-amber-400 text-amber-200',
  WP_DRAFTED: 'border-fuchsia-400 text-fuchsia-200'
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('badge', statusStyles[status] ?? 'border-slate-600 text-slate-200')}>
      {status.replaceAll('_', ' ')}
    </span>
  );
}
