import { supabase } from '@/integrations/supabase/client';
import { demoPartners } from '@/data/demo';

export async function getPartners() {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (error) {
    console.error('Error fetching partners:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return demoPartners;
    }
    
    throw error;
  }

  return data || [];
}
