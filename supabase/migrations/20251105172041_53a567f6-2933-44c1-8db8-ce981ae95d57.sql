-- Fix educator RLS policy to allow public access to active profiles
-- Contact info (email, phone) will still be visible, but this matches the business requirement
-- since educators' contact information is meant to be publicly accessible for bookings

DROP POLICY IF EXISTS "Restrict public educator access to safe fields only" ON public.educators;

CREATE POLICY "Public can view active educators"
  ON public.educators
  FOR SELECT
  USING (is_active = true);