import ClientProviders from './ClientProviders';

// Force dynamic rendering for all calculations pages to prevent useSearchParams issues
export const dynamic = 'force-dynamic';

export default function CalculationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      {children}
    </ClientProviders>
  );
} 