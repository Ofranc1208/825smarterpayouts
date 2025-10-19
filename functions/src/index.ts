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
const Twilio = require("twilio");

// Initialize Firebase Admin
admin.initializeApp();

// Environment variables (set in Firebase console)
const twilioAccountSid = functions.config().twilio?.account_sid;
const twilioAuthToken = functions.config().twilio?.auth_token;
const twilioChatServiceSid = functions.config().twilio?.chat_service_sid;

/**
 * A callable function to make an outbound phone call via Twilio.
 */
export const makePhoneCall = functions.https.onCall(async (data: any, context: any) => {
  console.log("makePhoneCall function triggered.");

  // Initialize the Twilio client with environment variables.
  if (!twilioAccountSid || !twilioAuthToken) {
    throw new functions.https.HttpsError('failed-precondition', 'Twilio credentials not configured');
  }
  const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

  // !!! IMPORTANT: REPLACE THESE PLACEHOLDER NUMBERS !!!
  const toPhoneNumber = "+15615831280"; // e.g., "+15551234567"
  const fromTwilioNumber = "+16187296887"; // e.g., "+15557654321"

  try {
    // Make the API call to Twilio to create the phone call.
    const call = await twilioClient.calls.create({
      to: toPhoneNumber,
      from: fromTwilioNumber,
      // This URL provides a simple voice message for the call.
      url: "http://demo.twilio.com/docs/voice.xml",
    });

    console.log(`Successfully placed call with SID: ${call.sid}`);
    return {success: true, message: `Call initiated with SID: ${call.sid}`};
  } catch (error) {
    console.error("Twilio API Error:", error);
    throw new functions.https.HttpsError("internal", "Failed to place the call via Twilio.");
  }
});

/**
 * A Firestore-triggered function to notify representatives via SMS
 * when a new chat request is created.
 */
export const notifyRepOnChatRequest = functions.firestore
  .document("chat_requests/{requestId}")
  .onCreate(async (snapshot: any, context: any) => {
    // Get the data from the new document
    const requestData = snapshot.data();
    const userName = requestData?.userName || "a new user";

    console.log(`New chat request from ${userName}, sending SMS notification.`);

    // Initialize the Twilio client with environment variables
    if (!twilioAccountSid || !twilioAuthToken) {
      console.error('Twilio credentials not configured');
      return;
    }
    const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

    // !!! IMPORTANT: REPLACE THESE PLACEHOLDER NUMBERS !!!
    const repPhoneNumber = "+15615831280"; // e.g., "+15551112222"
    const fromTwilioNumber = "+16187296887"; // e.g., "+15557654321"

    const messageBody = `New chat request from ${userName}. ` +
      "Please check the support dashboard.";

    try {
      const message = await twilioClient.messages.create({
        body: messageBody,
        to: repPhoneNumber,
        from: fromTwilioNumber,
      });

      console.log(`Successfully sent SMS with SID: ${message.sid}`);
      return null; // Function finished successfully
    } catch (error) {
      console.error("Twilio SMS Error:", error);
      return null; // Don't crash the function, just log the error
    }
  }
);

/**
 * Create a Twilio Chat channel for live chat sessions
 */
export const createChatChannel = functions.https.onCall(async (data: any, context: any) => {
  console.log("createChatChannel function triggered.");

  // Initialize the Twilio client
  if (!twilioAccountSid || !twilioAuthToken || !twilioChatServiceSid) {
    throw new functions.https.HttpsError('failed-precondition', 'Twilio credentials not configured');
  }

  const { sessionId, userId } = data;

  if (!sessionId || !userId) {
    throw new functions.https.HttpsError('invalid-argument', 'Session ID and User ID are required');
  }

  try {
    const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

    // Create a unique channel for this chat session
    const channel = await twilioClient.chat.services(twilioChatServiceSid)
      .channels
      .create({
        uniqueName: sessionId,
        friendlyName: `Live Chat Session ${sessionId}`,
        type: 'private'
      });

    console.log(`Successfully created Twilio chat channel: ${channel.sid} for session: ${sessionId}`);

    return {
      success: true,
      channelSid: channel.sid,
      sessionId: sessionId
    };

  } catch (error) {
    console.error("Twilio Chat Channel Creation Error:", error);
    throw new functions.https.HttpsError("internal", "Failed to create chat channel");
  }
});

