'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './FABSpeedDial.module.css';

export default function FABSpeedDial() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(false);
  const fabRef = useRef<HTMLDivElement | null>(null);

  // Pulse animation every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Tooltip on first load
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAB = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const closeFAB = () => {
    setIsOpen(false);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeFAB();
    
    // Navigate directly to active chat page with calculate type
    // Generates a unique session ID for tracking
    const sessionId = `fab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    window.location.href = `/mint-chat-active?type=calculate&source=fab-chat&sessionId=${sessionId}`;
  };

  const handleEarlyPayoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeFAB();
    
    // Navigate directly to Mint Chat page for payout calculation
    window.location.href = '/mint-intelligent-chat';
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        closeFAB();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={fabRef}
      className={styles.fabSpeedDial}
    >
      {/* Main Circular FAB - Modern 2025 Glassmorphism Design */}
      <button
        className={`${styles.fabMain} ${pulse ? styles.fabPulse : ''}`}
        aria-label="Open contact options"
        aria-expanded={isOpen}
        onClick={toggleFAB}
      >
        {/* Glassmorphism overlay */}
        <div className={styles.fabGlassOverlay} />
        {/* Plus icon that rotates to X */}
        <span className={`${styles.fabIcon} ${isOpen ? styles.open : ''}`}>
          +
        </span>
      </button>

      {/* FAB Items Container - Staggered Animation */}
      <div className={`${styles.fabItems} ${isOpen ? styles.open : ''}`}>
        {/* Early Payout Option - Glassmorphism Style */}
        <button
          className={`${styles.fabItem} ${styles.fabButton}`}
          aria-label="Get Your Early Payout Quote Now"
          data-testid="fab-early-payout-trigger"
          onClick={handleEarlyPayoutClick}
        >
          <span className={styles.fabItemIcon}>💰</span>
          <span className={styles.fabItemText}>Early Payout</span>
        </button>

        {/* Call Option - Glassmorphism Style */}
        <a
          href="tel:+18552143510"
          className={styles.fabItem}
          aria-label="Call Us Now"
        >
          <span className={styles.fabItemIcon}>📞</span>
          <span className={styles.fabItemText}>Call Now</span>
        </a>

        {/* Chat Option - Glassmorphism Style */}
        <button
          className={`${styles.fabItem} ${styles.fabButton}`}
          aria-label="Chat With Us Now"
          data-testid="fab-chat-trigger"
          onClick={handleChatClick}
        >
          <span className={styles.fabItemIcon}>💬</span>
          <span className={styles.fabItemText}>Chat Now</span>
        </button>

        {/* Email Option - Glassmorphism Style */}
        <a
          href="/contact"
          className={styles.fabItem}
          aria-label="Email Us Now"
        >
          <span className={styles.fabItemIcon}>✉</span>
          <span className={styles.fabItemText}>Email Now</span>
        </a>
      </div>
    </div>
  );
}
