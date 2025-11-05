import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod validation schema
const bookingSchema = z.object({
  schoolType: z.string().min(1, "Seleziona il tipo di istituto"),
  schoolName: z.string().min(2, "Il nome della scuola è obbligatorio"),
  mechanographicCode: z.string().optional(),
  city: z.string().min(2, "Il comune è obbligatorio"),
  province: z.string().min(2, "La provincia è obbligatoria"),
  postalCode: z.string().optional(),
  contactName: z.string().min(2, "Nome e cognome del referente sono obbligatori"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().min(10, "Inserisci un numero di telefono valido"),
  classes: z.string().min(1, "Indica il numero di classi"),
  students: z.string().min(1, "Indica il numero di studenti"),
  workshopProgram: z.string().min(1, "Seleziona un programma"),
  datePreference1: z.string().optional(),
  datePreference2: z.string().optional(),
  datePreference3: z.string().optional(),
  location: z.string().min(1, "Seleziona dove svolgere il laboratorio"),
  specialNeeds: z.string().optional(),
  notes: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, "Il consenso privacy è obbligatorio"),
  marketingConsent: z.boolean().optional(),
  honeypot: z.string().max(0, "Campo non valido"),
  timestamp: z.number().optional(),
});

// Rate limiting store (in-memory for edge function)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  maxRequests: 5,  // Increased to 5 requests per window for better UX
  windowMs: 15 * 60 * 1000, // 15 minutes
};

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRecord = rateLimitStore.get(ip);

  if (!userRecord || now > userRecord.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return true;
  }

  if (userRecord.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  userRecord.count++;
  return true;
}

function isValidTimestamp(timestamp?: number): boolean {
  if (!timestamp) return false;
  const now = Date.now();
  const diff = now - timestamp;
  // Request must be between 1 second and 10 minutes old
  return diff > 1000 && diff < 10 * 60 * 1000;
}

