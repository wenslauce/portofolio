// Test script for the email function
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

async function testEmailFunction() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    message: "This is a test message to verify the email function is working correctly."
  };

  try {
    console.log('🧪 Testing email function...');
    
    const response = await fetch(`${SUPABASE_URL}/functions/v1/sendEmail`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email function test PASSED');
      console.log('📧 Admin email ID:', result.adminEmail?.id);
      console.log('📧 Client email ID:', result.clientEmail?.id);
      console.log('✨ Both emails should be sent successfully');
    } else {
      console.log('❌ Email function test FAILED');
      console.log('Error:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
}

// Instructions for use:
console.log('📝 To test your email function:');
console.log('1. Update SUPABASE_URL and SUPABASE_ANON_KEY above');
console.log('2. Run: node test-email-function.js');
console.log('3. Check your email for the test messages');
console.log('');

// Uncomment the line below and update the constants to run the test
// testEmailFunction(); 