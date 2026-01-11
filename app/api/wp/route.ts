import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

const payloadSchema = z.object({
  taskId: z.string().uuid(),
  featuredImageId: z.string().uuid().optional()
});

// Route handler keeps WordPress credentials server-side and limits drafts to approved content.
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const bucketName = process.env.SUPABASE_STORAGE_BUCKET ?? 'seo-images';
  const { data: task } = await supabase
    .from('content_tasks')
    .select('*, projects(*)')
    .eq('id', parsed.data.taskId)
    .single();

  if (!task || !task.projects) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  if (task.status !== 'CONTENT_APPROVED' && task.status !== 'IMAGES_READY') {
    return NextResponse.json({ error: 'Content not approved' }, { status: 400 });
  }

  const project = task.projects;
  const authHeader = `Basic ${Buffer.from(`${project.wp_username}:${project.wp_app_password}`).toString('base64')}`;

  let featuredMediaId: number | undefined;
  if (parsed.data.featuredImageId) {
    const { data: image } = await supabase
      .from('images')
      .select('*')
      .eq('id', parsed.data.featuredImageId)
      .single();

    if (image) {
      const { data: file } = await supabase.storage.from(bucketName).download(image.storage_path);
      if (file) {
        const uploadResponse = await fetch(`${project.wp_base_url}/wp-json/wp/v2/media`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Disposition': `attachment; filename="${image.filename}"`,
            'Content-Type': 'image/webp'
          },
          body: file
        });

        if (uploadResponse.ok) {
          const media = await uploadResponse.json();
          featuredMediaId = media.id;
        }
      }
    }
  }

  const postResponse = await fetch(`${project.wp_base_url}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'draft',
      title: task.meta_title ?? task.primary_keyword,
      slug: task.primary_keyword.toLowerCase().replace(/\s+/g, '-'),
      content: task.article_html,
      featured_media: featuredMediaId
    })
  });

  if (!postResponse.ok) {
    const errorPayload = await postResponse.text();
    await supabase.from('audit_logs').insert({
      action: 'wp_drafted_failed',
      entity_type: 'content_tasks',
      entity_id: task.id,
      meta: { error: errorPayload }
    });
    return NextResponse.json({ error: 'WP draft failed', details: errorPayload }, { status: 500 });
  }

  const wpPayload = await postResponse.json();

  await supabase.from('content_tasks').update({ status: 'WP_DRAFTED' }).eq('id', task.id);
  await supabase.from('audit_logs').insert({
    action: 'wp_drafted',
    entity_type: 'content_tasks',
    entity_id: task.id,
    meta: { wp: wpPayload }
  });

  return NextResponse.json({ success: true, wp: wpPayload });
}
