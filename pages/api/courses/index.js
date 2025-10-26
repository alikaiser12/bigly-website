import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const authHeader = req.headers.authorization || ''
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Missing auth token' })

  // Verify token by asking Supabase for the user
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) {
    return res.status(401).json({ error: userErr?.message || 'Unauthorized' })
  }

  const payload = req.body
  try {
    const { data, error } = await supabaseAdmin.from('courses').insert(payload).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
