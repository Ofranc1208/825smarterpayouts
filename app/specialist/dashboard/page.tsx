'use client';

/**
 * Specialist Dashboard Page
 * 
 * Dedicated route for specialists to access their dashboard.
 * URL: /specialist/dashboard
 * 
 * This page allows sales reps to:
 * - View and manage active customer chats
 * - Accept incoming chat requests
 * - Send real-time messages to customers
 * - Monitor their performance metrics
 */

import React, { useState } from 'react';
import { SpecialistDashboard } from '../../../src/components/chat/SpecialistChat/SpecialistDashboard';
import styles from './page.module.css';

export default function SpecialistDashboardPage() {
  // For testing, we'll use a test specialist ID
  // In production, this would come from authentication
  // NOTE: Make sure to register specialists first at /admin/specialists
  const [specialistId] = useState('specialist_sarah_johnson');

  return (
    <div className={styles.pageContainer}>
      <SpecialistDashboard specialistId={specialistId} />
    </div>
  );
}
