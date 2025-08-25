import GetOfferButton from './GetOfferButton';
import ChatMintButton from './ChatMintButton';

export default function FinalCTAButtonsContainer() {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '2rem'
    }}>
      <GetOfferButton />
      <ChatMintButton />
    </div>
  );
}
