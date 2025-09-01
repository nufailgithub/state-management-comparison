import React from 'react';
import Link from 'next/link';
import { useRenderCount } from '@shared/ui';
import { LiveTickerContainer } from './LiveTickerContainer';
import { CurrencyToggleContainer } from './CurrencyToggleContainer';
import { ThemeToggleContainer } from './ThemeToggleContainer';
import { CartLinkContainer } from './CartLinkContainer';

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutComponent({ children }: LayoutProps) {
  const renderCount = useRenderCount('Layout');
  
  return (
    <div>
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
                <CartLinkContainer />
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <LiveTickerContainer />
              <CurrencyToggleContainer />
              <ThemeToggleContainer />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

export const Layout = React.memo(LayoutComponent);
