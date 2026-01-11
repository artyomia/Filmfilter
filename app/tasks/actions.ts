'use server';

import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAIProvider } from '@/lib/ai/provider';
import { markdownToHtml } from '@/lib/markdown';

// Server actions encapsulate workflow transitions and ensure Supabase updates stay server-side.

const taskIdSchema = z.string().uuid();

const createTaskSchema = z.object({
  project_id: z.string().uuid(),
  primary_keyword: z.string().min(2),
  secondary_keywords: z.string().optional(),
  intent: z.enum(['informational', 'commercial', 'transactional', 'navigational']),
  target_min_words: z.number().min(600),
  target_max_words: z.number().max(4000),
  language: z.string().default('en'),
  notes: z.string().optional()
});

export async function createTask(payload: z.infer<typeof createTaskSchema>) {
  const parsed = createTaskSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error('Invalid task payload');
  }

  const supabase = createSupabaseServerClient();
  const secondaryKeywords = parsed.data.secondary_keywords
    ? parsed.data.secondary_keywords.split(',').map((keyword) => keyword.trim())
    : [];

  await supabase.from('content_tasks').insert({
    project_id: parsed.data.project_id,
    primary_keyword: parsed.data.primary_keyword,
    secondary_keywords: secondaryKeywords,
    intent: parsed.data.intent,
    target_min_words: parsed.data.target_min_words,
    target_max_words: parsed.data.target_max_words,
    language: parsed.data.language,
    notes: parsed.data.notes,
    status: 'OUTLINE_PENDING'
  });
}

export async function generateOutline(taskId: string) {
  const parsed = taskIdSchema.safeParse(taskId);
  if (!parsed.success) {
    throw new Error('Invalid task id');
  }

  const supabase = createSupabaseServerClient();
  const { data: task } = await supabase.from('content_tasks').select('*').eq('id', taskId).single();
  if (!task) {
    throw new Error('Task not found');
  }

  const { data: project } = await supabase
    .from('projects_public')
    .select('industry,tone,language_default')
    .eq('id', task.project_id)
    .single();
  const ai = getAIProvider();
  const outline = await ai.generateOutline({
    keyword: task.primary_keyword,
    secondaryKeywords: task.secondary_keywords ?? [],
    intent: task.intent,
    industry: project?.industry ?? 'industrial',
    tone: project?.tone ?? 'professional',
    language: task.language ?? project?.language_default ?? 'en',
    wordRange: `${task.target_min_words}-${task.target_max_words}`
  });

  await supabase
    .from('content_tasks')
    .update({ outline_json: outline, status: 'OUTLINE_GENERATED' })
    .eq('id', taskId);

  await supabase.from('audit_logs').insert({
    action: 'outline_generated',
    entity_type: 'content_tasks',
    entity_id: taskId,
    meta: { keyword: task.primary_keyword }
  });
}

export async function approveOutline(taskId: string) {
  const parsed = taskIdSchema.safeParse(taskId);
  if (!parsed.success) {
    throw new Error('Invalid task id');
  }

  const supabase = createSupabaseServerClient();
  await supabase.from('content_tasks').update({ status: 'OUTLINE_APPROVED' }).eq('id', taskId);
  await supabase.from('audit_logs').insert({
    action: 'outline_approved',
    entity_type: 'content_tasks',
    entity_id: taskId,
    meta: {}
  });
}

export async function generateDraft(taskId: string) {
  const parsed = taskIdSchema.safeParse(taskId);
  if (!parsed.success) {
    throw new Error('Invalid task id');
  }

  const supabase = createSupabaseServerClient();
  const { data: task } = await supabase.from('content_tasks').select('*').eq('id', taskId).single();
  if (!task || !task.outline_json) {
    throw new Error('Outline required');
  }

  const { data: project } = await supabase
    .from('projects_public')
    .select('industry,tone,language_default')
    .eq('id', task.project_id)
    .single();
  const ai = getAIProvider();
  const article = await ai.generateArticle({
    outline: task.outline_json,
    keyword: task.primary_keyword,
    secondaryKeywords: task.secondary_keywords ?? [],
    intent: task.intent,
    industry: project?.industry ?? 'industrial',
    tone: project?.tone ?? 'professional',
    language: task.language ?? project?.language_default ?? 'en',
    wordRange: `${task.target_min_words}-${task.target_max_words}`
  });

  const html = markdownToHtml(article.markdown);

  await supabase
    .from('content_tasks')
    .update({
      article_markdown: article.markdown,
      article_html: html,
      meta_title: article.meta_title,
      meta_description: article.meta_description,
      faq_schema_jsonld: article.faq_schema_jsonld,
      status: 'DRAFT_GENERATED'
    })
    .eq('id', taskId);

  await supabase.from('audit_logs').insert({
    action: 'draft_generated',
    entity_type: 'content_tasks',
    entity_id: taskId,
    meta: {}
  });
}

export async function approveContent(taskId: string) {
  const parsed = taskIdSchema.safeParse(taskId);
  if (!parsed.success) {
    throw new Error('Invalid task id');
  }

  const supabase = createSupabaseServerClient();
  await supabase.from('content_tasks').update({ status: 'CONTENT_APPROVED' }).eq('id', taskId);
  await supabase.from('audit_logs').insert({
    action: 'content_approved',
    entity_type: 'content_tasks',
    entity_id: taskId,
    meta: {}
  });
}

const rewriteSchema = z.object({
  text: z.string().min(4),
  instruction: z.string().min(4),
  industry: z.string(),
  tone: z.string(),
  language: z.string()
});

export async function rewriteSelection(payload: z.infer<typeof rewriteSchema>) {
  const parsed = rewriteSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error('Invalid rewrite payload');
  }

  const ai = getAIProvider();
  return ai.rewriteSelection(parsed.data);
}

const updateDraftSchema = z.object({
  taskId: z.string().uuid(),
  markdown: z.string().min(10)
});

export async function updateDraft(payload: z.infer<typeof updateDraftSchema>) {
  const parsed = updateDraftSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error('Invalid update payload');
  }

  const supabase = createSupabaseServerClient();
  const html = markdownToHtml(parsed.data.markdown);

  await supabase
    .from('content_tasks')
    .update({ article_markdown: parsed.data.markdown, article_html: html })
    .eq('id', parsed.data.taskId);
}
