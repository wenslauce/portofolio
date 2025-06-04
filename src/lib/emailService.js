// Independent Email Service using Resend API
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const RESEND_API_URL = 'https://api.resend.com/emails';

// Email configuration
const FROM_EMAIL = "hello@wenslauce.com"; // Your verified domain
const FROM_NAME = "Wenslauce Chengo";
const REPLY_TO_EMAIL = "hello@wenslauce.com";

// Admin notification email template
const getAdminNotificationTemplate = (name, email, message) => `
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

// Client confirmation email template
const getClientConfirmationTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Thank you for your message!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 24px; font-weight: bold;">W</span>
        </div>
        <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 600;">Thank You, ${name}!</h1>
        <p style="color: #6b7280; margin: 10px 0 0; font-size: 16px;">Your message has been received successfully</p>
      </div>

      <!-- Thank You Message -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px; margin-bottom: 32px; text-align: center;">
        <h2 style="color: #1f2937; margin: 0 0 16px; font-size: 24px; font-weight: 600;">Message Received! ✨</h2>
        <p style="color: #374151; line-height: 1.6; margin: 0 0 16px; font-size: 16px;">
          Thank you for reaching out! I've received your message and will get back to you within <strong>24-48 hours</strong>.
        </p>
        <p style="color: #6b7280; margin: 0; font-size: 14px;">
          In the meantime, feel free to explore my work and connect with me on social media.
        </p>
      </div>

      <!-- Quick Links -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
        <h3 style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 600; text-align: center;">Explore My Work</h3>
        <div style="text-align: center;">
          <a href="https://wenslauce.com/projects" style="display: inline-block; margin: 0 8px 8px; padding: 8px 16px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">View Projects</a>
          <a href="https://wenslauce.com/certificates" style="display: inline-block; margin: 0 8px 8px; padding: 8px 16px; background: #a855f7; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">My Certificates</a>
        </div>
      </div>

      <!-- Social Links -->
      <div style="text-align: center; margin-bottom: 32px;">
        <h3 style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 600;">Connect With Me</h3>
        <div>
          <a href="https://linkedin.com/in/wenslauce" style="display: inline-block; margin: 0 8px; padding: 8px 12px; color: #6366f1; text-decoration: none; font-weight: 500;">LinkedIn</a>
          <a href="https://github.com/wenslauce" style="display: inline-block; margin: 0 8px; padding: 8px 12px; color: #6366f1; text-decoration: none; font-weight: 500;">GitHub</a>
          <a href="https://twitter.com/wenslauce" style="display: inline-block; margin: 0 8px; padding: 8px 12px; color: #6366f1; text-decoration: none; font-weight: 500;">Twitter</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <p style="color: #374151; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Best regards,</p>
        <p style="color: #6366f1; margin: 0 0 4px; font-size: 18px; font-weight: 700;">Wenslauce Chengo</p>
        <p style="color: #6b7280; margin: 0 0 16px; font-size: 14px;">Media Specialist & Digital Innovator</p>
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          This is an automated confirmation email. Please do not reply to this message.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Send email via Resend API
const sendEmail = async (emailData) => {
  if (!RESEND_API_KEY) {
    throw new Error('Resend API key not configured. Please add VITE_RESEND_API_KEY to your environment variables.');
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Email API error: ${response.status}`);
  }

  return await response.json();
};

// Send both admin notification and client confirmation emails
export const sendContactEmails = async (name, email, message) => {
  try {
    console.log('📧 Sending contact emails...', { name, email });

    // Send admin notification email
    const adminEmailResponse = await sendEmail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: REPLY_TO_EMAIL,
      subject: `New Message from ${name}`,
      html: getAdminNotificationTemplate(name, email, message),
      reply_to: email
    });

    console.log('✅ Admin email sent:', adminEmailResponse.id);

    // Send client confirmation email
    const clientEmailResponse = await sendEmail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: "Thank you for your message - I'll be in touch soon!",
      html: getClientConfirmationTemplate(name),
      reply_to: REPLY_TO_EMAIL
    });

    console.log('✅ Client confirmation email sent:', clientEmailResponse.id);

    return {
      success: true,
      adminEmail: adminEmailResponse,
      clientEmail: clientEmailResponse,
      message: 'Both emails sent successfully'
    };
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    throw error;
  }
};

// Test function for development
export const testEmailService = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    message: "This is a test message to verify the email service is working correctly."
  };

  try {
    console.log('🧪 Testing email service...');
    const result = await sendContactEmails(testData.name, testData.email, testData.message);
    console.log('✅ Email service test PASSED:', result);
    return result;
  } catch (error) {
    console.log('❌ Email service test FAILED:', error.message);
    throw error;
  }
}; 