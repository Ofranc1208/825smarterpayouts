import React from 'react';
import styles from './GuaranteedCalculationLink.module.css';

interface GuaranteedCalculationLinkProps {
  text: string;
  href: string;
  sessionId?: string;
  onClick?: () => void;
}

export const GuaranteedCalculationLink: React.FC<GuaranteedCalculationLinkProps> = ({
  text,
  href,
  sessionId,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    const url = sessionId 
      ? `${href}?sessionId=${sessionId}`
      : href;
    
    console.log('[GuaranteedCalculationLink] 🔍 Navigating with sessionId:', sessionId, 'URL:', url);
    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleClick}
        type="button"
      >
        {text}
      </button>
    </div>
  );
};

export default GuaranteedCalculationLink;
