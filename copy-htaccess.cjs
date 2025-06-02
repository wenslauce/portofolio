const fs = require('fs');
const path = require('path');

// Content of the .htaccess file
const htaccessContent = `# Enable rewriting
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;

// Path to the dist directory
const distPath = path.join(__dirname, 'dist');

// Path to the .htaccess file in the dist directory
const htaccessPath = path.join(distPath, '.htaccess');

// Check if the dist directory exists
if (fs.existsSync(distPath)) {
  // Write the .htaccess file
  fs.writeFileSync(htaccessPath, htaccessContent);
  console.log('.htaccess file has been created in the dist directory');
} else {
  console.error('dist directory does not exist. Run npm run build first.');
} 