import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { corsHeaders } from '../_shared/cors.ts';

const ADMIN_PASS = Deno.env.get('ADMIN_PASS');

interface ImportResult {
  type: string;
  created: number;
  updated: number;
  errors: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin password
    const adminPass = req.headers.get('X-Admin-Password');
    if (!adminPass || adminPass !== ADMIN_PASS) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { demoData } = await req.json();
    const results: ImportResult[] = [];

    // Import Educators
    if (demoData.educators) {
      const result = await importEducators(supabaseClient, demoData.educators);
      results.push(result);
    }

    // Import Workshops
    if (demoData.workshops) {
      const result = await importWorkshops(supabaseClient, demoData.workshops);
      results.push(result);
    }

    // Import Posts
    if (demoData.posts) {
      const result = await importPosts(supabaseClient, demoData.posts);
      results.push(result);
    }

    // Import FAQs
    if (demoData.faqs) {
      const result = await importFaqs(supabaseClient, demoData.faqs);
      results.push(result);
    }

    // Import Partners
    if (demoData.partners) {
      const result = await importPartners(supabaseClient, demoData.partners);
      results.push(result);
    }

    // Import Gallery Items
    if (demoData.galleryItems) {
      const result = await importGalleryItems(supabaseClient, demoData.galleryItems);
      results.push(result);
    }

