/**
 * Cleanup Script - Remove Old Test Sessions
 * 
 * This script removes old chat sessions from Firebase Realtime Database
 * that are using the old session ID format or are in closed/completed status.
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://smarterwebsite-3d25d-default-rtdb.firebaseio.com'
  });
}

const db = admin.database();

async function cleanupOldSessions() {
  console.log('🧹 Starting cleanup of old chat sessions...\n');

  try {
    // Get all chat sessions
    const sessionsRef = db.ref('chat-sessions');
    const snapshot = await sessionsRef.once('value');
    
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
        console.log(`   Status: ${session.status}`);
        console.log(`   Reason: ${isOldFormat ? 'Old format' : isClosed ? 'Closed' : 'Old session'}`);
        
        await sessionsRef.child(sessionId).remove();
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
  } finally {
    // Close the connection
    await admin.app().delete();
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
