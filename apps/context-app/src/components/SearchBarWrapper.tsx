import React from 'react';
import { SearchBar, useRenderCount } from '@shared/ui';

interface SearchBarWrapperProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const SearchBarWrapper: React.FC<SearchBarWrapperProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  const renderCount = useRenderCount('SearchBar');
  
  return (
    <SearchBar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      categories={categories}
      renderCount={renderCount}
    />
  );
};
