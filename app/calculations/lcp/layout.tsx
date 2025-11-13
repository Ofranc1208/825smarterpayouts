import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateCalculatorMetadata('lcp', '/calculations/lcp');

export default function LCPCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

