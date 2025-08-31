import React from 'react';
import { Layout } from '../components/Layout';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { ProductCard, SearchBar, useRenderCount } from '@shared/ui';
import { formatCurrency } from '@shared/core/utils/currency';
// import { formatCurrency } from '@shared/core/utils';

const CatalogPage: React.FC = () => {
  const { 
    filteredProducts, 
    products,
    searchQuery, 
    selectedCategory, 
    categories,
    setSearchQuery, 
    setSelectedCategory 
  } = useProducts();
  const { addToCart } = useCart();
  const { preferences } = usePreferences();
  const renderCount = useRenderCount('CatalogPage');

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(productId, product);
    }
  };

  const formatPrice = (price: number) => formatCurrency(price, preferences.currency);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Product Catalog {renderCount && `(Renders: ${renderCount})`}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Context API Implementation - Watch the console for render counts!
          </p>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          renderCount={useRenderCount('SearchBar')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              formatPrice={formatPrice}
              renderCount={useRenderCount(`ProductCard-${product.id}`)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No products found matching your criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CatalogPage;
