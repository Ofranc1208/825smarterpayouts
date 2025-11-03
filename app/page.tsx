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

import { HomePage } from '@/src/components/Pages';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { organizationSchema, websiteSchema } from '@/src/lib/structured-data/schemas';

export const metadata = {
  title: 'Structured Settlement Calculator | Smarter Payouts',
  description: 'Get instant, accurate structured settlement quotes with our AI-powered calculator. No calls, no personal data required.',
  keywords: 'structured settlement calculator, lump sum calculator, settlement payout, cash advance, financial planning',
  alternates: {
    canonical: 'https://smarterpayouts.com',
  },
  openGraph: {
    title: 'SmarterPayouts - Structured Settlement Calculator',
    description: 'Get instant, accurate structured settlement quotes with our AI-powered calculator. No calls, no personal data required.',
    url: 'https://smarterpayouts.com',
    siteName: 'SmarterPayouts',
    images: [
      {
        url: 'https://smarterpayouts.com/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmarterPayouts - AI-Powered Structured Settlement Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmarterPayouts - Structured Settlement Calculator',
    description: 'Get instant, accurate structured settlement quotes with our AI-powered calculator. No calls, no personal data required.',
    images: ['https://smarterpayouts.com/assets/images/og-image.png'],
    creator: '@smarterpayouts',
  },
  robots: 'index, follow',
  authors: [{ name: 'SmarterPayouts Team' }],
  creator: 'SmarterPayouts',
  publisher: 'SmarterPayouts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function Home() {
  return (
    <>
      {/* Server-side structured data for SEO - Organization with AggregateRating + Website schema */}
      <StructuredData schema={[organizationSchema, websiteSchema]} />
      <HomePage />
    </>
  );
}