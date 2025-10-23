import React, { useState } from 'react';
import styles from './SpecialistMenu.module.css';

interface SpecialistMenuProps {
  onChoice: (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => void;
}

const SpecialistMenu: React.FC<SpecialistMenuProps> = ({ onChoice }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleChoiceClick = (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => {
    setIsClicked(true);
    onChoice(choice);
  };

  return (
    <div className={styles.menu}>
      {/*
        TEMPORARILY HIDDEN - Live Chat Button
        TODO: Re-enable when live chat infrastructure is stable and tested
        To re-enable: Uncomment the button below and remove this comment block
        Related issue: Live chat system needs stability improvements before production use
        Last modified: 2025-01-23 by user request
      */}
      {/*
      <button
        className={`${styles.menuBtn} ${isClicked ? styles.disabled : ''}`}
        onClick={() => handleChoiceClick('live_chat')}
        disabled={isClicked}
      >
        💬 Live Chat
      </button>
      */}
      <button
        className={`${styles.menuBtn} ${isClicked ? styles.disabled : ''}`}
        onClick={() => handleChoiceClick('sms')}
        disabled={isClicked}
      >
        📱 Text Message
      </button>
      <button
        className={`${styles.menuBtn} ${isClicked ? styles.disabled : ''}`}
        onClick={() => handleChoiceClick('phone_call')}
        disabled={isClicked}
      >
        📞 Phone Consultation
      </button>
      <button
        className={`${styles.menuBtn} ${isClicked ? styles.disabled : ''}`}
        onClick={() => handleChoiceClick('appointment')}
        disabled={isClicked}
      >
        📅 Book an Appointment
      </button>
    </div>
  );
};

export default SpecialistMenu;

