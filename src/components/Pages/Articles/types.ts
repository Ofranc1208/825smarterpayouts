/**
 * TypeScript interfaces for Articles page
 * Defines data structures for articles, FAQs, and related content
 */

/**
 * Article data structure
 */
export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  featured: boolean;
}

/**
 * FAQ data structure
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

