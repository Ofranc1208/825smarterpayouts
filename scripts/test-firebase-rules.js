/**
 * Test Firebase Rules - Quick verification
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyABfCLSZCYTDNwLdRMPWPOBYm0rqTBqzlE",
  authDomain: "smarterwebsite-3d25d.firebaseapp.com",
  databaseURL: "https://smarterwebsite-3d25d-default-rtdb.firebaseio.com",
  projectId: "smarterwebsite-3d25d",
  storageBucket: "smarterwebsite-3d25d.firebasestorage.app",
  messagingSenderId: "1050663308933",
  appId: "1:1050663308933:web:a5b6e2b6d2e2e2e2e2e2e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function testRules() {
  console.log('🧪 Testing Firebase Rules...\n');

  try {
    // Test 1: Read chat-sessions
    console.log('📋 Test 1: Reading chat-sessions...');
    const sessionsRef = ref(database, 'chat-sessions');
    const sessionsSnapshot = await get(sessionsRef);
    console.log('✅ SUCCESS: Can read chat-sessions');
    console.log(`   Found ${sessionsSnapshot.exists() ? Object.keys(sessionsSnapshot.val()).length : 0} sessions\n`);

    // Test 2: Read specialists
    console.log('📋 Test 2: Reading specialists...');
    const specialistsRef = ref(database, 'specialists');
    const specialistsSnapshot = await get(specialistsRef);
    console.log('✅ SUCCESS: Can read specialists');
    console.log(`   Found ${specialistsSnapshot.exists() ? Object.keys(specialistsSnapshot.val()).length : 0} specialists\n`);

    // Test 3: Read chat-queue
    console.log('📋 Test 3: Reading chat-queue...');
    const queueRef = ref(database, 'chat-queue');
    const queueSnapshot = await get(queueRef);
    console.log('✅ SUCCESS: Can read chat-queue');
    console.log(`   Found ${queueSnapshot.exists() ? Object.keys(queueSnapshot.val()).length : 0} items in queue\n`);

    console.log('🎉 All tests passed! Rules are working correctly.');
    process.exit(0);

  } catch (error) {
    console.error('❌ FAILED:', error.message);
    console.error('\n⚠️  Rules are NOT working correctly!');
    console.error('   Please verify rules in Firebase Console:\n');
    console.error('   https://console.firebase.google.com/project/smarterwebsite-3d25d/database/smarterwebsite-3d25d-default-rtdb/rules\n');
    process.exit(1);
  }
}

testRules();

