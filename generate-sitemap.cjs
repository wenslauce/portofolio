const fs = require('fs');
const path = require('path');

// Project data (same as in your components)
const projects = [
  { id: "monarch-private-charters", title: "Monarch Private Charters" },
  { id: "w-giertsen-energy-solutions", title: "W. Giertsen Energy Solutions" },
  { id: "mukono-energies", title: "Mukono Energies | Clean Energy" },
  { id: "ronami-international", title: "Ronami International" },
  { id: "x-stream-entertainment", title: "X-Stream 1.0 | Entertainment" },
  { id: "afri-rise-equity", title: "Afri-Rise Equity Limited" },
  { id: "othalo-as", title: "Othalo AS" },
  { id: "ronami-online", title: "Ronami Online" },
  { id: "identity-radio", title: "Identity Radio | Identity Newsroom" },
  { id: "hon-peter-wandera-foundation", title: "Hon. Peter Wandera Foundation" },
  { id: "kenya-law-ai", title: "KenyaLaw AI" }
];

const certificates = [
  { id: "cert-journalism-2023", title: "English for Journalism - University of Pennsylvania" },
  { id: "cert-afp-2024", title: "Online Safety & Harassment Prevention - Agence France-Presse" },
  { id: "cert-media-ethics-2024", title: "Media Ethics and Governance - University of Amsterdam" }
];

const generateSitemap = () => {
  const baseUrl = 'https://wenslauce.com';
  const currentDate = new Date().toISOString();
  
  const staticUrls = [
    {
      url: baseUrl,
      priority: 1.0,
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: `${baseUrl}/#about`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: `${baseUrl}/#Portofolio`,
      priority: 0.9,
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: `${baseUrl}/#contact`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: currentDate
    }
  ];

  const projectUrls = projects.map(project => ({
    url: `${baseUrl}/project/${project.id}`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: currentDate
  }));

  const certificateUrls = certificates.map(certificate => ({
    url: `${baseUrl}/certificate/${certificate.id}`,
    priority: 0.7,
    changefreq: 'yearly',
    lastmod: currentDate
  }));

  const allUrls = [...staticUrls, ...projectUrls, ...certificateUrls];

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(urlObj => `  <url>
    <loc>${urlObj.url}</loc>
    <priority>${urlObj.priority}</priority>
    <changefreq>${urlObj.changefreq}</changefreq>
    <lastmod>${urlObj.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXML;
};

const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://wenslauce.com/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1

# Disallow admin or private directories
Disallow: /admin/
Disallow: /private/`;
};

// Generate sitemap and robots.txt
const sitemap = generateSitemap();
const robotsTxt = generateRobotsTxt();

// Write to public directory
const publicDir = path.join(__dirname, 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully at public/sitemap.xml');

// Write robots.txt
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('✅ Robots.txt generated successfully at public/robots.txt');

console.log('\n📊 SEO Files Generated:');
console.log(`📄 Sitemap: ${projects.length + certificates.length + 4} URLs included`);
console.log(`   - ${4} main pages`);
console.log(`   - ${projects.length} project pages`);
console.log(`   - ${certificates.length} certificate pages`);
console.log('🤖 Robots.txt: Search engine directives set');
console.log('\n🚀 Your portfolio is now SEO-ready!'); 