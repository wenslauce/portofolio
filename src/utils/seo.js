// SEO Utilities for Portfolio Website

/**
 * Generate sitemap URLs for all projects and certificates
 * @param {Array} projects - Array of project objects
 * @param {Array} certificates - Array of certificate objects
 * @returns {Array} Array of sitemap URLs
 */
export const generateSitemapUrls = (projects, certificates = []) => {
  const baseUrl = 'https://wenslauce.com';
  const staticUrls = [
    {
      url: baseUrl,
      priority: 1.0,
      changefreq: 'weekly'
    },
    {
      url: `${baseUrl}/#about`,
      priority: 0.8,
      changefreq: 'monthly'
    },
    {
      url: `${baseUrl}/#Portofolio`,
      priority: 0.9,
      changefreq: 'weekly'
    },
    {
      url: `${baseUrl}/#contact`,
      priority: 0.7,
      changefreq: 'monthly'
    }
  ];

  const projectUrls = projects.map(project => ({
    url: `${baseUrl}/project/${project.id}`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  }));

  const certificateUrls = certificates.map(certificate => ({
    url: `${baseUrl}/certificate/${certificate.id}`,
    priority: 0.7,
    changefreq: 'yearly',
    lastmod: new Date().toISOString()
  }));

  return [...staticUrls, ...projectUrls, ...certificateUrls];
};

/**
 * Generate XML sitemap content
 * @param {Array} urls - Array of URL objects
 * @returns {string} XML sitemap content
 */
export const generateSitemapXML = (urls) => {
  const urlsXML = urls.map(urlObj => `
  <url>
    <loc>${urlObj.url}</loc>
    <priority>${urlObj.priority}</priority>
    <changefreq>${urlObj.changefreq}</changefreq>
    ${urlObj.lastmod ? `<lastmod>${urlObj.lastmod}</lastmod>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXML}
</urlset>`;
};

/**
 * Generate meta keywords from project data
 * @param {Object} project - Project object
 * @returns {string} Comma-separated keywords
 */
export const generateProjectKeywords = (project) => {
  const baseKeywords = [
    'Wenslauce Chengo',
    'Web Development',
    'Portfolio Project',
    'Media Strategist'
  ];

  const projectKeywords = [
    project.title,
    ...(project.technologies || []),
    ...(project.Features?.slice(0, 3) || []) // First 3 features as keywords
  ];

  return [...baseKeywords, ...projectKeywords]
    .filter(Boolean)
    .filter((keyword, index, arr) => arr.indexOf(keyword) === index) // Remove duplicates
    .join(', ');
};

/**
 * Generate meta keywords from certificate data
 * @param {Object} certificate - Certificate object
 * @returns {string} Comma-separated keywords
 */
export const generateCertificateKeywords = (certificate) => {
  const baseKeywords = [
    'Wenslauce Chengo',
    'Professional Certification',
    'Media Training',
    'Professional Development'
  ];

  const certificateKeywords = [
    certificate.title,
    certificate.institution,
    ...(certificate.skills || []),
    certificate.year
  ];

  return [...baseKeywords, ...certificateKeywords]
    .filter(Boolean)
    .filter((keyword, index, arr) => arr.indexOf(keyword) === index) // Remove duplicates
    .join(', ');
};

/**
 * Optimize description for SEO (160 characters max)
 * @param {string} description - Original description
 * @returns {string} SEO-optimized description
 */
export const optimizeDescription = (description) => {
  if (!description) return '';
  
  if (description.length <= 160) return description;
  
  // Find the last complete sentence within 160 characters
  const truncated = description.substring(0, 157);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastPeriod > 120) {
    return description.substring(0, lastPeriod + 1);
  } else if (lastSpace > 120) {
    return description.substring(0, lastSpace) + '...';
  } else {
    return truncated + '...';
  }
};

/**
 * Generate structured data for project pages
 * @param {Object} project - Project object
 * @returns {Object} Structured data object
 */
export const generateProjectStructuredData = (project) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": optimizeDescription(project.description),
    "image": project.image_url,
    "url": `https://wenslauce.com/project/${project.id}`,
    "author": {
      "@type": "Person",
      "name": "Wenslauce Chengo",
      "url": "https://wenslauce.com",
      "sameAs": [
        "https://linkedin.com/in/wenslauce",
        "https://github.com/wenslauce"
      ]
    },
    "creator": {
      "@type": "Person",
      "name": "Wenslauce Chengo"
    },
    "dateCreated": new Date().toISOString(),
    "keywords": generateProjectKeywords(project),
    "genre": "Web Development",
    "about": {
      "@type": "Thing",
      "name": "Web Development Portfolio"
    },
    "workExample": {
      "@type": "WebSite",
      "name": project.title,
      "url": project.demo_url,
      "description": project.description
    }
  };
};

/**
 * Generate structured data for certificate pages
 * @param {Object} certificate - Certificate object
 * @returns {Object} Structured data object
 */
export const generateCertificateStructuredData = (certificate) => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "name": certificate.title,
    "description": optimizeDescription(certificate.description),
    "image": certificate.image,
    "url": `https://wenslauce.com/certificate/${certificate.id}`,
    "credentialCategory": "Professional Certificate",
    "dateCreated": certificate.year,
    "recognizedBy": {
      "@type": "Organization",
      "name": certificate.institution
    },
    "about": {
      "@type": "DefinedTerm",
      "name": certificate.title,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "Professional Development Certificates"
      }
    },
    "holder": {
      "@type": "Person",
      "name": "Wenslauce Chengo",
      "url": "https://wenslauce.com",
      "sameAs": [
        "https://linkedin.com/in/wenslauce",
        "https://github.com/wenslauce"
      ]
    },
    "competencyRequired": certificate.skills || [],
    "keywords": generateCertificateKeywords(certificate)
  };
};

