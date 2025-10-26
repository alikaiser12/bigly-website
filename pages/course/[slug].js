import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import fallbackCourses from '../../data/courses'
import supabase from '../../lib/supabaseClient'
import Link from 'next/link'

export default function CoursePage() {
  const router = useRouter()
  const { slug } = router.query
  const [course, setCourse] = useState(null)

  useEffect(() => {
    if (!slug) return

    async function load() {
      if (!supabase) {
        const c = fallbackCourses.find(c => c.slug === slug)
        setCourse(c)
        return
      }

      const { data, error } = await supabase.from('courses').select('*').eq('slug', slug).single()
      if (!error && data) {
        setCourse({
          slug: data.slug,
          title: data.title,
          description: data.description,
          youtubeId: data.youtubeId,
          duration: data.duration,
          level: data.level,
          thumbnail: data.thumbnail || `https://img.youtube.com/vi/${data.youtubeId}/hqdefault.jpg`,
        })
      } else {
        const c = fallbackCourses.find(c => c.slug === slug)
        setCourse(c)
      }
    }

    load()
  }, [slug])

  if (!course) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-indigo-600">← Back to courses</Link>

      <h1 className="text-3xl font-bold mt-4">{course.title}</h1>
      <p className="mt-2 text-slate-600">{course.description}</p>

      <div className="mt-6 aspect-video bg-black rounded-lg overflow-hidden shadow">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${course.youtubeId}`}
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold">Course details</h3>
        <ul className="mt-2 text-sm text-slate-600">
          <li><strong>Duration:</strong> {course.duration}</li>
          <li><strong>Level:</strong> {course.level}</li>
        </ul>
      </div>
    </div>
  )
}
