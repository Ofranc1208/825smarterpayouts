import React from 'react';

interface TooltipModalProps {
  showTooltip: boolean;
  tooltipContent: string;
  hideInfo: () => void;
}

export default function TooltipModal({
  showTooltip,
  tooltipContent,
  hideInfo
}: TooltipModalProps) {
  if (!showTooltip) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }}
        onClick={hideInfo}
      />
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ffffff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          maxWidth: '400px',
          width: '90%',
          zIndex: 1001
        }}
        dangerouslySetInnerHTML={{ __html: tooltipContent }}
      />
    </>
  );
}
