-- Sample SQL to enable Row-Level Security and allow only authenticated inserts via server
-- Run this in your Supabase SQL editor for the `courses` table.

-- 1) Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 2) Create a policy to allow anyone to read
CREATE POLICY "Public read" ON public.courses
  FOR SELECT
  USING (true);

-- 3) Prevent direct anonymous inserts: only allow inserts from server (using service role)
-- If you want to allow inserts only from specific admin users, create a policy that checks
-- that the user's email is in a stored admin list or check a custom claim.

-- Example: allow inserts only when request is made with a service role (no current_user check)
-- (Supabase service_role bypasses RLS; this example is for illustration of locking down client access)

-- 4) Alternatively, allow inserts from authenticated users with specific emails (not recommended for public sites)
-- CREATE POLICY "Admin insert" ON public.courses
--   FOR INSERT
--   USING (auth.email() = ANY (ARRAY['you@example.com']));

-- Note: Most production setups use API routes with the service_role key for writes, combined with RLS for reads.
