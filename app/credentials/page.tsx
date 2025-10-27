import dynamic from 'next/dynamic';
import CredentialsPage from '@/src/components/Pages/Credentials/page';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata = {
  title: 'Our Credentials | SmarterPayouts',
  description: 'Verify SmarterPayouts credentials including Florida corporation status and SSL certification. Transparent and trustworthy structured settlement company.',
  keywords: 'SmarterPayouts credentials, Florida corporation, SSL certificate, structured settlement company verification',
};

export default function Credentials() {
  return (
    <>
      <CredentialsPage />
      <LazyFABSpeedDial />
    </>
  );
}
