// Search input component - under 50 lines per complexity rule
// Interactive search input with proper accessibility

'use client';

interface SearchInputProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function SearchInput({ searchValue, onSearchChange }: SearchInputProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="🔍 Search states (e.g., California, Texas, New York...)"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search states by name"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '0.875rem 1.25rem',
          fontSize: '1rem',
          border: '2px solid #e5e7eb',
          borderRadius: '1.5rem',
          outline: 'none'
        }}
      />
    </div>
  );
}
