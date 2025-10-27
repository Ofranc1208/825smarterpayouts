/**
 * YouTube Channel Page Route - Enterprise Edition
 * 
 * Enterprise-grade YouTube Channel page route with comprehensive SEO metadata.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 * 
 * @route /youtube-channel
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

import dynamic from 'next/dynamic';
import { YouTubeChannelPage } from '@/src/components/Pages';
import { Metadata } from 'next';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

// Enterprise-grade SEO metadata for App Router
export const generateViewport = () => ({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#059669',
});

export const metadata: Metadata = {
  title: 'SmarterPayouts YouTube Channel - Educational Videos & Insights',
  description: 'Explore our comprehensive video library covering structured settlements, early payouts, and financial strategies. Learn from experts and make informed decisions about your settlement.',
  keywords: 'structured settlement videos, payout education, financial planning, settlement advice, YouTube channel, SmarterPayouts',
  authors: [{ name: 'SmarterPayouts Team' }],
  creator: 'SmarterPayouts',
  publisher: 'SmarterPayouts',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smarterpayouts.com/youtube-channel',
    title: 'SmarterPayouts YouTube Channel - Educational Videos & Insights',
    description: 'Explore our comprehensive video library covering structured settlements, early payouts, and financial strategies.',
    siteName: 'SmarterPayouts',
    images: [
      {
        url: 'https://smarterpayouts.com/assets/images/youtube-channel-og.jpg',
        width: 1200,
        height: 630,
        alt: 'SmarterPayouts YouTube Channel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmarterPayouts YouTube Channel - Educational Videos & Insights',
    description: 'Explore our comprehensive video library covering structured settlements, early payouts, and financial strategies.',
    creator: '@SmarterPayouts',
    images: ['https://smarterpayouts.com/assets/images/youtube-channel-og.jpg'],
  },

  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/youtube-channel',
  },
  category: 'Educational Content',
};

export default function YouTubeChannel() {
  return (
    <>
      <YouTubeChannelPage />
      <LazyFABSpeedDial />
    </>
  );
}