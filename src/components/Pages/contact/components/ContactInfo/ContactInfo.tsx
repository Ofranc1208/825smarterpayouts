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
      description: "Speak directly with our settlement experts. Available Monday-Friday, 9 AM - 6 PM EST.",
      actionText: "Call Now",
      actionLink: "tel:+1-561-583-1280"
    },
    {
      icon: "✉️",
      title: "Email Us",
      description: "Send us your questions and we'll respond within 24 hours with personalized assistance.",
      actionText: "Send Email",
      actionLink: "mailto:info@smarterpayouts.com"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Get instant answers from our AI assistant Mint, available 24/7 to help with your questions.",
      actionText: "Start Chat",
      actionLink: "/mint-intelligent-chat"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Meet with our team in person at our Florida headquarters for a comprehensive consultation.",
      actionText: "Get Directions",
      actionLink: "https://maps.google.com/maps?q=SmarterPayouts+Florida"
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1.5rem',
      width: '100%'
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
