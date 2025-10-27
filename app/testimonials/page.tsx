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

import dynamic from 'next/dynamic';
import TestimonialsPage from '@/src/components/Pages/Testimonials/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Authentic Client Testimonials | SmarterPayouts',
  description: 'Read authentic testimonials shared directly with us by clients who experienced our transparent structured settlement process. Real experiences, honest feedback.',
  keywords: 'structured settlement testimonials, authentic client reviews, settlement company experiences, client feedback',
  openGraph: {
    title: 'Authentic Client Testimonials – SmarterPayouts',
    description: 'Read testimonials shared directly with us by clients who experienced our transparent settlement process.',
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
    title: 'Authentic Client Testimonials – SmarterPayouts',
    description: 'Read testimonials shared directly with us by clients who experienced our transparent settlement process.',
    site: '@SmarterPayouts',
    images: ['https://smarterpayouts.com/assets/images/social-preview.jpg'],
  },
};

export default function TestimonialsRoute() {
  return (
    <>
      <TestimonialsPage />
      <LazyFABSpeedDial />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 🗑️ OLD CODE REMOVED - ALL ~500 LINES MIGRATED TO SRC DIRECTORY
// ════════════════════════════════════════════════════════════════════════════════ 