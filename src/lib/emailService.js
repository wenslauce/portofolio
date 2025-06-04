// Independent Email Service using Vercel API Route
const EMAIL_API_URL = '/api/send-email';

// Email service configuration (templates now handled by API route)

// Send email via Vercel API route
const sendEmail = async (emailData) => {
  const response = await fetch(EMAIL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `Email API error: ${response.status}`);
  }

  return await response.json();
};

// Send both admin notification and client confirmation emails
export const sendContactEmails = async (name, email, message) => {
  try {
    console.log('📧 Sending contact emails...', { name, email });

    // Send request to Vercel API route
    const result = await sendEmail({
      name,
      email,
      message
    });

    console.log('✅ Email service response:', result);

    return result;
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