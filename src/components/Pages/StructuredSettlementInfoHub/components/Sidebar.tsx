/**
 * Sidebar Component
 * Contains CTA cards and related articles
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS from shared/styles
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import type { SidebarProps } from '../types';

export const Sidebar: React.FC<SidebarProps> = ({ relatedArticles = [] }) => {
  return (
    <aside style={{ 
      width: '300px',
      position: 'sticky',
      top: '2rem',
      height: 'fit-content'
    }} className="sidebar">
      {/* Get Instant Quote Card */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: BORDER_RADIUS.large,
        boxShadow: BOX_SHADOWS.small,
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: COLORS.text.primary,
          marginBottom: '0.75rem'
        }}>
          💰 Get Your Instant Quote
        </h3>
        <p style={{
          color: COLORS.text.tertiary,
          lineHeight: '1.6',
          marginBottom: '1rem',
          fontSize: '0.9375rem'
        }}>
          Find out how much your structured settlement is worth today.
        </p>
        <Link href="/pricing-calculator" style={{
          display: 'block',
          background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(9, 180, 77, 0.2)',
          transition: 'transform 0.2s ease'
        }}>
          Calculate Your Offer
        </Link>
      </div>

      {/* Chat with Mint AI Card */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: BORDER_RADIUS.large,
        boxShadow: BOX_SHADOWS.small,
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: COLORS.text.primary,
          marginBottom: '0.75rem'
        }}>
          💬 Chat with Mint AI
        </h3>
        <p style={{
          color: COLORS.text.tertiary,
          lineHeight: '1.6',
          marginBottom: '1rem',
          fontSize: '0.9375rem'
        }}>
          Get instant answers to your settlement questions 24/7.
        </p>
        <Link href="/mint-intelligent-chat" style={{
          display: 'block',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)',
          transition: 'transform 0.2s ease'
        }}>
          Chat with Mint AI
        </Link>
      </div>

      {/* Related Articles Card */}
      {relatedArticles.length > 0 && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: BORDER_RADIUS.large,
          boxShadow: BOX_SHADOWS.small,
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: COLORS.text.primary,
            marginBottom: '1rem'
          }}>
            📄 Related Articles
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {relatedArticles.map((article, index) => (
              <li key={index} style={{ marginBottom: index < relatedArticles.length - 1 ? '0.75rem' : 0 }}>
                <Link href={article.link} style={{
                  color: COLORS.primary.main,
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.9375rem',
                  transition: 'color 0.2s ease'
                }}>
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

