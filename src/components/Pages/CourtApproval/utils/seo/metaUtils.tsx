// Meta data generation utilities
import type { SEOMetaData, OpenGraphData, TwitterCardData } from '../../types/seoTypes';

// Generate meta description from content
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const cleanContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

// Generate keywords from content
export const generateKeywords = (content: string, maxKeywords: number = 10): string[] => {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
  ]);
  
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));
  
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string, baseUrl: string = 'https://smarterpayouts.com'): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBaseUrl}${cleanPath}`;
};

// Validate SEO data
export const validateSEOData = (seoData: Partial<SEOMetaData>): string[] => {
  const errors: string[] = [];
  
  if (!seoData.title) {
    errors.push('Title is required');
  } else if (seoData.title.length > 60) {
    errors.push('Title should be 60 characters or less');
  }
  
  if (!seoData.description) {
    errors.push('Description is required');
  } else if (seoData.description.length > 160) {
    errors.push('Description should be 160 characters or less');
  }
  
  if (seoData.keywords && seoData.keywords.length > 10) {
    errors.push('Should have 10 keywords or less');
  }
  
  return errors;
};
