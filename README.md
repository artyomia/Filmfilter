# B2B SEO Studio

Internal production studio for multi-site B2B SEO content with human-in-the-loop approvals and WordPress draft publishing.

## Tech Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Supabase (Postgres/Auth/Storage)
- Zod + React Hook Form
- Server actions + route handlers

## Features
- Role-based access (admin/editor/reviewer/viewer)
- Multi-project WordPress credentials per site
- Keyword ➜ Outline ➜ Draft ➜ Images ➜ WordPress draft workflow
- Mock AI provider for outline/draft/rewrites (no keys required in v1)
- Supabase Storage image optimization pipeline (WebP via `sharp`)
- Audit logging for key actions

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Supabase project and run the SQL in [`supabase/schema.sql`](supabase/schema.sql).
3. Create a Storage bucket named `seo-images` (or use a custom bucket and update `SUPABASE_STORAGE_BUCKET`).
4. Copy `.env.example` to `.env.local` and populate values.
5. Start the app:
   ```bash
   npm run dev
   ```

## Environment Variables
See `.env.example` for the full list.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `OPENAI_API_KEY` (optional, future provider)
- `UNSPLASH_ACCESS_KEY` (optional, enables stock image search)
- `PEXELS_API_KEY` (optional, enables stock image search)

## Key Routes
- `/login` - Supabase Auth sign-in
- `/dashboard` - Status overview + activity
- `/projects` - Project + WordPress credentials (admin only)
- `/tasks` - Task list + create wizard
- `/tasks/[id]` - Workflow tabs for outline/draft/images/WordPress

## Mock AI Provider
The app ships with a deterministic mock provider in `lib/ai/provider.ts`. This ensures the workflow works end-to-end without external API keys.

## Supabase Notes
- `projects` contains WordPress credentials and is restricted to admins in RLS.
- `projects_public` is a synced table that exposes non-sensitive fields for editors/reviewers.

## WordPress Draft Push
WordPress draft creation happens in the server-side route handler at `app/api/wp/route.ts` using Basic Auth with WP application passwords. Posts are always created with status `draft`.
