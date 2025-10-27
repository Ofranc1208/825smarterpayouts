/**
 * Resources Page - App Router Wrapper
 *
 * This is a thin wrapper that imports the main ResourcesPage component from src.
 * Follows the Orchestra pattern established across the application.
 */

import dynamic from 'next/dynamic';
import ResourcesPage from '@/src/components/Pages/Resources/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Insurance Company Directory | Smarter Payouts',
  description: 'Complete directory of insurance companies that provide structured settlement annuities. Find contact information, verify payments, and access document requirements.',
  keywords: 'structured settlement insurance companies, annuity providers, insurance directory, payment verification, settlement companies',
  openGraph: {
    title: 'Insurance Company Directory | Smarter Payouts',
    description: 'Complete directory of insurance companies that provide structured settlement annuities. Find contact information, verify payments, and access document requirements.',
    type: 'website',
    url: 'https://smarterpayouts.com/resources',
  }
};

export default function Resources() {
  return (
    <>
      <ResourcesPage />
      <LazyFABSpeedDial />
    </>
  );
}
