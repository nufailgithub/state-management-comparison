import React from 'react';
import { ProductCard, useRenderCount } from '@shared/ui';
import { Product } from '@shared/core/types';

interface ProductCardWrapperProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  formatPrice: (price: number) => string;
}

// This wrapper component ensures the hook is called in a proper component context
export const ProductCardWrapper: React.FC<ProductCardWrapperProps> = ({ product, onAddToCart, formatPrice }) => {
  const renderCount = useRenderCount(`ProductCard-${product.id}`);
  
  return (
    <ProductCard
      product={product}
      onAddToCart={onAddToCart}
      formatPrice={formatPrice}
      renderCount={renderCount}
    />
  );
};
