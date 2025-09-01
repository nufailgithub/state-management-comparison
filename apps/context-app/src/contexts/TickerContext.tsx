import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

interface TickerContextType {
  tickerValue: number;
}

const TickerContext = createContext<TickerContextType | undefined>(undefined);

export const TickerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickerValue, setTickerValue] = useState(12547);

  useEffect(() => {
    // Use requestAnimationFrame for more consistent, smoother updates
    let animationFrameId: number;
    
    const updateTicker = () => {
      setTickerValue(prev => prev + Math.floor(Math.random() * 10) + 1);
      animationFrameId = requestAnimationFrame(updateTicker);
    };
    
    // Start the animation frame loop for smoother updates
    animationFrameId = requestAnimationFrame(updateTicker);
    
    // Cleanup function
    return () => cancelAnimationFrame(animationFrameId);
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

