/**
 * Review Offer Page - App Router Wrapper
 * 
 * This is a thin wrapper that imports the main ReviewOfferPage component from src.
 * Follows the Orchestra pattern established across the application.
 */

import ReviewOfferPage from '@/src/components/Pages/ReviewOffer/page';

export default function ReviewOffer() {
  return <ReviewOfferPage />;
}