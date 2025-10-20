/**
 * Live Chat Queue Component
 * 
 * Premium waiting experience with queue position, estimated wait time,
 * and smooth animations for professional user experience.
 * 
 * @author SmarterPayouts Team
 * @since Phase 2 - Live Chat Queue Experience
 */

'use client';

import React, { useState, useEffect } from 'react';
import styles from './LiveChatQueue.module.css';

interface LiveChatQueueProps {
  onAssigned: (specialistName: string) => void;
  initialQueuePosition?: number;
  initialWaitTime?: number; // in seconds
}

export const LiveChatQueue: React.FC<LiveChatQueueProps> = ({
  onAssigned,
  initialQueuePosition = 4,
  initialWaitTime = 210, // 3.5 minutes default
}) => {
  console.log('[LiveChatQueue] 🚀 Component mounted with props:', { 
    onAssigned: typeof onAssigned, 
    initialQueuePosition, 
    initialWaitTime 
  });
  
  const [queuePosition, setQueuePosition] = useState(initialQueuePosition);
  const [waitTime, setWaitTime] = useState(initialWaitTime);
  const [stage, setStage] = useState<'queue' | 'connecting' | 'assigned'>('queue');
  const [progress, setProgress] = useState(0);

  // Countdown timer for wait time
  useEffect(() => {
    if (stage !== 'queue' || waitTime <= 0) return;

    const interval = setInterval(() => {
      setWaitTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, waitTime]);

  // Simulate queue progression
  useEffect(() => {
    if (stage !== 'queue') return;

    console.log('[LiveChatQueue] 🎬 Starting queue progression...');

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 210); // Use fixed value to avoid dependency issues
        return Math.min(newProgress, 95); // Cap at 95% until actually assigned
      });
    }, 1000);

    // Reduce queue position periodically - use faster timing for demo
    const queueInterval = setInterval(() => {
      setQueuePosition(prev => {
        console.log('[LiveChatQueue] 📊 Queue position:', prev);
        if (prev <= 1) {
          console.log('[LiveChatQueue] 🎯 Queue position reached 1, moving to connecting stage...');
          clearInterval(queueInterval);
          setStage('connecting');
          return 0;
        }
        return prev - 1;
      });
    }, 2000); // 2 seconds per position for demo (8 seconds total)

    return () => {
      console.log('[LiveChatQueue] 🧹 Cleaning up queue progression...');
      clearInterval(progressInterval);
      clearInterval(queueInterval);
    };
  }, [stage]); // Only depend on stage to avoid re-render loops

  // Handle connecting stage
  useEffect(() => {
    if (stage !== 'connecting') return;

    console.log('[LiveChatQueue] 🔄 Entering connecting stage...');
    setProgress(95);
    
    const timer = setTimeout(() => {
      console.log('[LiveChatQueue] ✅ Assignment complete, calling onAssigned...');
      setProgress(100);
      setStage('assigned');
      
      // Simulate specialist assignment
      const specialists = [
        'Sarah Johnson',
        'Michael Chen',
        'Emily Rodriguez'
      ];
      const randomSpecialist = specialists[Math.floor(Math.random() * specialists.length)];
      
      setTimeout(() => {
        console.log('[LiveChatQueue] 📞 Calling onAssigned with specialist:', randomSpecialist);
        onAssigned(randomSpecialist);
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [stage, onAssigned]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.queueContainer}>
      {stage === 'queue' && (
        <div className={styles.compactCard}>
          <div className={styles.cardContent}>
            {/* Left side - Animated Icon */}
            <div className={styles.iconSection}>
              <div className={styles.pulseIcon}>
                <div className={styles.pulseRing} />
                <div className={styles.pulseRing} style={{ animationDelay: '0.5s' }} />
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>

            {/* Right side - Info */}
            <div className={styles.infoSection}>
              <div className={styles.statusRow}>
                <span className={styles.statusText}>Connecting to specialist...</span>
              </div>
              <div className={styles.statsRow}>
                <div className={styles.queueInfo}>
                  <span className={styles.queueNumber}>{queuePosition}</span>
                  <span className={styles.queueLabel}>in queue</span>
                </div>
                <div className={styles.waitTimeInfo}>
                  <span className={styles.waitTimeNumber}>{formatTime(waitTime)}</span>
                  <span className={styles.waitTimeLabel}>wait time</span>
                </div>
              </div>
              <div className={styles.tipsSection}>
                <div className={styles.privacyRow}>
                  <span className={styles.tipIcon}>🔒</span>
                  <span className={styles.privacyText}>We will never ask you for any personal information to give you a quote</span>
                </div>
                <div className={styles.tipRow}>
                  <span className={styles.tipIcon}>📄</span>
                  <span className={styles.tipText}>Have your settlement payment information ready</span>
                </div>
                <div className={styles.tipRow}>
                  <span className={styles.tipIcon}>💰</span>
                  <span className={styles.tipText}>If you received an offer from a competitor, have those offer numbers ready</span>
                </div>
                <div className={styles.alternativesSection}>
                  <div className={styles.alternativesTitle}>Don't want to wait?</div>
                  <div className={styles.alternativesOptions}>
                    <a href="tel:561-583-1280" className={styles.alternativeOption}>
                      <span className={styles.optionIcon}>📞</span>
                      <span className={styles.optionText}>Call us at <strong>561-583-1280</strong></span>
                    </a>
                    <a href="mailto:info@smarterpayouts.com" className={styles.alternativeOption}>
                      <span className={styles.optionIcon}>✉️</span>
                      <span className={styles.optionText}>Email us</span>
                    </a>
                    <a href="sms:561-583-1280" className={styles.alternativeOption}>
                      <span className={styles.optionIcon}>💬</span>
                      <span className={styles.optionText}>Text us at <strong>561-583-1280</strong></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'connecting' && (
        <div className={styles.compactCard}>
          <div className={styles.cardContent}>
            <div className={styles.iconSection}>
              <div className={styles.spinner}>
                <div className={styles.spinnerRing} />
                <div className={styles.spinnerRing} />
                <div className={styles.spinnerRing} />
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.statusRow}>
                <span className={styles.statusText}>Connecting...</span>
              </div>
              <div className={styles.tipRow}>
                <span className={styles.tipText}>Finding your specialist</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'assigned' && (
        <div className={styles.compactCard}>
          <div className={styles.cardContent}>
            <div className={styles.iconSection}>
              <div className={styles.checkmark}>
                <svg viewBox="0 0 52 52" className={styles.checkmarkSvg}>
                  <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                  <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.statusRow}>
                <span className={styles.statusText}>Connected!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChatQueue;

