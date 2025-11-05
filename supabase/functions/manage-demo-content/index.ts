import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Supabase client with user's auth context
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated and is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: hasRole, error: roleError } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError || !hasRole) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get request body
    const { action, table, ids, data } = await req.json();

    // Validate table name
    const validTables = ['educators', 'workshops', 'posts', 'faqs', 'partners', 'gallery_items', 'materials'];
    if (!validTables.includes(table)) {
      return new Response(
        JSON.stringify({ error: 'Invalid table name' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate action
    const validActions = ['convert', 'delete', 'duplicate'];
    if (!validActions.includes(action)) {
      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid IDs' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role for operations
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const adminClient = createClient(supabaseUrl, supabaseServiceRole);

    // SERVER-SIDE VALIDATION: Verify all items are actually demo content
    const { data: items, error: checkError } = await adminClient
      .from(table)
      .select('id, is_demo')
      .in('id', ids);

    if (checkError) {
      console.error('Error checking items:', checkError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if any non-demo items in the selection
    const nonDemoItems = items?.filter(item => !item.is_demo) || [];
    if (action === 'delete' && nonDemoItems.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Cannot delete non-demo content',
          non_demo_ids: nonDemoItems.map(i => i.id)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let result;

    switch (action) {
      case 'convert':
        // Convert demo to real content
        const { data: converted, error: convertError } = await adminClient
          .from(table)
          .update({ is_demo: false, demo_source: null })
          .in('id', ids)
          .eq('is_demo', true)
          .select();

        if (convertError) {
          console.error('Error converting items:', convertError);
          return new Response(
            JSON.stringify({ error: 'Failed to convert items' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        result = { converted: converted?.length || 0 };
        console.log(`Converted ${converted?.length} demo items to real content in ${table}`);
        break;

      case 'delete':
        // Delete demo content only (already validated above)
        const { error: deleteError } = await adminClient
          .from(table)
          .delete()
          .in('id', ids)
          .eq('is_demo', true);

        if (deleteError) {
          console.error('Error deleting items:', deleteError);
          return new Response(
            JSON.stringify({ error: 'Failed to delete items' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        result = { deleted: ids.length };
        console.log(`Deleted ${ids.length} demo items from ${table}`);
        break;

      case 'duplicate':
        // Duplicate demo content as non-demo
        if (!data) {
          return new Response(
            JSON.stringify({ error: 'Missing data for duplication' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data: duplicated, error: duplicateError } = await adminClient
          .from(table)
          .insert([data])
          .select();

        if (duplicateError) {
          console.error('Error duplicating item:', duplicateError);
          return new Response(
            JSON.stringify({ error: 'Failed to duplicate item' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        result = { duplicated: duplicated?.[0] };
        console.log(`Duplicated demo item in ${table}`);
        break;
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in manage-demo-content:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
