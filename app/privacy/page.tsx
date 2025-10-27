/**
 * Privacy Page - App Router Wrapper
 *
 * This is a thin wrapper that imports the main PrivacyPage component from src.
 * Follows the Orchestra pattern established across the application.
 */

import dynamic from 'next/dynamic';
import PrivacyPage from '@/src/components/Pages/Privacy/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Privacy Policy | SmarterPayouts',
  description: 'Learn how SmarterPayouts protects your privacy and handles your information. Transparent, secure, and user-focused policies.',
  keywords: 'privacy policy, data protection, information security, user privacy, GDPR compliance, data handling',
  alternates: {
    canonical: 'https://smarterpayouts.com/privacy',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Privacy Policy | SmarterPayouts',
    description: 'Learn how SmarterPayouts protects your privacy and handles your information. Transparent, secure, and user-focused policies.',
    type: 'article',
    url: 'https://smarterpayouts.com/privacy',
  }
};

export default function Privacy() {
  return (
    <>
      <PrivacyPage />
      <LazyFABSpeedDial />
    </>
  );
}