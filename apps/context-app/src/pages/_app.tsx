import React from 'react';
import type { AppProps } from 'next/app';
import { CartProvider } from '../contexts/CartContext';
import { PreferencesProvider } from '../contexts/PreferencesContext';
import { ProductsProvider } from '../contexts/ProductsContext';
import { TickerProvider } from '../contexts/TickerContext';
import { ThemeWrapper } from '../components/ThemeWrapper';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PreferencesProvider>
      <ProductsProvider>
        <CartProvider>
          <TickerProvider>
            <ThemeWrapper>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Component {...pageProps} />
              </div>
            </ThemeWrapper>
          </TickerProvider>
        </CartProvider>
      </ProductsProvider>
    </PreferencesProvider>
  );
}

export default MyApp;
