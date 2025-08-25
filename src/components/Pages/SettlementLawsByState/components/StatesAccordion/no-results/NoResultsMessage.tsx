// No results message component - under 50 lines per complexity rule
// Displays when search yields no results

interface NoResultsMessageProps {
  search: string;
}

export default function NoResultsMessage({ search }: NoResultsMessageProps) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      color: '#6b7280',
      fontSize: '1.1rem'
    }}>
      🔍 No states found matching "{search}". Try a different search term.
    </div>
  );
}
