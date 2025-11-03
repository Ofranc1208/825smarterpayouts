/**
 * Firebase Admin SDK Configuration
 *
 * Server-side Firebase configuration for API routes and server operations.
 * Handles Firestore, Auth, and other admin operations.
 * 
 * Uses lazy initialization to avoid build-time errors - only initializes
 * when actually accessed at runtime.
 */

import admin from 'firebase-admin';

let isInitialized = false;
let initAttempted = false;

function initializeFirebaseAdmin() {
  // Skip initialization during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    console.warn('⚠️ [Firebase Admin] Skipping initialization during build phase');
    return;
  }

  // Only initialize once
  if (isInitialized || admin.apps.length > 0) {
    return;
  }

  // Prevent multiple initialization attempts
  if (initAttempted) {
    return;
  }
  initAttempted = true;

  try {
    // Try environment variables first (Vercel production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      console.log('🔑 [Firebase Admin] Loading credentials from environment variables...');
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com',
      });
      
      isInitialized = true;
      console.log('✅ [Firebase Admin] Initialized with environment variables');
      return;
    }

    // Try service account file (local development)
    const fs = require('fs');
    const path = require('path');
    const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      console.log('🔑 [Firebase Admin] Loading service account key from:', serviceAccountPath);
      
      const serviceAccountContent = fs.readFileSync(serviceAccountPath, 'utf8');
      const serviceAccount = JSON.parse(serviceAccountContent);
      
      // Validate required fields
      if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error('Invalid service account key: missing required fields');
      }
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com'
      });
      
      isInitialized = true;
      console.log('✅ [Firebase Admin] Initialized with service account file');
      return;
    }

    // No credentials found - but don't throw during build
    console.warn('⚠️ [Firebase Admin] No credentials found. Will fail at runtime if API routes are called.');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ [Firebase Admin] Initialization failed:', errorMessage);
    
    // Only throw if we're at runtime (not during build)
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      throw new Error(
        `Firebase Admin initialization failed: ${errorMessage}. ` +
        'Please set FIREBASE_SERVICE_ACCOUNT environment variable in Vercel, ' +
        'or add serviceAccountKey.json for local development.'
      );
    }
  }
}

// Lazy getters that initialize on first access
let adminDbInstance: admin.firestore.Firestore | null = null;
let adminAuthInstance: admin.auth.Auth | null = null;
let adminRtdbInstance: admin.database.Database | null = null;

function getAdminDb() {
  if (!adminDbInstance) {
    initializeFirebaseAdmin();
    if (!admin.apps.length) {
      throw new Error(
        'Firebase Admin not initialized. Please set FIREBASE_SERVICE_ACCOUNT ' +
        'environment variable in Vercel dashboard.'
      );
    }
    adminDbInstance = admin.firestore();
  }
  return adminDbInstance;
}

function getAdminAuth() {
  if (!adminAuthInstance) {
    initializeFirebaseAdmin();
    if (!admin.apps.length) {
      throw new Error('Firebase Admin not initialized');
    }
    adminAuthInstance = admin.auth();
  }
  return adminAuthInstance;
}

function getAdminRtdb() {
  if (!adminRtdbInstance) {
    initializeFirebaseAdmin();
    if (!admin.apps.length) {
      throw new Error('Firebase Admin not initialized');
    }
    adminRtdbInstance = admin.database();
  }
  return adminRtdbInstance;
}

// Export lazy getters using Proxy to initialize on first property access
export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get(target, prop) {
    const db = getAdminDb();
    const value = (db as any)[prop];
    // Bind methods to maintain 'this' context
    return typeof value === 'function' ? value.bind(db) : value;
  }
});

export const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(target, prop) {
    const auth = getAdminAuth();
    const value = (auth as any)[prop];
    return typeof value === 'function' ? value.bind(auth) : value;
  }
});

export const adminRtdb = new Proxy({} as admin.database.Database, {
  get(target, prop) {
    const rtdb = getAdminRtdb();
    const value = (rtdb as any)[prop];
    return typeof value === 'function' ? value.bind(rtdb) : value;
  }
});

export default admin;
