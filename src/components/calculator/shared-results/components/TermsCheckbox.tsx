/**
 * Terms Checkbox Component
 * 
 * Displays terms and conditions checkbox with tooltip
 */

import React, { useState } from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface TermsCheckboxProps {
  agreeToTerms: boolean;
  activeTab: 'email' | 'sms';
  onAgreeChange: (checked: boolean) => void;
  highlightRed?: boolean;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  agreeToTerms,
  activeTab,
  onAgreeChange,
  highlightRed = false,
}) => {
  const [showTermsTooltip, setShowTermsTooltip] = useState(false);

  return (
    <div className={styles.termsContainer}>
      <label className={`${styles.termsLabel} ${highlightRed ? styles.termsLabelRed : ''}`}>
        <input
          type="checkbox"
          checked={agreeToTerms}
          onChange={(e) => onAgreeChange(e.target.checked)}
          className={styles.checkbox}
          required
        />
        <span className={styles.termsText}>
          I agree to the terms and conditions
          <button
            type="button"
            className={styles.termsTooltipButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTermsTooltip(!showTermsTooltip);
            }}
            onMouseEnter={() => setShowTermsTooltip(true)}
            onMouseLeave={() => setShowTermsTooltip(false)}
            aria-label="View terms and conditions"
          >
            ℹ️
          </button>
        </span>
      </label>
      
      {/* Terms Tooltip */}
      {showTermsTooltip && (
        <div 
          className={styles.termsTooltip}
          onMouseEnter={() => setShowTermsTooltip(true)}
          onMouseLeave={() => setShowTermsTooltip(false)}
        >
          <p className={styles.tooltipText}>
            <strong>By providing this information, you authorize us to:</strong>
            <br /><br />
            • Contact you via {activeTab === 'email' ? 'email' : 'phone/text message'} regarding your structured settlement offer
            <br />
            • Send you your offer details and related information
            <br />
            • Follow up with you about your settlement options
            <br /><br />
            We respect your privacy and will not share your information with third parties.
          </p>
        </div>
      )}
    </div>
  );
};

