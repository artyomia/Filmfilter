'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProject } from './actions';

const projectSchema = z.object({
  name: z.string().min(2),
  website_url: z.string().url(),
  industry: z.enum(['industrial', 'logistics', 'industrial_real_estate']),
  tone: z.enum(['professional', 'technical', 'consultative']),
  language_default: z.string().default('en'),
  wp_base_url: z.string().url(),
  wp_username: z.string().min(3),
  wp_app_password: z.string().min(8)
});

type ProjectValues = z.infer<typeof projectSchema>;

export function ProjectForm() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      industry: 'industrial',
      tone: 'professional',
      language_default: 'en'
    }
  });

  const onSubmit = async (values: ProjectValues) => {
    await createProject(values);
    reset();
    setMessage('Project saved.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="text-sm">Project name</label>
        <input className="input mt-2" {...register('name')} />
        {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-sm">Website URL</label>
        <input className="input mt-2" {...register('website_url')} />
      </div>
      <div>
        <label className="text-sm">Industry</label>
        <select className="input mt-2" {...register('industry')}>
          <option value="industrial">Industrial</option>
          <option value="logistics">Logistics</option>
          <option value="industrial_real_estate">Industrial real estate</option>
        </select>
      </div>
      <div>
        <label className="text-sm">Tone</label>
        <select className="input mt-2" {...register('tone')}>
          <option value="professional">Professional</option>
          <option value="technical">Technical</option>
          <option value="consultative">Consultative</option>
        </select>
      </div>
      <div>
        <label className="text-sm">Default language</label>
        <input className="input mt-2" {...register('language_default')} />
      </div>
      <div>
        <label className="text-sm">WP Base URL</label>
        <input className="input mt-2" {...register('wp_base_url')} />
      </div>
      <div>
        <label className="text-sm">WP Username</label>
        <input className="input mt-2" {...register('wp_username')} />
      </div>
      <div>
        <label className="text-sm">WP App Password</label>
        <input className="input mt-2" {...register('wp_app_password')} type="password" />
      </div>
      <div className="md:col-span-2 flex items-center gap-3">
        <button className="button" type="submit" disabled={isSubmitting}>
          Save project
        </button>
        {message && <span className="text-sm text-slate-300">{message}</span>}
      </div>
    </form>
  );
}
