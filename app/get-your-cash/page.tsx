/**
 * ⚠️ WRAPPER FILE - NEXT.JS ROUTING ONLY
 *
 * Page logic has been moved to:
 * → src/components/Pages/Get-your-cash/page.tsx
 *
 * This file serves ONLY as a Next.js routing wrapper with metadata.
 * All page logic, components, and functionality are in the new location.
 *
 * ✅ Migration Status: WRAPPER PATTERN IMPLEMENTED
 * 📁 Logic Location: src/components/Pages/Get-your-cash/page.tsx
 */

import dynamic from 'next/dynamic';
import GetYourCashPage from '@/src/components/Pages/Get-your-cash/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Get Funded Your Way | Choose Your Payment Method | SmarterPayouts',
  description: 'Choose how you receive your structured settlement funds. Direct deposit, certified check, or in-person delivery. Fast, secure, and always on your terms.',
  keywords: 'payment methods, direct deposit, structured settlement payout, fast cash, secure payment, certified check, funding options',
  alternates: {
    canonical: 'https://smarterpayouts.com/get-your-cash',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Get Funded Your Way | Choose Your Payment Method | SmarterPayouts',
    description: 'Choose how you receive your structured settlement funds. Fast, secure, and always on your terms.',
    url: 'https://smarterpayouts.com/get-your-cash',
    type: 'article',
  }
};

export default function GetFundedYourWayRoute() {
  return (
    <>
      <GetYourCashPage />
      <LazyFABSpeedDial />
    </>
  );
}
