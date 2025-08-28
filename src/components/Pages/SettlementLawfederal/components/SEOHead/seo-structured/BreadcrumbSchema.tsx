'use client';

import Head from 'next/head';
import { breadcrumbSchema } from '../../../data';

/**
 * Breadcrumb Schema Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Provides JSON-LD structured data for navigation breadcrumbs
 */
export default function BreadcrumbSchema() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2)
        }}
      />
    </Head>
  );
}
