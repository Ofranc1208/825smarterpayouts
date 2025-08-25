// Meta tags component for Settlement Laws page
// Simple component - under 50 lines per complexity rule

import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export default function MetaTags({
  title = 'Structured Settlement Laws by State | Complete Legal Guide 2024',
  description = 'Comprehensive guide to structured settlement transfer laws for all 50 states. Court approval requirements, protection acts, and legal resources.',
  keywords = 'structured settlement laws, state regulations, court approval, legal transfer, SSPA, settlement protection act',
  canonical = 'https://smarterpayouts.com/structured-settlement-laws-by-state'
}: MetaTagsProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="SmarterPayouts" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />
      <meta name="application-name" content="SmarterPayouts" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Content Classification */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
    </Head>
  );
}
