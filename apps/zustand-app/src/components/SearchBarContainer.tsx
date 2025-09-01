import React, { memo } from 'react';
import { useProducts } from '../store';
import { SearchBar, useRenderCount } from '@shared/ui';

export const SearchBarContainer = memo(() => {
  const { 
    searchQuery, 
    selectedCategory, 
    categories,
    setSearchQuery, 
    setSelectedCategory 
  } = useProducts();
  
  const renderCount = useRenderCount('SearchBarContainer');
  
  console.log('SearchBarContainer rendering');
  
  return (
    <SearchBar
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      categories={categories}
      renderCount={renderCount}
    />
  );
});
