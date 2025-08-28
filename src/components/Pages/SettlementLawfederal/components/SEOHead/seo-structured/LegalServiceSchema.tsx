'use client';

import Head from 'next/head';
import { legalServiceSchema } from '../../../data';

/**
 * Legal Service Schema Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Provides JSON-LD structured data for legal services
 */
export default function LegalServiceSchema() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalServiceSchema, null, 2)
        }}
      />
    </Head>
  );
}
