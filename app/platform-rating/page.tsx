/**
 * Platform Rating Page Route
 *
 * Thin wrapper that imports the actual Platform Rating page implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 *
 * @route /platform-rating
 * @author SmarterPayouts Team
 * @since 2024
 */

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PlatformRatingPage from '@/src/components/Pages/GoogleRating';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'SmarterPayouts 4.9 Rating on Google | Transparency and Trust',
  description: 'Learn about SmarterPayouts\' 4.9★ Free · Finance rating on Google and what it means for users seeking structured settlement transparency.',
  keywords: 'SmarterPayouts rating, free finance calculator, structured settlement calculator, 4.9 star rating, transparency, user reviews',
  alternates: {
    canonical: 'https://smarterpayouts.com/platform-rating',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'SmarterPayouts 4.9 Rating on Google | Transparency and Trust',
    description: 'Learn about SmarterPayouts\' 4.9★ Free · Finance rating on Google and what it means for users seeking structured settlement transparency.',
    url: 'https://smarterpayouts.com/platform-rating',
    type: 'website',
  },
};

export default function PlatformRating() {
  return (
    <>
      <PlatformRatingPage />
      <LazyFABSpeedDial />
    </>
  );
}

