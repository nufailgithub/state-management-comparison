import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '@shared/core/types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; productId: string; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.productId === action.productId);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.productId === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { productId: action.productId, quantity: 1 }];
      }
      
      const newSubtotal = newItems.reduce((total, item) => {
        return total + action.product.price * item.quantity;
      }, 0);
      
      const newItemCount = newItems.reduce((total, item) => total + item.quantity, 0);
      
      return {
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItemCount
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.productId !== action.productId);
      // Recalculate totals - this would need products array, simplified for demo
      return {
        items: newItems,
        subtotal: 0, // Would recalculate properly
        itemCount: newItems.reduce((total, item) => total + item.quantity, 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', productId: action.productId });
      }
      
      const newItems = state.items.map(item =>
        item.productId === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      
      return {
        items: newItems,
        subtotal: 0, // Would recalculate properly
        itemCount: newItems.reduce((total, item) => total + item.quantity, 0)
      };
    }
    
    case 'CLEAR_CART':
      return { items: [], subtotal: 0, itemCount: 0 };
    
    default:
      return state;
  }
};

interface CartContextType {
  cart: CartState;
  addToCart: (productId: string, product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    subtotal: 0,
    itemCount: 0
  });

  const addToCart = (productId: string, product: Product) => {
    dispatch({ type: 'ADD_ITEM', productId, product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
