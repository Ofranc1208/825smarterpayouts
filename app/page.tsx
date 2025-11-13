/**
 * Home Page Route
 *
 * Thin wrapper that imports the actual Home page implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 *
 * @route /
 * @author SmarterPayouts Team
 * @since 2024
 */

import { Metadata } from 'next';
import { HomePage } from '@/src/components/Pages';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { organizationSchema, websiteSchema } from '@/src/lib/structured-data/schemas';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Structured Settlement Early Payout Calculator | Smarter Payouts',
  description: 'Get instant, accurate structured settlement quotes with our AI-powered calculator. No calls, no personal data required. See the real value of your settlement.',
  path: '/',
  ogImage: 'https://smarterpayouts.com/assets/images/og-image.png',
  ogType: 'website',
});

export default function Home() {
  return (
    <>
      {/* Server-side structured data for SEO - Organization with AggregateRating + Website schema */}
      <StructuredData schema={[organizationSchema, websiteSchema]} />
      <HomePage />
    </>
  );
}