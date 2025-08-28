'use client';

import Head from 'next/head';
import { legalArticleSchema } from '../../../data';

/**
 * Legal Article Schema Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Provides JSON-LD structured data for legal content
 */
export default function LegalArticleSchema() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalArticleSchema, null, 2)
        }}
      />
    </Head>
  );
}
