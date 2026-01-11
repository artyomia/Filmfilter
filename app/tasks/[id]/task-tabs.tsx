'use client';

import { useState, useTransition } from 'react';
import { approveContent, approveOutline, generateDraft, generateOutline, rewriteSelection, updateDraft } from '../actions';
import { fetchStockImages, optimizeAndStoreImage } from '../image-actions';
import { StatusBadge } from '@/components/status-badge';

const tabs = ['Setup', 'Outline', 'Draft', 'Images', 'Internal Links', 'WordPress'] as const;

type TaskTab = (typeof tabs)[number];

type TaskPayload = {
  id: string;
  status: string;
  primary_keyword: string;
  secondary_keywords: string[] | null;
  intent: string;
  target_min_words: number;
  target_max_words: number;
  language: string;
  notes?: string | null;
  outline_json?: any;
  article_markdown?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
};

export function TaskTabs({ task }: { task: TaskPayload }) {
  const [active, setActive] = useState<TaskTab>('Setup');
  const [isPending, startTransition] = useTransition();
  const [draftText, setDraftText] = useState(task.article_markdown ?? '');
  const [rewriteInstruction, setRewriteInstruction] = useState('');
  const [rewriteOutput, setRewriteOutput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockResults, setStockResults] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const canGenerateOutline = task.status === 'OUTLINE_PENDING';
  const canApproveOutline = task.status === 'OUTLINE_GENERATED';
  const canGenerateDraft = task.status === 'OUTLINE_APPROVED';
  const canApproveContent = task.status === 'DRAFT_GENERATED';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === active ? 'button' : 'button-secondary'}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Task status</p>
            <div className="mt-2">
              <StatusBadge status={task.status} />
            </div>
          </div>
          {message && <span className="text-sm text-slate-300">{message}</span>}
        </div>
      </div>

      {active === 'Setup' && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Task setup</h2>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <p className="text-slate-400">Primary keyword</p>
              <p className="text-white">{task.primary_keyword}</p>
            </div>
            <div>
              <p className="text-slate-400">Intent</p>
              <p className="text-white">{task.intent}</p>
            </div>
            <div>
              <p className="text-slate-400">Secondary keywords</p>
              <p className="text-white">{task.secondary_keywords?.join(', ') ?? 'None'}</p>
            </div>
            <div>
              <p className="text-slate-400">Word count target</p>
              <p className="text-white">
                {task.target_min_words}-{task.target_max_words} words
              </p>
            </div>
          </div>
          <div>
            <p className="text-slate-400">Notes</p>
            <p className="text-white">{task.notes ?? 'No notes yet.'}</p>
          </div>
        </div>
      )}

      {active === 'Outline' && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Outline</h2>
          <p className="text-sm text-slate-300">
            Generate the outline and approve before drafting. Only reviewers/admins should approve.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="button"
              disabled={!canGenerateOutline || isPending}
              onClick={() =>
                startTransition(async () => {
                  await generateOutline(task.id);
                  setMessage('Outline generated. Refresh to view.');
                })
              }
            >
              Generate outline
            </button>
            <button
              className="button-secondary"
              disabled={!canApproveOutline || isPending}
              onClick={() =>
                startTransition(async () => {
                  await approveOutline(task.id);
                  setMessage('Outline approved.');
                })
              }
            >
              Approve outline
            </button>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-200">
            {task.outline_json ? JSON.stringify(task.outline_json, null, 2) : 'No outline yet.'}
          </pre>
        </div>
      )}

      {active === 'Draft' && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Draft</h2>
          <div className="flex flex-wrap gap-3">
            <button
              className="button"
              disabled={!canGenerateDraft || isPending}
              onClick={() =>
                startTransition(async () => {
                  await generateDraft(task.id);
                  setMessage('Draft generated. Refresh to view.');
                })
              }
            >
              Generate draft
            </button>
            <button
              className="button-secondary"
              disabled={!canApproveContent || isPending}
              onClick={() =>
                startTransition(async () => {
                  await approveContent(task.id);
                  setMessage('Content approved.');
                })
              }
            >
              Approve content
            </button>
            <button
              className="button-secondary"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await updateDraft({ taskId: task.id, markdown: draftText });
                  setMessage('Draft updated.');
                })
              }
            >
              Save draft
            </button>
          </div>
          <textarea
            className="input min-h-[280px]"
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
          />
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-200">
            <p className="text-xs uppercase text-slate-500">Rewrite helper</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <textarea
                className="input min-h-[140px]"
                placeholder="Paste text to rewrite"
                value={rewriteOutput}
                onChange={(event) => setRewriteOutput(event.target.value)}
              />
              <div className="space-y-3">
                <input
                  className="input"
                  placeholder="Rewrite instruction"
                  value={rewriteInstruction}
                  onChange={(event) => setRewriteInstruction(event.target.value)}
                />
                <button
                  className="button-secondary"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      const rewritten = await rewriteSelection({
                        text: rewriteOutput,
                        instruction: rewriteInstruction,
                        industry: 'industrial',
                        tone: 'professional',
                        language: task.language
                      });
                      setRewriteOutput(rewritten);
                      setMessage('Rewrite complete.');
                    })
                  }
                >
                  Rewrite selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {active === 'Images' && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Images</h2>
          <p className="text-sm text-slate-300">
            Paste an Unsplash or Pexels image URL to optimize, rename, and store in Supabase Storage.
          </p>
          <div className="flex flex-wrap gap-3">
            <input
              className="input flex-1"
              placeholder="Search stock images"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              className="button-secondary"
              disabled={isPending || !searchQuery}
              onClick={() =>
                startTransition(async () => {
                  const results = await fetchStockImages({ query: searchQuery });
                  setStockResults(results);
                  setMessage(results.length ? 'Stock images loaded.' : 'No results or missing API keys.');
                })
              }
            >
              Search Unsplash/Pexels
            </button>
          </div>
          {stockResults.length > 0 && (
            <div className="grid gap-3 md:grid-cols-3">
              {stockResults.map((url) => (
                <button
                  key={url}
                  className="rounded-xl border border-slate-800 p-3 text-left text-xs text-slate-300 hover:border-slate-500"
                  onClick={() => setImageUrl(url)}
                >
                  {url}
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <input
              className="input flex-1"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
            <button
              className="button"
              disabled={isPending || !imageUrl}
              onClick={() =>
                startTransition(async () => {
                  await optimizeAndStoreImage({
                    taskId: task.id,
                    imageUrl,
                    type: 'hero'
                  });
                  setMessage('Image optimized and stored.');
                  setImageUrl('');
                })
              }
            >
              Optimize hero image
            </button>
          </div>
        </div>
      )}

      {active === 'Internal Links' && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Internal links</h2>
          <p className="text-sm text-slate-300">
            Use the outline anchors and add approved internal links before publishing.
          </p>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
            {task.outline_json?.internal_link_anchors?.length
              ? task.outline_json.internal_link_anchors.join(', ')
              : 'Generate an outline to see suggested anchors.'}
          </div>
        </div>
      )}

      {active === 'WordPress' && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">WordPress draft</h2>
          <p className="text-sm text-slate-300">
            Push approved content to WordPress as a draft. Featured images are optional.
          </p>
          <button
            className="button"
            disabled={task.status !== 'CONTENT_APPROVED' && task.status !== 'IMAGES_READY'}
            onClick={async () => {
              setMessage('');
              const response = await fetch('/api/wp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskId: task.id })
              });
              if (!response.ok) {
                const payload = await response.json();
                setMessage(payload.error ?? 'Draft push failed.');
                return;
              }
              setMessage('Draft pushed to WordPress.');
            }}
          >
            Push draft to WordPress
          </button>
        </div>
      )}
    </div>
  );
}
