-- Create rate_limits table for persistent rate limiting
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is internal rate limiting)
CREATE POLICY "Allow all operations on rate_limits" 
ON public.rate_limits 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create index for efficient lookups
CREATE INDEX idx_rate_limits_ip_window ON public.rate_limits(ip_address, window_start);

-- Add trigger for updated_at
CREATE TRIGGER update_rate_limits_updated_at
BEFORE UPDATE ON public.rate_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();