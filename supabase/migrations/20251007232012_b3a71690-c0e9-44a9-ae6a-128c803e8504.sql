-- Add slug fields to workshops, educators, and posts
ALTER TABLE public.workshops ADD COLUMN IF NOT EXISTS slug text UNIQUE;
ALTER TABLE public.workshops ADD COLUMN IF NOT EXISTS cover_image_url text;
ALTER TABLE public.workshops ADD COLUMN IF NOT EXISTS cover_image_alt text;

ALTER TABLE public.educators ADD COLUMN IF NOT EXISTS slug text UNIQUE;
ALTER TABLE public.educators ADD COLUMN IF NOT EXISTS cover_image_url text;
ALTER TABLE public.educators ADD COLUMN IF NOT EXISTS cover_image_alt text;

ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS slug text UNIQUE;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS featured_image_alt text;

-- Create redirects table for 301 redirects
CREATE TABLE IF NOT EXISTS public.redirects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path text NOT NULL UNIQUE,
  to_path text NOT NULL,
  status_code integer NOT NULL DEFAULT 301,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on redirects
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;

-- Redirects are publicly readable
CREATE POLICY "Redirects are publicly readable"
  ON public.redirects
  FOR SELECT
  USING (true);

-- Only admins can manage redirects
CREATE POLICY "Only admins can manage redirects"
  ON public.redirects
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media bucket
CREATE POLICY "Media files are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Admins can upload media files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update media files"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete media files"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'media' AND has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for redirects updated_at
CREATE TRIGGER update_redirects_updated_at
  BEFORE UPDATE ON public.redirects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();