/**
 * Offer Capture API Route
 *
 * Handles offer capture requests from the frontend overlay.
 * Saves offer data to Firebase Firestore and sends notification email.
 *
 * @route POST /api/offer-captures
 * @author SmarterPayouts Team
 * @since 2025
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebase-admin';
import admin from '../../../lib/firebase-admin';
import { sendOfferCaptureNotification, sendCustomerOfferConfirmation } from '../../../lib/email-service';

/**
 * GET handler for testing API connectivity
 */
export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'Offer Capture API is running',
    timestamp: new Date().toISOString(),
    firebaseInitialized: !!adminDb,
    collection: 'offer-captures'
  });
}

interface OfferCaptureRequest {
  email?: string;
  message?: string; // For "Send Message" tab
  phone?: string; // Keep for backward compatibility
  deliveryMethod: 'email' | 'sms';
  offerCode: string;
  calculatorType: 'guaranteed' | 'lcp';
  minOffer: number;
  maxOffer: number;
  familyProtectionValue?: number; // Only for LCP
}

export async function POST(request: NextRequest) {
  try {
    console.log('📥 [Offer Capture API] Request received');
    
    // Check Firebase Admin initialization first
    console.log('🔍 [Offer Capture API] Checking Firebase Admin...');
    if (!adminDb) {
      console.error('❌ [Offer Capture API] adminDb is null/undefined');
      throw new Error('Firebase Admin is not initialized. Check serviceAccountKey.json file.');
    }
    console.log('✅ [Offer Capture API] Firebase Admin DB is initialized');
    
    const body: OfferCaptureRequest = await request.json();
    console.log('📝 [Offer Capture API] Request body:', {
      offerCode: body.offerCode,
      calculatorType: body.calculatorType,
      deliveryMethod: body.deliveryMethod,
      hasEmail: !!body.email,
      hasMessage: !!body.message,
      hasPhone: !!body.phone,
      minOffer: body.minOffer,
      maxOffer: body.maxOffer,
    });

    // Validate required fields
    if (!body.offerCode || !body.calculatorType || !body.deliveryMethod) {
      console.error('❌ [Offer Capture API] Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: offerCode, calculatorType, deliveryMethod' },
        { status: 400 }
      );
    }

    if (body.deliveryMethod === 'email' && !body.email) {
      console.error('❌ [Offer Capture API] Validation failed: Email required for email delivery');
      return NextResponse.json(
        { error: 'Email is required when delivery method is email' },
        { status: 400 }
      );
    }

    if (body.deliveryMethod === 'sms' && !body.message && !body.phone) {
      console.error('❌ [Offer Capture API] Validation failed: Message or phone required for SMS delivery');
      return NextResponse.json(
        { error: 'Message is required when delivery method is SMS' },
        { status: 400 }
      );
    }

    if (!body.minOffer || !body.maxOffer) {
      console.error('❌ [Offer Capture API] Validation failed: Missing offer amounts');
      return NextResponse.json(
        { error: 'Missing offer amounts: minOffer, maxOffer' },
        { status: 400 }
      );
    }

    // Create offer capture ID
    const captureId = `offer-${Date.now()}-${body.offerCode}`;
    console.log('🆔 [Offer Capture API] Generated capture ID:', captureId);
    
    // Prepare data for Firebase
    const captureData = {
      ...body,
      id: captureId,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      source: 'website',
      priority: 'high' // Offer captures are high priority
    };

    console.log('💾 [Offer Capture API] Attempting to save to Firebase...');
    console.log('📊 [Offer Capture API] Collection: offer-captures');
    console.log('📊 [Offer Capture API] Document ID:', captureId);

    // Verify Firebase Admin is initialized
    if (!adminDb) {
      throw new Error('Firebase Admin DB is not initialized. Check serviceAccountKey.json or environment variables.');
    }

    // Save to Firebase Firestore with error handling
    try {
      console.log('💾 [Offer Capture API] Calling adminDb.collection("offer-captures").doc(...).set(...)');
      await adminDb.collection('offer-captures').doc(captureId).set(captureData);
      console.log('✅ [Offer Capture API] Successfully saved to Firebase!');
      console.log('✅ [Offer Capture API] Collection: offer-captures');
      console.log('✅ [Offer Capture API] Document ID:', captureId);
    } catch (firebaseError: any) {
      console.error('❌ [Offer Capture API] Firebase save error:', firebaseError);
      console.error('❌ [Offer Capture API] Error code:', firebaseError?.code);
      console.error('❌ [Offer Capture API] Error message:', firebaseError?.message);
      throw new Error(`Firebase save failed: ${firebaseError?.message || 'Unknown error'}`);
    }

    // Log for monitoring
    console.log('💰 New Offer Capture Saved to Firebase:');
    console.log('Capture ID:', captureId);
    console.log('Offer Code:', body.offerCode);
    console.log('Calculator Type:', body.calculatorType);
    console.log('Contact:', body.email || body.message ? 'Email/Message' : body.phone || 'N/A');
    console.log('Offer Range:', `$${body.minOffer.toLocaleString()} - $${body.maxOffer.toLocaleString()}`);

    // Send admin email notification
    const emailResult = await sendOfferCaptureNotification({
      id: captureId,
      offerCode: body.offerCode,
      calculatorType: body.calculatorType,
      email: body.email || null,
      phone: body.phone || null,
      message: body.message || null,
      deliveryMethod: body.deliveryMethod,
      minOffer: body.minOffer,
      maxOffer: body.maxOffer,
      submittedAt: new Date()
    });

    if (emailResult.success) {
      console.log('✅ Admin email notification sent successfully');
    } else {
      console.warn('⚠️ Admin email notification failed:', emailResult.reason || emailResult.error);
    }

    // Send customer confirmation email (only if email provided and delivery method is email)
    if (body.email && body.deliveryMethod === 'email') {
      console.log('📧 [Offer Capture API] Sending customer confirmation email...');
      const customerEmailResult = await sendCustomerOfferConfirmation({
        email: body.email,
        offerCode: body.offerCode,
        calculatorType: body.calculatorType,
        minOffer: body.minOffer,
        maxOffer: body.maxOffer,
        familyProtectionValue: body.familyProtectionValue,
      });

      if (customerEmailResult.success) {
        console.log('✅ Customer confirmation email sent successfully');
      } else {
        console.warn('⚠️ Customer confirmation email failed:', customerEmailResult.reason || customerEmailResult.error);
      }
    } else {
      console.log('📧 [Offer Capture API] Skipping customer email (delivery method is SMS or no email provided)');
    }

      // Return success response
      return NextResponse.json({
        success: true,
        message: 'Offer capture submitted successfully',
        captureId: captureId,
        offerCode: body.offerCode,
        adminEmailSent: emailResult.success,
        customerEmailSent: body.email && body.deliveryMethod === 'email' ? true : false
      });

  } catch (error) {
    console.error('❌ [Offer Capture API] Error:', error);
    console.error('❌ [Offer Capture API] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      errorType: error?.constructor?.name,
    });

    // Return success to user even if Firebase/email fails (graceful degradation)
    return NextResponse.json({
      success: true,
      message: 'Offer capture received',
      captureId: `offer-${Date.now()}`,
      note: 'Please call us at +1-855-214-3510 if you have any questions about your offer.'
    }, { status: 200 });
  }
}

