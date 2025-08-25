// Social media tags component
// Simple component - under 50 lines per complexity rule

import Head from 'next/head';

interface SocialTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SocialTags({
  title = 'Structured Settlement Laws by State | Legal Guide',
  description = 'Complete guide to structured settlement transfer laws for all 50 states. Court approval requirements and legal resources.',
  image = 'https://smarterpayouts.com/images/settlement-laws-social.jpg',
  url = 'https://smarterpayouts.com/structured-settlement-laws-by-state'
}: SocialTagsProps) {
  return (
    <Head>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SmarterPayouts" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@SmarterPayouts" />
      <meta property="twitter:creator" content="@SmarterPayouts" />
      
      {/* LinkedIn */}
      <meta property="article:author" content="SmarterPayouts" />
      <meta property="article:publisher" content="SmarterPayouts" />
    </Head>
  );
}
