import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateCalculatorMetadata('lump-sum-calculator', '/lump-sum-calculator');

export default function LumpSumCalculatorPage() {
  redirect('/mint-intelligent-chat');
}