    // Import Resources (Materials)
    if (demoData.resources) {
      const result = await importResources(supabaseClient, demoData.resources);
      results.push(result);
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error importing demo data:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function importEducators(client: any, educators: any[]): Promise<ImportResult> {
  const result: ImportResult = { type: 'educators', created: 0, updated: 0, errors: [] };

  for (const educator of educators) {
    try {
      const { data: existing } = await client
        .from('educators')
        .select('id, is_demo')
        .eq('slug', educator.slug)
        .maybeSingle();

      const educatorData = {
        ...educator,
        is_demo: true,
        demo_source: 'seed/v1',
        updated_at: new Date().toISOString()
      };

      if (!existing) {
        const { error } = await client.from('educators').insert(educatorData);
        if (error) throw error;
        result.created++;
      } else if (existing.is_demo) {
        const { error } = await client
          .from('educators')
          .update(educatorData)
          .eq('id', existing.id);
        if (error) throw error;
        result.updated++;
      }
    } catch (error) {
      result.errors.push(`Educator ${educator.slug}: ${error.message}`);
    }
  }

  return result;
}

async function importWorkshops(client: any, workshops: any[]): Promise<ImportResult> {
  const result: ImportResult = { type: 'workshops', created: 0, updated: 0, errors: [] };

  for (const workshop of workshops) {
    try {
      const { data: existing } = await client
        .from('workshops')
        .select('id, is_demo')
        .eq('slug', workshop.slug)
        .maybeSingle();

      const workshopData = {
        ...workshop,
        is_demo: true,
        demo_source: 'seed/v1',
        updated_at: new Date().toISOString()
      };

      if (!existing) {
        const { error } = await client.from('workshops').insert(workshopData);
        if (error) throw error;
        result.created++;
      } else if (existing.is_demo) {
        const { error } = await client
          .from('workshops')
          .update(workshopData)
          .eq('id', existing.id);
        if (error) throw error;
        result.updated++;
      }
    } catch (error) {
      result.errors.push(`Workshop ${workshop.slug}: ${error.message}`);
    }
  }

  return result;
}

async function importPosts(client: any, posts: any[]): Promise<ImportResult> {
  const result: ImportResult = { type: 'posts', created: 0, updated: 0, errors: [] };

  for (const post of posts) {
    try {
      const { data: existing } = await client
        .from('posts')
        .select('id, is_demo')
        .eq('slug', post.slug)
        .maybeSingle();

      const postData = {
        ...post,
        is_demo: true,
        demo_source: 'seed/v1',
        updated_at: new Date().toISOString()
      };

      if (!existing) {
        const { error } = await client.from('posts').insert(postData);
        if (error) throw error;
        result.created++;
      } else if (existing.is_demo) {
        const { error } = await client
          .from('posts')
          .update(postData)
          .eq('id', existing.id);
        if (error) throw error;
        result.updated++;
      }
    } catch (error) {
      result.errors.push(`Post ${post.slug}: ${error.message}`);
    }
  }

  return result;
}

async function importFaqs(client: any, faqs: any[]): Promise<ImportResult> {
  const result: ImportResult = { type: 'faqs', created: 0, updated: 0, errors: [] };

  for (const faq of faqs) {
    try {
      const { data: existing } = await client
        .from('faqs')
        .select('id, is_demo')
        .eq('question', faq.question)
        .maybeSingle();

      const faqData = {
        ...faq,
        is_demo: true,
        demo_source: 'seed/v1',
        updated_at: new Date().toISOString()
      };

      if (!existing) {
        const { error } = await client.from('faqs').insert(faqData);
        if (error) throw error;
        result.created++;
      } else if (existing.is_demo) {
        const { error } = await client
          .from('faqs')
          .update(faqData)
          .eq('id', existing.id);
        if (error) throw error;
        result.updated++;
      }
    } catch (error) {
      result.errors.push(`FAQ "${faq.question}": ${error.message}`);
    }
  }

  return result;
}

async function importPartners(client: any, partners: any[]): Promise<ImportResult> {
  const result: ImportResult = { type: 'partners', created: 0, updated: 0, errors: [] };

  for (const partner of partners) {
    try {
      const { data: existing } = await client
        .from('partners')
        .select('id, is_demo')
        .eq('name', partner.name)
        .maybeSingle();

      const partnerData = {
        ...partner,
        is_demo: true,
        demo_source: 'seed/v1',
        updated_at: new Date().toISOString()
      };

      if (!existing) {
        const { error } = await client.from('partners').insert(partnerData);
        if (error) throw error;
        result.created++;
      } else if (existing.is_demo) {
        const { error } = await client
          .from('partners')
          .update(partnerData)
          .eq('id', existing.id);
        if (error) throw error;
        result.updated++;
      }
    } catch (error) {
      result.errors.push(`Partner ${partner.name}: ${error.message}`);
    }
  }

  return result;
}

async function importGalleryItems(client: any, items: any[]): Promise<ImportResult> {
  const result: ImportResult = { type: 'gallery_items', created: 0, updated: 0, errors: [] };

  for (const item of items) {
    try {
      const { data: existing } = await client
        .from('gallery_items')
        .select('id, is_demo')
        .eq('title', item.title)
        .maybeSingle();

      const itemData = {
        ...item,
        is_demo: true,
        demo_source: 'seed/v1',
        updated_at: new Date().toISOString()
      };

      if (!existing) {
        const { error } = await client.from('gallery_items').insert(itemData);
        if (error) throw error;
        result.created++;
      } else if (existing.is_demo) {
        const { error } = await client
          .from('gallery_items')
          .update(itemData)
          .eq('id', existing.id);
        if (error) throw error;
        result.updated++;
      }
    } catch (error) {
      result.errors.push(`Gallery item ${item.title}: ${error.message}`);
    }
  }

  return result;
}

async function importResources(client: any, resources: any[]): Promise<ImportResult> {
  const result: ImportResult = { type: 'materials', created: 0, updated: 0, errors: [] };

  for (const resource of resources) {
    try {
      const { data: existing } = await client
        .from('materials')
        .select('id, is_demo')
        .eq('title', resource.title)
        .maybeSingle();

      const resourceData = {
        ...resource,
        is_demo: true,
        demo_source: 'seed/v1',
        updated_at: new Date().toISOString()
      };

      if (!existing) {
        const { error } = await client.from('materials').insert(resourceData);
        if (error) throw error;
        result.created++;
      } else if (existing.is_demo) {
        const { error } = await client
          .from('materials')
          .update(resourceData)
          .eq('id', existing.id);
        if (error) throw error;
        result.updated++;
      }
    } catch (error) {
      result.errors.push(`Resource ${resource.title}: ${error.message}`);
    }
  }

  return result;
}
