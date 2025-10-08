import { supabase } from '@/integrations/supabase/client';
import { demoPosts } from '@/data/demo';

export async function getPosts(publishedOnly = true) {
  const query = supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (publishedOnly) {
    query.eq('status', 'published');
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return demoPosts.filter(p => !publishedOnly || p.status === 'published');
    }
    
    throw error;
  }

  return data || [];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    console.error('Error fetching post:', error);
    
    // Fallback to demo data if ENV allows
    if (import.meta.env.ALLOW_DEMO_PUBLIC === 'true') {
      return demoPosts.find(p => p.slug === slug && p.status === 'published');
    }
    
    throw error;
  }

  return data;
}
