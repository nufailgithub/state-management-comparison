import { useEffect } from 'react';
import { useTickerStore } from '../store/tickerStore';

export const useTickerEffect = () => {
  // We don't need to use the selector here since we're only using it for the effect
  // This prevents unnecessary re-renders of components using this hook
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Directly update state with a function similar to useState pattern
      // This avoids the overhead of getState + setState
      useTickerStore.setState(state => ({ 
        tickerValue: state.tickerValue + Math.floor(Math.random() * 10) + 1 
      }));
    }, 1); // Same interval as Context version (1ms)

    return () => clearInterval(interval);
  }, []);
};
