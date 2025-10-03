/**
 * Newsletter Section Component - Articles Page
 * 
 * Displays newsletter subscription form with email input.
 * Uses design system tokens for consistent styling.
 * Fully accessible with ARIA labels, keyboard navigation, and focus states.
 * 
 * @component
 * @returns {JSX.Element} Rendered newsletter subscription section
 * 
 * @example
 * <NewsletterSection />
 */

'use client';
import { useState, useEffect } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

export default function NewsletterSection() {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth >= 640);
    };
    
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    if (email) {
      // Here you would integrate with your email service provider
      alert('Thank you for subscribing! You\'ll receive updates about new articles and resources.');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <section
      aria-label="Newsletter subscription"
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        padding: `${SPACING.unit.xxl} ${SPACING.card.standard}`,
        borderRadius: BORDER_RADIUS.large,
        border: `1px solid ${COLORS.borders.light}`,
        marginTop: SPACING.unit.xxxl,
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: SPACING.stack.lg }}>
        <span style={{ 
          fontSize: '2rem', 
          marginBottom: SPACING.unit.md, 
          display: 'block' 
        }} aria-hidden="true">
          📬
        </span>
        <h2 style={{
          fontWeight: TYPOGRAPHY.fontWeight.bold,
          color: COLORS.primary.main,
          marginBottom: SPACING.stack.sm,
          fontSize: TYPOGRAPHY.fontSize.heading.h3
        }}>
          Stay Updated with New Articles
        </h2>
        <p style={{
          color: COLORS.text.secondary,
          fontSize: TYPOGRAPHY.fontSize.body.large,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          Get expert insights, tips, and guides delivered straight to your inbox. 
          Never miss important updates about structured settlements. You can also chat with Mint AI anytime for instant help.
        </p>
      </div>
      
      <form 
        onSubmit={handleSubscribe} 
        style={{ maxWidth: '400px', margin: '0 auto' }}
        aria-label="Newsletter subscription form"
      >
        <div style={{ 
          display: 'flex', 
          gap: SPACING.inline.sm,
          flexDirection: isWideScreen ? 'row' : 'column'
        }}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            aria-label="Email address"
            aria-required="true"
            style={{
              flex: 1,
              padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
              borderRadius: BORDER_RADIUS.medium,
              border: `1px solid ${COLORS.borders.light}`,
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = COLORS.primary.main;
              e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary.main}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = COLORS.borders.light;
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            aria-label="Subscribe to newsletter"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: COLORS.backgrounds.white,
              padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
              borderRadius: BORDER_RADIUS.medium,
              border: 'none',
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 4px 15px ${COLORS.primary.main}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary.main}40`;
              e.currentTarget.style.outline = `2px solid ${COLORS.primary.main}`;
              e.currentTarget.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.outline = 'none';
            }}
          >
            Subscribe
          </button>
        </div>
      </form>
      
      <p style={{
        color: COLORS.text.secondary,
        fontSize: TYPOGRAPHY.fontSize.body.small,
        marginTop: SPACING.stack.md,
        marginBottom: 0
      }}>
        📧 Monthly updates • 🔒 No spam • ✅ Unsubscribe anytime
      </p>
    </section>
  );
}