function generatePDFPlaceholder(bookingData: any): string {
  const currentDate = new Date().toLocaleDateString('it-IT');
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Riepilogo Prenotazione</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2d5a3d; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .label { font-weight: bold; color: #2d5a3d; }
        .value { margin-left: 10px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Richiesta Laboratorio Didattico</h1>
        <p>Data richiesta: ${currentDate}</p>
    </div>
    
    <div class="section">
        <h2>Informazioni Scuola</h2>
        <p><span class="label">Tipo Istituto:</span><span class="value">${bookingData.schoolType}</span></p>
        <p><span class="label">Nome Scuola:</span><span class="value">${bookingData.schoolName}</span></p>
        <p><span class="label">Città:</span><span class="value">${bookingData.city}, ${bookingData.province}</span></p>
        ${bookingData.postalCode ? `<p><span class="label">CAP:</span><span class="value">${bookingData.postalCode}</span></p>` : ''}
        ${bookingData.mechanographicCode ? `<p><span class="label">Codice Meccanografico:</span><span class="value">${bookingData.mechanographicCode}</span></p>` : ''}
    </div>
    
    <div class="section">
        <h2>Referente</h2>
        <p><span class="label">Nome:</span><span class="value">${bookingData.contactName}</span></p>
        <p><span class="label">Email:</span><span class="value">${bookingData.email}</span></p>
        <p><span class="label">Telefono:</span><span class="value">${bookingData.phone}</span></p>
    </div>
    
    <div class="section">
        <h2>Dettagli Laboratorio</h2>
        <p><span class="label">Programma:</span><span class="value">${bookingData.workshopProgram}</span></p>
        <p><span class="label">Numero Classi:</span><span class="value">${bookingData.classes}</span></p>
        <p><span class="label">Totale Studenti:</span><span class="value">${bookingData.students}</span></p>
        <p><span class="label">Luogo:</span><span class="value">${bookingData.location}</span></p>
        ${bookingData.datePreference1 ? `<p><span class="label">1ª Preferenza Data:</span><span class="value">${bookingData.datePreference1}</span></p>` : ''}
        ${bookingData.datePreference2 ? `<p><span class="label">2ª Preferenza Data:</span><span class="value">${bookingData.datePreference2}</span></p>` : ''}
        ${bookingData.datePreference3 ? `<p><span class="label">3ª Preferenza Data:</span><span class="value">${bookingData.datePreference3}</span></p>` : ''}
        ${bookingData.specialNeeds ? `<p><span class="label">Esigenze Particolari:</span><span class="value">${bookingData.specialNeeds}</span></p>` : ''}
        ${bookingData.notes ? `<p><span class="label">Note:</span><span class="value">${bookingData.notes}</span></p>` : ''}
    </div>
    
    <div class="footer">
        <p>Questa richiesta è stata registrata nel nostro sistema. Ti ricontatteremo entro 24 ore per confermare tutti i dettagli.</p>
        <p>Per qualsiasi domanda, contattaci via email.</p>
    </div>
</body>
</html>`;
}

function generateEmailTemplate(bookingData: any, isAdmin: boolean = false): string {
  const currentDate = new Date().toLocaleDateString('it-IT');
  
  if (isAdmin) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2d5a3d; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; background: white; padding: 15px; border-radius: 5px; }
        .label { font-weight: bold; color: #2d5a3d; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐝 Nuova Richiesta Laboratorio</h1>
            <p>Ricevuta il ${currentDate}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📚 Informazioni Scuola</h2>
                <p><span class="label">Tipo:</span> ${bookingData.schoolType}</p>
                <p><span class="label">Nome:</span> ${bookingData.schoolName}</p>
                <p><span class="label">Luogo:</span> ${bookingData.city}, ${bookingData.province}</p>
                ${bookingData.mechanographicCode ? `<p><span class="label">Cod. Mecc.:</span> ${bookingData.mechanographicCode}</p>` : ''}
            </div>
            
            <div class="section">
                <h2>👤 Referente</h2>
                <p><span class="label">Nome:</span> ${bookingData.contactName}</p>
                <p><span class="label">Email:</span> ${bookingData.email}</p>
                <p><span class="label">Telefono:</span> ${bookingData.phone}</p>
            </div>
            
            <div class="section">
                <h2>🔬 Dettagli Laboratorio</h2>
                <p><span class="label">Programma:</span> ${bookingData.workshopProgram}</p>
                <p><span class="label">Classi:</span> ${bookingData.classes}</p>
                <p><span class="label">Studenti:</span> ${bookingData.students}</p>
                <p><span class="label">Luogo:</span> ${bookingData.location}</p>
                ${bookingData.datePreference1 ? `<p><span class="label">Date preferite:</span> ${[bookingData.datePreference1, bookingData.datePreference2, bookingData.datePreference3].filter(Boolean).join(', ')}</p>` : ''}
                ${bookingData.specialNeeds ? `<p><span class="label">Esigenze speciali:</span> ${bookingData.specialNeeds}</p>` : ''}
                ${bookingData.notes ? `<p><span class="label">Note:</span> ${bookingData.notes}</p>` : ''}
            </div>
            
            <div class="section">
                <h2>📋 Consensi</h2>
                <p><span class="label">Privacy:</span> ✓ Acconsentito</p>
                <p><span class="label">Marketing:</span> ${bookingData.marketingConsent ? '✓ Acconsentito' : '✗ Non acconsentito'}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
  } else {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2d5a3d; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; font-size: 14px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐝 Richiesta Ricevuta!</h1>
            <p>Grazie per il tuo interesse nei nostri laboratori didattici</p>
        </div>
        
        <div class="content">
            <p>Ciao <strong>${bookingData.contactName}</strong>,</p>
            
            <p>Abbiamo ricevuto la tua richiesta per un laboratorio didattico per <strong>${bookingData.schoolName}</strong>.</p>
            
            <div class="highlight">
                <h3>📋 Riepilogo della tua richiesta:</h3>
                <ul>
                    <li><strong>Programma:</strong> ${bookingData.workshopProgram}</li>
                    <li><strong>Classi coinvolte:</strong> ${bookingData.classes}</li>
                    <li><strong>Studenti totali:</strong> ${bookingData.students}</li>
                    <li><strong>Luogo preferito:</strong> ${bookingData.location}</li>
                </ul>
            </div>
            
            <p><strong>🕐 Prossimi passi:</strong></p>
            <ul>
                <li>Ti ricontatteremo entro <strong>24 ore</strong></li>
                <li>Confermeremo tutti i dettagli organizzativi</li>
                <li>Ti invieremo un preventivo personalizzato</li>
                <li>Pianificheremo insieme le date migliori</li>
            </ul>
            
            <p>Se hai domande urgenti, puoi rispondere direttamente a questa email.</p>
            
            <p>A presto!<br>
            <strong>Il Team dei Laboratori Didattici</strong></p>
        </div>
        
        <div class="footer">
            <p>Questa email è stata generata automaticamente. Se hai bisogno di assistenza, contattaci direttamente.</p>
        </div>
    </div>
</body>
</html>`;
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Enhanced rate limiting with better error message
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Troppi tentativi di invio. Per motivi di sicurezza, puoi inviare massimo 5 richieste ogni 15 minuti. Riprova più tardi.',
          retryAfter: 15 * 60 // seconds until reset
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '900' // 15 minutes in seconds
          } 
        }
      );
    }

    const requestData = await req.json();
    
    // Anti-bot timestamp check
    if (!isValidTimestamp(requestData.timestamp)) {
      return new Response(
        JSON.stringify({ 
          error: 'Richiesta non valida. Ricarica la pagina e riprova.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate with Zod
    const validationResult = bookingSchema.safeParse(requestData);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          error: 'Dati non validi', 
          details: validationResult.error.errors 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const bookingData = validationResult.data;

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Save to database
    const { data: booking, error: dbError } = await supabase
      .from('booking_requests')
      .insert({
        organization: bookingData.schoolName,
        requester_name: bookingData.contactName,
        requester_email: bookingData.email,
        requester_phone: bookingData.phone,
        participants_count: parseInt(bookingData.students),
        preferred_date: bookingData.datePreference1 || null,
        message: JSON.stringify({
          schoolType: bookingData.schoolType,
          mechanographicCode: bookingData.mechanographicCode,
          city: bookingData.city,
          province: bookingData.province,
          postalCode: bookingData.postalCode,
          classes: bookingData.classes,
          workshopProgram: bookingData.workshopProgram,
          datePreference2: bookingData.datePreference2,
          datePreference3: bookingData.datePreference3,
          location: bookingData.location,
          specialNeeds: bookingData.specialNeeds,
          notes: bookingData.notes,
          marketingConsent: bookingData.marketingConsent
        }),
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Errore nel salvare la richiesta' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Log booking submission to audit trail
    await supabase.rpc('log_booking_audit', {
      p_user_email: bookingData.email,
      p_booking_id: booking.id,
      p_action: 'booking_submitted',
      p_metadata: {
        organization: bookingData.schoolName,
        workshop_program: bookingData.workshopProgram,
        students: parseInt(bookingData.students),
        preferred_date: bookingData.datePreference1 || null
      }
    });

    // Send emails if Resend is configured
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const adminEmail = Deno.env.get('ADMIN_EMAIL');

    if (resendApiKey && adminEmail) {
      const resend = new Resend(resendApiKey);

      try {
        // Send admin notification
        await resend.emails.send({
          from: 'Laboratori Didattici <onboarding@resend.dev>',
          to: [adminEmail],
          subject: `🐝 Nuova richiesta laboratorio - ${bookingData.schoolName}`,
          html: generateEmailTemplate(bookingData, true),
        });

        // Send confirmation to requester
        await resend.emails.send({
          from: 'Laboratori Didattici <onboarding@resend.dev>',
          to: [bookingData.email],
          subject: '🐝 Richiesta laboratorio ricevuta - Ti ricontatteremo presto!',
          html: generateEmailTemplate(bookingData, false),
        });

        console.log('Emails sent successfully');

        // Log successful email sending
        await supabase.rpc('log_booking_audit', {
          p_user_email: bookingData.email,
          p_booking_id: booking.id,
          p_action: 'booking_emails_sent',
          p_metadata: {
            admin_email: adminEmail,
            requester_email: bookingData.email
          }
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        
        // Log email failure
        await supabase.rpc('log_booking_audit', {
          p_user_email: bookingData.email,
          p_booking_id: booking.id,
          p_action: 'booking_emails_failed',
          p_metadata: {
            error: String(emailError)
          }
        });
      }
    }

    // Generate PDF placeholder
    const pdfContent = generatePDFPlaceholder(bookingData);
    const pdfBase64 = btoa(unescape(encodeURIComponent(pdfContent)));

    return new Response(
      JSON.stringify({ 
        success: true,
        bookingId: booking.id,
        message: 'Richiesta inviata con successo!',
        pdfDownload: `data:text/html;base64,${pdfBase64}`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);