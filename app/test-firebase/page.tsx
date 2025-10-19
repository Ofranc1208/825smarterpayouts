'use client';

import { useEffect, useState } from 'react';
import { testFirebaseConnection } from '../../src/components/chat/test-firebase-connection';
import { auth } from '../utils/firebase';

export default function TestFirebase() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<string>('Testing Firebase connection...');
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{
    firestore: boolean;
    realtimeDb: boolean;
    auth: boolean;
  }>({
    firestore: false,
    realtimeDb: false,
    auth: false
  });

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Make updateTestResults available globally for the test function
    (window as any).updateTestResults = (service: string, success: boolean) => {
      setTestResults(prev => ({
        ...prev,
        [service]: success
      }));
    };

    const testFirebase = async () => {
      try {
        // Test 1: Basic Firebase Auth initialization
        if (auth) {
          testResults.auth = true;
          setTestResults(prev => ({ ...prev, auth: true }));
          console.log('✅ Firebase Auth is properly initialized');
        }

        // Test 2: Comprehensive connection test
        const connectionTest = await testFirebaseConnection();

        if (connectionTest) {
          setStatus('✅ All Firebase tests passed! Connection is working correctly.');
        } else {
          setStatus('❌ Some Firebase tests failed');
        }

      } catch (err) {
        setError(`❌ Firebase Error: ${err instanceof Error ? err.message : String(err)}`);
        console.error('Firebase Test Error:', err);
      }
    };

    testFirebase();
  }, []);

  // Show loading state during SSR and initial mount
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Firebase test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Firebase Connection Test
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Firebase Auth:</span>
                <span className={testResults.auth ? 'text-green-600' : 'text-red-600'}>
                  {testResults.auth ? '✅ Connected' : '❌ Failed'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Firestore Database:</span>
                <span className={testResults.firestore ? 'text-green-600' : 'text-red-600'}>
                  {testResults.firestore ? '✅ Connected' : '❌ Failed'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Realtime Database:</span>
                <span className={testResults.realtimeDb ? 'text-green-600' : 'text-red-600'}>
                  {testResults.realtimeDb ? '✅ Connected' : '❌ Failed'}
                </span>
              </div>
            </div>
      </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Overall Status</h2>

            {!error && !status.includes('❌') && (
              <div className="text-green-600 font-semibold text-lg">
                {status}
              </div>
            )}

      {error && (
              <div className="text-red-600 font-semibold text-lg">
                {error}
        </div>
      )}

            {status.includes('❌') && !error && (
              <div className="text-orange-600 font-semibold text-lg">
                {status}
              </div>
            )}
          </div>

          {/* Environment Variables */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>API Key:</span>
                <span className={process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'text-green-600' : 'text-red-600'}>
                  {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Present' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Project ID:</span>
                <span className={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'text-green-600' : 'text-red-600'}>
                  {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Present' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Database URL:</span>
                <span className={process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? 'text-green-600' : 'text-red-600'}>
                  {process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? '✅ Present' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <div className="space-y-2 text-sm">
              <p>✅ Firebase configuration loaded</p>
              <p>🔄 Testing database connections...</p>
              <p>⏳ Ready for live chat implementation</p>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Main App
            </button>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <details>
            <summary className="cursor-pointer font-semibold">Debug Information (Click to expand)</summary>
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify({
                firebaseConfig: {
                  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Present' : 'Missing',
                  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Missing',
                  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'Missing'
                },
                timestamp: new Date().toISOString()
              }, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
} 