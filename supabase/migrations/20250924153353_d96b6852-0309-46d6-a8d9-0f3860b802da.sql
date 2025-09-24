-- Assign admin role to the created user
INSERT INTO public.user_roles (user_id, role)
VALUES ('3084ff74-3d2d-4907-b9d5-32ab4a7bb068', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;