import React from 'react';
import ChoiceButton from './ChoiceButton';
import { payoutIcon, specialistIcon, processIcon } from './icons';
import type { ChatChoice } from './types';

interface WelcomeScreenProps {
  onStartChat: (choice: ChatChoice) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  console.log('[WelcomeScreen DEPLOYMENT DEBUG] === COMPONENT RENDER ===');
  console.log('[WelcomeScreen] onStartChat function exists:', !!onStartChat);
  console.log('[WelcomeScreen] onStartChat type:', typeof onStartChat);
  
  // Enhanced wrapper for onStartChat with deployment debugging
  const handleStartChat = (choice: ChatChoice) => {
    console.log('[WelcomeScreen] === BUTTON CLICKED ===');
    console.log('[WelcomeScreen] Choice:', choice);
    console.log('[WelcomeScreen] Calling parent onStartChat...');
    
    try {
      if (onStartChat && typeof onStartChat === 'function') {
        onStartChat(choice);
        console.log('[WelcomeScreen] ✅ Parent onStartChat called successfully');
      } else {
        console.error('[WelcomeScreen] ❌ onStartChat is not a function!', onStartChat);
      }
    } catch (error) {
      console.error('[WelcomeScreen] ❌ ERROR calling onStartChat:', error);
      console.error('[WelcomeScreen] Error stack:', error instanceof Error ? error.stack : 'No stack');
    }
  };

  return (
    <div style={{
      background: "transparent",
      minHeight: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "0 1rem 2rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      width: "100%",
      maxWidth: "none",
      position: "relative"
    }}>
      
      {/* Modern Welcome Card - Compact & Clean */}
      <div style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "24px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 20px 60px rgba(5, 150, 105, 0.1)",
        padding: "1.5rem 1.25rem",
        width: "100%",
        maxWidth: "480px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        marginTop: "0"
      }}>
        
        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "100px",
          height: "100px",
          background: "radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)",
          borderRadius: "50%"
        }}></div>
        
        <h2 style={{
          fontSize: "1.225rem",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "0.5rem",
          marginTop: "0.25rem",
          lineHeight: "1.3"
        }}>
          How can we help you today?
        </h2>
        
        <p style={{
          fontSize: "0.875rem",
          color: "#6b7280",
          marginBottom: "1rem",
          lineHeight: "1.5"
        }}>
          Choose how you'd like to get started with your structured settlement
        </p>

        {/* Mint Divider */}
        <div style={{
          width: "4rem",
          height: "3px",
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          borderRadius: "1.5px",
          margin: "0 auto 1rem auto"
        }}></div>

                {/* Button Group - Enhanced with Live Animations */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          width: "100%"
        }}>
          <ChoiceButton 
            icon={payoutIcon} 
            text="Calculate Your Payout Instantly" 
            description="Get your exact settlement value in seconds - no waiting, no personal info required"
            onClick={() => handleStartChat('calculate')}
            index={0}
          />
          
          {/* Talk to a Specialist with LIVE badge */}
          <div style={{ position: "relative" }}>
            {/* Live status indicator on specialist button */}
            <div style={{
              position: "absolute",
              top: "-0.5rem",
              right: "-0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0.75rem",
              background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
              borderRadius: "20px",
              border: "1px solid #22c55e",
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#047857",
              boxShadow: "0 2px 8px rgba(34, 197, 94, 0.2)",
              zIndex: 10
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
                animation: "livePulse 2s ease-in-out infinite"
              }}></div>
              LIVE
            </div>
            
            <ChoiceButton 
              icon={specialistIcon} 
              text="Connect with a Specialist" 
              description="Chat live or schedule a call with our settlement experts - completely free"
              onClick={() => handleStartChat('specialist')}
              index={1}
            />
          </div>
          
          <ChoiceButton 
            icon={processIcon} 
            text="Learn About Our Process" 
            description="Understand your options, timeline, and maximize your settlement value"
            onClick={() => handleStartChat('process')}
            index={2}
          />
        </div>

        {/* Trust Indicator */}
        <div style={{
          marginTop: "1rem",
          padding: "0.75rem",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          borderRadius: "12px",
          border: "1px solid #bbf7d0"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "0.25rem"
          }}>
            <span style={{ fontSize: "1rem" }}>🔒</span>
            <span style={{ 
              fontSize: "0.75rem", 
              fontWeight: "600", 
              color: "#047857" 
            }}>
              100% Private & Secure
            </span>
          </div>
          <p style={{
            fontSize: "0.6875rem",
            color: "#059669",
            margin: 0,
            lineHeight: "1.3"
          }}>
            No personal information required • Instant responses • Completely confidential
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 