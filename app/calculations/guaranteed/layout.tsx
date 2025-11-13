import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateCalculatorMetadata('guaranteed', '/calculations/guaranteed');

export default function GuaranteedCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

