// Structured data schema utilities
import type { FAQPageSchema, ServiceSchema } from '../../types/seoTypes';

// Create structured data for FAQ section
export const createFAQSchema = (faqs: Array<{question: string; answer: string}>): FAQPageSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Create structured data for service
export const createServiceSchema = (): ServiceSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Court Approval for Structured Settlements',
    description: 'Professional assistance with court approval process for structured settlement transfers',
    provider: {
      '@type': 'Organization',
      name: 'SmarterPayouts',
      url: 'https://smarterpayouts.com',
      logo: 'https://smarterpayouts.com/logo.png',
      description: 'Leading structured settlement company providing instant quotes and court approval assistance',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-800-PAYOUT',
        contactType: 'Customer Service',
        availableLanguage: 'English'
      },
      sameAs: [
        'https://facebook.com/smarterpayouts',
        'https://twitter.com/smarterpayouts',
        'https://linkedin.com/company/smarterpayouts'
      ]
    },
    serviceType: 'Financial Services',
    areaServed: 'United States',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Court Approval Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Petition Filing',
            description: 'Professional filing of court petitions for structured settlement transfers'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Legal Documentation',
            description: 'Preparation of all required legal documents for court approval'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Court Representation',
            description: 'Professional representation during court hearings'
          }
        }
      ]
    }
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (path: string) => {
  const pathSegments = path.split('/').filter(Boolean);
  const baseUrl = 'https://smarterpayouts.com';
  
  const breadcrumbs = [
    { name: 'Home', url: baseUrl }
  ];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`
    });
  });
  
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};
