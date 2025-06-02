import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, keywords, type = "website" }) => {
  const defaultTitle = "Wenslauce Chengo | Media Strategist";
  const defaultDescription = "Dynamic and results-driven media and communications professional with over 4 years of experience leading strategic initiatives across digital, traditional, and tech platforms. Adept at elevating brand visibility through impactful PR, data-driven content strategies, and cross-channel marketing. Proven leadership in managing multidisciplinary teams, launching scalable tech solutions, and aligning IT and media strategies with business goals. Versatile expertise in media relations, web development, social media management, and market analysis, with a strong foundation in journalism and digital innovation.";
  const defaultImage = "https://wenslauce.com/Meta.png?v=2";
  const defaultUrl = "https://wenslauce.com";
  const defaultKeywords = "Wenslauce Chengo, Media Strategist, Content Creator, Digital Marketing, Social Media Management, Brand Strategy, Content Strategy, Digital Communications, Web Development";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  const finalKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      <html lang="en" />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${finalTitle} - Professional Portfolio and Media Strategy Services`} />
      <meta property="og:site_name" content="Wenslauce Chengo Portfolio" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wenslauce" />
      <meta name="twitter:creator" content="@wenslauce" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={`${finalTitle} - Professional Portfolio and Media Strategy Services`} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:label1" content="Profession" />
      <meta name="twitter:data1" content="Media Strategist & Web Developer" />
      <meta name="twitter:label2" content="Experience" />
      <meta name="twitter:data2" content="4+ Years" />
      
      {/* Keywords and SEO */}
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Wenslauce Chengo" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#030014" />
      <meta name="msapplication-TileColor" content="#030014" />
      
      {/* Schema.org structured data for projects */}
      {type === "article" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": finalTitle,
            "description": finalDescription,
            "image": finalImage,
            "url": finalUrl,
            "author": {
              "@type": "Person",
              "name": "Wenslauce Chengo",
              "url": "https://wenslauce.com"
            },
            "creator": {
              "@type": "Person",
              "name": "Wenslauce Chengo",
              "url": "https://wenslauce.com"
            },
            "publisher": {
              "@type": "Person",
              "name": "Wenslauce Chengo",
              "url": "https://wenslauce.com"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 