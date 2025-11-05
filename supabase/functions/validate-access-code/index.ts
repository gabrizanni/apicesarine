import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RATE_LIMIT = {
  maxAttempts: 5,
  windowMinutes: 10,
  lockAfterAttempts: 10,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return Response.json(
        { error: 'Invalid code format', valid: false },
        { status: 400, headers: corsHeaders }
      );
    }

    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const now = new Date();
    const windowStart = new Date(now.getTime() - RATE_LIMIT.windowMinutes * 60 * 1000);

    // Check rate limit
    const { data: rateLimit } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('ip_address', clientIP)
      .gte('window_start', windowStart.toISOString())
      .maybeSingle();

    if (rateLimit && rateLimit.request_count >= RATE_LIMIT.maxAttempts) {
      const resetTime = new Date(rateLimit.window_start);
      resetTime.setMinutes(resetTime.getMinutes() + RATE_LIMIT.windowMinutes);
      const minutesRemaining = Math.ceil((resetTime.getTime() - now.getTime()) / 60000);

      await supabase.rpc('log_booking_audit', {
        p_user_email: null,
        p_booking_id: null,
        p_action: 'access_code_validation_rate_limited',
        p_metadata: {
          ip: clientIP,
          code_prefix: code.substring(0, 3),
          attempts: rateLimit.request_count
        }
      });

      return Response.json(
        { 
          error: `Troppi tentativi. Riprova tra ${minutesRemaining} minuti.`,
          valid: false,
          retryAfter: minutesRemaining * 60
        },
        { 
          status: 429, 
          headers: { 
            ...corsHeaders,
            'Retry-After': String(minutesRemaining * 60)
          }
        }
      );
    }

    // Validate code using RPC
    const { data: isValid } = await supabase.rpc('validate_access_code', {
      input_code: code
    });

    // Log validation attempt
    await supabase.rpc('log_booking_audit', {
      p_user_email: null,
      p_booking_id: null,
      p_action: 'access_code_validation',
      p_metadata: {
        success: isValid === true,
        ip: clientIP,
        code_prefix: code.substring(0, 3)
      }
    });

    // Update rate limit
    await supabase.from('rate_limits').upsert({
      ip_address: clientIP,
      window_start: windowStart.toISOString(),
      request_count: (rateLimit?.request_count || 0) + 1,
      updated_at: now.toISOString()
    });

    return Response.json(
      { valid: isValid === true },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error validating access code:', error);
    return Response.json(
      { error: 'Internal server error', valid: false },
      { status: 500, headers: corsHeaders }
    );
  }
});