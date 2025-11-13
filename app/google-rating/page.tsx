/**
 * Google Rating Page Route
 *
 * Thin wrapper that imports the actual Google Rating page implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 *
 * @route /google-rating
 * @author SmarterPayouts Team
 * @since 2024
 */

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import GoogleRatingPage from '@/src/components/Pages/GoogleRating';
import { generateMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateMetadata({
  title: 'Google 4.9 Rating | Transparency and Trust',
  description: 'Learn how Smarter Payouts earned Google\'s 4.9★ Free · Finance recognition and what it means for users seeking structured settlement transparency.',
  path: '/google-rating',
  ogType: 'website',
});

export default function GoogleRating() {
  return (
    <>
      <GoogleRatingPage />
      <LazyFABSpeedDial />
    </>
  );
}

