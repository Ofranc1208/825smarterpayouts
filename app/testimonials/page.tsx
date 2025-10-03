/**
 * ⚠️ DEPRECATED - THIS FILE IS A TEMPORARY WRAPPER ONLY
 * 
 * Original Testimonials page code has been REMOVED and migrated to:
 * → src/components/Pages/Testimonials/
 * 
 * This file now serves ONLY as a Next.js routing wrapper.
 * All page logic, components, and functionality are in the new location.
 * 
 * ✅ Migration Status: COMPLETE
 * 📁 New Location: src/components/Pages/Testimonials/page.tsx
 * 
 * This wrapper file should remain for Next.js routing purposes.
 * Once you're confident the new structure works, you can keep this minimal wrapper.
 */

import TestimonialsPage from '@/src/components/Pages/Testimonials/page';

export const metadata = {
  title: 'Client Testimonials | SmarterPayouts',
  description: 'Read real reviews from clients who trusted SmarterPayouts with their structured settlement payouts. Transparent, no-pressure experience.',
  keywords: 'structured settlement testimonials, client reviews, payout reviews, settlement company reviews',
  openGraph: {
    title: 'Client Testimonials – SmarterPayouts',
    description: 'Read real reviews from clients who trusted SmarterPayouts with their structured settlement payouts.',
    type: 'article',
    url: 'https://smarterpayouts.com/testimonials',
    images: [
      {
        url: 'https://smarterpayouts.com/assets/images/social-preview.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials – SmarterPayouts',
    description: 'Read real reviews from clients who trusted SmarterPayouts with their structured settlement payouts.',
    site: '@SmarterPayouts',
    images: ['https://smarterpayouts.com/assets/images/social-preview.jpg'],
  },
};

export default function TestimonialsRoute() {
  return <TestimonialsPage />;
}

// ════════════════════════════════════════════════════════════════════════════════
// 🗑️ OLD CODE REMOVED - ALL ~500 LINES MIGRATED TO SRC DIRECTORY
// ════════════════════════════════════════════════════════════════════════════════ 