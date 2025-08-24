'use client';
import dynamic from 'next/dynamic';
import Stats from '../components/Stats';

const MiniFAQ = dynamic(() => import('../components/MiniFAQ'), { ssr: false });
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false });

export default function MainClientContent() {
  return (
    <>
      <MiniFAQ />
      <Stats />
      <Testimonials />
    </>
  );
} 