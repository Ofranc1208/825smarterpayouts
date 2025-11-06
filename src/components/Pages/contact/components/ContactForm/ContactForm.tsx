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
      padding: "1rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      border: "1px solid #e2e8f0"
    }}>
      <h3 style={{
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: "0.25rem",
        marginTop: "0",
        textAlign: "center"
      }}>
        Send us a Message
      </h3>
      <p style={{
        textAlign: "center",
        color: "#6b7280",
        fontSize: "0.75rem",
        marginBottom: "1rem",
        marginTop: "0"
      }}>
        We'll respond within 24 hours
      </p>

      {submitStatus === 'success' && (
        <div style={{
          background: "#d1fae5",
          border: "1px solid #a7f3d0",
          color: "#065f46",
          padding: "0.75rem",
          borderRadius: "6px",
          marginBottom: "0.75rem",
          textAlign: "center",
          fontSize: "0.85rem"
        }}>
          ✅ Thank you! Your message has been sent successfully.
        </div>
      )}

      {submitStatus === 'error' && (
        <div style={{
          background: "#fee2e2",
          border: "1px solid #fca5a5",
          color: "#991b1b",
          padding: "0.75rem",
          borderRadius: "6px",
          marginBottom: "0.75rem",
          textAlign: "center",
          fontSize: "0.85rem"
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
