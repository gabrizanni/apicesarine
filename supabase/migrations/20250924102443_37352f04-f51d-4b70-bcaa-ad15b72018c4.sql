-- Fix educator contact information security vulnerability  
-- Drop all existing policies and create a secure field-restricted policy

DROP POLICY IF EXISTS "Public can view only safe educator fields" ON public.educators;
DROP POLICY IF EXISTS "Public can view safe educator profile fields" ON public.educators;
DROP POLICY IF EXISTS "Public can view educator profiles" ON public.educators;

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

-- Create a very restrictive policy that blocks direct table access for sensitive data
-- This forces the use of the secure function for public access
CREATE POLICY "Restrict public educator access to safe fields only" 
ON public.educators 
FOR SELECT 
USING (
  -- Only allow active educators to be viewed
  is_active = true AND (
    -- Allow admin access with all fields
    has_role(auth.uid(), 'admin'::app_role)
    -- For non-admin access, this policy will work with application-level filtering
    -- The EducatorProfiles component already selects only safe fields
  )
);

-- Grant execute permission on the function to public
GRANT EXECUTE ON FUNCTION public.get_public_educator_profiles() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_educator_profiles() TO authenticated;