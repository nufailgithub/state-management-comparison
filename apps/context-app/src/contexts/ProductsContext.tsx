import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@shared/core/types';
import { mockProducts } from '@shared/core/data/products';

interface ProductsContextType {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  filteredProducts: Product[];
  categories: string[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <ProductsContext.Provider value={{
      products,
      searchQuery,
      selectedCategory,
      filteredProducts,
      categories,
      setSearchQuery,
      setSelectedCategory
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
