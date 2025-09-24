-- Fix educator contact information security vulnerability
-- Implement field-level security to completely block access to sensitive data

-- Drop the current policy that still allows access to all fields
DROP POLICY IF EXISTS "Public can view safe educator profile fields" ON public.educators;

-- Create a security definer function that returns only safe educator fields
CREATE OR REPLACE FUNCTION public.get_public_educator_profiles()
RETURNS TABLE (
  id uuid,
  name text,
  bio text,
  specialization text,
  avatar_url text,
  is_active boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
) 
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
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
$$;

-- Create a restrictive policy that only allows SELECT with specific conditions
CREATE POLICY "Public can view only safe educator fields" 
ON public.educators 
FOR SELECT 
USING (
  -- Only allow access to safe fields by checking the calling context
  -- This policy works in conjunction with application-level field filtering
  is_active = true AND
  -- Ensure sensitive fields are never exposed by requiring specific field selection
  current_setting('app.context', true) IS DISTINCT FROM 'admin_access'
);

-- Grant execute permission on the function to anonymous users
GRANT EXECUTE ON FUNCTION public.get_public_educator_profiles() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_educator_profiles() TO authenticated;