/**
 * Metadata Helpers
 * Helper functions to generate consistent metadata across pages
 */

import type { MetadataConfig } from '../types';

export const generateMetadata = (config: MetadataConfig) => {
  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      type: 'article',
      url: config.canonical,
    },
    alternates: {
      canonical: config.canonical,
    },
    robots: 'index, follow',
  };
};

export const generatePageMetadata = (
  pageName: string,
  description: string,
  path: string
) => {
  return generateMetadata({
    title: `${pageName} | SmarterPayouts`,
    description,
    canonical: `https://smarterpayouts.com${path}`
  });
};

