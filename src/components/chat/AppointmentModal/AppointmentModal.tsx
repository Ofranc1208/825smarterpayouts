'use client';
import React, { useState } from 'react';
import styles from './AppointmentModal.module.css';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    preferredTime: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '9:00 AM - 9:30 AM',
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '2:00 PM - 2:30 PM',
    '3:00 PM - 3:30 PM',
    '4:00 PM - 4:30 PM'
  ];

  const appointmentReasons = [
    'Get a settlement quote',
    'Compare settlement offers',
    'Understand settlement options',
    'Sell my structured settlement',
    'Sell my annuity payments',
    'Emergency cash needs',
    'Financial planning advice',
    'Legal questions about settlement',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number as user types
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length > 0) {
      return `(${phoneNumber}`;
    }
    return phoneNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.phone || !formData.preferredTime) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit appointment request to our API
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: 'pending@smarterpayouts.com',
          preferredDate: new Date().toISOString().split('T')[0], // Today's date
          consultationType: 'General Consultation'
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success - show confirmation message
        alert(`✅ Appointment Booked!\n\nHi ${formData.firstName}! We'll call you during your preferred time: ${formData.preferredTime}\n\n📞 ${formData.phone}\n\nA specialist will contact you within 24 hours to confirm.\n\nReference: ${result.appointmentId}`);

        // Reset form and close modal
        setFormData({
          firstName: '',
          phone: '',
          preferredTime: '',
          reason: ''
        });
        onClose();
      } else {
        // Error - show error message
        alert(`❌ Failed to submit appointment:\n\n${result.message || result.error}\n\n📞 Call us: +1-561-583-1280`);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert(`❌ Network error. Please try again or call us: +1-561-583-1280`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          ×
        </button>

        <h3 className={styles.modalTitle}>Book Consultation</h3>
        <p className={styles.subtitle}>
          We'll call you back within 24 hours
        </p>

        <form onSubmit={handleSubmit} className={styles.appointmentForm}>
          {/* First Name */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="Enter your first name"
              className={styles.input}
            />
          </div>

          {/* Phone Number */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="(555) 123-4567"
              className={styles.input}
            />
          </div>

          {/* Preferred Time */}
          <div className={styles.formGroup}>
            <label htmlFor="preferredTime" className={styles.label}>
              Best Time to Call *
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              required
              className={styles.select}
            >
              <option value="">Choose a time slot...</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Reason for Appointment */}
          <div className={styles.formGroup}>
            <label htmlFor="reason" className={styles.label}>
              Reason for Appointment
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Select a reason (optional)...</option>
              {appointmentReasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;