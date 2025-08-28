// Victims of Terrorism Tax Relief Act article - under 50 lines per complexity rule
// 2001 Terrorism Relief Act details

import { LawArticle, LawTitle, LawDescription } from '../law-components';

export default function TerrorismReliefAct() {
  return (
    <LawArticle isLast={true}>
      <LawTitle icon="🏢">
        Victims of Terrorism Tax Relief Act of 2001
      </LawTitle>
      <LawDescription marginBottom="0">
        This Act includes provisions that further protect structured settlement holders, especially those affected by terrorism or certain disasters. It clarifies and strengthens the requirements for court approval and the tax treatment of structured settlements.
      </LawDescription>
    </LawArticle>
  );
}