/**
 * Generate Twilio access token for chat client
 */
export const generateChatToken = functions.https.onCall(async (data: any, context: any) => {
  console.log("generateChatToken function triggered.");

  if (!twilioAccountSid || !twilioAuthToken || !twilioChatServiceSid) {
    throw new functions.https.HttpsError('failed-precondition', 'Twilio credentials not configured');
  }

  const { userId } = data;

  if (!userId) {
    throw new functions.https.HttpsError('invalid-argument', 'User ID is required');
  }

  try {
    // Generate access token for chat
    const AccessToken = Twilio.jwt.AccessToken;
    const ChatGrant = AccessToken.ChatGrant;

    const token = new AccessToken(
      twilioAccountSid,
      twilioAccountSid, // API Key SID (use same as Account SID for simplicity)
      twilioAuthToken,  // API Key Secret (use same as Auth Token for simplicity)
      { identity: userId }
    );

    // Grant access to the chat service
    const chatGrant = new ChatGrant({
      serviceSid: twilioChatServiceSid
    });

    token.addGrant(chatGrant);

    const jwt = token.toJwt();
    console.log(`Successfully generated chat token for user: ${userId}`);

    return {
      success: true,
      token: jwt,
      serviceSid: twilioChatServiceSid
    };

  } catch (error) {
    console.error("Twilio Token Generation Error:", error);
    throw new functions.https.HttpsError("internal", "Failed to generate chat token");
  }
});

/**
 * Send SMS when live chat is initiated
 */
export const notifySpecialistOnLiveChat = functions.firestore
  .document("chat-sessions/{sessionId}")
  .onCreate(async (snapshot: any, context: any) => {
    const sessionId = context.params.sessionId;

    console.log(`New live chat session created: ${sessionId}`);

    // Initialize the Twilio client with environment variables
    if (!twilioAccountSid || !twilioAuthToken) {
      console.error('Twilio credentials not configured');
      return;
    }
    const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

    // !!! IMPORTANT: REPLACE THESE PLACEHOLDER NUMBERS !!!
    const specialistPhoneNumber = "+15615831280"; // Specialist notification number
    const fromTwilioNumber = "+16187296887";

    const messageBody = `New live chat session started: ${sessionId}. ` +
      "Please check the specialist dashboard.";

    try {
      const message = await twilioClient.messages.create({
        body: messageBody,
        to: specialistPhoneNumber,
        from: fromTwilioNumber,
      });

      console.log(`Successfully sent live chat notification SMS with SID: ${message.sid}`);
      return null;
    } catch (error) {
      console.error("Twilio Live Chat SMS Error:", error);
      return null;
    }
  }
);

/**
 * Handle Twilio chat webhooks for message routing
 */
export const handleChatWebhook = functions.https.onRequest(async (req: any, res: any) => {
  console.log("Chat webhook received:", req.body);

  try {
    // Parse Twilio chat webhook
    const { Body, From, ChannelSid } = req.body;

    // Find the corresponding Firebase session
    const sessionRef = admin.firestore().collection('chat-sessions')
      .where('twilioChannelSid', '==', ChannelSid);

    const sessionSnapshot = await sessionRef.get();

    if (sessionSnapshot.empty) {
      console.log(`No session found for channel: ${ChannelSid}`);
      return res.status(404).send('Session not found');
    }

    const sessionDoc = sessionSnapshot.docs[0];
    const sessionId = sessionDoc.id;

    // Add message to Firebase Realtime Database
    const messageData = {
      sessionId,
      senderId: From,
      senderType: 'user', // Will be updated by specialist interface
      content: Body,
      type: 'text',
      timestamp: Date.now()
    };

    // Store in Realtime DB for real-time sync
    const messageRef = admin.database().ref(`chat-sessions/${sessionId}/messages`).push();
    await messageRef.set(messageData);

    console.log(`Message stored for session: ${sessionId}`);

    // Update session's last message timestamp
    await sessionDoc.ref.update({
      lastMessageAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).send('Message processed');

  } catch (error) {
    console.error("Chat webhook error:", error);
    res.status(500).send('Internal server error');
  }
});
