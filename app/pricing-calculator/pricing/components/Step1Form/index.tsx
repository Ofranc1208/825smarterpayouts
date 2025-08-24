'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { calculateMinMaxNPV, calcNPVWithAdjustment } from '@/utils/npvCalculations';
import { RATE_SPREADS, AMOUNT_ADJUSTMENTS, BASE_DISCOUNT_RATE_LCP } from '@/utils/npvConfig';
import { isValidDate } from '@/utils/validationHelpers';
import { tooltipDefinitions } from '@/utils/tooltipDefinitions';
import PaymentTypeSelector from './PaymentTypeSelector';
import PaymentModeSelector from './PaymentModeSelector';
import AmountInput from './AmountInput';
import AdditionalDetails from './AdditionalDetails';
// SubmitButton inlined below
import TooltipModal from './TooltipModal';
import { HealthQuestionnaire, HealthProfileMapper, type HealthProfile } from '../LCP';

interface Props {
  formData: any;
  setFormData: (value: any) => void;
  onNext: () => void;
  setCalculationResult: (value: any) => void;
}

export default function Step1Form({
  formData,
  setFormData,
  onNext,
  setCalculationResult
}: Props) {
  const [errors, setErrors] = useState<any>({});
  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAdditionalDetailsCollapsed, setIsAdditionalDetailsCollapsed] = useState(true);
  const [showLCPQuestionnaire, setShowLCPQuestionnaire] = useState(false);
  const [lcpProfile, setLcpProfile] = useState<HealthProfile | null>(null);
  const router = useRouter();
  const additionalDetailsRef = useRef<HTMLDivElement>(null);
  const [additionalDetailsError, setAdditionalDetailsError] = useState('');
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [bannerTimeout, setBannerTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    amount,
    startDate,
    endDate,
    paymentMode,
    increaseRate = 0,
    paymentType,
    discountRate
  } = formData;

  const updateField = (key: string, value: any) => {
    console.log('🔍 DEBUG: updateField called with:', { key, value });
    setFormData((prev: any) => {
      const newData = { ...prev, [key]: value };
      console.log('🔍 DEBUG: Form data updated to:', newData);
      return newData;
    });
  };

  const handleLCPProfileComplete = (profile: HealthProfile) => {
    console.log('🔍 DEBUG: LCP profile completed:', profile);
    setLcpProfile(profile);
    setShowLCPQuestionnaire(false);
    
    // Automatically calculate LCP with the completed profile
    setTimeout(() => {
      calculateLCPWithProfile();
    }, 100);
  };

  const handleLCPQuestionnaireBack = () => {
    setShowLCPQuestionnaire(false);
  };

  const calculateLCPWithProfile = () => {
    if (!lcpProfile) {
      console.log('🔍 DEBUG: No LCP profile available for calculation');
      return;
    }

    console.log('🔍 DEBUG: Calculating LCP NPV with completed profile...');
    
    // Map the form values to calculation keys
    const lcpKeys = HealthProfileMapper.mapFormValuesToCalculationKeys(lcpProfile);
    console.log('🔍 DEBUG: Mapped LCP keys:', lcpKeys);
    
    // Calculate LCP NPV with profile adjustments
    const lcpResult = calcNPVWithAdjustment({
      amount: parseFloat(amount),
      startDate,
      endDate,
      baseRate: BASE_DISCOUNT_RATE_LCP,
      lcpKeys,
      paymentMode,
      increaseRate: parseFloat(increaseRate) || 0
    });
    
    console.log('🔍 DEBUG: LCP NPV result:', lcpResult);
    
    // Transform the result for Life Contingent
    const result = {
      ...lcpResult,
      lumpSum: lcpResult.npv,
      type: 'Life Contingent',
      amount: parseFloat(amount),
      paymentMode,
      startDate,
      endDate,
      increaseRate: parseFloat(increaseRate) || 0,
      lcpProfile: lcpProfile,
      lcpKeys: lcpKeys,
      pricingMethod: 'Life Contingent with Profile Adjustments',
      requiresContact: false,
      message: 'Your Life Contingent offer is calculated based on your health profile. For personalized pricing, our team can review your specific health factors.'
    };
    
    console.log('🔍 DEBUG: Transformed LCP result:', result);
    setCalculationResult(result);
    onNext();
  };

  const handleValidate = () => {
    console.log('🔍 DEBUG: handleValidate called with:', { amount, startDate, endDate });
    const newErrors: any = {};
    const amt = parseFloat(amount);

    if (isNaN(amt)) {
      newErrors.amount = 'Please enter a valid number for the amount.';
    } else if (amt < 100 || amt > 1000000) {
      newErrors.amount = 'Enter a value between $100 and $1,000,000.';
    }
    if (!validateStartDate(startDate)) {
      newErrors.startDate = 'Start date cannot be in the past (min May 14, 2024)';
    }
    if (!validateEndDateRange(startDate, endDate)) {
      newErrors.endDate = 'End date must be at least 6 months after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    console.log('🔍 DEBUG: handleContinue called');
    setAdditionalDetailsError('');
    setTouched({});
    
    const isValid = handleValidate();
    console.log('🔍 DEBUG: Validation result:', isValid);
    
    if (!isValid) {
      if (isAdditionalDetailsCollapsed) {
        setIsAdditionalDetailsCollapsed(false);
        setTimeout(() => {
          additionalDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
      const missingFields = [];
      if (!startDate) missingFields.push('startDate');
      if (!endDate) missingFields.push('endDate');
      if (missingFields.length > 0) {
        setAdditionalDetailsError('Please complete the missing fields to continue.');
        if (bannerTimeout) clearTimeout(bannerTimeout);
        setBannerTimeout(setTimeout(() => setAdditionalDetailsError(''), 3000));
      }
      return;
    }
    // Handle different payment types
    console.log('🔍 DEBUG: Payment type selected:', paymentType);
    console.log('🔍 DEBUG: Form data:', { amount, startDate, endDate, discountRate, paymentMode, increaseRate });
    
    if (paymentType === 'Guaranteed') {
      console.log('🔍 DEBUG: Calculating guaranteed NPV with professional pricing...');
      console.log('🔍 DEBUG: NPV Config values:', { 
        RATE_SPREADS, 
        AMOUNT_ADJUSTMENTS,
        baseDiscountRate: parseFloat(discountRate) / 100
      });
      
      // Use the professional NPV calculation system with min/max offers
      const npvResult = calculateMinMaxNPV({
        amount: parseFloat(amount),
        startDate,
        endDate,
        baseRate: parseFloat(discountRate) / 100, // Convert percentage to decimal
        paymentMode,
        increaseRate: parseFloat(increaseRate) || 0,
        minRateSpread: RATE_SPREADS.min,
        maxRateSpread: RATE_SPREADS.max,
        minAdjustment: AMOUNT_ADJUSTMENTS.min,
        maxAdjustment: AMOUNT_ADJUSTMENTS.max,
        isLCP: false, // This is guaranteed, not life contingent
        lcpKeys: [] // No life contingent profile keys for guaranteed
      });
      
      console.log('🔍 DEBUG: Professional NPV result:', npvResult);
      
      // Transform the result to include both min/max offers and the base calculation
      const result = {
        ...npvResult,
        lumpSum: npvResult.maxOffer, // Show the max offer as the primary lump sum
        type: 'Guaranteed',
        amount: parseFloat(amount),
        paymentMode,
        startDate,
        endDate,
        increaseRate: parseFloat(increaseRate) || 0,
        discountRate: parseFloat(discountRate),
        // Include the professional pricing breakdown
        minOffer: npvResult.minOffer,
        maxOffer: npvResult.maxOffer,
        pricingMethod: 'Professional Min/Max Range'
      };
      
      console.log('🔍 DEBUG: Transformed professional result:', result);
      setCalculationResult(result);
    } else if (paymentType === 'Life Contingent') {
      console.log('🔍 DEBUG: Life Contingent selected - showing health questionnaire...');
      
      // Show the LCP health questionnaire instead of calculating immediately
      setShowLCPQuestionnaire(true);
      return; // Don't proceed to calculation yet
    } else if (paymentType === "I Don't Know") {
      // For unknown payment type, show guidance
      const result = {
        type: 'Unknown',
        message: 'Let us help you determine the best option. Our team will review your case and provide guidance.',
        amount: parseFloat(amount),
        paymentMode,
        startDate,
        endDate,
        increaseRate: parseFloat(increaseRate) || 0,
        requiresContact: true
      };
      setCalculationResult(result);
    }
    onNext();
  };

  const showInfo = (html: string) => {
    setTooltipContent(html);
    setShowTooltip(true);
  };

  const hideInfo = () => {
    setTooltipContent('');
    setShowTooltip(false);
  };

  useEffect(() => {
    const handler = () => setShowTooltip(false);
    if (showTooltip) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [showTooltip]);

  const validateStartDate = (startDate: string) => {
    console.log('🔍 DEBUG: validateStartDate called with:', startDate);
    const minDate = new Date('2024-05-14');
    const sDate = new Date(startDate);
    const result = isValidDate(sDate) && sDate >= minDate;
    console.log('🔍 DEBUG: validateStartDate result:', result);
    return result;
  };

  const validateEndDateRange = (startDate: string, endDate: string) => {
    console.log('🔍 DEBUG: validateEndDateRange called with:', { startDate, endDate });
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    if (!isValidDate(sDate) || !isValidDate(eDate)) {
      console.log('🔍 DEBUG: validateEndDateRange - invalid dates');
      return false;
    }
    const result = eDate > sDate && (eDate.getFullYear() - sDate.getFullYear()) * 12 + (eDate.getMonth() - sDate.getMonth()) >= 6;
    console.log('🔍 DEBUG: validateEndDateRange result:', result);
    return result;
  };

  const showFieldError = (field: string) => {
    return touched[field] && errors[field];
  };

  useEffect(() => {
    const amt = parseFloat(amount);
    const validAmount = !isNaN(amt) && amt >= 100 && amt <= 1000000;
    const validStart = validateStartDate(startDate);
    const validEnd = validateEndDateRange(startDate, endDate);
    if (validAmount && validStart && validEnd && additionalDetailsError) {
      setAdditionalDetailsError('');
      if (bannerTimeout) clearTimeout(bannerTimeout);
    }
  }, [amount, startDate, endDate]);

  // Show LCP questionnaire if payment type is Life Contingent
  if (showLCPQuestionnaire) {
    return (
      <HealthQuestionnaire
        initialData={lcpProfile || undefined}
        paymentData={{
          amount,
          startDate,
          endDate,
          paymentMode,
          increaseRate: parseFloat(increaseRate) || 0
        }}
        onComplete={handleLCPProfileComplete}
        onBack={handleLCPQuestionnaireBack}
      />
    );
  }

  return (
    <div style={{ padding: '0' }}>
      <PaymentTypeSelector
        paymentType={paymentType}
        updateField={updateField}
        showInfo={showInfo}
        tooltipDefinitions={tooltipDefinitions}
      />

      <PaymentModeSelector
        paymentMode={paymentMode}
        updateField={updateField}
        showInfo={showInfo}
        tooltipDefinitions={tooltipDefinitions}
        router={router}
      />

      <AmountInput
        amount={amount}
        updateField={updateField}
        errors={errors}
        showInfo={showInfo}
        tooltipDefinitions={tooltipDefinitions}
      />

             <AdditionalDetails
         ref={additionalDetailsRef}
         isCollapsed={isAdditionalDetailsCollapsed}
         setIsCollapsed={setIsAdditionalDetailsCollapsed}
         additionalDetailsError={additionalDetailsError}
         increaseRate={increaseRate}
         startDate={startDate}
         endDate={endDate}
         updateField={updateField}
         setTouched={setTouched}
         touched={touched}
         showFieldError={showFieldError}
         showInfo={showInfo}
         tooltipDefinitions={tooltipDefinitions}
       />

      {/* Submit Button - Inlined from SubmitButton.tsx */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        <button 
          style={{
            background: '#fbbf24',
            color: '#1f2937',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onClick={handleContinue}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(251, 191, 36, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.3)';
          }}
        >
          {paymentType === 'Guaranteed' ? 'Calculate' : 'Continue'}
        </button>
      </div>

      <TooltipModal
        showTooltip={showTooltip}
        tooltipContent={tooltipContent}
        hideInfo={hideInfo}
      />
    </div>
  );
}
