/**
 * About Page Route
 *
 * Thin wrapper that imports the actual About page implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 *
 * @route /about
 * @author SmarterPayouts Team
 * @since 2024
 */

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AboutPage } from '@/src/components/Pages';
import { generateMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateMetadata({
  title: 'About Smarter Payouts | AI-Powered Settlement Calculator',
  description: 'Learn about Smarter Payouts - the AI-powered structured settlement calculator that provides instant, accurate quotes without personal information or pressure.',
  path: '/about',
  ogType: 'website',
});

export default function About() {
  return (
    <>
      <AboutPage />
      <LazyFABSpeedDial />
    </>
  );
}