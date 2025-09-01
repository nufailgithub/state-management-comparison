import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { CartItem, Product, UserPreferences } from '@shared/core/types';
import { mockProducts } from '@shared/core/data/products';

interface AppStore {
  // Products slice
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  filteredProducts: Product[];
  categories: string[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  
  // Cart slice
  cart: {
    items: CartItem[];
    subtotal: number;
    itemCount: number;
  };
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Preferences slice
  preferences: UserPreferences;
  toggleTheme: () => void;
  toggleCurrency: () => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => {
        // Helper function to calculate cart totals
        const calculateCartTotals = (items: CartItem[]) => {
          const products = get().products;
          const subtotal = items.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product?.price || 0) * item.quantity;
          }, 0);
          const itemCount = items.reduce((total, item) => total + item.quantity, 0);
          return { subtotal, itemCount };
        };

        // Helper function to filter products
        const getFilteredProducts = () => {
          const { products, searchQuery, selectedCategory } = get();
          return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
          });
        };

        return {
          // Products slice
          products: mockProducts,
          searchQuery: '',
          selectedCategory: '',
          filteredProducts: mockProducts,
          categories: Array.from(new Set(mockProducts.map(p => p.category))),
          setSearchQuery: (query: string) => {
            set({ searchQuery: query });
            set({ filteredProducts: getFilteredProducts() });
          },
          setSelectedCategory: (category: string) => {
            set({ selectedCategory: category });
            set({ filteredProducts: getFilteredProducts() });
          },

          // Cart slice
          cart: {
            items: [],
            subtotal: 0,
            itemCount: 0
          },
          addToCart: (productId: string) => {
            const { cart } = get();
            const existingItem = cart.items.find(item => item.productId === productId);
            
            let newItems: CartItem[];
            if (existingItem) {
              newItems = cart.items.map(item =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              newItems = [...cart.items, { productId, quantity: 1 }];
            }
            
            const totals = calculateCartTotals(newItems);
            set({
              cart: {
                items: newItems,
                ...totals
              }
            });
          },
          removeFromCart: (productId: string) => {
            const { cart } = get();
            const newItems = cart.items.filter(item => item.productId !== productId);
            const totals = calculateCartTotals(newItems);
            set({
              cart: {
                items: newItems,
                ...totals
              }
            });
          },
          updateQuantity: (productId: string, quantity: number) => {
            if (quantity <= 0) {
              get().removeFromCart(productId);
              return;
            }
            
            const { cart } = get();
            const newItems = cart.items.map(item =>
              item.productId === productId
                ? { ...item, quantity }
                : item
            );
            
            const totals = calculateCartTotals(newItems);
            set({
              cart: {
                items: newItems,
                ...totals
              }
            });
          },
          clearCart: () => {
            set({
              cart: {
                items: [],
                subtotal: 0,
                itemCount: 0
              }
            });
          },

          // Preferences slice
          preferences: {
            theme: 'light',
            currency: 'USD'
          },
          toggleTheme: () => {
            const { preferences } = get();
            set({
              preferences: {
                ...preferences,
                theme: preferences.theme === 'light' ? 'dark' : 'light'
              }
            });
          },
          toggleCurrency: () => {
            const { preferences } = get();
            set({
              preferences: {
                ...preferences,
                currency: preferences.currency === 'USD' ? 'LKR' : 'USD'
              }
            });
          },

          // Ticker slice
          // Ticker moved to a separate store
        };
      }),
      {
        name: 'app-store',
        partialize: (state) => ({ 
          cart: state.cart, 
          preferences: state.preferences 
        })
      }
    ),
    { name: 'app-store' }
  )
);

// Selector hooks for optimal performance
export const useProducts = () => useAppStore(state => ({
  products: state.products,
  filteredProducts: state.filteredProducts,
  searchQuery: state.searchQuery,
  selectedCategory: state.selectedCategory,
  categories: state.categories,
  setSearchQuery: state.setSearchQuery,
  setSelectedCategory: state.setSelectedCategory
}));

export const useCart = () => useAppStore(state => ({
  cart: state.cart,
  addToCart: state.addToCart,
  removeFromCart: state.removeFromCart,
  updateQuantity: state.updateQuantity,
  clearCart: state.clearCart
}));

export const usePreferences = () => useAppStore(
  state => ({
    preferences: state.preferences,
    toggleTheme: state.toggleTheme,
    toggleCurrency: state.toggleCurrency
  }),
  // Use shallow comparison for object equality
  (a, b) => 
    a.preferences.theme === b.preferences.theme && 
    a.preferences.currency === b.preferences.currency
);

// Ticker functionality moved to tickerStore.ts

// Individual selectors for minimal re-renders with strict equality to prevent unnecessary re-renders
export const useCartCount = () => useAppStore(state => state.cart.itemCount, (a, b) => a === b);
export const useTheme = () => useAppStore(state => state.preferences.theme, (a, b) => a === b);
export const useCurrency = () => useAppStore(state => state.preferences.currency, (a, b) => a === b);
// Ticker functionality moved to tickerStore.ts
