/**
 * Contact Page Route - App Router Integration
 * 
 * This is the Next.js App Router page for the contact route.
 * It serves as a thin wrapper around the modular ContactPage component
 * located in src/components/Pages/contact.
 * 
 * ## Architecture:
 * - **Thin Wrapper**: Minimal route-level component
 * - **Modular Integration**: Uses enterprise-grade ContactPage component
 * - **SEO Optimized**: Includes metadata and structured data
 * - **Performance**: Lazy loading and Suspense boundaries
 * 
 * @route /contact
 * @author SmarterPayouts Development Team
 * @since 2024
 * @version 1.0.0
 * @enterprise-grade true
 * @modular true
 */

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ContactPage from '../../src/components/Pages/contact';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

// ============================================================================
// METADATA CONFIGURATION
// ============================================================================

export const metadata: Metadata = {
  title: 'Contact Us - SmarterPayouts | Get Your Free Structured Settlement Quote',
  description: 'Contact SmarterPayouts for a free consultation on your structured settlement. Get cash for your payments with transparent, fair, and fast service. Call (800) 762-7837.',
  keywords: 'contact structured settlement, free consultation, sell structured settlement, cash for settlement payments, SmarterPayouts contact',
  openGraph: {
    title: 'Contact SmarterPayouts - Free Structured Settlement Consultation',
    description: 'Get a free consultation and competitive quote for your structured settlement. Expert guidance and transparent service.',
    type: 'website',
    url: 'https://smarterpayouts.com/contact',
    siteName: 'SmarterPayouts',
    images: [
      {
        url: 'https://smarterpayouts.com/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact SmarterPayouts for Structured Settlement Help'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SmarterPayouts - Free Consultation',
    description: 'Get expert help with your structured settlement. Free consultation and competitive quotes.',
    images: ['https://smarterpayouts.com/images/contact-twitter.jpg']
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/contact'
  }
};

// ============================================================================
// MAIN ROUTE COMPONENT
// ============================================================================

/**
 * Contact Route Component
 * 
 * Renders the complete contact page experience using the modular
 * ContactPage component from src/components/Pages/contact.
 */
export default function ContactRoute() {
  return (
    <>
      <ContactPage />
      <LazyFABSpeedDial />
    </>
  );
}
