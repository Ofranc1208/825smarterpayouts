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
      actionLink: "tel:+1-800-555-0123"
    },
    {
      icon: "✉️",
      title: "Email Us",
      description: "Send us your questions and we'll respond within 24 hours with personalized assistance.",
      actionText: "Send Email",
      actionLink: "mailto:contact@smarterpayouts.com"
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
      description: "Meet with our team in person at our headquarters for a comprehensive consultation.",
      actionText: "Get Directions",
      actionLink: "https://maps.google.com"
    }
  ];

  return (
    <section style={{
      padding: "4rem 0",
      background: "#f9fafb"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "1rem"
          }}>
            Multiple Ways to Connect
          </h2>
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Choose the method that works best for you. Our team is ready to help you maximize your settlement value.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
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
      </div>
    </section>
  );
}
