import Image from 'next/image';

interface MintBadgeProps {
  variant?: 'default' | 'compact' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

export default function MintBadge({ variant = 'default', className, style }: MintBadgeProps) {
  const getStyles = () => {
    const baseStyle = {
      display: "inline-flex" as const,
      alignItems: "center" as const,
      gap: "0.5rem",
      background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)",
      border: "1px solid #cbd5e1",
      borderRadius: "16px",
      fontSize: "0.75rem",
      fontWeight: "600" as const,
      color: "#475569",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      ...style
    };

    switch (variant) {
      case 'compact':
        return {
          ...baseStyle,
          padding: "0.25rem 0.625rem",
          fontSize: "0.75rem",
          fontWeight: "500" as const,
        };
      case 'large':
        return {
          ...baseStyle,
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          gap: "0.75rem",
        };
      default:
        return {
          ...baseStyle,
          padding: "0.25rem 0.625rem",
          marginTop: "1rem",
          marginBottom: "1.25rem",
        };
    }
  };

  const getImageSize = () => {
    switch (variant) {
      case 'compact':
        return { width: 12, height: 12 };
      case 'large':
        return { width: 18, height: 18 };
      default:
        return { width: 16, height: 16 };
    }
  };

  const imageSize = getImageSize();

  return (
    <div className={className} style={getStyles()}>
      <div style={{
        width: `${imageSize.width + 4}px`,
        height: `${imageSize.width + 4}px`,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #cbd5e1",
        flexShrink: 0,
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.8)"
      }}>
        <Image
          src="/assets/images/mint-mascot.png"
          alt="Mint AI"
          width={imageSize.width}
          height={imageSize.height}
          style={{ display: 'inline-block' }}
        />
      </div>
      <span>Powered by Mint AI</span>
    </div>
  );
}
