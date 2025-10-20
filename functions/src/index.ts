/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Firebase Functions - conditional imports for TypeScript checking
let functions: any;
let admin: any;
try {
  functions = require("firebase-functions");
  admin = require("firebase-admin");
} catch (error) {
  // Fallback for TypeScript checking when dependencies aren't installed
  functions = {
    https: { onCall: () => {}, HttpsError: class {} },
    firestore: { document: () => ({ onCreate: () => {} }) },
    config: () => ({ twilio: { account_sid: '', auth_token: '' } })
  };
  admin = { initializeApp: () => {} };
}
// const Twilio = require("twilio");

// Initialize Firebase Admin
admin.initializeApp();

// Environment variables (set in Firebase console)
// const twilioAccountSid = functions.config().twilio?.account_sid;
// const twilioAuthToken = functions.config().twilio?.auth_token;
// const twilioChatServiceSid = functions.config().twilio?.chat_service_sid;

/**
 * Health check function
 */
export const healthCheck = functions.https.onRequest((req: any, res: any) => {
  res.status(200).send({
    status: "ok",
    message: "Firebase Functions are running",
    timestamp: new Date().toISOString()
  });
});

/**
 * A callable function to make an outbound phone call via Twilio.
 * DISABLED FOR NOW - Enable when phone call feature is needed
 */
// export const makePhoneCall = functions.https.onCall(async (data: any, context: any) => {
//   console.log("makePhoneCall function triggered.");
//   return {success: true, message: "Phone call feature disabled"};
// });

/**
 * A Firestore-triggered function to notify representatives via SMS
 * when a new chat request is created.
 * DISABLED FOR NOW - Enable when Twilio SMS is needed
 */
// export const notifyRepOnChatRequest = functions.firestore
//   .document("chat_requests/{requestId}")
//   .onCreate(async (snapshot: any, context: any) => {
//     const requestData = snapshot.data();
//     const userName = requestData?.userName || "a new user";
//     console.log(`New chat request from ${userName}`);
//     return null;
//   });

/**
 * Create a Twilio Conversations channel for live chat sessions
 * DISABLED FOR NOW - Using Firebase Realtime Database directly
 */
// export const createChatChannel = functions.https.onCall(async (data: any, context: any) => {
//   console.log("createChatChannel function triggered.");
//   const { sessionId, userId } = data;
//   return {
//     success: true,
//     sessionId: sessionId
//   };
// });

/**
 * Generate Twilio access token for chat client
 * DISABLED FOR NOW - Using Firebase Realtime Database directly
 */
// export const generateChatToken = functions.https.onCall(async (data: any, context: any) => {
//   console.log("generateChatToken function triggered.");
//   const { userId } = data;
//   return {
//     success: true,
//     userId: userId
//   };
// });

/**
 * Send SMS when live chat is initiated
 * DISABLED FOR NOW - Using Firebase Realtime Database for notifications
 */
// export const notifySpecialistOnLiveChat = functions.firestore
//   .document("chat-sessions/{sessionId}")
//   .onCreate(async (snapshot: any, context: any) => {
//     const sessionId = context.params.sessionId;
//     console.log(`New live chat session created: ${sessionId}`);
//     return null;
//   });

/**
 * Handle Twilio chat webhooks for message routing
 * DISABLED FOR NOW - Using Firebase Realtime Database directly
 */
// export const handleChatWebhook = functions.https.onRequest(async (req: any, res: any) => {
//   console.log("Chat webhook received:", req.body);
//   res.status(200).send('OK');
// });
