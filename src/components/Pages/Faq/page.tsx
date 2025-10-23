/**
 * FAQ Page - Orchestrator
 *
 * Main FAQ page component that orchestrates all sections
 */

'use client';

import React from 'react';
import { faqData, categories } from './data';
import { useFaqFiltering } from './hooks/useFaqFiltering';
import {
  HeroSection,
  CategoryFilterSection,
  FaqAccordionSection,
  TrustSection,
  CtaSection
} from './components';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { faqSchema, organizationSchema } from '@/src/lib/structured-data/schemas';

export default function FAQs() {
  const {
    activeCategory,
    setActiveCategory,
    openFaqs,
    toggleFaq,
    filteredFaqs
  } = useFaqFiltering({ faqs: faqData });

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData schema={[organizationSchema, faqSchema]} />

      <HeroSection />

      <CategoryFilterSection
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        resultCount={filteredFaqs.length}
        totalCount={faqData.length}
      />

      <FaqAccordionSection
        faqs={filteredFaqs}
        openFaqs={openFaqs}
        onToggle={toggleFaq}
      />

      <TrustSection />

      <CtaSection />
    </>
  );
}

