import { SITE_STATS } from '../../../../../../../app/config/siteConfig';

export default function HeroDescription() {
  return (
    <p style={{
      fontSize: "1.125rem",
      color: "#6b7280",
      marginBottom: "2rem",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "0 auto 2rem"
    }}>
      Every transaction is reviewed and approved by a judge. We make the process simple, transparent, and fully compliant with <strong>{SITE_STATS.compliance.value} compliance rate</strong>.
    </p>
  );
}
