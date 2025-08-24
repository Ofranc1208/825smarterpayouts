import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Mobile Search Bar Component
 * 
 * A search input component specifically designed for mobile navigation with
 * touch-friendly inputs, intelligent routing, and mobile-optimized interactions.
 * 
 * @component MobileSearchBar
 * @author SmarterPayouts Team
 * @since 2024
 */

interface MobileSearchBarProps {
  /** Current search value */
  searchValue: string;
  /** Function to update search value */
  setSearchValue: (value: string) => void;
  /** Search keyword mapping object */
  searchMap: { [key: string]: string };
  /** Function to close mobile menu after search */
  onSearchComplete: () => void;
}

/**
 * Mobile Search Bar Component
 * 
 * Provides search functionality within the mobile navigation menu
 * with intelligent keyword routing and mobile-optimized interface
 */
const MobileSearchBar: React.FC<MobileSearchBarProps> = ({
  searchValue,
  setSearchValue,
  searchMap,
  onSearchComplete
}) => {
  const router = useRouter();

  // Memoized search submit handler
  const handleSearchSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = searchValue.trim().toLowerCase();
    const route = searchMap[keyword];
    
    if (route) {
      router.push(route);
      setSearchValue('');
      onSearchComplete();
    } else if (keyword) {
      router.push('/helpful-links');
      setSearchValue('');
      onSearchComplete();
    }
  }, [searchValue, searchMap, router, setSearchValue, onSearchComplete]);

  return (
    <form 
      onSubmit={handleSearchSubmit} 
      style={{
        display: 'flex',
        marginBottom: '1.5rem',
        gap: '0.5rem'
      }}
    >
      <input
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          flex: 1,
          padding: '0.5rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          minHeight: '44px' // Touch-friendly minimum height
        }}
        aria-label="Search navigation"
      />
      <button 
        type="submit" 
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#09b44d',
          border: 'none',
          borderRadius: '0.375rem',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
          minHeight: '44px', // Touch-friendly minimum height
          minWidth: '60px'
        }}
      >
        Go
      </button>
    </form>
  );
};

export default MobileSearchBar;
