'use client';

import React, { useState } from 'react';
import styles from './ContactOptions.module.css';
import SMSModal from '../SMSModal';
import AppointmentModal from '../AppointmentModal';

interface ContactOptionsProps {
  onContactClick?: () => void;
}

const ContactOptions: React.FC<ContactOptionsProps> = ({ onContactClick }) => {
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const handleSMSClick = () => {
    setShowSMSModal(true);
    onContactClick?.();
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+15615831280';
    onContactClick?.();
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@smarterpayouts.com';
    onContactClick?.();
  };

  const handleAppointmentClick = () => {
    setShowAppointmentModal(true);
    onContactClick?.();
  };

  return (
    <>
      <div className={styles.contactOptions}>
        <div className={styles.contactGrid}>
          <button
            className={`${styles.contactBtn} ${styles.smsBtn}`}
            onClick={handleSMSClick}
            aria-label="Send text message"
          >
            <span className={styles.btnEmoji}>📱</span>
            <span className={styles.btnText}>Text Us</span>
            <span className={styles.btnSubtext}>+1 (561) 583-1280</span>
          </button>

          <button
            className={`${styles.contactBtn} ${styles.phoneBtn}`}
            onClick={handlePhoneClick}
            aria-label="Call us"
          >
            <span className={styles.btnEmoji}>📞</span>
            <span className={styles.btnText}>Call Us</span>
            <span className={styles.btnSubtext}>+1 (561) 583-1280</span>
          </button>

          <button
            className={`${styles.contactBtn} ${styles.emailBtn}`}
            onClick={handleEmailClick}
            aria-label="Email us"
          >
            <span className={styles.btnEmoji}>✉️</span>
            <span className={styles.btnText}>Email Us</span>
            <span className={styles.btnSubtext}>info@smarterpayouts.com</span>
          </button>

          <button
            className={`${styles.contactBtn} ${styles.appointmentBtn}`}
            onClick={handleAppointmentClick}
            aria-label="Book appointment"
          >
            <span className={styles.btnEmoji}>📅</span>
            <span className={styles.btnText}>Book Appointment</span>
            <span className={styles.btnSubtext}>Free Consultation</span>
          </button>
        </div>
      </div>

      {/* SMS Modal */}
      <SMSModal
        isOpen={showSMSModal}
        onClose={() => setShowSMSModal(false)}
        phoneNumber="+15615831280"
      />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />

      {/* Inject CSS animations */}
      <style jsx>{`
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        @keyframes gentleGlow {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15);
          }
          50% {
            box-shadow: 0 4px 16px rgba(5, 150, 105, 0.3), 0 0 20px rgba(16, 185, 129, 0.2);
          }
        }

        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </>
  );
};

export default ContactOptions;
