/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall, HttpsError} from "firebase-functions/v2/https";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
import {Twilio} from "twilio";

// Define the secrets so the function knows about them.
const twilioAccountSid = defineSecret("TWILIO_ACCOUNT_SID");
const twilioAuthToken = defineSecret("TWILIO_AUTH_TOKEN");

/**
 * A callable function to make an outbound phone call via Twilio.
 */
export const makePhoneCall = onCall({
  secrets: [twilioAccountSid, twilioAuthToken],
}, async () => {
  logger.info("makePhoneCall function triggered.");

  // Initialize the Twilio client with our secret credentials.
  const accountSid = twilioAccountSid.value();
  const authToken = twilioAuthToken.value();
  const twilioClient = new Twilio(accountSid, authToken);

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

    logger.info(`Successfully placed call with SID: ${call.sid}`);
    return {success: true, message: `Call initiated with SID: ${call.sid}`};
  } catch (error) {
    logger.error("Twilio API Error:", error);
    throw new HttpsError("internal", "Failed to place the call via Twilio.");
  }
});

/**
 * A Firestore-triggered function to notify representatives via SMS
 * when a new chat request is created.
 */
export const notifyRepOnChatRequest = onDocumentCreated(
  "chat_requests/{requestId}",
  async (event) => {
    // Get the data from the new document
    const requestData = event.data?.data();
    const userName = requestData?.userName || "a new user";

    logger.info(`New chat request from ${userName}, sending SMS notification.`);

    // Initialize the Twilio client with our secret credentials
    const accountSid = twilioAccountSid.value();
    const authToken = twilioAuthToken.value();
    const twilioClient = new Twilio(accountSid, authToken);

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

      logger.info(`Successfully sent SMS with SID: ${message.sid}`);
      return null; // Function finished successfully
    } catch (error) {
      logger.error("Twilio SMS Error:", error);
      return null; // Don't crash the function, just log the error
    }
  }
);
