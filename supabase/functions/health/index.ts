import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  version: string;
  environment: string;
  checks: {
    database: {
      status: "up" | "down";
      responseTime?: number;
      error?: string;
    };
    email: {
      status: "configured" | "not_configured";
      service?: string;
    };
    storage: {
      status: "up" | "down";
      error?: string;
    };
  };
  uptime: number;
}

const startTime = Date.now();

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  const healthStatus: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: Deno.env.get("ENVIRONMENT") || "production",
    checks: {
      database: { status: "down" },
      email: { status: "not_configured" },
      storage: { status: "down" }
    },
    uptime: Math.floor((Date.now() - startTime) / 1000)
  };

  try {
    // Check database connection
    const dbStartTime = Date.now();
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, error: dbError } = await supabase
      .from('workshops')
      .select('count')
      .limit(1);

    if (dbError) {
      healthStatus.checks.database = { 
        status: "down", 
        error: dbError.message 
      };
      healthStatus.status = "unhealthy";
    } else {
      healthStatus.checks.database = { 
        status: "up", 
        responseTime: Date.now() - dbStartTime 
      };
    }

    // Check email configuration
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const adminEmail = Deno.env.get('ADMIN_EMAIL');
    
    if (resendApiKey && adminEmail) {
      healthStatus.checks.email = { 
        status: "configured", 
        service: "resend" 
      };
    }

    // Check storage (simple bucket existence check)
    try {
      const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
      
      if (storageError) {
        healthStatus.checks.storage = { 
          status: "down", 
          error: storageError.message 
        };
        healthStatus.status = "unhealthy";
      } else {
        healthStatus.checks.storage = { status: "up" };
      }
    } catch (storageError) {
      healthStatus.checks.storage = { 
        status: "down", 
        error: "Storage check failed" 
      };
      healthStatus.status = "unhealthy";
    }

  } catch (error) {
    console.error('Health check error:', error);
    healthStatus.status = "unhealthy";
    healthStatus.checks.database = { 
      status: "down", 
      error: "Connection failed" 
    };
  }

  const statusCode = healthStatus.status === "healthy" ? 200 : 503;

  return new Response(
    JSON.stringify(healthStatus, null, 2),
    { 
      status: statusCode, 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      } 
    }
  );
};

serve(handler);