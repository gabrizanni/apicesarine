import { supabase } from '@/integrations/supabase/client';
import { demoWorkshops } from '@/data/demo';

export async function getWorkshops(includeInactive = false) {
  const query = supabase
    .from('workshops')
    .select('*')
    .order('title');

  if (!includeInactive) {
    query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching workshops:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return demoWorkshops;
    }
    
    throw error;
  }

  return data || [];
}

export async function getWorkshopBySlug(slug: string) {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching workshop:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return demoWorkshops.find(w => w.slug === slug);
    }
    
    throw error;
  }

  return data;
}
