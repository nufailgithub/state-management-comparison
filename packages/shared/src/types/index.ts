export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  currency: 'USD' | 'LKR';
}

export interface AppState {
  products: Product[];
  cart: Cart;
  preferences: UserPreferences;
  ticker: number; // Fast updating counter
  searchQuery: string;
  selectedCategory: string;
}

// Currency conversion rates
export const CURRENCY_RATES = {
  USD_TO_LKR: 295.50,
  LKR_TO_USD: 1 / 295.50
};