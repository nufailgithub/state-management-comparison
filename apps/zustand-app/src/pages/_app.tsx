import React from 'react';
import type { AppProps } from 'next/app';
import { useTickerEffect } from '../hooks/useTicker';
import { ThemeWrapper } from '../components/ThemeWrapper';
import '../styles/globals.css';

// Component to initialize ticker
const TickerInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useTickerEffect();
  return <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TickerInitializer>
      <ThemeWrapper>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Component {...pageProps} />
        </div>
      </ThemeWrapper>
    </TickerInitializer>
  );
}

export default MyApp;
