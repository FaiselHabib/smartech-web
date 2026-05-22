# Smartech Group — Supabase Setup Guide

This guide walks you through wiring the admin dashboard / CMS to a real Supabase
project. The public website continues to work even without Supabase configured
(it falls back to bundled static content), but the `/admin` panel and the
contact form's database persistence require this setup.

---

## 1. Create the Supabase project

1. Go to <https://supabase.com> and create a new project.
2. Pick the closest region (e.g. `eu-central-1` or `me-central-1`).
3. Save the database password somewhere safe.

Once provisioned, open **Project Settings → API**. You will need:

| Value | Where it goes |
|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` public key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` secret key | `SUPABASE_SERVICE_ROLE_KEY` |

> The `service_role` key bypasses RLS — **never** expose it to the browser.
> It is only read in `src/lib/supabase/admin.ts`, which is marked
> `import "server-only"`.

---

## 2. Environment variables

Create `.env.local` at the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...   # anon public key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...        # service_role key
NEXT_PUBLIC_SITE_URL=http://localhost:3000     # production: https://smartech-group.com
```

For Vercel: add the same variables in **Project → Settings → Environment
Variables** (mark `SUPABASE_SERVICE_ROLE_KEY` as a server-only secret).

---

## 3. Apply the database migration

The full schema lives at [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
It creates:

- Enums: `project_category`, `content_status`, `request_type`, `request_status`
- Tables: `profiles`, `projects`, `blog_posts`, `contact_requests`
- A `SECURITY DEFINER` function `is_admin(uid)` used by every RLS policy
- Triggers that maintain `updated_at`
- Row Level Security policies on all tables
- A storage bucket `media` (public-read, admin-write)
- An auth trigger that auto-creates a `profiles` row on signup

To apply it:

**Option A — Supabase SQL Editor (simplest)**

1. Open your project → **SQL Editor → New query**.
2. Paste the entire contents of `supabase/migrations/0001_init.sql`.
3. Click **Run**.

**Option B — Supabase CLI**

```bash
brew install supabase/tap/supabase
supabase link --project-ref YOUR-PROJECT-REF
supabase db push
```

Verify in **Table Editor** that `profiles`, `projects`, `blog_posts`, and
`contact_requests` all appear.

---

## 4. Verify the storage bucket

Open **Storage** in the Supabase dashboard. You should see a bucket called
`media`. The migration creates it as **public read**, with admin-only write
(insert/update/delete) policies tied to `is_admin(auth.uid())`.

If the bucket is missing (older project), create it manually:

1. Storage → **New bucket** → name `media` → **Public bucket** ✅
2. Re-run the storage policy section of the migration.

---

## 5. Create the first admin user

There is intentionally no public "sign up" flow on `/admin/login` — the panel
is private. You bootstrap the first admin via the Supabase dashboard.

1. Go to **Authentication → Users → Add user → Create new user**.
2. Enter email + password. Toggle **Auto Confirm User** so it can sign in
   without an email verification step.
3. Click **Create user**. The auth trigger automatically inserts a matching
   row into `public.profiles` with `is_admin = false`.
4. Open the **SQL Editor** and promote that user:

   ```sql
   update public.profiles
   set is_admin = true
   where email = 'you@smartech-group.com';
   ```

5. Visit `/admin/login`, sign in. You should land on `/admin`.

To add more admins later, repeat steps 1–4 (or run the `update` on an existing
profile row).

---

## 6. Local development

```bash
npm install
npm run dev
```

- Public site: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin>
- Login: <http://localhost:3000/admin/login>

The public pages (`/`, `/portfolio`, `/media`, `/blog`, `/blog/[slug]`) all
hit Supabase via server components with `export const revalidate = 60` and
fall back to bundled static content on error or empty result, so the site
never goes blank even if the DB is down.

---

## 7. Deployment (Vercel)

1. Push to GitHub and import the repo into Vercel.
2. Add the four env vars from step 2 in **Project Settings → Environment
   Variables** (Production + Preview).
3. Set `NEXT_PUBLIC_SITE_URL=https://smartech-group.com`.
4. Deploy.
5. In Supabase **Authentication → URL Configuration**, add the production URL
   to the **Site URL** and **Redirect URLs** lists.

The `next.config.ts` already whitelists `*.supabase.co` in `images.remotePatterns`,
so `<Image src>` works with Storage public URLs out of the box.

---

## 8. What lives where

| Concern | File(s) |
|---|---|
| Browser client | `src/lib/supabase/client.ts` |
| Server (RSC/Action) client | `src/lib/supabase/server.ts` |
| Service-role admin client | `src/lib/supabase/admin.ts` (server-only) |
| Session refresh + admin guard middleware | `src/lib/supabase/middleware.ts`, `src/middleware.ts` |
| Admin guard helper | `src/lib/auth/admin-guard.ts` |
| Zod schemas | `src/lib/validators.ts` |
| Server Actions — auth | `src/app/admin/actions/auth.ts` |
| Server Actions — projects | `src/app/admin/actions/projects.ts` |
| Server Actions — blog | `src/app/admin/actions/blog.ts` |
| Server Actions — requests | `src/app/admin/actions/requests.ts` |
| Server Actions — uploads | `src/app/admin/actions/upload.ts` |
| Public contact form action | `src/app/actions/contact.ts` |
| Public data loaders | `src/lib/content/projects.ts`, `src/lib/content/blog.ts` |
| Admin UI primitives | `src/components/admin/ui/*` |
| Admin shell | `src/components/admin/{Sidebar,Topbar,MobileNav}.tsx` |
| Admin layouts | `src/app/admin/layout.tsx`, `src/app/admin/(panel)/layout.tsx` |

---

## 9. Security notes

- **RLS is on** for every table. Public reads are limited to
  `status = 'published'` rows for `projects` and `blog_posts`. Writes require
  `is_admin(auth.uid()) = true`.
- `contact_requests` allows **anonymous insert** (so the public form can save)
  but only admins can read/update/delete.
- The contact form action uses the service-role client server-side because it
  is invoked by anonymous visitors. All other writes flow through the
  user-session server client so RLS applies.
- The `media` bucket is public-read by design (covers, gallery, blog images).
  Do **not** upload anything private to it.
- `/admin/*` is guarded twice: in middleware (cookie/session level) and again
  in the `(panel)` layout via `requireAdmin()`. A non-admin signed-in user is
  redirected to `/admin/login?error=not_admin`.

---

## 10. Common issues

| Symptom | Likely cause |
|---|---|
| `/admin/login` loops back to itself after sign-in | The user exists in Auth but the `profiles` row has `is_admin = false`. Promote them via SQL. |
| Public pages show static demo content even though DB has rows | The Supabase env vars are missing or wrong — the loaders silently fall back. Check the server console for the warning logs. |
| Image upload fails with 403 | Storage policies didn't apply. Re-run the storage section of `0001_init.sql`. |
| Contact form returns "تعذّر حفظ الطلب" | `SUPABASE_SERVICE_ROLE_KEY` is missing in the deployed env. |
| Admin tables show empty even though SQL inserted rows | RLS denied the read — the signed-in user isn't an admin yet. |
