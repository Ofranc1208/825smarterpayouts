import { SITE_STATS } from '../../../../../../../app/config/siteConfig';
import StatCard from './StatCard';

export default function StatsGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    }}>
      <StatCard
        value={SITE_STATS.compliance.value}
        label="Legal Compliance Rate"
        link={SITE_STATS.compliance.link}
        description={SITE_STATS.compliance.description}
      />
      <StatCard
        value={SITE_STATS.statesCovered.value}
        label="States We Serve"
        link={SITE_STATS.statesCovered.link}
        description={SITE_STATS.statesCovered.description}
      />
      <StatCard
        value={SITE_STATS.avgDays.value}
        label="Average Process Days"
        link={SITE_STATS.avgDays.link}
        description={SITE_STATS.avgDays.description}
      />
    </div>
  );
}
