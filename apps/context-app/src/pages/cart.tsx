import React from 'react';
import { Layout } from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { CartSummary, useRenderCount } from '@shared/ui';
import { formatCurrency } from '@shared/core/utils/currency';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { products } = useProducts();
  const { preferences } = usePreferences();
  const renderCount = useRenderCount('CartPage');

  const formatPrice = (price: number) => formatCurrency(price, preferences.currency);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart {renderCount && `(Renders: ${renderCount})`}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Context API Implementation - Notice how all components re-render on any cart change
          </p>
        </div>

        <div className="space-y-6">
          <CartSummary
            cartItems={cart.items}
            products={products}
            formatPrice={formatPrice}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            renderCount={useRenderCount('CartSummary')}
          />

          {cart.items.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
