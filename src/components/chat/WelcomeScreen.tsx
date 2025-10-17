import React from 'react';
import ChoiceButton from './ChoiceButton';
import { payoutIcon, specialistIcon, processIcon } from './icons';
import type { ChatChoice } from './types';
import GuaranteeModal from './modals/GuaranteeModal';
import PrivacyModal from './modals/PrivacyModal';
import GuaranteeBadge from './components/GuaranteeBadge';
import PrivacyBadge from './components/PrivacyBadge';
import styles from './WelcomeScreen.module.css';

interface WelcomeScreenProps {
  onStartChat: (choice: ChatChoice) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  const [showGuaranteeModal, setShowGuaranteeModal] = React.useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false);
  
  console.log('[WelcomeScreen DEPLOYMENT DEBUG] === COMPONENT RENDER ===');
  console.log('[WelcomeScreen] onStartChat function exists:', !!onStartChat);
  console.log('[WelcomeScreen] onStartChat type:', typeof onStartChat);
  
  // Enhanced wrapper for onStartChat with deployment debugging
  const handleStartChat = (choice: ChatChoice) => {
    console.log('[WelcomeScreen] === BUTTON CLICKED ===');
    console.log('[WelcomeScreen] Choice:', choice);
    console.log('[WelcomeScreen] Calling parent onStartChat...');
    
    try {
      if (onStartChat && typeof onStartChat === 'function') {
        onStartChat(choice);
        console.log('[WelcomeScreen] ✅ Parent onStartChat called successfully');
      } else {
        console.error('[WelcomeScreen] ❌ onStartChat is not a function!', onStartChat);
      }
    } catch (error) {
      console.error('[WelcomeScreen] ❌ ERROR calling onStartChat:', error);
      console.error('[WelcomeScreen] Error stack:', error instanceof Error ? error.stack : 'No stack');
    }
  };

  // Handle guarantee badge click
  const handleGuaranteeClick = () => {
    setShowGuaranteeModal(true);
  };

  // Close guarantee modal
  const closeGuaranteeModal = () => {
    setShowGuaranteeModal(false);
  };

  // Handle privacy badge click
  const handlePrivacyClick = () => {
    setShowPrivacyModal(true);
  };

  // Close privacy modal
  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  return (
    <div className={styles.welcomeContainer}>
      {/* Modern Welcome Card - Compact & Clean */}
      <div className={styles.welcomeCard}>
        {/* Decorative Elements */}
        <div className={styles.decorativeElement}></div>

        {/* Guaranteed Instant Payout Offer Heading - Clickable */}
        <GuaranteeBadge onClick={handleGuaranteeClick} />

        {/* Button Group - Enhanced with Live Animations */}
        <div className={styles.buttonGroup}>
          <ChoiceButton 
            icon={payoutIcon} 
            text="Calculate Your Payout Instantly" 
            description="Get your exact settlement value in seconds - no waiting, no personal info required"
            onClick={() => handleStartChat('calculate')}
            index={0}
          />
          
          {/* Talk to a Specialist with LIVE badge */}
          <div className={styles.liveBadgeContainer}>
            {/* Live status indicator on specialist button */}
            <div className={styles.liveBadge}>
              <div className={styles.liveDot}></div>
              LIVE
            </div>
            
            <ChoiceButton 
              icon={specialistIcon} 
              text="Connect with a Specialist" 
              description="Chat live or schedule a call with our settlement experts - completely free"
              onClick={() => handleStartChat('specialist')}
              index={1}
            />
          </div>
          
          <ChoiceButton 
            icon={processIcon} 
            text="Learn About Our Process" 
            description="Understand your options, timeline, and maximize your settlement value"
            onClick={() => handleStartChat('process')}
            index={2}
          />
        </div>

        {/* Trust Indicator - Clickable */}
        <PrivacyBadge onClick={handlePrivacyClick} />
      </div>

      {/* Modals */}
      <GuaranteeModal 
        isOpen={showGuaranteeModal} 
        onClose={closeGuaranteeModal} 
      />
      
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={closePrivacyModal} 
      />
    </div>
  );
};

export default WelcomeScreen; 