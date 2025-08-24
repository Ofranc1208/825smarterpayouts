import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MintAICTA() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid #93c5fd'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <Image 
          src="/assets/images/mint-mascot.png" 
          alt="Mint AI" 
          width={32} 
          height={32}
          style={{ borderRadius: '50%' }}
        />
        <span style={{ color: '#1d4ed8', fontWeight: 600 }}>
          Need help? Mint AI is here to guide you!
        </span>
      </div>
      
      <Link href="/mint-intelligent-chat" style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: '#ffffff',
        padding: '0.75rem 1.5rem',
        borderRadius: '25px',
        fontSize: '1rem',
        fontWeight: 600,
        textDecoration: 'none',
        display: 'inline-block'
      }}>
        💬 Chat with Mint AI First
      </Link>
    </div>
  );
}
