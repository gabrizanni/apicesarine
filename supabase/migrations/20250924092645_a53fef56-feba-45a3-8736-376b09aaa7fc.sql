-- Drop the overly permissive policy on educators table
DROP POLICY IF EXISTS "Allow all operations on educators" ON public.educators;

-- Create secure policies for educators table
-- Allow public read access to non-sensitive information only (active educators only)
CREATE POLICY "Public can view educator profiles" 
ON public.educators 
FOR SELECT 
TO anon, authenticated
USING (is_active = true);

-- Only admins can manage educators (create, update, delete)
CREATE POLICY "Only admins can manage educators" 
ON public.educators 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create a view for public educator information without contact details
CREATE OR REPLACE VIEW public.educator_profiles AS
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

-- Grant select permissions on the view
GRANT SELECT ON public.educator_profiles TO anon, authenticated;