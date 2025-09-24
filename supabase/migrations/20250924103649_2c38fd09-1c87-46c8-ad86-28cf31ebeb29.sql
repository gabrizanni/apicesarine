-- Add availability fields to educators table
ALTER TABLE public.educators 
ADD COLUMN available_days jsonb DEFAULT '[]'::jsonb,
ADD COLUMN available_regions jsonb DEFAULT '[]'::jsonb,
ADD COLUMN availability_notes text;

-- Update the secure function to include new availability fields
DROP FUNCTION IF EXISTS public.get_public_educator_profiles();

CREATE OR REPLACE FUNCTION public.get_public_educator_profiles()
RETURNS TABLE (
  id uuid,
  name text,
  bio text,
  specialization text,
  avatar_url text,
  is_active boolean,
  available_days jsonb,
  available_regions jsonb,
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
    available_days,
    available_regions,
    created_at,
    updated_at
  FROM public.educators
  WHERE is_active = true;
$$;