const fs = require('fs');
const path = require('path');

// Content of the .htaccess file
const htaccessContent = `# Enable rewriting
RewriteEngine On
RewriteBase /

# Security Headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-XSS-Protection "1; mode=block"

# HTTPS Redirect (Force SSL)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# WWW to non-WWW redirect (canonical URL)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Remove trailing slashes (except for directories)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} ^(.+)/$
RewriteRule ^(.+)/$ $1 [R=301,L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType application/pdf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Handle Angular and React Router - SPA Routing
RewriteRule ^index\\.html$ - [L]

# Allow access to static files
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Handle client-side routing
RewriteRule . /index.html [L]

# Custom error pages
ErrorDocument 404 /index.html
ErrorDocument 500 /index.html

# MIME types for modern web
AddType application/javascript .js
AddType text/css .css
AddType image/svg+xml .svg
AddType font/woff .woff
AddType font/woff2 .woff2
AddType application/json .json

# Prevent access to sensitive files
<Files ~ "^\\.(htaccess|htpasswd|ini|log|sh|inc|bak)$">
    Order allow,deny
    Deny from all
</Files>
`;

// Path to the dist directory
const distPath = path.join(__dirname, 'dist');

// Check if the dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('dist directory does not exist. Run npm run build first.');
  process.exit(1);
}

try {
  // Write the .htaccess file
  const htaccessPath = path.join(distPath, '.htaccess');
  fs.writeFileSync(htaccessPath, htaccessContent);
  console.log('✅ .htaccess file has been created in the dist directory');

  // Copy _redirects file for Netlify
  const redirectsSource = path.join(__dirname, 'public', '_redirects');
  const redirectsTarget = path.join(distPath, '_redirects');
  if (fs.existsSync(redirectsSource)) {
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('✅ _redirects file copied to dist directory');
  }

  // Copy vercel.json for Vercel
  const vercelSource = path.join(__dirname, 'vercel.json');
  const vercelTarget = path.join(distPath, 'vercel.json');
  if (fs.existsSync(vercelSource)) {
    fs.copyFileSync(vercelSource, vercelTarget);
    console.log('✅ vercel.json file copied to dist directory');
  }

  console.log('🚀 All server configuration files have been prepared for deployment!');

} catch (error) {
  console.error('Error creating server configuration files:', error);
  process.exit(1);
} 