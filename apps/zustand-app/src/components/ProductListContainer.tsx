import React, { memo } from 'react';
import { useProducts } from '../store';
import { ProductCard, useRenderCount } from '@shared/ui';
import { formatCurrency } from '@shared/core/utils/currency';
import { useCurrency } from '../store';

export const ProductListContainer = memo(() => {
  const { filteredProducts, products } = useProducts();
  const { addToCart } = useCart();
  const currency = useCurrency();
  const renderCount = useRenderCount('ProductListContainer');

  const formatPrice = (price: number) => formatCurrency(price, currency);
  
  console.log('ProductListContainer rendering');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
          formatPrice={formatPrice}
          renderCount={renderCount}
        />
      ))}
    </div>
  );
});

// Need to import at the end to avoid circular dependencies
import { useCart } from '../store';
