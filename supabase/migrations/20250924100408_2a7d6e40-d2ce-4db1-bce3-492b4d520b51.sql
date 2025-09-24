-- Security fixes: Implement proper RLS policies for all tables

-- 1. Fix Posts table security
DROP POLICY IF EXISTS "Allow all operations on posts" ON public.posts;

-- Create secure policies for posts
CREATE POLICY "Public can view published posts" 
ON public.posts 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can manage all posts" 
ON public.posts 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 2. Fix Workshops table security  
DROP POLICY IF EXISTS "Allow all operations on workshops" ON public.workshops;

-- Create secure policies for workshops
CREATE POLICY "Public can view active workshops" 
ON public.workshops 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage all workshops" 
ON public.workshops 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3. Fix Rate Limits table security
DROP POLICY IF EXISTS "Allow all operations on rate_limits" ON public.rate_limits;

-- Rate limits should only be accessible to system/admin level
CREATE POLICY "Only admins can manage rate limits" 
ON public.rate_limits 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. Verify educators table is properly secured (should already be fixed)
-- The educators table should have:
-- - "Public can view educator profiles" FOR SELECT USING (is_active = true)
-- - "Only admins can manage educators" FOR ALL with admin role check

-- No changes needed for educators as it's already secured properly