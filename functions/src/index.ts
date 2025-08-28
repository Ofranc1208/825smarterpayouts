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
