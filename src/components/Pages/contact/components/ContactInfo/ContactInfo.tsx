'use client';
import ContactCard from './ContactCard';
import { useState } from 'react';
import AppointmentModal from '@/src/components/chat/AppointmentModal/AppointmentModal';

interface ContactInfoProps {
  onCardClick?: (cardId: string) => void;
}

export default function ContactInfo({ onCardClick }: ContactInfoProps) {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Company address - formatted exactly like Google Maps displays it
  const companyAddress = {
    street: '15257 Amberly Dr Ste 233',
    city: 'Tampa',
    state: 'FL',
    zip: '33647',
    country: 'United States',
    // Google Maps format: Street, City, State ZIP, Country
    fullAddress: '15257 Amberly Dr Ste 233\nTampa, FL 33647\nUnited States'
  };

  const contactMethods = [
    {
      icon: "📞",
      title: "Call Us",
      description: "+1 (855) 214-3510\nMon-Fri, 9AM-6PM EST",
      actionText: "Call Now",
      actionLink: "tel:+1-855-214-3510"
    },
    {
      icon: "📅",
      title: "Book Appointment",
      description: "Free consultation",
      actionText: "Schedule Now",
      actionLink: "#",
      isAppointment: true
    },
    {
      icon: "✉️",
      title: "Email Us",
      description: "Response within 24 hours",
      actionText: "Send Email",
      actionLink: "mailto:info@smarterpayouts.com"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "15257 Amberly Dr Ste 233\nTampa, FL 33647",
      actionText: "Get Directions",
      actionLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${companyAddress.street}, ${companyAddress.city}, ${companyAddress.state} ${companyAddress.zip}`)}`,
      address: companyAddress
    }
  ];

  const handleCardClick = (method: typeof contactMethods[0]) => {
    if (method.isAppointment) {
      setShowAppointmentModal(true);
    } else if (onCardClick) {
      onCardClick(method.title.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.5rem',
        width: '100%',
        alignItems: 'stretch'
      }}>
        {contactMethods.map((method, index) => (
          <ContactCard
            key={index}
            icon={method.icon}
            title={method.title}
            description={method.description}
            actionText={method.actionText}
            actionLink={method.actionLink}
            onClick={() => handleCardClick(method)}
            isAppointment={method.isAppointment}
          />
        ))}
      </div>
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />
    </>
  );
}
