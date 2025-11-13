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
import { generateMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

// ============================================================================
// METADATA CONFIGURATION
// ============================================================================

export const metadata: Metadata = generateMetadata({
  title: 'Contact Us - Get Your Free Structured Settlement Quote',
  description: 'Contact Smarter Payouts for a free consultation on your structured settlement. Get cash for your payments with transparent, fair, and fast service. Call (800) 762-7837.',
  path: '/contact',
  ogImage: 'https://smarterpayouts.com/images/contact-og.jpg',
  ogType: 'website',
});

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
