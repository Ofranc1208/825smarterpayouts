import React from 'react';
import styles from './ChatbotMenu.module.css';

interface ChatbotMenuProps {
  onCalculate: () => void;
  onChoice: (choiceText: string) => void;
}

const ChatbotMenu: React.FC<ChatbotMenuProps> = ({ onCalculate, onChoice }) => {

  const handleChoiceClick = (choiceText: string) => {
    if (choiceText === 'New Quote') {
      onCalculate();
    } else {
      onChoice(choiceText);
    }
  };

  return (
    <div className={styles.menu}>
      <button
        className={styles.menuBtn}
        onClick={() => handleChoiceClick('New Quote')}
      >
        New Quote
      </button>
      <button
        className={styles.menuBtn}
        onClick={() => handleChoiceClick('Our Process')}
      >
        Our Process
      </button>
    </div>
  );
};

export default ChatbotMenu; 