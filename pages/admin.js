import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'
import Link from 'next/link'

export default function Admin() {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ title: '', slug: '', description: '', youtubeId: '', duration: '', level: '' })
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // load session and courses
    async function init() {
      if (!supabase) return
      const { data } = await supabase.auth.getSession()
      setSession(data?.session ?? null)
      load()
      // listen to auth changes
      supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession))
    }
    init()
  }, [])

  async function load() {
    if (!supabase) return
    setLoading(true)
    const { data, error } = await supabase.from('courses').select('*').order('inserted_at', { ascending: false })
    setLoading(false)
    if (!error && data) setCourses(data)
  }

  // create via server API using user's access token; server will validate token
  async function createCourse() {
    if (!session) return alert('Sign in first')

    const payload = {
      ...form,
      thumbnail: form.youtubeId ? `https://img.youtube.com/vi/${form.youtubeId}/hqdefault.jpg` : null,
    }

    setLoading(true)
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    })
    setLoading(false)
    const json = await res.json()
    if (!res.ok) return alert('Error: ' + (json?.error || res.statusText))
    setForm({ title: '', slug: '', description: '', youtubeId: '', duration: '', level: '' })
    load()
  }

  async function removeCourse(id) {
    if (!session) return alert('Sign in first')
    if (!confirm('Delete this course?')) return
    setLoading(true)
    const res = await fetch(`/api/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      }
    })
    setLoading(false)
    const json = await res.json()
    if (!res.ok) return alert('Error: ' + (json?.error || res.statusText))
    load()
  }

  async function signIn() {
    if (!supabase) return alert('Supabase not configured')
    if (!email) return alert('Enter your email')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) return alert(error.message)
    alert('Check your email for a magic link to sign in.')
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-indigo-600">← Back to site</Link>
      <h1 className="text-2xl font-bold mt-4">Admin — Courses</h1>

      {!session && (
        <section className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Sign in</h2>
          <p className="text-sm text-slate-600">Sign in with your email to manage courses (magic link).</p>
          <div className="mt-3 flex gap-2">
            <input placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded flex-1" />
            <button onClick={signIn} className="px-4 py-2 bg-indigo-600 text-white rounded">Send link</button>
          </div>
        </section>
      )}

      {session && (
        <div className="mt-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-slate-600">Signed in as <strong>{session.user.email}</strong></div>
            <div className="flex gap-2">
              <button onClick={signOut} className="px-3 py-1 border rounded">Sign out</button>
            </div>
          </div>

          <section className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Create course</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="p-2 border rounded" />
              <input placeholder="Slug (e.g., react-from-scratch)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="p-2 border rounded" />
              <input placeholder="YouTube ID" value={form.youtubeId} onChange={e => setForm({...form, youtubeId: e.target.value})} className="p-2 border rounded" />
              <input placeholder="Duration" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="p-2 border rounded" />
              <input placeholder="Level" value={form.level} onChange={e => setForm({...form, level: e.target.value})} className="p-2 border rounded" />
              <input placeholder="Short description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="p-2 border rounded col-span-1 sm:col-span-2" />
            </div>
            <div className="mt-3">
              <button onClick={createCourse} className="px-4 py-2 bg-indigo-600 text-white rounded">Create</button>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="font-semibold">Existing</h2>
            {loading ? <p>Loading...</p> : (
              <div className="mt-3 space-y-3">
                {courses.map(c => (
                  <div key={c.id} className="p-3 bg-white rounded shadow flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{c.title}</div>
                      <div className="text-sm text-slate-600">/{c.slug}</div>
                    </div>
                    <div className="flex gap-2">
                      <a href={`/course/${c.slug}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600">View</a>
                      <button onClick={() => removeCourse(c.id)} className="text-sm text-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <p className="mt-6 text-sm text-slate-500">Note: This admin uses a server-side service role key for writes. Protect this route and service-key in production.</p>
    </div>
  )
}
