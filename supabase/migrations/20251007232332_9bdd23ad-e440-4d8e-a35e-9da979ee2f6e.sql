-- Update RLS policies for booking_requests to be more restrictive
DROP POLICY IF EXISTS "Only admins can view booking requests" ON public.booking_requests;
DROP POLICY IF EXISTS "Only admins can update booking requests" ON public.booking_requests;
DROP POLICY IF EXISTS "Only admins can delete booking requests" ON public.booking_requests;

-- Public can only insert booking requests (form submission)
-- All reads and updates must go through service role in edge functions

-- Create booking audit log table
CREATE TABLE IF NOT EXISTS public.booking_audit (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text,
  action text NOT NULL,
  booking_id uuid REFERENCES public.booking_requests(id) ON DELETE SET NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on booking_audit
ALTER TABLE public.booking_audit ENABLE ROW LEVEL SECURITY;

-- Only service role can manage audit logs
CREATE POLICY "Service role can manage audit logs"
  ON public.booking_audit
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Create index on booking_audit for performance
CREATE INDEX IF NOT EXISTS idx_booking_audit_booking_id ON public.booking_audit(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_audit_created_at ON public.booking_audit(created_at DESC);

-- Add function to log booking audit
CREATE OR REPLACE FUNCTION public.log_booking_audit(
  p_user_email text,
  p_action text,
  p_booking_id uuid DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.booking_audit (user_email, action, booking_id, metadata)
  VALUES (p_user_email, p_action, p_booking_id, p_metadata);
END;
$$;