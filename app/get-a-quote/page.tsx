/**
 * ⚠️ DEPRECATED - THIS FILE IS A TEMPORARY WRAPPER ONLY
 * 
 * Original Get A Quote page code has been REMOVED and migrated to:
 * → src/components/Pages/GetAQuote/
 * 
 * This file now serves ONLY as a Next.js routing wrapper.
 * All page logic, components, and functionality are in the new location.
 * 
 * ✅ Migration Status: COMPLETE
 * 📁 New Location: src/components/Pages/GetAQuote/GetAQuotePage.tsx
 * 
 * This wrapper file should remain for Next.js routing purposes.
 * Once you're confident the new structure works, you can keep this minimal wrapper.
 */

import dynamic from 'next/dynamic';
import GetAQuotePage from '@/src/components/Pages/GetAQuote';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Get Instant Structured Settlement Quote | No Personal Info Required | SmarterPayouts',
  description: 'Get your free structured settlement quote in 60 seconds. No personal information, no credit checks, no pressure. AI-powered calculator provides instant accurate offers.',
  keywords: 'structured settlement quote, instant quote, no personal info, free quote, settlement calculator, cash offer, no credit check',
  alternates: {
    canonical: 'https://smarterpayouts.com/get-a-quote',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Get Instant Structured Settlement Quote | No Personal Info Required',
    description: 'Get your free structured settlement quote in 60 seconds. No personal information, no credit checks, no pressure.',
    type: 'article',
    url: 'https://smarterpayouts.com/get-a-quote',
  }
};

export default function GetAQuoteRoute() {
  return (
    <>
      <GetAQuotePage />
      <LazyFABSpeedDial />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 🗑️ OLD CODE REMOVED - ALL ~500 LINES MIGRATED TO SRC DIRECTORY
// ════════════════════════════════════════════════════════════════════════════════
