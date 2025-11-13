import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateCalculatorMetadata('pricing-calculator', '/pricing-calculator');

export default function PricingCalculatorPage() {
  redirect('/mint-intelligent-chat');
}
