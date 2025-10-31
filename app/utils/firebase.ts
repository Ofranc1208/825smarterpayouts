// OPTIMIZED: Lazy load Firebase Auth to prevent blocking page load (5+ second iframe load)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration, now using environment variables for security
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase app only if it hasn't been initialized already (Singleton Pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Lazy load Auth - CRITICAL OPTIMIZATION: Only initialize when actually needed
// This prevents the Firebase Auth iframe (5+ seconds) from loading on page load
let authInstance: any = null;

function initializeAuth() {
  // Only initialize on client side when actually accessed
  if (!authInstance && typeof window !== 'undefined') {
    // Lazy import - only loads when auth is actually needed
    // This saves 5+ seconds by preventing the auth iframe from loading on page load
    const { getAuth } = require('firebase/auth');
    authInstance = getAuth(app);
  }
  return authInstance;
}

// Export auth as a Proxy for backward compatibility
// Only initializes when first accessed (saves 5+ seconds on page load)
// Proxy is always truthy, so `if (auth)` checks will work
export const auth = new Proxy({} as any, {
  get(_target, prop) {
    const instance = initializeAuth();
    if (instance) {
      const value = instance[prop];
      // Bind methods to the instance for proper `this` context
      if (typeof value === 'function') {
        return value.bind(instance);
      }
      return value;
    }
    return undefined;
  }
});

// Export function for explicit access
export function getAuthInstance(): any {
  return initializeAuth();
}

// Initialize other services immediately (they don't block page load)
const db = getFirestore(app);
const storage = getStorage(app);
const rtdb = getDatabase(app);

export { app, db, storage, rtdb };

// Safest compatibility: add loadFirebase export
export function loadFirebase() {
  return { app, db, rtdb };
}