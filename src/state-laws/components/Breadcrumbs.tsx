// Breadcrumbs Component for State Laws Navigation
// Enterprise implementation with proper accessibility and SEO

import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <Link
        href="/"
        className="hover:text-green-600 transition-colors"
      >
        Home
      </Link>
      <span className="text-gray-400">›</span>

      {items.map((item, index) => (
        <span key={item.url} className="flex items-center space-x-2">
          {index > 0 && <span className="text-gray-400">›</span>}
          {index === items.length - 1 ? (
            <span
              className="text-gray-900 font-medium"
              aria-current="page"
            >
              {item.name}
            </span>
          ) : (
            <Link
              href={item.url}
              className="hover:text-green-600 transition-colors"
            >
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

// Preset breadcrumb configurations
export const StateLawsBreadcrumbs = () => (
  <Breadcrumbs items={[{ name: 'State Laws', url: '/state-laws' }]} />
);

export const StatePageBreadcrumbs = ({ stateName, stateSlug }: { stateName: string; stateSlug: string }) => (
  <Breadcrumbs
    items={[
      { name: 'State Laws', url: '/state-laws' },
      { name: stateName, url: `/state-laws/${stateSlug}` }
    ]}
  />
);

export const CountyPageBreadcrumbs = ({
  stateName,
  stateSlug,
  countyName,
  countySlug
}: {
  stateName: string;
  stateSlug: string;
  countyName: string;
  countySlug: string;
}) => (
  <Breadcrumbs
    items={[
      { name: 'State Laws', url: '/state-laws' },
      { name: stateName, url: `/state-laws/${stateSlug}` },
      { name: countyName, url: `/state-laws/${stateSlug}/${countySlug}` }
    ]}
  />
);
