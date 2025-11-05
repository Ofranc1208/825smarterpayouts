'use client';
import { useState } from 'react';
import { COLORS } from '@/src/components/shared/styles';
import FormFields from './FormFields';
import FormSubmitButton from './FormSubmitButton';

interface ContactFormProps {
  onFormSubmit?: (formData: FormData) => void;
}

export default function ContactForm({ onFormSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValidated(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onFormSubmit) {
        onFormSubmit(formData);
      }
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      e.currentTarget.reset();
      setFormValidated(false);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb"
    }}>
      <h3 style={{
        fontSize: "1.5rem",
        fontWeight: "700",
        color: COLORS.neutral.gray900,
        marginBottom: "1rem",
        textAlign: "center",
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        Send us a Message
      </h3>

      {submitStatus === 'success' && (
        <div style={{
          background: "#d1fae5",
          border: "1px solid #a7f3d0",
          color: "#065f46",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          textAlign: "center"
        }}>
          ✅ Thank you! Your message has been sent successfully.
        </div>
      )}

      {submitStatus === 'error' && (
        <div style={{
          background: "#fee2e2",
          border: "1px solid #fca5a5",
          color: "#991b1b",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          textAlign: "center"
        }}>
          ❌ Sorry, there was an error sending your message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormFields formValidated={formValidated} />
        <FormSubmitButton 
          isSubmitting={isSubmitting}
          onSubmit={() => {}}
        />
      </form>
    </div>
  );
}
