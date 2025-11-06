-- Create materials bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('materials', 'materials', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can upload materials" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update materials" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete materials" ON storage.objects;
DROP POLICY IF EXISTS "Public can view materials" ON storage.objects;

-- Create RLS policies for materials bucket
CREATE POLICY "Admins can upload materials"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'materials' 
  AND (SELECT has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Admins can update materials"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'materials' 
  AND (SELECT has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Admins can delete materials"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'materials' 
  AND (SELECT has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Public can view materials"
ON storage.objects
FOR SELECT
USING (bucket_id = 'materials');