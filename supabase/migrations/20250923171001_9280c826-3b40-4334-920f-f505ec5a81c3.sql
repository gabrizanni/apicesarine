-- Create user_roles table (enum already exists)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop existing policies on user_roles if they exist
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;

-- Create policy for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Drop the insecure policy on booking_requests
DROP POLICY IF EXISTS "Allow all operations on booking_requests" ON public.booking_requests;

-- Create secure policies for booking_requests - only admins can access existing data
CREATE POLICY "Only admins can view booking requests" 
ON public.booking_requests 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update booking requests" 
ON public.booking_requests 
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete booking requests" 
ON public.booking_requests 
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow anonymous inserts for new booking requests (public can submit bookings)
CREATE POLICY "Allow anonymous booking submissions" 
ON public.booking_requests 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Add trigger for user_roles updated_at (if table was created)
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();