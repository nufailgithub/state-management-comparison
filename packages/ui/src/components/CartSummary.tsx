import React from 'react';
import { CartItem, Product } from '../../../shared/src/types';

interface CartSummaryProps {
  cartItems: CartItem[];
  products: Product[];
  formatPrice: (price: number) => string;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  renderCount?: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  products,
  formatPrice,
  onUpdateQuantity,
  onRemoveItem,
  renderCount
}) => {
  const getProduct = (productId: string) => products.find(p => p.id === productId);
  
  const subtotal = cartItems.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      {renderCount && (
        <div className="text-xs text-red-500 mb-2">Cart Renders: {renderCount}</div>
      )}
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Cart ({totalItems} items)
      </h2>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => {
            const product = getProduct(item.productId);
            if (!product) return null;
            
            return (
              <div key={item.productId} className="flex items-center space-x-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {formatPrice(product.price)} each
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.productId)}
                    className="ml-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
