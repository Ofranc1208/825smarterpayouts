'use client';

import Head from 'next/head';

/**
 * Organization Schema Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Provides JSON-LD structured data for SmarterPayouts organization
 */
export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SmarterPayouts',
    url: 'https://smarterpayouts.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://smarterpayouts.com/images/logo.png',
      width: 300,
      height: 100
    },
    description: 'Leading provider of structured settlement services and legal information',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'United States'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-855-582-3506',
      contactType: 'Customer Service',
      availableLanguage: 'English',
      areaServed: 'US'
    },
    sameAs: [
      'https://www.facebook.com/smarterpayouts',
      'https://www.twitter.com/smarterpayouts',
      'https://www.linkedin.com/company/smarterpayouts'
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'United States'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Structured Settlement Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Structured Settlement Evaluation',
            description: 'Professional evaluation of structured settlement options'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Legal Information Services',
            description: 'Comprehensive legal information about structured settlements'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Court Approval Assistance',
            description: 'Guidance through the court approval process'
          }
        }
      ]
    },
    knowsAbout: [
      'Structured Settlements',
      'Federal Law',
      'IRC Section 104',
      'IRC Section 130',
      'Court Approval Process',
      'Tax Implications',
      'Legal Compliance'
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema, null, 2)
        }}
      />
    </Head>
  );
}
