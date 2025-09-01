import React, { memo } from 'react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { useRenderCount } from '@shared/ui';

// Use memo to prevent re-renders when parent components re-render
export const CartLinkContainer = memo(() => {
  // Only subscribe to the specific state needed for this component
  const { cart } = useCart();
  const renderCount = useRenderCount('CartLinkContainer');
  
  return (
    <Link href="/cart" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
      Cart ({cart.itemCount}) {renderCount && `(R:${renderCount})`}
    </Link>
  );
});
