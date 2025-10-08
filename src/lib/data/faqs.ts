import { supabase } from '@/integrations/supabase/client';
import { demoFaqs } from '@/data/demo';

export async function getFaqs(category?: string) {
  let query = supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (category && category !== 'tutti') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching FAQs:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      let faqs = demoFaqs;
      if (category && category !== 'tutti') {
        faqs = faqs.filter(f => f.category === category);
      }
      return faqs;
    }
    
    throw error;
  }

  return data || [];
}
