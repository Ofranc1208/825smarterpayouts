// Search section component - now modular and under 50 lines
// Orchestrates all search subcomponents following enterprise patterns

import { SearchTitle, SearchDescription } from '../search-header';
import { SearchInput } from '../search-input';
import { SearchContainer } from '../search-container';

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function SearchSection({ searchValue, onSearchChange }: SearchSectionProps) {
  return (
    <SearchContainer>
      <SearchTitle />
      <SearchDescription />
      <SearchInput 
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
    </SearchContainer>
  );
}