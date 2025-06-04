const https = require('https');
const http = require('http');

const DOMAIN = 'wenslauce.com';
const TEST_URLS = [
  // Main pages
  `https://${DOMAIN}`,
  `https://${DOMAIN}/about`,
  `https://${DOMAIN}/projects`,
  `https://${DOMAIN}/certificates`,
  
  // Project pages that were failing
  `https://${DOMAIN}/project/monarch-private-charters`,
  `https://${DOMAIN}/project/mukono-energies`,
  `https://${DOMAIN}/project/w-giertsen-energy-solutions`,
  `https://${DOMAIN}/project/x-stream-entertainment`,
  `https://${DOMAIN}/project/ronami-international`,
  `https://${DOMAIN}/project/kenya-law-ai`,
  `https://${DOMAIN}/project/identity-radio`,
  `https://${DOMAIN}/project/hon-peter-wandera-foundation`,
  `https://${DOMAIN}/project/afri-rise-equity`,
  
  // Certificate pages
  `https://${DOMAIN}/certificate/cert-afp-2024`,
  `https://${DOMAIN}/certificate/cert-media-ethics-2024`,
  `https://${DOMAIN}/certificate/cert-journalism-2023`,
  
  // SEO files
  `https://${DOMAIN}/sitemap.xml`,
  `https://${DOMAIN}/robots.txt`
];

const REDIRECT_TESTS = [
  { from: `https://www.${DOMAIN}`, to: `https://${DOMAIN}` },
  { from: `https://${DOMAIN}/project/test/`, to: `https://${DOMAIN}/project/test` },
  { from: `https://${DOMAIN}/certificate/test/`, to: `https://${DOMAIN}/certificate/test` }
];

function testUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const request = client.get(url, { timeout: 10000 }, (res) => {
      const result = {
        url,
        status: res.statusCode,
        headers: res.headers,
        success: res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302
      };
      resolve(result);
    });

    request.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        success: false
      });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout',
        success: false
      });
    });
  });
}

async function runTests() {
  console.log('🚀 Starting Vercel Deployment Verification\n');
  console.log(`Testing domain: ${DOMAIN}\n`);
  
  // Test main URLs
  console.log('📄 Testing Page URLs:');
  console.log('='.repeat(50));
  
  for (const url of TEST_URLS) {
    const result = await testUrl(url);
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.status} - ${result.url}`);
    
    if (!result.success) {
      console.log(`   Error: ${result.error || 'Failed to load'}`);
    }
    
    // Check for important headers on main page
    if (url === `https://${DOMAIN}` && result.success) {
      const headers = result.headers;
      console.log('   Security Headers:');
      console.log(`   - X-Frame-Options: ${headers['x-frame-options'] || 'Missing'}`);
      console.log(`   - X-Content-Type-Options: ${headers['x-content-type-options'] || 'Missing'}`);
      console.log(`   - Strict-Transport-Security: ${headers['strict-transport-security'] || 'Missing'}`);
    }
  }
  
  console.log('\n🔄 Testing Redirects:');
  console.log('='.repeat(50));
  
  for (const test of REDIRECT_TESTS) {
    const result = await testUrl(test.from);
    const isRedirect = result.status === 301 || result.status === 302;
    const status = isRedirect ? '✅' : '❌';
    console.log(`${status} ${result.status} - ${test.from}`);
    
    if (isRedirect && result.headers.location) {
      console.log(`   → Redirects to: ${result.headers.location}`);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log('='.repeat(50));
  
  const pageResults = await Promise.all(TEST_URLS.map(testUrl));
  const successCount = pageResults.filter(r => r.success).length;
  const totalCount = pageResults.length;
  
  console.log(`✅ Working URLs: ${successCount}/${totalCount}`);
  console.log(`❌ Failed URLs: ${totalCount - successCount}/${totalCount}`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 All tests passed! Your Vercel deployment is working correctly.');
    console.log('\n📋 Next Steps:');
    console.log('1. Submit URLs to Google Search Console for re-indexing');
    console.log('2. Monitor Search Console coverage report');
    console.log('3. Test all routes manually in your browser');
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above and:');
    console.log('1. Verify your domain is properly configured');
    console.log('2. Check Vercel deployment logs');
    console.log('3. Ensure SSL certificate is valid');
  }
}

// Run the tests
runTests().catch(console.error); 