'use client';

import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

export default function TestFirebase() {
  const [status, setStatus] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        setStatus('Testing Firebase configuration...');
        
        // Test if Firebase auth is properly initialized
        if (auth) {
          setStatus('✅ Firebase Auth is properly initialized');
          console.log('Firebase Auth Object:', auth);
          console.log('Firebase App:', auth.app);
          console.log('Firebase Config:', auth.app.options);
        } else {
          setError('❌ Firebase Auth is not initialized');
        }
      } catch (err) {
        setError(`❌ Firebase Error: ${err instanceof Error ? err.message : String(err)}`);
        console.error('Firebase Test Error:', err);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Firebase Configuration Test</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        <p className="text-green-600">{status}</p>
      </div>

      {error && (
        <div className="bg-red-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2 text-red-800">Error:</h2>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Environment Variables Check:</h2>
        <div className="space-y-2 text-sm">
          <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Present' : '❌ Missing'}</p>
          <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Present' : '❌ Missing'}</p>
          <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Present' : '❌ Missing'}</p>
          <p>Storage Bucket: {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Present' : '❌ Missing'}</p>
          <p>Messaging Sender ID: {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Present' : '❌ Missing'}</p>
          <p>App ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Present' : '❌ Missing'}</p>
          <p>Measurement ID: {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? '✅ Present' : '❌ Missing'}</p>
        </div>
      </div>
    </div>
  );
} 