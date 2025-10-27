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

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'About SmarterPayouts | AI-Powered Settlement Calculator',
  description: 'Learn about SmarterPayouts - the AI-powered structured settlement calculator that provides instant, accurate quotes without personal information or pressure.',
  keywords: 'about SmarterPayouts, AI calculator, structured settlement company, financial technology, settlement quotes',
  alternates: {
    canonical: 'https://smarterpayouts.com/about',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'About SmarterPayouts | AI-Powered Settlement Calculator',
    description: 'Learn about SmarterPayouts - the AI-powered structured settlement calculator that provides instant, accurate quotes.',
    url: 'https://smarterpayouts.com/about',
    type: 'website',
  },
};

export default function About() {
  return (
    <>
      <AboutPage />
      <LazyFABSpeedDial />
    </>
  );
}