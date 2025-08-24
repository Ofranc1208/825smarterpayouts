import ClientProviders from './ClientProviders';

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