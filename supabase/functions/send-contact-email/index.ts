import { serve } from "std/http/server.ts";
import { SmtpClient } from "smtp";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const client = new SmtpClient();
    const { to, from, subject, text } = await req.json();

    // Validate input
    if (!to || !from || !subject || !text) {
      throw new Error('Missing required fields');
    }

    // Configure SMTP
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "hello@wenslauce.com",
      password: Deno.env.get("SMTP_PASSWORD"),
    });

    // Send email
    await client.send({
      from,
      to,
      subject,
      content: text,
    });

    await client.close();

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );

  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
  }
}); 