import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // Do not throw here — code that imports this should handle null client when env not provided.
  console.warn('Supabase admin client not configured. Set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL')
}

export const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceRoleKey || '')
