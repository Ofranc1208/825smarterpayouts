/**
 * Appointment Booking API Route
 *
 * Handles appointment requests from the frontend without requiring email clients.
 * Saves appointment data to Firebase Firestore and sends notification email.
 *
 * @route POST /api/appointments
 * @author SmarterPayouts Team
 * @since 2025
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebase-admin';
import admin from '../../../lib/firebase-admin';
import { sendAppointmentNotification, sendCustomerAppointmentConfirmation } from '../../../lib/email-service';

interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AppointmentRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.preferredDate || !body.consultationType) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, preferredDate, consultationType' },
        { status: 400 }
      );
    }

    // Create appointment ID and data
    const appointmentId = `apt-${Date.now()}-${body.email.replace(/[@.]/g, '-')}`;
    const appointmentData = {
      ...body,
      id: appointmentId,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      source: 'website',
      priority: 'medium'
    };

    // Save appointment to Firebase Firestore
    await adminDb.collection('appointments').doc(appointmentId).set(appointmentData);

    // Log for monitoring
    console.log('📅 New Appointment Request Saved to Firebase:');
    console.log('Appointment ID:', appointmentId);
    console.log('Name:', body.name);
    console.log('Email:', body.email);
    console.log('Date:', body.preferredDate);
    console.log('Type:', body.consultationType);

    // Send admin email notification
    const emailResult = await sendAppointmentNotification({
      id: appointmentId,
      name: body.name,
      email: body.email,
      phone: body.phone || 'Not provided',
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime || 'Any time',
      consultationType: body.consultationType,
      message: body.message,
      submittedAt: new Date()
    });

    if (emailResult.success) {
      console.log('✅ Admin email notification sent successfully');
    } else {
      console.warn('⚠️ Admin email notification failed:', emailResult.reason || emailResult.error);
    }

    // Send customer confirmation email (only if email provided)
    let customerEmailResult = null;
    if (body.email) {
      console.log('📧 [Appointment API] Sending customer confirmation email...');
      customerEmailResult = await sendCustomerAppointmentConfirmation({
        name: body.name,
        email: body.email,
        phone: body.phone,
        preferredDate: body.preferredDate,
        preferredTime: body.preferredTime || 'Any time',
        consultationType: body.consultationType,
        message: body.message,
        appointmentId: appointmentId,
      });

      if (customerEmailResult.success) {
        console.log('✅ Customer confirmation email sent successfully');
      } else {
        console.warn('⚠️ Customer confirmation email failed:', customerEmailResult.reason || customerEmailResult.error);
      }
    } else {
      console.log('📧 [Appointment API] Skipping customer email (no email provided)');
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Appointment request submitted successfully',
      appointmentId: appointmentId,
      estimatedResponse: 'within 24 hours',
      nextSteps: 'We\'ll contact you within 24 hours to confirm your appointment details.',
      emailSent: emailResult.success,
      customerEmailSent: customerEmailResult?.success || false
    });

  } catch (error) {
    console.error('Appointment booking error:', error);

    // Return success to user even if Firebase fails (fallback mode)
    return NextResponse.json({
      success: true,
      message: 'Appointment request received',
      appointmentId: `apt-${Date.now()}`,
      estimatedResponse: 'within 24 hours',
      note: 'Please call us at +1-855-214-3510 if you don\'t hear from us within 24 hours.'
    });
  }
}
