'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import HeroSection from './components/HeroSection';
import ChatSection from './components/ChatSection';
import IndustryProblemsSection from './components/IndustryProblemsSection';
import SolutionSection from './components/SolutionSection';
import BenefitsGrid from './components/BenefitsGrid';

/**
 * Self-contained Mint Chat Page Component
 * 
 * Main orchestrator component that combines all sections of the
 * Mint chat experience. Each section is a focused, single-responsibility
 * component to maintain clean architecture.
 * 
 * @component MintChatPage
 * @author SmarterPayouts Team
 * @since 2024
 */

// Dynamic imports for performance optimization
const LazyFABSpeedDial = dynamic(() => import('../../../../app/components/FABSpeedDial'), { ssr: false });
// Note: LazyChatWidget removed - chat functionality integrated directly into this module

/**
 * Main Mint Chat Page Component
 * 
 * Orchestrates the complete chat experience by combining focused
 * sub-components. Each component handles a single responsibility.
 */
const MintChatPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Chat with Mint AI Assistant | SmarterPayouts</title>
        <meta name="description" content="Get instant answers about your structured settlement with our AI-powered assistant. No personal information required - just ask and get expert guidance immediately." />
        <meta name="keywords" content="AI assistant, structured settlement chat, instant quotes, settlement questions, Mint AI" />
      </Head>

      {/* Hero Section with Mint AI branding */}
      <HeroSection />

      {/* Main Chat Interface */}
      <ChatSection />

      {/* SEO and Educational Content */}
      <section style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        padding: "4rem 0",
        borderTop: "1px solid #e5e7eb"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem"
        }}>
          {/* Industry Problems */}
          <IndustryProblemsSection />

          {/* Solution Introduction */}
          <SolutionSection />

          {/* Benefits Grid */}
          <BenefitsGrid />
        </div>
      </section>

      {/* Dynamic Components */}
      <LazyFABSpeedDial />
      {/* Note: Chat widget functionality is now integrated directly into ChatSection */}
    </>
  );
};

export default MintChatPage;
