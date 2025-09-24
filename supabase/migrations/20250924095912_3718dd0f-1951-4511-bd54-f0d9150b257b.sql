-- Drop the problematic view and recreate without security definer issues
DROP VIEW IF EXISTS public.educator_profiles;

-- Create a simple view without security definer properties
-- This view only exposes non-sensitive educator information
CREATE VIEW public.educator_profiles AS
SELECT 
  id,
  name,
  bio,
  specialization,
  avatar_url,
  is_active,
  created_at,
  updated_at
FROM public.educators
WHERE is_active = true;

-- Enable RLS on the view if not already enabled
ALTER VIEW public.educator_profiles SET (security_barrier = true);

-- Grant basic select permissions
GRANT SELECT ON public.educator_profiles TO anon, authenticated;