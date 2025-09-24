-- Admin setup migration
-- This script should be run AFTER creating the admin user in Supabase Dashboard

-- Insert admin role for the specified admin email
-- Replace the user_id with the actual UUID from the auth.users table after user creation
INSERT INTO public.user_roles (user_id, role)
SELECT 
  auth.users.id,
  'admin'::app_role
FROM auth.users 
WHERE auth.users.email = 'gabrizanni03@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify the admin role was assigned
-- This comment serves as documentation for verification