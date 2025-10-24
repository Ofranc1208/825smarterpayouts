import React, { useState } from 'react';
import styles from './ChatbotMenu.module.css';

interface ChatbotMenuProps {
  onCalculate: () => void;
  onChoice: (choiceText: string) => void;
}

const ChatbotMenu: React.FC<ChatbotMenuProps> = ({ onCalculate, onChoice }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleChoiceClick = (choiceText: string) => {
    setIsClicked(true);
    if (choiceText === 'New Quote') {
      onCalculate();
    } else {
      onChoice(choiceText);
    }
  };

  return (
    <div className={styles.menu}>
      <button
        className={`${styles.menuBtn} ${isClicked ? styles.disabled : ''}`}
        onClick={() => handleChoiceClick('New Quote')}
        disabled={isClicked}
      >
        New Quote
      </button>
      <button
        className={`${styles.menuBtn} ${isClicked ? styles.disabled : ''}`}
        onClick={() => handleChoiceClick('Our Process')}
        disabled={isClicked}
      >
        Our Process
      </button>
      <button
        className={`${styles.menuBtn} ${isClicked ? styles.disabled : ''}`}
        onClick={() => handleChoiceClick('General Questions')}
        disabled={isClicked}
      >
        General Questions
      </button>
    </div>
  );
};

export default ChatbotMenu; 