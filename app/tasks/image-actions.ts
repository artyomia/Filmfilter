'use server';

import { z } from 'zod';
import sharp from 'sharp';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getAIProvider } from '@/lib/ai/provider';

const imageSchema = z.object({
  taskId: z.string().uuid(),
  imageUrl: z.string().url(),
  type: z.enum(['hero', 'supporting'])
});

const searchSchema = z.object({
  query: z.string().min(2)
});

export async function fetchStockImages(input: z.infer<typeof searchSchema>) {
  const parsed = searchSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error('Invalid search payload');
  }

  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  const pexelsKey = process.env.PEXELS_API_KEY;

  const results: string[] = [];

  if (unsplashKey) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(parsed.data.query)}&per_page=6`,
      { headers: { Authorization: `Client-ID ${unsplashKey}` } }
    );
    if (response.ok) {
      const payload = await response.json();
      results.push(...payload.results.map((item: { urls: { regular: string } }) => item.urls.regular));
    }
  }

  if (pexelsKey) {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(parsed.data.query)}&per_page=6`, {
      headers: { Authorization: pexelsKey }
    });
    if (response.ok) {
      const payload = await response.json();
      results.push(...payload.photos.map((photo: { src: { large: string } }) => photo.src.large));
    }
  }

  return results;
}

// Optimizes external images to WebP and stores them in Supabase Storage.
export async function optimizeAndStoreImage(input: z.infer<typeof imageSchema>) {
  const parsed = imageSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error('Invalid image payload');
  }

  const supabase = createSupabaseAdminClient();
  const bucketName = process.env.SUPABASE_STORAGE_BUCKET ?? 'seo-images';
  const { data: task } = await supabase
    .from('content_tasks')
    .select('primary_keyword,project_id')
    .eq('id', parsed.data.taskId)
    .single();

  if (!task) {
    throw new Error('Task not found');
  }

  const ai = getAIProvider();
  const naming = await ai.generateImageNaming({
    keyword: task.primary_keyword,
    context: parsed.data.type
  });

  const response = await fetch(parsed.data.imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  const optimized = await sharp(buffer).resize(1600).webp({ quality: 80 }).toBuffer();

  const filePath = `${parsed.data.taskId}/${naming.filename_slug}.webp`;
  await supabase.storage.from(bucketName).upload(filePath, optimized, {
    contentType: 'image/webp',
    upsert: true
  });

  await supabase.from('images').insert({
    task_id: parsed.data.taskId,
    type: parsed.data.type,
    source: 'upload',
    original_url: parsed.data.imageUrl,
    storage_path: filePath,
    filename: `${naming.filename_slug}.webp`,
    alt_text: naming.alt_text,
    title_text: naming.title_text
  });

  await supabase
    .from('content_tasks')
    .update({ status: 'IMAGES_READY' })
    .eq('id', parsed.data.taskId);

  await supabase.from('audit_logs').insert({
    action: 'images_ready',
    entity_type: 'content_tasks',
    entity_id: parsed.data.taskId,
    meta: { type: parsed.data.type }
  });
}
