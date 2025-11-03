/**
 * Offer Capture Hook
 * 
 * Handles API submission logic for saving offer captures
 */

import { useState, useCallback } from 'react';

interface UseOfferCaptureParams {
  quoteData?: {
    minOffer: number;
    maxOffer: number;
    familyProtectionValue?: number; // Only for LCP
  };
  calculatorType: 'guaranteed' | 'lcp';
  offerCode: string;
  deliveryMethod: 'email' | 'sms';
  contactInfo: {
    email?: string;
    message?: string;
  };
}

export function useOfferCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitOfferCapture = useCallback(async (params: UseOfferCaptureParams) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate quote data is available
      if (!params.quoteData || !params.quoteData.minOffer || !params.quoteData.maxOffer) {
        throw new Error('Quote data is missing. Please refresh the page and try again.');
      }

      // Prepare data for API
      const captureData = {
        email: params.deliveryMethod === 'email' ? params.contactInfo.email?.trim() : undefined,
        message: params.deliveryMethod === 'sms' ? params.contactInfo.message?.trim() : undefined,
        deliveryMethod: params.deliveryMethod,
        offerCode: params.offerCode,
        calculatorType: params.calculatorType,
        minOffer: params.quoteData.minOffer,
        maxOffer: params.quoteData.maxOffer,
        familyProtectionValue: params.quoteData.familyProtectionValue, // Pass through if available
      };

      // Call API to save offer capture
      console.log('📤 [useOfferCapture] Sending request to /api/offer-captures');
      console.log('📤 [useOfferCapture] Request data:', captureData);
      console.log('📤 [useOfferCapture] Request URL:', window.location.origin + '/api/offer-captures');
      
      let response;
      try {
        response = await fetch('/api/offer-captures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(captureData),
        });
        console.log('📥 [useOfferCapture] Fetch completed');
      } catch (fetchError) {
        console.error('❌ [useOfferCapture] Fetch error:', fetchError);
        throw new Error(`Network error: ${fetchError instanceof Error ? fetchError.message : 'Failed to connect to server'}`);
      }

      console.log('📥 [useOfferCapture] Response status:', response.status);
      console.log('📥 [useOfferCapture] Response ok:', response.ok);
      console.log('📥 [useOfferCapture] Response headers:', Object.fromEntries(response.headers.entries()));

      let result;
      try {
        const responseText = await response.text();
        console.log('📥 [useOfferCapture] Response text (raw):', responseText);
        result = JSON.parse(responseText);
        console.log('📥 [useOfferCapture] Response data (parsed):', result);
      } catch (parseError) {
        console.error('❌ [useOfferCapture] JSON parse error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok || !result.success) {
        console.error('❌ [useOfferCapture] API returned error:', result);
        throw new Error(result.error || 'Failed to save offer capture. Please try again.');
      }

      console.log('✅ [useOfferCapture] Successfully saved offer capture!');
      setIsSubmitting(false);
      return { success: true, data: result };
    } catch (err) {
      console.error('Error saving offer capture:', err);
      setIsSubmitting(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save offer. Please try again.';
      setSubmitError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    isSubmitting,
    submitError,
    submitOfferCapture,
    clearError: () => setSubmitError(null),
  };
}

