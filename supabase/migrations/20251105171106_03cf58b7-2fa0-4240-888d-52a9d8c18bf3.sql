-- Add SELECT policy to booking_requests to restrict access to admins only
CREATE POLICY "Only admins can view bookings"
  ON public.booking_requests
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add SELECT policy to material_access_codes to restrict access to admins only
CREATE POLICY "Only admins can view access codes"
  ON public.material_access_codes
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add SELECT policy to booking_audit to restrict access to admins only
CREATE POLICY "Only admins can view audit logs"
  ON public.booking_audit
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));