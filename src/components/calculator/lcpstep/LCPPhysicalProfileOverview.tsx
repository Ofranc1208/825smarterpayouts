"use client";

import React, { useState, useRef, useEffect } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { LCPButton, LCPSection, LCPNavigationButton } from './shared';
import layout from './utils/LCPLayout.module.css';
import utilities from './utils/LCPUtilities.module.css';
import styles from './LCPPhysicalProfileOverview.module.css';

const AGES = ['18–25', '26–35', '36–45', '46–50', '51–56', '57–65'];
const GENDERS = ['Male', 'Female', 'Other'];
const BODY_FRAMES = ['Small', 'Medium', 'Large'];
const WEIGHTS = [
  { short: 'Under', full: 'Underweight' },
  { short: 'Normal', full: 'Normal Weight' },
  { short: 'Over', full: 'Overweight' },
  { short: 'Obese', full: 'Obesity' },
  { short: 'Severe', full: 'Severe Obesity' },
];

interface Props {
  initialData?: {
    ageRange?: string;
    gender?: string;
    bodyFrame?: string;
    weight?: string;
  };
  onNext: (data: { ageRange: string; gender: string; bodyFrame: string; weight: string }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

const LCPPhysicalProfileOverview: React.FC<Props> = ({ initialData, onNext, onBack, currentStep, totalSteps }) => {
  const [ageRange, setAgeRange] = useState(initialData?.ageRange || '');
  const [gender, setGender] = useState(initialData?.gender || '');
  const [bodyFrame, setBodyFrame] = useState(initialData?.bodyFrame || '');
  const [weight, setWeight] = useState(initialData?.weight || '');
  const [touched, setTouched] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const genderSectionRef = useRef<HTMLDivElement>(null);
  const bodyFrameSectionRef = useRef<HTMLDivElement>(null);
  const weightSectionRef = useRef<HTMLDivElement>(null);

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.ageRange) setAgeRange(initialData.ageRange);
    if (initialData?.gender) setGender(initialData.gender);
    if (initialData?.bodyFrame) setBodyFrame(initialData.bodyFrame);
    if (initialData?.weight) setWeight(initialData.weight);
  }, [initialData]);

  // Auto-scroll to next section when a field is filled
  useEffect(() => {
    if (ageRange && genderSectionRef.current) {
      genderSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [ageRange]);

  useEffect(() => {
    if (gender && bodyFrameSectionRef.current) {
      bodyFrameSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [gender]);

  useEffect(() => {
    if (bodyFrame && weightSectionRef.current) {
      weightSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [bodyFrame]);

  const isValid = ageRange && gender && bodyFrame && weight;

  const handleWeightSelect = (full: string) => {
    setWeight(full);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      onNext({ ageRange, gender, bodyFrame, weight });
    }
  };

  return (
    <LCPStepContainer title="Physical Profile Overview" currentStep={currentStep} totalSteps={totalSteps}>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <LCPSection label="Age">
            {AGES.map((age) => (
              <LCPButton
                key={age}
                variant="option"
                selected={ageRange === age}
                onClick={() => setAgeRange(age)}
              >
                {age}
              </LCPButton>
            ))}
          </LCPSection>

          <div ref={genderSectionRef}>
            <LCPSection label="Gender">
              {GENDERS.map((g) => (
                <LCPButton
                  key={g}
                  variant="option"
                  selected={gender === g}
                  onClick={() => setGender(g)}
                >
                  {g}
                </LCPButton>
              ))}
            </LCPSection>
          </div>

          <div ref={bodyFrameSectionRef}>
            <LCPSection label="Body Frame">
              {BODY_FRAMES.map((frame) => (
                <LCPButton
                  key={frame}
                  variant="option"
                  selected={bodyFrame === frame}
                  onClick={() => setBodyFrame(frame)}
                >
                  {frame}
                </LCPButton>
              ))}
            </LCPSection>
          </div>

          <div ref={weightSectionRef}>
            <LCPSection label="Weight">
              {WEIGHTS.map((w) => (
                <LCPButton
                  key={w.full}
                  variant="option"
                  selected={weight === w.full}
                  onClick={() => handleWeightSelect(w.full)}
                >
                  {w.short}
                </LCPButton>
              ))}
            </LCPSection>
          </div>

          <div className={layout.actionRow} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
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
      </div>
    </LCPStepContainer>
  );
};

export default LCPPhysicalProfileOverview; 