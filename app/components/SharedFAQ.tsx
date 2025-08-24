// Shared FAQ component that can be used in both server and client contexts
import { ReactNode } from 'react';

export interface FAQItem {
  id: string;
  question: string;
  answer: ReactNode;
  expanded?: boolean;
}

interface SharedFAQProps {
  items: FAQItem[];
  id: string;
  className?: string;
  isClient?: boolean;
}

// Server component by default
export default function SharedFAQ({ items, id, className = '', isClient = false }: SharedFAQProps) {
  const accordionClass = isClient ? 'accordion' : 'accordion-static';
  
  return (
    <div className={`${accordionClass} ${className}`} id={id}>
      {items.map(({ id: itemId, question, answer, expanded }) => (
        <div className="accordion-item" key={itemId}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${!expanded ? 'collapsed' : ''}`}
              type="button"
              data-bs-toggle={isClient ? 'collapse' : undefined}
              data-bs-target={`#collapse${itemId}`}
              aria-expanded={expanded ? 'true' : 'false'}
            >
              {question}
            </button>
          </h2>
          <div
            id={`collapse${itemId}`}
            className={`accordion-collapse collapse ${expanded ? 'show' : ''}`}
            data-bs-parent={isClient ? `#${id}` : undefined}
          >
            <div className="accordion-body">
              {answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Client component variant
export const ClientFAQ = ({ items, id, className }: Omit<SharedFAQProps, 'isClient'>) => {
  'use client';
  return <SharedFAQ items={items} id={id} className={className} isClient={true} />;
}; 