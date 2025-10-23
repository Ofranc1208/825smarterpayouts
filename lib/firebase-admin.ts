/**
 * Firebase Admin SDK Configuration
 *
 * Server-side Firebase configuration for API routes and server operations.
 * Handles Firestore, Auth, and other admin operations.
 */

import admin from 'firebase-admin';

// Check if Firebase is already initialized
if (!admin.apps.length) {
  try {
    // Try to use service account key file first (like in cleanup script)
    const fs = require('fs');
    const path = require('path');

    const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com'
      });
    } else {
      // Fallback to environment variables or default credentials
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'smarterwebsite-3d25d',
        databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com',
      });
    }
  } catch (error) {
    console.warn('Firebase Admin initialization warning:', error instanceof Error ? error.message : error);
    // Initialize with minimal config for development
    admin.initializeApp({
      projectId: 'smarterwebsite-3d25d',
      databaseURL: 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com',
    });
  }
}

// Export admin services
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminRtdb = admin.database();

export default admin;
