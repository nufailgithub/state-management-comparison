import React from 'react';
import { Product } from '../../../shared/src/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  formatPrice: (price: number) => string;
  renderCount?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  formatPrice,
  renderCount 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      {renderCount && (
        <div className="text-xs text-red-500 mb-2">Renders: {renderCount}</div>
      )}
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            product.inStock 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <button
          onClick={() => onAddToCart(product.id)}
          disabled={!product.inStock}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};
