/**
 * Payment Methods Data
 * 
 * Defines the 3 payment delivery options available to clients
 */

import { PaymentMethod } from '../types';

export const paymentMethods: PaymentMethod[] = [
  {
    name: 'Direct Deposit',
    description: 'Fill out a secure direct deposit form via DocuSign. This is the fastest and most secure option.',
    icon: '🏦',
    badge: {
      emoji: '⚡',
      text: 'FASTEST'
    },
    benefits: [
      'Same-day processing available',
      'Bank-level security',
      'No delivery delays'
    ],
    theme: 'green'
  },
  {
    name: 'Certified Check',
    description: 'Prefer a physical check? We can mail it directly to your home address for your convenience.',
    icon: '📧',
    badge: {
      emoji: '📮',
      text: 'SECURE'
    },
    benefits: [
      'Overnight mail option',
      'Certified & tracked',
      'Physical document'
    ],
    theme: 'amber'
  },
  {
    name: 'In-Person Delivery',
    description: 'Available in select areas for large amounts. Our funding partner can arrange personal delivery—just ask if you prefer this option.',
    icon: '🤝',
    badge: {
      emoji: '🤝',
      text: 'PERSONAL'
    },
    benefits: [
      'Face-to-face delivery',
      'Select markets only',
      'Large amounts'
    ],
    theme: 'blue'
  }
];

