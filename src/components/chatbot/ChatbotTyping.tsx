import React from 'react';
import styles from './ChatbotTyping.module.css';

const ChatbotTyping: React.FC<{ className?: string }> = ({ className }) => (
  <div className={[styles.typing, className].filter(Boolean).join(' ')}>
    Mint is typing
    <span className={styles.dots}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </span>
  </div>
);

export default ChatbotTyping; 