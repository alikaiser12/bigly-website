-- Creates a simple 'admins' table and inserts a starter admin record.
-- Run in Supabase SQL editor.

CREATE TABLE IF NOT EXISTS public.admins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Insert your own admin email here (replace with your email)
INSERT INTO public.admins (email) VALUES ('you@example.com') ON CONFLICT DO NOTHING;

-- Grant select to anon if you want (not required):
-- GRANT SELECT ON public.admins TO anon;
