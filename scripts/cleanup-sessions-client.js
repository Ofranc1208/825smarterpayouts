/**
 * Cleanup Script - Remove Old Test Sessions (Client SDK Version)
 * 
 * This script removes old chat sessions from Firebase Realtime Database
 * using the client SDK (no service account needed).
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, remove } = require('firebase/database');

// Firebase config (from your app)
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

async function cleanupOldSessions() {
  console.log('🧹 Starting cleanup of old chat sessions...\n');

  try {
    // Get all chat sessions
    const sessionsRef = ref(database, 'chat-sessions');
    const snapshot = await get(sessionsRef);
    
    if (!snapshot.exists()) {
      console.log('No sessions found in database.');
      return;
    }

    const sessions = snapshot.val();
    const sessionIds = Object.keys(sessions);
    
    console.log(`📊 Found ${sessionIds.length} total sessions\n`);

    let removedCount = 0;
    let keptCount = 0;

    for (const sessionId of sessionIds) {
      const session = sessions[sessionId];
      
      // Criteria for removal:
      // 1. Old format session IDs (contains underscores and timestamp)
      // 2. Status is 'closed' or 'completed'
      // 3. Very old sessions (older than 1 hour)
      
      const isOldFormat = sessionId.startsWith('session_') && sessionId.includes('_');
      const isClosed = session.status === 'closed' || session.status === 'completed';
      const isOld = session.createdAt && (Date.now() - session.createdAt) > 3600000; // 1 hour
      
      if (isOldFormat || isClosed || isOld) {
        console.log(`🗑️  Removing: ${sessionId}`);
        console.log(`   Status: ${session.status || 'unknown'}`);
        console.log(`   Reason: ${isOldFormat ? 'Old format' : isClosed ? 'Closed' : 'Old session'}`);
        
        const sessionRef = ref(database, `chat-sessions/${sessionId}`);
        await remove(sessionRef);
        removedCount++;
      } else {
        console.log(`✅ Keeping: ${sessionId} (Status: ${session.status})`);
        keptCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Cleanup complete!`);
    console.log(`   Removed: ${removedCount} sessions`);
    console.log(`   Kept: ${keptCount} active sessions`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

// Run the cleanup
cleanupOldSessions()
  .then(() => {
    console.log('\n✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Cleanup failed:', error);
    process.exit(1);
  });

