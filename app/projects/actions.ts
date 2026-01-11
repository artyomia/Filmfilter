'use server';

import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

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

export async function createProject(payload: z.infer<typeof projectSchema>) {
  const parsed = projectSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error('Invalid project payload');
  }

  const supabase = createSupabaseServerClient();
  await supabase.from('projects').insert(parsed.data);
}
