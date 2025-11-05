import { SPACING } from '@/src/components/shared/styles';
import MintTitle from './MintTitle';
import MintDescription from './MintDescription';

export default function MintHeaderContainer() {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: SPACING.stack.md
    }}>
      <MintTitle />
      <MintDescription />
    </div>
  );
}
