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
    name: '',
    phone: '',
    preferredDateTime: '',
    consultationType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultationTypes = [
    'Get a Quote',
    'Compare Offers',
    'General Questions'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.preferredDateTime || !formData.consultationType) {
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
          preferredDate: formData.preferredDateTime.split('T')[0], // Extract date
          preferredTime: formData.preferredDateTime.split('T')[1] || 'Any time' // Extract time
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success - show confirmation message
        const dateTime = new Date(formData.preferredDateTime);
        const dateStr = dateTime.toLocaleDateString();
        const timeStr = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        alert(`✅ Appointment Booked!\n\nHi ${formData.name}! We'll call you on ${dateStr} at ${timeStr}.\n\n📞 ${formData.phone}\n💬 ${formData.consultationType}\n${formData.message ? `\n📝 Your message: ${formData.message}` : ''}\n\nA specialist will contact you within 24 hours to confirm.\n\nReference: ${result.appointmentId}`);

        // Reset form and close modal
        setFormData({
          name: '',
          phone: '',
          preferredDateTime: '',
          consultationType: '',
          message: ''
        });
        onClose();
      } else {
        // Error - show error message
        alert(`❌ Failed to submit appointment:\n\n${result.message || result.error}\n\n📞 Call us: +1-561-583-1280`);
      }
    } catch (error) {
      console.error('Appointment booking failed:', error);
      alert('❌ Network error. Please call us: +1-561-583-1280');
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

        <h3 className={styles.modalTitle}>📅 Book Your Consultation</h3>
        <p className={styles.subtitle}>
          We'll contact you within 24 hours
        </p>

        <form onSubmit={handleSubmit} className={styles.appointmentForm}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              👤 Your First Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your first name"
              className={styles.input}
            />
          </div>

          {/* Date & Time Combined */}
          <div className={styles.formGroup}>
            <label htmlFor="preferredDateTime" className={styles.label}>
              📅 Select Date & Time *
            </label>
            <input
              type="datetime-local"
              id="preferredDateTime"
              name="preferredDateTime"
              value={formData.preferredDateTime}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().slice(0, 16)}
              className={styles.dateInput}
            />
          </div>

          {/* Phone Number */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              📞 Your Phone Number *
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

          {/* What do you need help with? */}
          <div className={styles.formGroup}>
            <label htmlFor="consultationType" className={styles.label}>
              💬 What do you need help with? *
            </label>
            <select
              id="consultationType"
              name="consultationType"
              value={formData.consultationType}
              onChange={handleInputChange}
              required
              className={styles.select}
            >
              <option value="">Choose one...</option>
              {consultationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>


          {/* Message */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              💭 Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your structured settlement or any questions..."
              rows={3}
              className={styles.textarea}
            />
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
              {isSubmitting ? '⏳ Booking...' : '✅ Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
