import React, { useState } from 'react';
import styles from './Step1SelectType.module.css';

export type PaymentType = 'guaranteed' | 'life-contingent' | 'dont-know';

interface Step1SelectTypeProps {
  onSelectType: (type: PaymentType) => void;
}

const Step1SelectType: React.FC<Step1SelectTypeProps> = ({ onSelectType }) => {
  const [selectedChoice, setSelectedChoice] = useState<PaymentType | null>(null);

  const handleSelection = (type: PaymentType) => {
    setSelectedChoice(type);
    onSelectType(type);
  };

  const getButtonClassName = (type: PaymentType) => {
    if (selectedChoice === null) {
      return styles.selectTypeButton;
    }
    return selectedChoice === type 
      ? `${styles.selectTypeButton} ${styles.selected}` 
      : `${styles.selectTypeButton} ${styles.unselected}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.choiceButtonContainer}>
        <button
          className={getButtonClassName('guaranteed')}
          onClick={() => handleSelection('guaranteed')}
        >
          Guaranteed Payments
        </button>
        <button
          className={getButtonClassName('life-contingent')}
          onClick={() => handleSelection('life-contingent')}
        >
          Life Payments
        </button>
        <button
          className={getButtonClassName('dont-know')}
          onClick={() => handleSelection('dont-know')}
        >
          I don't know
        </button>
      </div>
    </div>
  );
};

export default Step1SelectType; 