import { useEffect, useMemo, useState } from 'react'
import fallbackCourses from '../data/courses'
import CourseCard from '../components/CourseCard'
import supabase from '../lib/supabaseClient'

export default function Home() {
  const [courses, setCourses] = useState(fallbackCourses)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    async function load() {
      if (!supabase) return

      const { data, error } = await supabase.from('courses').select('*').order('title', { ascending: true })
      if (!error && data) {
        // map to expected shape
        setCourses(data.map(c => ({
          slug: c.slug,
          title: c.title,
          description: c.description,
          youtubeId: c.youtubeId,
          duration: c.duration || '',
          level: c.level || '',
          thumbnail: c.thumbnail || `https://img.youtube.com/vi/${c.youtubeId}/hqdefault.jpg`,
        })))
      }
    }

    load()
  }, [])

  const categories = useMemo(() => {
    const set = new Set(courses.map(c => c.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [courses])

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchesQuery = [c.title, c.description, c.category].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || (c.category === category)
      return matchesQuery && matchesCategory
    })
  }, [courses, query, category])

  return (
    <div>
      <section className="mb-6">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-8 shadow-lg">
          <h1 className="text-3xl font-extrabold">Create and sell your video courses</h1>
          <p className="mt-3 max-w-2xl text-slate-100">Host your course content on YouTube as unlisted videos and embed them on your site. Beautiful UI, simple setup.</p>
        </div>
      </section>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold">Courses</h2>

          <div className="flex gap-2 items-center">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses..." className="px-3 py-2 border rounded-md" />
            <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 border rounded-md">
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map(c => (
            <CourseCard course={c} key={c.slug} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-slate-600">No courses match your search.</div>
          )}
        </div>
      </section>
    </div>
  )
}
