import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const defaultTitle = "Wenslauce Chengo | Media Strategist";
  const defaultDescription = "A results-driven professional with four years of experience in media, communications, public relations, and web development. Skilled in developing and executing brand-enhancing strategies, managing social media platforms, directing content across digital and traditional outlets, and leading PR initiatives.";
  const defaultImage = "https://wenslauce.com/Meta.png";
  const defaultUrl = "https://wenslauce.com";

  return (
    <Helmet>
      <html lang="en" />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content="Wenslauce Chengo Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Keywords */}
      <meta name="keywords" content="Wenslauce Chengo, Media Strategist, Content Creator, Digital Marketing, Social Media Management, Brand Strategy, Content Strategy, Digital Communications, Web Development" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Wenslauce Chengo" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEO; 