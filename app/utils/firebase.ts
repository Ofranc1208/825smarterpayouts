// USE THIS CODE IF THE TEST WORKED
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration, with keys hard-coded to bypass the .env.local issue.
// This is for testing and will get you unblocked immediately.
const firebaseConfig = {
  apiKey: "AIzaSyDlJPUZ8u2PPKQeVuNWmDnmfKtSVFJ-m2E",
  authDomain: "smarter-payouts.firebaseapp.com",
  projectId: "smarter-payouts",
  storageBucket: "smarter-payouts.appspot.com",
  messagingSenderId: "870646148634",
  appId: "1:870646148634:web:92faf9c279fed8f9c66ba3",
  measurementId: "G-YT1PCCHLKR",
};

// Initialize Firebase app only if it hasn't been initialized already (Singleton Pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the initialized Firebase services for use in other parts of your app
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

// Safest compatibility: add loadFirebase export
export function loadFirebase() {
  return { app, db };
}