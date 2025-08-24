"use client";
import PlatformXManager from '../platforms/PlatformX/Manager';
import FacebookManager from '../platforms/Facebook/Manager';
import MediumManager from '../platforms/Medium/Manager';
import LinkedInManager from '../platforms/LinkedIn/Manager';

type PlatformManagerProps = {
  platformName: string;
  onBack: () => void;
};

export default function PlatformManager({ platformName, onBack }: PlatformManagerProps) {
  const name = platformName.toLowerCase();
  if (name === 'x' || name === 'twitter') return <PlatformXManager onBack={onBack} />;
  if (name === 'facebook') return <FacebookManager onBack={onBack} />;
  if (name === 'medium') return <MediumManager onBack={onBack} />;
  if (name === 'linkedin') return <LinkedInManager onBack={onBack} />;
  return <div style={{ padding: '1rem' }}>Unknown platform: {platformName}</div>;
}


