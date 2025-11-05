import { MintHeaderContainer } from '../mint-header';
import Button from '@/src/components/shared/Button/Button';
import { SPACING } from '@/src/components/shared/styles';

export default function MintContent() {
  return (
    <>
      <MintHeaderContainer />
      <div style={{ marginTop: SPACING.stack.md }}>
        <Button
          as="a"
          href="/mint-intelligent-chat?chat=open&feature=calculator"
          variant="mint-chat"
          size="lg"
          enhancedHover={true}
        >
          Chat with Mint AI
        </Button>
      </div>
    </>
  );
}
