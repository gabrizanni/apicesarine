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
    const { bookingId, status, assignedEducatorId, internalNotes } = await req.json();

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: 'Missing booking ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate status if provided
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ error: 'Invalid status value' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role to update booking
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const adminClient = createClient(supabaseUrl, supabaseServiceRole);

    // Build update object
    const updates: any = {};
    if (status !== undefined) updates.status = status;
    if (assignedEducatorId !== undefined) updates.assigned_educator_id = assignedEducatorId;
    if (internalNotes !== undefined) updates.internal_notes = internalNotes;

    const { data: booking, error: updateError } = await adminClient
      .from('booking_requests')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating booking:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update booking' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log to audit trail
    const metadata: any = {};
    if (status) metadata.new_status = status;
    if (assignedEducatorId) metadata.assigned_educator_id = assignedEducatorId;
    if (internalNotes !== undefined) metadata.notes_updated = true;

    await adminClient.rpc('log_booking_audit', {
      p_user_email: user.email || 'unknown',
      p_action: 'booking_updated',
      p_booking_id: bookingId,
      p_metadata: metadata
    });

    console.log('Booking updated by admin:', user.email, bookingId);

    return new Response(
      JSON.stringify({ booking }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in update-booking-status:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
