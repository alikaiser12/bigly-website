# bigly-website

This repository is a minimal Next.js + Tailwind starter for hosting video courses by embedding unlisted YouTube videos.

Features
- Next.js (React) frontend ready for Vercel
- Tailwind CSS for quick design and customization
- Course data stored as simple JS objects (no external DB required)
- Embed YouTube unlisted videos via the privacy-enhanced `youtube-nocookie.com` embed URL

Quick start
1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open http://localhost:3000

Deploying to Vercel
1. Push this repo to GitHub.
2. Import the repo in Vercel (https://vercel.com) and deploy — Vercel will detect Next.js automatically.

Using unlisted YouTube videos
1. Upload your videos to YouTube and set visibility to "Unlisted".
2. Copy the video ID (the part after `v=` in the URL) and put it in `data/courses.js` as `youtubeId` for each course.
3. Thumbnails are automatically generated using `https://img.youtube.com/vi/<ID>/hqdefault.jpg`.

Customizing
- Edit or add courses in `data/courses.js`.
- Update UI components in `components/` using Tailwind classes.

Next steps / optional enhancements
- Add auth (e.g., Supabase/Auth0) for gated content
- Add payments/subscriptions
- Migrate course data to a hosted DB (Supabase/Postgres) if you need dynamic editing from a dashboard

If you want, I can:
- add search and category filters
- add a lightweight admin dashboard (using a config file or Supabase)
- wire up Stripe for paid courses

Seeding Supabase (quick preview)
1. Create a `courses` table in Supabase with columns: `id` (primary), `title`, `slug`, `description`, `youtubeId`, `duration`, `level`, `category`, `thumbnail`, `inserted_at` (default now()).
2. Set environment variables locally or in Vercel:
	 - NEXT_PUBLIC_SUPABASE_URL
	 - NEXT_PUBLIC_SUPABASE_ANON_KEY
	 - SUPABASE_SERVICE_ROLE_KEY (keep this secret)
	 - (optional) ADMIN_EMAILS (comma-separated emails allowed to manage courses)
3. Run the seed script locally (it uses the service role key):

```bash
SUPABASE_SERVICE_ROLE_KEY=<your key> NEXT_PUBLIC_SUPABASE_URL=<your url> node scripts/seed-supabase.js
```

This will upsert the local sample courses into your Supabase `courses` table.

Harden admin + DB security
- We added server API routes that validate the caller's access token and use the Supabase service role key to perform writes. For extra safety you should:
	- Set `ADMIN_EMAILS` in Vercel to restrict which emails can write (the server API checks this list if present).
	- Enable Row-Level Security (RLS) in your Supabase table and apply policies (see `sql/rls-sample.sql`).
		- You can also create an `admins` table and manage admin emails there. We prefer this approach because it's manageable from the Supabase dashboard.
			See `sql/create-admins-table.sql` to create the `admins` table and add your email.
	- Keep `SUPABASE_SERVICE_ROLE_KEY` secret (Vercel project settings mark it as protected server-only).

Ready for Vercel
- Push to GitHub (done). Import the repo in Vercel, set env vars above, and deploy. After deployment you can open the preview URL and test `/admin`.


Enjoy — paste this repository into Vercel and it should deploy as a static Next.js app with SSR support.
