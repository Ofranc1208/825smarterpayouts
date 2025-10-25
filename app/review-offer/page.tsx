/**
 * Review Offer Page - App Router Wrapper
 *
 * This is a thin wrapper that imports the main ReviewOfferPage component from src.
 * Follows the Orchestra pattern established across the application.
 */

import { Metadata } from 'next';
import ReviewOfferPage from '@/src/components/Pages/ReviewOffer/page';

export const metadata: Metadata = {
  title: 'Review Your Structured Settlement Offer | SmarterPayouts',
  description: 'Review your personalized structured settlement offer with detailed breakdown, payment options, and transparent terms. Compare offers and choose the best option for you.',
  keywords: 'review offer, structured settlement offer, payment options, offer comparison, settlement terms, personalized quote',
  alternates: {
    canonical: 'https://smarterpayouts.com/review-offer',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Review Your Structured Settlement Offer',
    description: 'Review your personalized structured settlement offer with detailed breakdown and payment options.',
    url: 'https://smarterpayouts.com/review-offer',
    type: 'website',
  },
};

export default function ReviewOffer() {
  return <ReviewOfferPage />;
}