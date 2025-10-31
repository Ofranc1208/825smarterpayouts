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

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'SmarterPayouts Google 4.9 Rating | Transparency and Trust',
  description: 'Learn how SmarterPayouts earned Google\'s 4.9★ Free · Finance recognition and what it means for users seeking structured settlement transparency.',
  keywords: 'Google rating, SmarterPayouts rating, free finance calculator, structured settlement calculator, Google badge, 4.9 star rating, transparency',
  alternates: {
    canonical: 'https://smarterpayouts.com/google-rating',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'SmarterPayouts Google 4.9 Rating | Transparency and Trust',
    description: 'Learn how SmarterPayouts earned Google\'s 4.9★ Free · Finance recognition and what it means for users seeking structured settlement transparency.',
    url: 'https://smarterpayouts.com/google-rating',
    type: 'website',
  },
};

export default function GoogleRating() {
  return (
    <>
      <GoogleRatingPage />
      <LazyFABSpeedDial />
    </>
  );
}

