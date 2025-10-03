/**
 * Schema Markup Component
 * Generates and renders JSON-LD schema markup for SEO
 * 
 * NO CSS FILES - Renders script tags only
 */

'use client';
import React from 'react';
import type { SchemaMarkupProps } from '../types';

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  articleSchema,
  faqSchema,
  breadcrumbSchema
}) => {
  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
};

export default SchemaMarkup;

