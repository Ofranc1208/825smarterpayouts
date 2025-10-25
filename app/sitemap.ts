// Comprehensive Main Sitemap for SmarterPayouts
// Optimized for Google Search Console and SEO
// Includes all static pages with proper priority and change frequency

import { MetadataRoute } from 'next';
import { getStateLawsSitemapEntries, getCountySitemapEntries } from './state-laws/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smarterpayouts.com';
  const currentDate = new Date();

  // Define all static routes with SEO-optimized metadata
  const routes: MetadataRoute.Sitemap = [
    // ============================================================================
    // PRIORITY 1.0 - Homepage (Highest Priority)
    // ============================================================================
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // ============================================================================
    // PRIORITY 0.9 - Core Product Pages (Calculators & Main Product)
    // ============================================================================
    {
      url: `${baseUrl}/main`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mint-intelligent-chat`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mint-chat-active`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // ============================================================================
    // PRIORITY 0.85 - Process Flow Pages (Conversion Funnel)
    // ============================================================================
    {
      url: `${baseUrl}/get-a-quote`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/review-offer`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/court-approval`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/get-your-cash`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    // ============================================================================
    // PRIORITY 0.8 - Educational Content Hub (13 Comprehensive Guides)
    // ============================================================================
    {
      url: `${baseUrl}/structured-settlement-info-hub`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/what-is-a-structured-settlement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/how-to-sell-structured-settlement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/court-approval-process`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/pros-cons-selling-structured-settlement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/maximize-offer-selling-structured-settlement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/common-mistakes-selling-structured-settlement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/alternatives-to-selling-structured-settlement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/after-you-sell-structured-settlement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/how-to-choose-best-company`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/state-laws`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/glossary-of-structured-settlement-terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structured-settlement-info-hub/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ============================================================================
    // PRIORITY 0.75 - Legal Information Pages
    // ============================================================================
    {
      url: `${baseUrl}/structured-settlement-laws`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/structured-settlement-laws-by-state`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/state-laws-overview`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },

    // ============================================================================
    // PRIORITY 0.7 - Supporting Content Pages
    // ============================================================================
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/credentials`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/youtube-channel`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-fast-can-i-get-my-money`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/helpful-links`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // ============================================================================
    // PRIORITY 0.6 - Secondary Pages
    // ============================================================================
    {
      url: `${baseUrl}/mint-intelligent-chat`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/connect-with-specialist`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/social-media`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/marketing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // ============================================================================
    // PRIORITY 0.5 - Legal & Policy Pages
    // ============================================================================
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Add state laws entries to main sitemap
  const stateLawsEntries = getStateLawsSitemapEntries();
  const countyEntries = getCountySitemapEntries();
  routes.push(...stateLawsEntries, ...countyEntries);

  return routes;
}

// Export function to get sitemap entries for sitemap index
export function getMainSitemapEntries(): MetadataRoute.Sitemap {
  return sitemap();
}

