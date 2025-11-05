/**
 * Hub Content Data
 * Content for the main Structured Settlement Info Hub landing page
 */

import type { ContentCardProps, ResourceCardProps, RelatedArticleProps } from '../types';

export const featuredCards: ContentCardProps[] = [
  {
    emoji: '',
    title: 'What is a structured settlement?',
    description: 'Structured settlements are financial arrangements that provide periodic payments to individuals, typically as a result of a personal injury lawsuit or insurance claim. These payments offer long-term financial security and are often tax-free.',
    buttonText: 'Learn More About Structured Settlements',
    buttonLink: '/structured-settlement-info-hub/what-is-a-structured-settlement'
  },
  {
    emoji: '',
    title: 'Can I sell my structured settlement?',
    description: 'Yes, you can sell your structured settlement payments for a lump sum of cash. The process involves court approval and varies by state. Selling your settlement can provide immediate funds for major expenses or financial goals.',
    buttonText: 'Learn How to Sell Your Settlement',
    buttonLink: '/structured-settlement-info-hub/how-to-sell-structured-settlement'
  }
];

export const resourceCards: ResourceCardProps[] = [
  {
    emoji: '',
    title: 'State Laws & Requirements',
    description: 'Learn about structured settlement laws in your state.',
    link: '/structured-settlement-info-hub/state-laws',
    linkText: 'View State Laws'
  },
  {
    emoji: '',
    title: 'Court Approval Process',
    description: 'Understand the legal requirements for selling.',
    link: '/structured-settlement-info-hub/court-approval-process',
    linkText: 'Learn About Court Approval'
  },
  {
    emoji: '',
    title: 'Glossary of Terms',
    description: 'Definitions of key structured settlement terms.',
    link: '/structured-settlement-info-hub/glossary-of-structured-settlement-terms',
    linkText: 'View Glossary'
  },
  {
    emoji: '',
    title: 'FAQ',
    description: 'Answers to common questions about settlements.',
    link: '/structured-settlement-info-hub/faq',
    linkText: 'Read FAQ'
  }
];

export const sidebarRelatedArticles: RelatedArticleProps[] = [
  {
    title: 'Pros & Cons of Selling',
    link: '/structured-settlement-info-hub/pros-cons-selling-structured-settlement'
  },
  {
    title: 'How to Maximize Your Offer',
    link: '/structured-settlement-info-hub/maximize-offer-selling-structured-settlement'
  },
  {
    title: 'Common Mistakes to Avoid',
    link: '/structured-settlement-info-hub/common-mistakes-selling-structured-settlement'
  }
];

