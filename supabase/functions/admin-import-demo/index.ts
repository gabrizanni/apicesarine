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

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has admin role
    const { data: hasRole, error: roleError } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError) {
      console.error('Role check error:', roleError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify admin role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!hasRole) {
      console.error('User is not admin:', user.id);
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // User is verified admin - now call import-demo-data with server-side ADMIN_PASS
    const importUrl = `${supabaseUrl}/functions/v1/import-demo-data`;
    const adminPass = Deno.env.get('ADMIN_PASS');
    
    if (!adminPass) {
      console.error('ADMIN_PASS not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get demo data from request body
    const body = await req.json();

    console.log('Calling import-demo-data function for admin user:', user.email);

    // Call import-demo-data function with server-side password
    const importResponse = await fetch(importUrl, {
      method: 'POST',
      headers: {
        'X-Admin-Password': adminPass,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const importData = await importResponse.json();

    if (!importResponse.ok) {
      console.error('Import failed:', importData);
      return new Response(
        JSON.stringify(importData),
        { status: importResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Import successful:', importData);
    return new Response(
      JSON.stringify(importData),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in admin-import-demo:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
