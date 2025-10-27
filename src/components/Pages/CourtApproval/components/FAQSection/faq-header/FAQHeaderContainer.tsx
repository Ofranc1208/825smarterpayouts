import FAQTitle from './FAQTitle';
import FAQDescription from './FAQDescription';
import FAQMintCTA from './FAQMintCTA';

export default function FAQHeaderContainer() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
      <FAQTitle />
      <FAQDescription />
      <FAQMintCTA />
    </div>
  );
}
