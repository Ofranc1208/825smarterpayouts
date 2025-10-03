/**
 * FAQ Page Type Definitions
 * 
 * TypeScript interfaces for FAQ page data structures
 */

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface Category {
  name: string;
  icon: string;
}

export interface FaqFilterState {
  activeCategory: string;
  openFaqs: number[];
}

