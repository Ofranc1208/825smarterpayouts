"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { LCPButton, LCPSection, LCPNavigationButton, QuickHelpBadge } from './shared';
import layout from './utils/LCPLayout.module.css';
import utilities from './utils/LCPUtilities.module.css';

const SMOKE_OPTIONS = ['Yes', 'No'];
const HEALTH_OPTIONS = ['Great', 'Normal', 'Fair', 'Below'];
const CARDIAC_OPTIONS = ['Normal', 'Medicated', 'High', 'Unsure'];

interface Props {
  initialData?: {
    smoke?: string;
    health?: string;
    cardiac?: string;
  };
  onNext: (data: { smoke: string; health: string; cardiac: string }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

const LCPHealthOverview: React.FC<Props> = ({ initialData, onNext, onBack, currentStep, totalSteps }) => {
  const [smoke, setSmoke] = useState(initialData?.smoke || '');
  const [health, setHealth] = useState(initialData?.health || '');
  const [cardiac, setCardiac] = useState(initialData?.cardiac || '');
  const [touched, setTouched] = useState(false);

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.smoke) setSmoke(initialData.smoke);
    if (initialData?.health) setHealth(initialData.health);
    if (initialData?.cardiac) setCardiac(initialData.cardiac);
  }, [initialData]);

  const isValid = smoke && health && cardiac;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      onNext({ smoke, health, cardiac });
    }
  };

  return (
    <LCPStepContainer title="Lifestyle Overview" currentStep={currentStep} totalSteps={totalSteps}>
      <QuickHelpBadge />
      
      <form onSubmit={handleSubmit}>
        <LCPSection label="Do You Smoke?">
          {SMOKE_OPTIONS.map((opt) => (
            <LCPButton
              key={opt}
              variant="option"
              selected={smoke === opt}
              onClick={() => setSmoke(opt)}
            >
              {opt}
            </LCPButton>
          ))}
        </LCPSection>

        <LCPSection label="Health Profile">
          {HEALTH_OPTIONS.map((opt) => (
            <LCPButton
              key={opt}
              variant="option"
              selected={health === opt}
              onClick={() => setHealth(opt)}
            >
              {opt}
            </LCPButton>
          ))}
        </LCPSection>

        <LCPSection label="Cardiac Health">
          {CARDIAC_OPTIONS.map((opt) => (
            <LCPButton
              key={opt}
              variant="option"
              selected={cardiac === opt}
              onClick={() => setCardiac(opt)}
            >
              {opt}
            </LCPButton>
          ))}
        </LCPSection>

        <div className={layout.actionRow}>
          <LCPNavigationButton
            direction="back"
            disabled={!onBack}
            onClick={onBack}
            type="button"
            aria-label="Back to previous step"
          />
          <LCPNavigationButton
            direction="next"
            disabled={!isValid}
            type="submit"
            aria-label="Continue to next step"
          />
        </div>

        {touched && !isValid && (
          <p className={utilities.error} style={{ textAlign: 'center' }}>
            Please answer all questions.
          </p>
        )}
      </form>
    </LCPStepContainer>
  );
};

export default LCPHealthOverview; 