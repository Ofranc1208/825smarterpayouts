'use client';
import ContactCard from './ContactCard';

interface ContactInfoProps {
  onCardClick?: (cardId: string) => void;
}

export default function ContactInfo({ onCardClick }: ContactInfoProps) {
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
      icon: "💬",
      title: "Live Chat",
      description: "Available 24/7 for instant answers.",
      actionText: "Start Chat",
      actionLink: "/mint-intelligent-chat"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Meet with our team for consultation.",
      actionText: "Get Directions",
      actionLink: "https://maps.google.com/maps?q=SmarterPayouts+Florida"
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
