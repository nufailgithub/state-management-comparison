import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TickerContextType {
  tickerValue: number;
}

const TickerContext = createContext<TickerContextType | undefined>(undefined);

export const TickerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickerValue, setTickerValue] = useState(12547);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 100); // Updates every 100ms - this will stress test the state management

    return () => clearInterval(interval);
  }, []);

  return (
    <TickerContext.Provider value={{ tickerValue }}>
      {children}
    </TickerContext.Provider>
  );
};

export const useTicker = () => {
  const context = useContext(TickerContext);
  if (!context) {
    throw new Error('useTicker must be used within a TickerProvider');
  }
  return context;
};

