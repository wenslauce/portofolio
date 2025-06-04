import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get Resend API key from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  throw new Error("RESEND_API_KEY environment variable is required");
}

const resend = new Resend(resendApiKey);

// Email templates
const getAdminNotificationTemplate = (name: string, email: string, message: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 24px; font-weight: bold;">W</span>
        </div>
        <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 600;">New Contact Message</h1>
        <p style="color: #6b7280; margin: 10px 0 0; font-size: 16px;">You have received a new message through your portfolio</p>
      </div>

      <!-- Contact Details -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h3 style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 600;">Contact Information</h3>
        <div style="margin-bottom: 12px;">
          <span style="color: #6b7280; font-weight: 500;">Name:</span>
          <span style="color: #111827; margin-left: 8px; font-weight: 600;">${name}</span>
        </div>
        <div>
          <span style="color: #6b7280; font-weight: 500;">Email:</span>
          <a href="mailto:${email}" style="color: #6366f1; margin-left: 8px; text-decoration: none; font-weight: 600;">${email}</a>
        </div>
      </div>

      <!-- Message -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
        <h3 style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 600;">Message</h3>
        <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 15px;">${message}</p>
      </div>

      <!-- Action Button -->
      <div style="text-align: center;">
        <a href="mailto:${email}?subject=Re: Your message to Wenslauce&body=Hi ${name},%0D%0A%0D%0AThank you for reaching out!" 
           style="display: inline-block; background: linear-gradient(135deg, #6366f1, #a855f7); color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          Reply to ${name}
        </a>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; margin: 0; font-size: 14px;">This message was sent from your portfolio contact form</p>
        <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">
          <a href="https://wenslauce.com" style="color: #6366f1; text-decoration: none;">wenslauce.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const getClientConfirmationTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Thank You for Your Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 600;">Thank You!</h1>
        <p style="color: #6b7280; margin: 10px 0 0; font-size: 16px;">Your message has been received successfully</p>
      </div>

      <!-- Greeting -->
      <div style="margin-bottom: 32px;">
        <p style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 500;">Hi ${name},</p>
        <p style="color: #4b5563; line-height: 1.6; margin: 0; font-size: 16px;">
          Thank you for reaching out through my portfolio! I really appreciate you taking the time to connect with me.
        </p>
      </div>

      <!-- What's Next -->
      <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 32px; border-radius: 0 8px 8px 0;">
        <h3 style="color: #0c4a6e; margin: 0 0 12px; font-size: 16px; font-weight: 600;">What happens next?</h3>
        <ul style="color: #075985; margin: 0; padding-left: 20px; line-height: 1.6;">
          <li style="margin-bottom: 8px;">I'll review your message carefully</li>
          <li style="margin-bottom: 8px;">You can expect a personal reply within 24-48 hours</li>
          <li>I'll reach out to discuss your project or inquiry in detail</li>
        </ul>
      </div>

      <!-- Quick Links -->
      <div style="text-align: center; margin-bottom: 32px;">
        <p style="color: #6b7280; margin: 0 0 20px; font-size: 16px;">While you're waiting, feel free to:</p>
        <div style="display: inline-block;">
          <a href="https://wenslauce.com/projects" 
             style="display: inline-block; margin: 0 8px; background: #f3f4f6; color: #374151; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; font-size: 14px;">
            View My Work
          </a>
          <a href="https://wenslauce.com/certificates" 
             style="display: inline-block; margin: 0 8px; background: #f3f4f6; color: #374151; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; font-size: 14px;">
            My Certificates
          </a>
        </div>
      </div>

      <!-- Social Links -->
      <div style="text-align: center; margin-bottom: 32px;">
        <p style="color: #6b7280; margin: 0 0 16px; font-size: 14px;">Connect with me on social media:</p>
        <div>
          <a href="https://linkedin.com/in/wenslauce" style="display: inline-block; margin: 0 8px; color: #6366f1; text-decoration: none; font-weight: 500;">LinkedIn</a>
          <a href="https://github.com/wenslauce" style="display: inline-block; margin: 0 8px; color: #6366f1; text-decoration: none; font-weight: 500;">GitHub</a>
          <a href="https://twitter.com/wenslauce" style="display: inline-block; margin: 0 8px; color: #6366f1; text-decoration: none; font-weight: 500;">Twitter</a>
        </div>
      </div>

      <!-- Signature -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
        <p style="color: #374151; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Best regards,</p>
        <p style="color: #6366f1; margin: 0; font-size: 18px; font-weight: 700;">Wenslauce Chengo</p>
        <p style="color: #6b7280; margin: 4px 0 0; font-size: 14px;">Media Strategist & Web Developer</p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          This is an automated confirmation email from 
          <a href="https://wenslauce.com" style="color: #6366f1; text-decoration: none;">wenslauce.com</a>
        </p>
        <p style="color: #9ca3af; margin: 8px 0 0; font-size: 12px;">
          Please do not reply to this email. I'll contact you directly from my personal email.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      throw new Error('Missing required fields');
    }

    console.log('Sending emails for:', { name, email });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "hello@wenslauce.com",
      to: "hello@wenslauce.com",
      subject: `New Message from ${name}`,
      html: getAdminNotificationTemplate(name, email, message)
    });

    console.log('Admin email sent:', adminEmailResponse);

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "hello@wenslauce.com",
      to: email,
      subject: "Thank you for your message - I'll be in touch soon!",
      html: getClientConfirmationTemplate(name)
    });

    console.log('Client confirmation email sent:', clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        clientEmail: clientEmailResponse,
        message: 'Both emails sent successfully'
      }), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error sending emails:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}); 