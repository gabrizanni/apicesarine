import { supabase } from '@/integrations/supabase/client';
import { demoEducators } from '@/data/demo';

export async function getEducators(includeInactive = false) {
  const query = supabase
    .from('educators')
    .select('*')
    .order('name');

  if (!includeInactive) {
    query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching educators:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return demoEducators;
    }
    
    throw error;
  }

  return data || [];
}

export async function getEducatorBySlug(slug: string) {
  const { data, error } = await supabase
    .from('educators')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching educator:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return demoEducators.find(e => e.slug === slug);
    }
    
    throw error;
  }

  return data;
}
