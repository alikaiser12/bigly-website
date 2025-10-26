import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE')
    return res.status(405).end('Method Not Allowed')
  }

  const authHeader = req.headers.authorization || ''
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Missing auth token' })

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) {
    return res.status(401).json({ error: userErr?.message || 'Unauthorized' })
  }

  try {
    const { error } = await supabaseAdmin.from('courses').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
