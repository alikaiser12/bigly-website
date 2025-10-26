import { createClient } from '@supabase/supabase-js'

// Uses NEXT_PUBLIC_... so it can run client-side. For secure server-side operations
// use a server-only SUPABASE_SERVICE_ROLE_KEY and API routes.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabase = null
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default supabase
