import type { Metadata } from 'next';

/**
 * SEO Configuration Constants
 */
export const SEO_CONFIG = {
  siteName: 'Smarter Payouts',
  siteUrl: 'https://smarterpayouts.com',
  defaultOgImage: 'https://smarterpayouts.com/images/og-default.jpg',
  twitterHandle: '@smarterpayouts',
  twitterCreator: '@smarterpayouts',
  locale: 'en_US',
  author: 'Smarter Payouts',
  publisher: 'Smarter Payouts',
} as const;

/**
 * Universal Metadata Template Options
 */
export interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

/**
 * Generate standardized metadata for any page
 * 
 * @param options - Metadata configuration options
 * @returns Complete Next.js Metadata object
 */
export function generateMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    ogImage = SEO_CONFIG.defaultOgImage,
    ogType = 'website',
    noindex = false,
    article,
  } = options;

  const canonical = `${SEO_CONFIG.siteUrl}${path}`;
  const fullTitle = title.includes('Smarter Payouts') 
    ? title 
    : `${title} | ${SEO_CONFIG.siteName}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.publisher,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterCreator,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };

  // Add article metadata if provided
  if (article && ogType === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: article.author ? [article.author] : undefined,
      section: article.section,
      tags: article.tags,
    };
  }

  return metadata;
}

/**
 * Generate metadata for state law pages
 */
export function generateStateLawMetadata(
  stateName: string,
  stateSlug: string,
  description?: string
): Metadata {
  return generateMetadata({
    title: `${stateName} Structured Settlement Laws & Regulations`,
    description: description || `Comprehensive guide to structured settlement laws in ${stateName}. Understand the legal requirements, approval process, and regulations for selling structured settlements in ${stateName}.`,
    path: `/state-laws/${stateSlug}`,
    ogType: 'article',
  });
}

/**
 * Generate metadata for county law pages
 */
export function generateCountyLawMetadata(
  countyName: string,
  stateName: string,
  stateSlug: string,
  countySlug: string,
  description?: string
): Metadata {
  return generateMetadata({
    title: `${countyName}, ${stateName} Structured Settlement Laws`,
    description: description || `Local structured settlement laws and court approval process for ${countyName}, ${stateName}. Find county-specific requirements and regulations.`,
    path: `/state-laws/${stateSlug}/${countySlug}`,
    ogType: 'article',
  });
}

/**
 * Generate metadata for Info Hub articles
 */
export function generateInfoHubMetadata(
  title: string,
  description: string,
  slug: string,
  publishedTime?: string,
  modifiedTime?: string
): Metadata {
  return generateMetadata({
    title,
    description,
    path: `/structured-settlement-info-hub/${slug}`,
    ogType: 'article',
    article: {
      publishedTime,
      modifiedTime,
      author: SEO_CONFIG.author,
      section: 'Structured Settlement Education',
    },
  });
}

/**
 * Generate metadata for calculator pages
 */
export function generateCalculatorMetadata(
  calculatorType: string,
  path: string
): Metadata {
  const titles: Record<string, string> = {
    guaranteed: 'Guaranteed Payment Calculator',
    lcp: 'Life Contingent Payment Calculator',
    'pricing-calculator': 'Structured Settlement Pricing Calculator',
    'lump-sum-calculator': 'Lump Sum Payout Calculator',
  };

  const descriptions: Record<string, string> = {
    guaranteed: 'Calculate the present value of your guaranteed structured settlement payments. Get an instant, accurate estimate of your lump sum payout.',
    lcp: 'Calculate life contingent payment values for your structured settlement. Advanced calculator for age-based structured settlement valuations.',
    'pricing-calculator': 'Free structured settlement pricing calculator. See what your settlement is worth and get competitive offers instantly.',
    'lump-sum-calculator': 'Calculate your structured settlement lump sum payout. Instant results with no personal information required.',
  };

  return generateMetadata({
    title: titles[calculatorType] || 'Settlement Calculator',
    description: descriptions[calculatorType] || 'Calculate your structured settlement value.',
    path,
  });
}

