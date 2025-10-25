// Dynamic sitemap for State Laws pages
// Enterprise SEO implementation for search engine discovery

import { allStates, allStateCounties, getCountySlugsByState } from '@/src/state-laws/data';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smarterpayouts.com';
  const currentDate = new Date();

  // Base state laws index page
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/state-laws`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  ];

  // Individual state pages
  Object.values(allStates).forEach(state => {
    sitemapEntries.push({
      url: `${baseUrl}/state-laws/${state.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });
  });

  // County pages for states with county data
  Object.entries(allStateCounties).forEach(([stateSlug, stateCounties]) => {
    Object.values(stateCounties).forEach(county => {
      sitemapEntries.push({
        url: `${baseUrl}/state-laws/${stateSlug}/${county.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}

// Export for use in main sitemap if needed
export function getStateLawsSitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smarterpayouts.com';
  const currentDate = new Date();

  return Object.values(allStates).map(state => ({
    url: `${baseUrl}/state-laws/${state.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

// Export county sitemap entries separately
export function getCountySitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smarterpayouts.com';
  const currentDate = new Date();

  const countyEntries: MetadataRoute.Sitemap = [];

  Object.entries(allStateCounties).forEach(([stateSlug, stateCounties]) => {
    Object.values(stateCounties).forEach(county => {
      countyEntries.push({
        url: `${baseUrl}/state-laws/${stateSlug}/${county.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  return countyEntries;
}
