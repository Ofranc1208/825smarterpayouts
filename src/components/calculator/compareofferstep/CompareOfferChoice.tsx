import React from 'react';
import styles from './CompareOfferChoice.module.css';

interface CompareOfferChoiceProps {
  isInteractive: boolean;
  onChoice: (choiceText: string) => void;
}

const CompareOfferChoice: React.FC<CompareOfferChoiceProps> = ({ 
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

export default CompareOfferChoice;



