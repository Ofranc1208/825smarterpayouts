// Periodic Payment Settlement Act article - under 50 lines per complexity rule
// 1982 Act details

import { LawArticle, LawTitle, LawDescription, IRCSection } from '../law-components';

export default function PeriodicPaymentAct() {
  return (
    <LawArticle>
      <LawTitle icon="🏛️">
        Periodic Payment Settlement Act of 1982
      </LawTitle>
      <LawDescription>
        The <strong>Periodic Payment Settlement Act of 1982</strong> (Public Law 97-473) was enacted to encourage the use of structured settlements for tort victims. It provides significant tax benefits for both payees and qualified assignees under:
      </LawDescription>
      <IRCSection code="IRC § 104(a)(2)">
        Excludes damages received on account of personal physical injuries or sickness from gross income.
      </IRCSection>
      <IRCSection code="IRC § 130">
        Allows qualified assignments of periodic payment obligations, enabling third parties to assume payment responsibilities without adverse tax consequences.
      </IRCSection>
      <LawDescription marginBottom="0">
        This law ensures that structured settlement payments are tax-free to the recipient and promotes long-term financial security for injury victims.
      </LawDescription>
    </LawArticle>
  );
}
