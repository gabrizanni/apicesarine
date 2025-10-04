-- Add new columns to booking_requests
ALTER TABLE public.booking_requests 
ADD COLUMN IF NOT EXISTS assigned_educator_id uuid REFERENCES public.educators(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS internal_notes text;

-- Update status values to match new workflow
-- Note: We'll keep the existing 'pending' for backwards compatibility mapped to 'NUOVA'
COMMENT ON COLUMN public.booking_requests.status IS 'Status values: NUOVA (new), IN_REVISIONE (in review), CONFERMATA (confirmed), SCARTATA (rejected)';

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON public.booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_booking_requests_assigned_educator ON public.booking_requests(assigned_educator_id);
CREATE INDEX IF NOT EXISTS idx_booking_requests_preferred_date ON public.booking_requests(preferred_date);