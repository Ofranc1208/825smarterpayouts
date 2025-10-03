/**
 * Terms Page - App Router Wrapper
 *
 * This is a thin wrapper that imports the main TermsPage component from src.
 * Follows the Orchestra pattern established across the application.
 */

import TermsPage from '@/src/components/Pages/Terms/page';

export const metadata = {
  title: 'Terms and Conditions | SmarterPayouts',
  description: 'Read the terms and conditions for using SmarterPayouts. Clear, fair, and user-focused policies for your peace of mind.',
  keywords: 'terms conditions, user agreement, platform terms, structured settlement terms, legal policies',
  openGraph: {
    title: 'Terms and Conditions | SmarterPayouts',
    description: 'Read the terms and conditions for using SmarterPayouts. Clear, fair, and user-focused policies for your peace of mind.',
    type: 'article',
    url: 'https://smarterpayouts.com/terms',
  }
};

export default function Terms() {
  return <TermsPage />;
}
