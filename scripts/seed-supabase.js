/*
  Seed Supabase with the sample courses in data/courses.js

  Usage (locally):
    SUPABASE_SERVICE_ROLE_KEY=<service_role_key> NEXT_PUBLIC_SUPABASE_URL=<supabase_url> node scripts/seed-supabase.js

  WARNING: this script uses the service role key to write to your DB. Keep that key secret.
*/
const courses = require('../data/courses').default || require('../data/courses')
const { supabaseAdmin } = require('../lib/supabaseAdmin')

async function main() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY not set. Aborting.')
    process.exit(1)
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('NEXT_PUBLIC_SUPABASE_URL not set. Aborting.')
    process.exit(1)
  }

  try {
    for (const c of courses) {
      const payload = {
        title: c.title,
        slug: c.slug,
        description: c.description,
        youtubeId: c.youtubeId,
        duration: c.duration || null,
        level: c.level || null,
        category: c.category || null,
        thumbnail: c.thumbnail || `https://img.youtube.com/vi/${c.youtubeId}/hqdefault.jpg`,
      }
      console.log('Inserting', payload.slug)
      const { data, error } = await supabaseAdmin.from('courses').upsert(payload, { onConflict: 'slug' }).select()
      if (error) {
        console.error('Error inserting', c.slug, error.message)
      } else {
        console.log('Inserted', data?.[0]?.slug || c.slug)
      }
    }
    console.log('Seeding complete')
    process.exit(0)
  } catch (err) {
    console.error('Seeding failed', err.message)
    process.exit(1)
  }
}

main()