/**
 * Generate section-specific SEO data for Home section
 * @returns {Object} SEO data object
 */
export const getHomeSEO = () => {
  return {
    title: "Wenslauce Chengo | Media Strategist & Web Developer",
    description: "Dynamic and results-driven media and communications professional with over 4 years of experience leading strategic initiatives across digital, traditional, and tech platforms. Expert in web development, brand strategy, and digital innovation.",
    keywords: "Wenslauce Chengo, Media Strategist, Web Developer, Digital Marketing, Brand Strategy, Content Strategy, React Developer, Portfolio, Freelancer",
    url: "https://wenslauce.com/"
  };
};

/**
 * Generate section-specific SEO data for About section
 * @returns {Object} SEO data object
 */
export const getAboutSEO = () => {
  return {
    title: "About Wenslauce Chengo | Media Strategist & Communications Expert",
    description: "Learn about Wenslauce Chengo, a dynamic media and communications professional with over 4 years of experience in strategic initiatives, brand management, web development, and digital innovation.",
    keywords: "About Wenslauce Chengo, Media Professional, Communications Expert, Brand Strategist, Team Leadership, Digital Innovation, Web Developer, Journalism",
    url: "https://wenslauce.com/#About"
  };
};

/**
 * Generate section-specific SEO data for Portfolio section
 * @returns {Object} SEO data object
 */
export const getPortfolioSEO = () => {
  return {
    title: "Portfolio | Wenslauce Chengo - Projects, Certificates & Tech Stack",
    description: "Explore Wenslauce Chengo's portfolio showcasing innovative web development projects, professional certifications, and technical expertise across React, Next.js, WordPress, and modern web technologies.",
    keywords: "Wenslauce Portfolio, Web Development Projects, React Projects, Next.js Applications, WordPress Sites, Professional Certificates, Tech Stack, Media Projects",
    url: "https://wenslauce.com/#Portofolio"
  };
};

/**
 * Generate section-specific SEO data for Contact section
 * @returns {Object} SEO data object
 */
export const getContactSEO = () => {
  return {
    title: "Contact Wenslauce Chengo | Get in Touch",
    description: "Ready to collaborate? Contact Wenslauce Chengo for media strategy, web development projects, brand consulting, and digital innovation opportunities. Let's discuss your next project.",
    keywords: "Contact Wenslauce Chengo, Media Consultation, Web Development Services, Brand Strategy, Project Collaboration, Business Inquiries, Digital Services",
    url: "https://wenslauce.com/#Contact"
  };
};

/**
 * Generate image SEO attributes for profile pictures and media
 * @param {Object} imageData - Image data object
 * @returns {Object} Image SEO attributes
 */
export const generateImageSEO = (imageData) => {
  const {
    src,
    alt,
    title,
    width = "400",
    height = "400",
    person = "Wenslauce Chengo",
    role = "Media Strategist"
  } = imageData;

  return {
    src,
    alt: alt || `${person} - Professional ${role} | High-quality professional headshot showcasing expertise in media strategy, communications, and web development`,
    title: title || `${person} | ${role}`,
    width,
    height,
    loading: "lazy",
    fetchpriority: "high",
    itemProp: "image",
    role: "img",
    "aria-label": `Professional profile photo of ${person}`,
    // Additional SEO attributes
    "data-schema-type": "ImageObject",
    "data-caption": `Professional headshot of ${person}`,
    "data-description": `${person} - ${role}`
  };
};

/**
 * Generate meta image structured data
 * @param {string} imageUrl - Image URL
 * @param {string} altText - Alt text
 * @returns {Object} Structured data for image
 */
export const generateImageStructuredData = (imageUrl, altText) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": imageUrl,
    "width": "1200",
    "height": "630",
    "caption": altText,
    "description": "Professional portfolio and media strategy services branding image",
    "author": {
      "@type": "Person",
      "name": "Wenslauce Chengo"
    },
    "copyrightHolder": {
      "@type": "Person",
      "name": "Wenslauce Chengo"
    },
    "usageInfo": "Professional portfolio and business use",
    "acquireLicensePage": "https://wenslauce.com/#Contact"
  };
};

/**
 * Generate comprehensive person schema with image
 * @param {Object} personData - Person data object
 * @returns {Object} Person structured data
 */
export const generatePersonSchema = (personData = {}) => {
  const {
    name = "Wenslauce Chengo",
    jobTitle = "Media Strategist & Web Developer",
    description = "Dynamic and results-driven media and communications professional with over 4 years of experience",
    imageUrl = "https://wenslauce.com/photo.png?v=2",
    website = "https://wenslauce.com"
  } = personData;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "alternateName": "Wenslauce",
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": "400",
      "height": "400",
      "caption": `Professional headshot of ${name}`,
      "description": `${name} - Media Strategist and Communications Professional`
    },
    "url": website,
    "sameAs": [
      "https://linkedin.com/in/wenslauce",
      "https://github.com/wenslauce",
      "https://instagram.com/wenslauce"
    ],
    "jobTitle": jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Media Strategist"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "knowsAbout": [
      "Media Strategy",
      "Web Development",
      "Digital Marketing",
      "Brand Strategy",
      "Content Strategy",
      "Social Media Management",
      "React Development",
      "WordPress Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Media Strategist",
      "description": "Specializing in digital strategy, web development, and brand management"
    }
  };
};

/**
 * Generate robots.txt content
 * @returns {string} Robots.txt content
 */
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://wenslauce.com/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1`;
}; 