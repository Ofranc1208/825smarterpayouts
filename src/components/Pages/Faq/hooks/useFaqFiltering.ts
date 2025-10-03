/**
 * FAQ Filtering Hook
 * 
 * Manages category filtering and accordion state for FAQ page
 */

import { useState } from 'react';
import { FAQ } from '../types';

interface UseFaqFilteringProps {
  faqs: FAQ[];
}

interface UseFaqFilteringReturn {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  openFaqs: number[];
  toggleFaq: (id: number) => void;
  filteredFaqs: FAQ[];
}

export function useFaqFiltering({ faqs }: UseFaqFilteringProps): UseFaqFilteringReturn {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaqs, setOpenFaqs] = useState<number[]>([1]); // First FAQ starts open

  // Filter FAQs based on active category
  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  // Toggle FAQ accordion item
  const toggleFaq = (id: number) => {
    setOpenFaqs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  return {
    activeCategory,
    setActiveCategory,
    openFaqs,
    toggleFaq,
    filteredFaqs,
  };
}

