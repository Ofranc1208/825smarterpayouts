"use client";

import React, { useState, useEffect } from 'react';
import styles from './OscarFrancisCard.module.css';

interface OscarFrancisCardProps {
  className?: string;
}

const OscarFrancisCard: React.FC<OscarFrancisCardProps> = ({ className }) => {
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Trigger heart animation after component mounts
    const timer = setTimeout(() => {
      setShowHearts(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.oscarCard} ${className || ''}`}>
      {/* Heart Animation Overlay */}
      {showHearts && (
        <div className={styles.heartContainer}>
          <div className={styles.heart}>💖</div>
          <div className={styles.heart}>💕</div>
          <div className={styles.heart}>💗</div>
          <div className={styles.heart}>💝</div>
          <div className={styles.heart}>💖</div>
        </div>
      )}

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>OF</span>
          </div>
          <div className={styles.titleSection}>
            <h3 className={styles.name}>Oscar Francis</h3>
            <p className={styles.role}>Creator & Founder</p>
          </div>
        </div>

        <div className={styles.description}>
          <p className={styles.mainText}>
            Oscar Francis is the creator and founder of SmarterPayouts. He's on a mission to bring fairness and transparency to structured settlement codes.
          </p>
          
          <div className={styles.missionPoints}>
            <div className={styles.missionPoint}>
              <span className={styles.icon}>🎯</span>
              <span>Passionate about helping people access their money when they need it most</span>
            </div>
            <div className={styles.missionPoint}>
              <span className={styles.icon}>⚖️</span>
              <span>Committed to revolutionizing the industry with ethical practices</span>
            </div>
            <div className={styles.missionPoint}>
              <span className={styles.icon}>💡</span>
              <span>Focus on customer-first approach and eliminating hidden fees</span>
            </div>
            <div className={styles.missionPoint}>
              <span className={styles.icon}>🚀</span>
              <span>Innovative technology solutions for better customer experience</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.quote}>
            "Bringing fairness and transparency to structured settlements, one customer at a time."
          </div>
        </div>
      </div>
    </div>
  );
};

export default OscarFrancisCard;
