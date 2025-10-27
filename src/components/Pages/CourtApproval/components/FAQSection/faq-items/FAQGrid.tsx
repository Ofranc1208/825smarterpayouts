import CourtAppearanceFAQ from './CourtAppearanceFAQ';
import ApprovalTimeFAQ from './ApprovalTimeFAQ';
import JudgeQuestionsFAQ from './JudgeQuestionsFAQ';
import DocumentsFAQ from './DocumentsFAQ';

export default function FAQGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '0.875rem'
    }}>
      <CourtAppearanceFAQ />
      <ApprovalTimeFAQ />
      <JudgeQuestionsFAQ />
      <DocumentsFAQ />
    </div>
  );
}
