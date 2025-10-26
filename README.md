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

Enjoy — paste this repository into Vercel and it should deploy as a static Next.js app with SSR support.
