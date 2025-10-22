// Table of Contents Component for State Laws Pages
// Enterprise implementation with smooth scrolling and accessibility

'use client';

import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
  sticky?: boolean;
}

export default function TableOfContents({
  items,
  className = "",
  sticky = true
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  // Generate TOC from page content
  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocItems: TOCItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      const level = parseInt(heading.tagName.charAt(1));

      // Only include h2 and h3 for cleaner TOC
      if (level === 2 || level === 3) {
        if (!heading.id) {
          heading.id = id;
        }
        tocItems.push({
          id,
          title: heading.textContent || '',
          level
        });
      }
    });

    // Update items if they weren't provided
    if (items.length === 0 && tocItems.length > 0) {
      // This would need to be passed up to parent component
      // For now, we'll work with provided items
    }
  }, [items]);

  // Track active section for highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  // Show/hide TOC based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (items.length === 0) return null;

  const tocClasses = sticky
    ? `fixed top-24 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-40 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`
    : 'bg-gray-50 border border-gray-200 rounded-lg p-4';

  return (
    <div className={`${tocClasses} ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Table of Contents
      </h3>
      <nav>
        <ul className="space-y-1 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <button
                onClick={() => handleLinkClick(item.id)}
                className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                  activeId === item.id
                    ? 'text-green-600 bg-green-50 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// Generate TOC items from current page content
export function generateTOCItems(): TOCItem[] {
  if (typeof window === 'undefined') return [];

  const headings = document.querySelectorAll('h2, h3');
  const items: TOCItem[] = [];

  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    const level = parseInt(heading.tagName.charAt(1));

    if (!heading.id) {
      heading.id = id;
    }

    items.push({
      id,
      title: heading.textContent || '',
      level
    });
  });

  return items;
}

// Preset TOC for state pages
export const StatePageTOC = () => {
  const items: TOCItem[] = [
    { id: 'key-provisions', title: 'Key Legal Provisions', level: 2 },
    { id: 'court-approval', title: 'Court Approval Criteria', level: 2 },
    { id: 'prohibited-actions', title: 'Prohibited Actions', level: 2 },
    { id: 'resources', title: 'Official Resources', level: 2 },
    { id: 'compare-states', title: 'Compare States', level: 2 }
  ];

  return <TableOfContents items={items} />;
};

// Preset TOC for county pages
export const CountyPageTOC = () => {
  const items: TOCItem[] = [
    { id: 'court-information', title: 'Court Information', level: 2 },
    { id: 'filing-procedures', title: 'Filing Procedures', level: 2 },
    { id: 'local-requirements', title: 'Local Requirements', level: 2 },
    { id: 'resources', title: 'Local Resources', level: 2 }
  ];

  return <TableOfContents items={items} />;
};
