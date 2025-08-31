import React from 'react';
import Link from 'next/link';
import { useCartCount, useTheme, useCurrency, useTickerValue, usePreferences } from '../store';
import { ThemeToggle, CurrencyToggle, LiveTicker, useRenderCount } from '@shared/ui';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cartCount = useCartCount();
  const theme = useTheme();
  const currency = useCurrency();
  const tickerValue = useTickerValue();
  const { toggleTheme, toggleCurrency } = usePreferences();
  const renderCount = useRenderCount('Layout');

  return (
    <div className={theme}>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Zustand Store {renderCount && `(R:${renderCount})`}
              </h1>
              <nav className="flex space-x-6">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Catalog
                </Link>
                <Link href="/cart" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Cart ({cartCount})
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <LiveTicker 
                value={tickerValue} 
                label="Items Sold Today"
                renderCount={useRenderCount('LiveTicker')}
              />
              <CurrencyToggle
                currency={currency}
                onToggle={toggleCurrency}
                renderCount={useRenderCount('CurrencyToggle')}
              />
              <ThemeToggle
                theme={theme}
                onToggle={toggleTheme}
                renderCount={useRenderCount('ThemeToggle')}
              />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
