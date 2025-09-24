-- Create materials table for teaching resources
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_type TEXT NOT NULL,
  file_size TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  target_age_group TEXT,
  download_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Create policies for materials access
CREATE POLICY "Public can view all materials"
ON public.materials
FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage materials"
ON public.materials
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_materials_updated_at
BEFORE UPDATE ON public.materials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create passcode access table for materials
CREATE TABLE public.material_access_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for access codes
ALTER TABLE public.material_access_codes ENABLE ROW LEVEL SECURITY;

-- Only admins can manage access codes
CREATE POLICY "Only admins can manage access codes"
ON public.material_access_codes
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Function to validate access codes
CREATE OR REPLACE FUNCTION public.validate_access_code(input_code TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.material_access_codes
    WHERE code = input_code
      AND is_active = true
  )
$$;

-- Function to increment download count
CREATE OR REPLACE FUNCTION public.increment_download_count(material_id UUID)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.materials
  SET download_count = download_count + 1,
      updated_at = now()
  WHERE id = material_id;
$$;

-- Insert demo materials
INSERT INTO public.materials (title, description, file_type, file_size, tags, target_age_group, is_premium) VALUES
('Schede Attività: Api per i Piccoli', 'Attività sensoriali e giochi per la scoperta delle api nella scuola dell''infanzia', 'PDF', '1.2 MB', '["scuola-infanzia", "giochi", "sensoriale", "api"]', '3-6 anni', false),
('Il Mondo delle Api: Scuola Primaria', 'Esperimenti scientifici e osservazioni guidate per comprendere il ruolo delle api', 'PDF', '2.1 MB', '["scuola-primaria", "esperimenti", "scienza", "impollinazione"]', '6-11 anni', false),
('Ecosistemi e Biodiversità', 'Analisi critica dell''impatto ambientale e strategie di conservazione per la scuola secondaria', 'PDF', '3.4 MB', '["scuola-secondaria", "biodiversità", "sostenibilità", "ambiente"]', '11-14 anni', false),
('Percorso Didattico Completo: Un Anno con le Api', 'Programmazione annuale strutturata con materiali di supporto e verifiche', 'ZIP', '15.2 MB', '["programmazione", "verifiche", "completo", "premium"]', 'Tutti', true),
('Laboratori Virtuali Interattivi', 'Simulazioni digitali per esplorare l''alveare in sicurezza', 'Software', '45 MB', '["virtuale", "simulazioni", "interattivo", "premium"]', 'Tutti', true);

-- Insert demo access codes
INSERT INTO public.material_access_codes (code, description) VALUES
('DOCENTI2024', 'Codice per docenti che hanno partecipato ai laboratori 2024'),
('FORMAZIONE23', 'Codice per la formazione docenti 2023'),
('APIASCUOLA', 'Codice generale per accesso materiali premium');