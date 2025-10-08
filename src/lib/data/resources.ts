import { supabase } from '@/integrations/supabase/client';
import { demoResources } from '@/data/demo';

export async function getResources(premiumOnly = false) {
  let query = supabase
    .from('materials')
    .select('*')
    .order('title');

  if (premiumOnly) {
    query = query.eq('is_premium', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching resources:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return premiumOnly 
        ? demoResources.filter(r => r.is_premium)
        : demoResources;
    }
    
    throw error;
  }

  return data || [];
}

export async function getResourceById(id: string) {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching resource:', error);
    throw error;
  }

  return data;
}
