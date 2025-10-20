'use client';

/**
 * Specialist Management Admin Page
 * 
 * Simple admin interface to register/remove test specialists
 * for live chat testing and validation.
 * 
 * @author SmarterPayouts Team
 * @since Phase 2 - Live Chat Implementation
 */

import React, { useState } from 'react';
import { rtdb, db } from '../../../app/utils/firebase';
import { ref, set, get, remove } from 'firebase/database';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import styles from './specialists.module.css';

interface Specialist {
  id: string;
  name: string;
  status: string;
  online?: boolean;
  error?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  specialists: Specialist[];
  availableCount?: number;
  availableSpecialists?: Array<{ id: string; name: string; status: string }>;
  summary?: {
    total: number;
    registered: number;
    online: number;
    errors: number;
  };
  nextSteps?: string[];
  error?: string;
  details?: string;
}

export default function SpecialistAdminPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegisterSpecialists = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Get specialist data from API
      const res = await fetch('/api/admin/init-specialists', {
        method: 'GET',
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to get specialist data');
        return;
      }

      const specialists = data.specialists;
      const results = [];

      // Register each specialist in Firebase (client-side)
      for (const specialist of specialists) {
        try {
          console.log(`📝 Registering ${specialist.name}...`);

          // 1. Add to Realtime Database
          const specialistRef = ref(rtdb, `specialists/${specialist.id}`);
          await set(specialistRef, {
            ...specialist,
            lastSeen: Date.now(),
          });

          // 2. Add to Firestore
          const firestoreRef = doc(db, 'specialists', specialist.id);
          await setDoc(firestoreRef, {
            ...specialist,
            lastSeen: serverTimestamp(),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }, { merge: true });

          results.push({
            id: specialist.id,
            name: specialist.name,
            status: 'registered',
            online: true,
          });

          console.log(`✅ Registered ${specialist.name}`);
        } catch (err) {
          console.error(`❌ Error registering ${specialist.name}:`, err);
          results.push({
            id: specialist.id,
            name: specialist.name,
            status: 'error',
            error: err instanceof Error ? err.message : 'Unknown error',
          });
        }
      }

      // Get available specialists
      const specialistsRef = ref(rtdb, 'specialists');
      const snapshot = await get(specialistsRef);
      
      let availableSpecialists: any[] = [];
      if (snapshot.exists()) {
        const specialistsData = snapshot.val();
        availableSpecialists = Object.values(specialistsData).filter((s: any) => 
          s.status === 'online' && (s.currentChats || []).length < s.maxConcurrentChats
        );
      }

      setResponse({
        success: true,
        message: 'Test specialists registered successfully',
        specialists: results,
        availableCount: availableSpecialists.length,
        availableSpecialists: availableSpecialists.map((s: any) => ({
          id: s.id,
          name: s.name,
          status: s.status,
        })),
        summary: {
          total: specialists.length,
          registered: results.filter(r => r.status === 'registered').length,
          online: availableSpecialists.length,
          errors: results.filter(r => r.status === 'error').length,
        },
        nextSteps: [
          '1. Refresh your /connect-with-specialist page',
          '2. Click "Live Chat" button',
          '3. Should now connect to a specialist!',
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSpecialists = async () => {
    if (!confirm('Are you sure you want to remove all test specialists?')) {
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Get specialist IDs from API
      const res = await fetch('/api/admin/init-specialists', {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to get specialist data');
        return;
      }

      const specialists = data.specialists;
      const results = [];

      // Remove each specialist from Firebase (client-side)
      for (const specialist of specialists) {
        try {
          const specialistRef = ref(rtdb, `specialists/${specialist.id}`);
          await remove(specialistRef);
          
          results.push({
            id: specialist.id,
            name: specialist.name,
            status: 'removed',
          });

          console.log(`✅ Removed ${specialist.name}`);
        } catch (err) {
          console.error(`❌ Error removing ${specialist.name}:`, err);
          results.push({
            id: specialist.id,
            name: specialist.name,
            status: 'error',
            error: err instanceof Error ? err.message : 'Unknown error',
          });
        }
      }

      setResponse({
        success: true,
        message: 'Test specialists removed successfully',
        specialists: results,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🧪 Specialist Management</h1>
        <p className={styles.subtitle}>
          Quick setup for live chat testing - Register test specialists in Firebase
        </p>

        <div className={styles.actions}>
          <button
            onClick={handleRegisterSpecialists}
            disabled={loading}
            className={`${styles.button} ${styles.primary}`}
          >
            {loading ? '⏳ Registering...' : '✅ Register Test Specialists'}
          </button>

          <button
            onClick={handleRemoveSpecialists}
            disabled={loading}
            className={`${styles.button} ${styles.danger}`}
          >
            {loading ? '⏳ Removing...' : '🗑️ Remove All Specialists'}
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {response && (
          <div className={styles.success}>
            <h2 className={styles.resultTitle}>
              {response.success ? '✅ Success!' : '❌ Failed'}
            </h2>
            <p className={styles.message}>{response.message}</p>

            {response.summary && (
              <div className={styles.summary}>
                <h3>📊 Summary</h3>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Total:</span>
                    <span className={styles.statValue}>{response.summary.total}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Registered:</span>
                    <span className={styles.statValue}>{response.summary.registered}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Online:</span>
                    <span className={styles.statValue}>{response.summary.online}</span>
                  </div>
                  {response.summary.errors > 0 && (
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Errors:</span>
                      <span className={`${styles.statValue} ${styles.errorValue}`}>
                        {response.summary.errors}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {response.specialists && response.specialists.length > 0 && (
              <div className={styles.specialists}>
                <h3>👥 Specialists</h3>
                <div className={styles.specialistList}>
                  {response.specialists.map((specialist) => (
                    <div key={specialist.id} className={styles.specialist}>
                      <span className={styles.specialistStatus}>
                        {specialist.status === 'registered' ? '🟢' : 
                         specialist.status === 'removed' ? '⚪' : '🔴'}
                      </span>
                      <span className={styles.specialistName}>{specialist.name}</span>
                      <span className={styles.specialistId}>{specialist.id}</span>
                      {specialist.error && (
                        <span className={styles.specialistError}>{specialist.error}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {response.availableSpecialists && response.availableSpecialists.length > 0 && (
              <div className={styles.available}>
                <h3>🟢 Available Now ({response.availableCount})</h3>
                <div className={styles.availableList}>
                  {response.availableSpecialists.map((specialist) => (
                    <div key={specialist.id} className={styles.availableItem}>
                      <span className={styles.availableName}>{specialist.name}</span>
                      <span className={styles.availableStatus}>{specialist.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {response.nextSteps && (
              <div className={styles.nextSteps}>
                <h3>🚀 Next Steps</h3>
                <ol className={styles.stepsList}>
                  {response.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        <div className={styles.info}>
          <h3>ℹ️ What This Does</h3>
          <ul>
            <li>Registers 3 test specialists in Firebase (Realtime DB + Firestore)</li>
            <li>Sets them to "online" status automatically</li>
            <li>Allows live chat to connect immediately</li>
            <li>Perfect for testing the complete flow</li>
          </ul>
        </div>

        <div className={styles.testLink}>
          <a href="/connect-with-specialist?type=specialist" className={styles.link}>
            🧪 Test Live Chat →
          </a>
        </div>
      </div>
    </div>
  );
}

