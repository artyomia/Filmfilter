'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTask } from './actions';
import { useState } from 'react';

const taskSchema = z.object({
  project_id: z.string().uuid(),
  primary_keyword: z.string().min(2),
  secondary_keywords: z.string().optional(),
  intent: z.enum(['informational', 'commercial', 'transactional', 'navigational']),
  target_min_words: z.coerce.number().min(600),
  target_max_words: z.coerce.number().max(4000),
  language: z.string().default('en'),
  notes: z.string().optional()
});

type TaskValues = z.infer<typeof taskSchema>;

export function TaskForm({ projectOptions }: { projectOptions: { id: string; name: string }[] }) {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      intent: 'informational',
      target_min_words: 1200,
      target_max_words: 1800,
      language: 'en'
    }
  });

  const onSubmit = async (values: TaskValues) => {
    await createTask(values);
    reset();
    setMessage('Task created.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="text-sm">Project</label>
        <select className="input mt-2" {...register('project_id')}>
          <option value="">Select project</option>
          {projectOptions.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        {errors.project_id && <p className="text-xs text-red-400">Project is required.</p>}
      </div>
      <div className="md:col-span-2">
        <label className="text-sm">Primary keyword</label>
        <input className="input mt-2" {...register('primary_keyword')} />
      </div>
      <div className="md:col-span-2">
        <label className="text-sm">Secondary keywords (comma separated)</label>
        <input className="input mt-2" {...register('secondary_keywords')} />
      </div>
      <div>
        <label className="text-sm">Intent</label>
        <select className="input mt-2" {...register('intent')}>
          <option value="informational">Informational</option>
          <option value="commercial">Commercial</option>
          <option value="transactional">Transactional</option>
          <option value="navigational">Navigational</option>
        </select>
      </div>
      <div>
        <label className="text-sm">Language</label>
        <input className="input mt-2" {...register('language')} />
      </div>
      <div>
        <label className="text-sm">Min words</label>
        <input className="input mt-2" type="number" {...register('target_min_words')} />
      </div>
      <div>
        <label className="text-sm">Max words</label>
        <input className="input mt-2" type="number" {...register('target_max_words')} />
      </div>
      <div className="md:col-span-2">
        <label className="text-sm">Notes</label>
        <textarea className="input mt-2 min-h-[120px]" {...register('notes')} />
      </div>
      <div className="md:col-span-2 flex items-center gap-3">
        <button className="button" type="submit" disabled={isSubmitting}>
          Create task
        </button>
        {message && <span className="text-sm text-slate-300">{message}</span>}
      </div>
    </form>
  );
}
