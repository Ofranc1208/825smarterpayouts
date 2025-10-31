'use client';
import ContactCard from './ContactCard';

interface ContactInfoProps {
  onCardClick?: (cardId: string) => void;
}

export default function ContactInfo({ onCardClick }: ContactInfoProps) {
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
      description: "Available Monday-Friday, 9 AM - 6 PM EST.",
      actionText: "Call Now",
      actionLink: "tel:+1-561-583-1280"
    },
    {
      icon: "✉️",
      title: "Email Us",
      description: "We'll respond within 24 hours.",
      actionText: "Send Email",
      actionLink: "mailto:info@smarterpayouts.com"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: companyAddress.fullAddress, // Show full formatted address
      actionText: "Get Directions",
      actionLink: `https://maps.google.com/maps?q=${encodeURIComponent(`${companyAddress.street}, ${companyAddress.city}, ${companyAddress.state} ${companyAddress.zip}`)}`,
      address: companyAddress // Pass address object for structured display
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.25rem',
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
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
