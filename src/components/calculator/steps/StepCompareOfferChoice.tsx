import React from 'react';
import styles from './StepCompareOfferChoice.module.css';

interface StepCompareOfferChoiceProps {
  isInteractive: boolean;
  onChoice: (choiceText: string) => void;
}

const StepCompareOfferChoice: React.FC<StepCompareOfferChoiceProps> = ({ 
  isInteractive, 
  onChoice 
}) => {


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.compareButton} ${!isInteractive ? styles.disabled : ''}`}
            onClick={() => onChoice('Upload Offer Document')}
            disabled={!isInteractive}
          >
            Upload Offer Document
          </button>
          
          <button
            className={`${styles.compareButton} ${!isInteractive ? styles.disabled : ''}`}
            onClick={() => onChoice('Help me compare my offer')}
            disabled={!isInteractive}
          >
            Help me compare my offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepCompareOfferChoice; 