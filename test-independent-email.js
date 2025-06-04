// Test script for Independent Email Service
// Run this in your browser console when on your site

async function testIndependentEmail() {
  console.log('🧪 Testing Independent Email Service...');
  console.log('📋 Make sure you have VITE_RESEND_API_KEY in your .env file');
  
  try {
    // Import the email service
    const { sendContactEmails } = await import('./src/lib/emailService.js');
    
    // Test data
    const testData = {
      name: "Test User",
      email: "your-email@example.com", // Change this to your email
      message: "This is a test message from the independent email service. If you receive this, the system is working perfectly!"
    };
    
    console.log('📧 Sending test emails with data:', testData);
    
    // Send test emails
    const result = await sendContactEmails(
      testData.name,
      testData.email,
      testData.message
    );
    
    console.log('✅ EMAIL SERVICE TEST PASSED!');
    console.log('📊 Result:', result);
    console.log('📧 Admin email ID:', result.adminEmail?.id);
    console.log('📧 Client email ID:', result.clientEmail?.id);
    console.log('🎉 Check your email inbox for both emails!');
    
    return result;
    
  } catch (error) {
    console.error('❌ EMAIL SERVICE TEST FAILED!');
    console.error('🔍 Error details:', error.message);
    
    // Common error diagnostics
    if (error.message.includes('API key')) {
      console.log('💡 Fix: Add VITE_RESEND_API_KEY to your .env file');
    } else if (error.message.includes('fetch')) {
      console.log('💡 Fix: Check your internet connection and Resend API status');
    } else if (error.message.includes('domain')) {
      console.log('💡 Fix: Verify your domain in Resend dashboard');
    }
    
    throw error;
  }
}

// Instructions for manual testing
console.log(`
🚀 INDEPENDENT EMAIL SERVICE TESTER

To test the email service:

1. Make sure you have .env file with VITE_RESEND_API_KEY
2. Update the email address in testData to your email
3. Run: testIndependentEmail()
4. Check console logs and your email inbox

Example:
testIndependentEmail()
  .then(result => console.log('Success!', result))
  .catch(error => console.error('Failed!', error));
`);

// Make function available globally
window.testIndependentEmail = testIndependentEmail;

// Auto-run if this script is executed directly
if (typeof window !== 'undefined' && window.location) {
  console.log('💡 Run testIndependentEmail() in console to test the email service');
} 