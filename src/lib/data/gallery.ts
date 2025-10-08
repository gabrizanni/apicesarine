import { supabase } from '@/integrations/supabase/client';
import { demoGalleryItems } from '@/data/demo';

export async function getGalleryItems(category?: string) {
  let query = supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (category && category !== 'Tutti') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching gallery items:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      let items = demoGalleryItems;
      if (category && category !== 'Tutti') {
        items = items.filter(i => i.category === category);
      }
      return items;
    }
    
    throw error;
  }

  return data || [];
}
