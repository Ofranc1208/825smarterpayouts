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
      console.log('🔑 [Firebase Admin] Loading service account key from:', serviceAccountPath);
      
      const serviceAccountContent = fs.readFileSync(serviceAccountPath, 'utf8');
      const serviceAccount = JSON.parse(serviceAccountContent);
      
      // Validate required fields
      if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error('Invalid service account key: missing required fields (project_id, private_key, client_email)');
      }
      
      console.log('✅ [Firebase Admin] Service account key loaded successfully');
      console.log('✅ [Firebase Admin] Project ID:', serviceAccount.project_id);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com'
      });
      
      console.log('✅ [Firebase Admin] Firebase Admin initialized with service account credentials');
    } else {
      console.error('❌ [Firebase Admin] serviceAccountKey.json not found at:', serviceAccountPath);
      console.error('❌ [Firebase Admin] Attempting to use environment variables...');
      
      // Try environment variables
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com',
        });
        console.log('✅ [Firebase Admin] Firebase Admin initialized with environment variable credentials');
      } else {
        throw new Error(
          'Firebase Admin credentials not found. ' +
          'Please ensure serviceAccountKey.json exists in the project root, ' +
          'or set FIREBASE_SERVICE_ACCOUNT environment variable.'
        );
      }
    }
  } catch (error) {
    console.error('❌ [Firebase Admin] Initialization failed:', error instanceof Error ? error.message : error);
    console.error('❌ [Firebase Admin] Stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Don't initialize without credentials - fail fast instead
    throw new Error(
      `Firebase Admin initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}. ` +
      'Please check serviceAccountKey.json file or environment variables.'
    );
  }
}

// Export admin services
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminRtdb = admin.database();

export default admin;
