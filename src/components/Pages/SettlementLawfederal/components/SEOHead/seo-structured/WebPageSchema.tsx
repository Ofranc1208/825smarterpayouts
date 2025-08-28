'use client';

import Head from 'next/head';
import { webPageSchema } from '../../../data';

/**
 * Web Page Schema Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Provides JSON-LD structured data for the web page
 */
export default function WebPageSchema() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema, null, 2)
        }}
      />
    </Head>
  );
}
