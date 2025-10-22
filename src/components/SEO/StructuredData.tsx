/**
 * Structured Data Component
 * Reusable component for injecting JSON-LD schema markup
 * 
 * @component StructuredData
 * @example
 * ```tsx
 * import { StructuredData } from '@/components/SEO/StructuredData';
 * import { pricingCalculatorSchema } from '@/lib/structured-data/schemas';
 * 
 * export default function Page() {
 *   return (
 *     <>
 *       <StructuredData schema={pricingCalculatorSchema} />
 *       <main>...</main>
 *     </>
 *   );
 * }
 * ```
 */

import React from 'react';

interface StructuredDataProps {
  schema: object | object[];
}

export function StructuredData({ schema }: StructuredDataProps) {
  // Handle array of schemas
  if (Array.isArray(schema)) {
    return (
      <>
        {schema.map((s, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </>
    );
  }

  // Single schema
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default StructuredData;

