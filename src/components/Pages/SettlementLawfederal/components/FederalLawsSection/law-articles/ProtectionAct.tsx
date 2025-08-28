// Structured Settlement Protection Act article - under 50 lines per complexity rule
// 2002 Protection Act details

import { LawArticle, LawTitle, LawDescription, IRCSection } from '../law-components';

export default function ProtectionAct() {
  return (
    <LawArticle>
      <LawTitle icon="🛡️">
        Structured Settlement Protection Act of 2002
      </LawTitle>
      <LawDescription>
        The <strong>Structured Settlement Protection Act of 2002</strong> (SSPA) was enacted as part of the Victims of Terrorism Tax Relief Act. It requires <strong>court approval</strong> for any transfer (sale) of structured settlement payment rights. Key provisions include:
      </LawDescription>
      <IRCSection code="IRC § 5891" color="#dc2626">
        Imposes a <strong>40% excise tax</strong> on any transfer of structured settlement payment rights that is not approved in advance by a court or responsible administrative authority under applicable state law.
      </IRCSection>
      <IRCSection code="Best Interest" color="#8b5cf6">
        Ensures that transfers are in the "best interest" of the payee and their dependents, and that the payee has received independent professional advice.
      </IRCSection>
      <LawDescription marginBottom="0">
        This law protects structured settlement recipients from predatory practices and ensures judicial oversight of all transfers.
      </LawDescription>
    </LawArticle>
  );
}
