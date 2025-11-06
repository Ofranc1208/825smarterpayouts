/**
 * Contact Tabs Component
 * 
 * Shows Email option (Message feature hidden for future Twilio integration)
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface ContactTabsProps {
  activeTab: 'email' | 'sms';
  agreeToTerms: boolean;
  onTabChange: (tab: 'email' | 'sms') => void;
  onEmailTabClick: () => void;
  onMessageTabClick: () => void;
}

export const ContactTabs: React.FC<ContactTabsProps> = ({ 
  activeTab, 
  agreeToTerms,
  onTabChange,
  onEmailTabClick,
  onMessageTabClick,
}) => {
  const handleEmailClick = () => {
    onTabChange('email');
    onEmailTabClick();
  };

  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tab} ${styles.activeTab}`}
        onClick={handleEmailClick}
        type="button"
      >
        <span className={styles.tabIcon}>🔓</span>
        <span>Unlock My Offer</span>
      </button>
    </div>
  );
};

