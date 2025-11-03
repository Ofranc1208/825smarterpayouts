/**
 * Contact Tabs Component
 * 
 * Allows switching between Email and SMS/Text Message tabs
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface ContactTabsProps {
  activeTab: 'email' | 'sms';
  onTabChange: (tab: 'email' | 'sms') => void;
}

export const ContactTabs: React.FC<ContactTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tab} ${activeTab === 'email' ? styles.activeTab : ''}`}
        onClick={() => onTabChange('email')}
        type="button"
      >
        <span className={styles.tabIcon}>✉️</span>
        <span>Email</span>
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'sms' ? styles.activeTab : ''}`}
        onClick={() => onTabChange('sms')}
        type="button"
      >
        <span className={styles.tabIcon}>💬</span>
        <span>Send Message</span>
      </button>
    </div>
  );
};

