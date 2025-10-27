'use client';

/**
 * Quick Answer Section Component - How Fast Page
 * 
 * Displays collapsible quick answer overview with key timing information.
 * Uses design system tokens for consistent styling.
 * Fully accessible with semantic HTML and proper ARIA labels.
 * 
 * @component
 * @returns {JSX.Element} Rendered quick answer section
 * 
 * @example
 * <QuickAnswerSection />
 */

import { useState } from 'react';
import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

export default function QuickAnswerSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      aria-label="Quick answer overview"
      style={{
        paddingTop: SPACING.unit.lg,
        paddingBottom: SPACING.unit.lg,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        background: COLORS.backgrounds.white
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        {/* Collapsible Header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: BORDER_RADIUS.large,
            padding: SPACING.unit.md,
            marginBottom: isOpen ? SPACING.stack.md : '0',
            border: `2px solid ${COLORS.borders.light}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING.inline.md
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: COLORS.backgrounds.white,
                borderRadius: BORDER_RADIUS.circle,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: TYPOGRAPHY.fontSize.heading.h5
              }}>!</div>
              <h2 style={{
                fontSize: TYPOGRAPHY.fontSize.heading.h5,
                fontWeight: TYPOGRAPHY.fontWeight.bold,
                color: COLORS.text.primary,
                margin: 0
              }}>Quick Answer</h2>
            </div>
            <span style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              color: COLORS.text.secondary,
              transition: 'transform 0.2s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              ▼
            </span>
          </div>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: BORDER_RADIUS.large,
            padding: SPACING.card.compact,
            marginBottom: SPACING.stack.lg,
            border: `1px solid ${COLORS.borders.light}`
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: SPACING.grid.standard,
              marginBottom: SPACING.stack.sm
            }}>
              {[
                { title: 'Total Time:', value: '30-45 days from quote to cash' },
                { title: 'After Court Approval:', value: '24-72 hours to receive funds' },
                { title: 'Court Approval:', value: 'Typically 2-4 weeks' },
                { title: 'Emergency Cases:', value: 'Can be expedited with priority processing' }
              ].map((item, index) => (
                <div key={index} style={{
                  background: COLORS.backgrounds.white,
                  borderRadius: BORDER_RADIUS.medium,
                  padding: SPACING.unit.sm,
                  border: `1px solid ${COLORS.borders.light}`
                }}>
                  <div style={{ 
                    fontWeight: TYPOGRAPHY.fontWeight.semibold, 
                    color: COLORS.text.primary, 
                    marginBottom: SPACING.unit.xxs,
                    fontSize: TYPOGRAPHY.fontSize.body.small
                  }}>
                    {item.title}
                  </div>
                  <div style={{ 
                    color: COLORS.text.secondary,
                    fontSize: TYPOGRAPHY.fontSize.body.small
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mint AI Quick Help */}
            <div style={{
              padding: SPACING.unit.sm,
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: BORDER_RADIUS.medium,
              border: `1px solid ${COLORS.borders.light}`,
              textAlign: 'center'
            }}>
              <div style={{
                marginBottom: SPACING.unit.sm,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: COLORS.primary.tech,
                fontSize: TYPOGRAPHY.fontSize.body.small
              }}>
                Ask Mint AI for personalized timing estimates!
              </div>
              <Button
                as="a"
                href="/mint-intelligent-chat"
                variant="mint-chat"
                size="md"
                enhancedHover={true}
              >
                Get My Timeline
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
