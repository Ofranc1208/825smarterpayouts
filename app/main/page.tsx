import HeroSection from '../components/HeroSection';
import ProcessSteps from '../components/ProcessSteps';
import InternalLinks from '../components/InternalLinks';
import ValueProps from '../components/ValueProps';
import Stats from '../components/Stats';
import CallToAction from '../components/CallToAction';

import MainClientContent from './MainClientContent';
import dynamic from 'next/dynamic';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export default function Main() {
  return (
    <>
      <HeroSection />
      <ProcessSteps />
      <InternalLinks />
      <ValueProps />
      <MainClientContent />
      <CallToAction />

      <LazyFABSpeedDial />
    </>
  );
} 