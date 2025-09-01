import { useEffect } from 'react';
import { useTickerStore } from '../store/tickerStore';

export const useTickerEffect = () => {
  // Get the incrementTickerValue action directly to avoid any selector overhead
  const incrementTickerValue = useTickerStore(state => state.incrementTickerValue);
  
  useEffect(() => {
    // Use requestAnimationFrame instead of setInterval for better performance
    // This will sync with browser's render cycle for smoother updates
    let animationFrameId: number;
    
    const updateTicker = () => {
      incrementTickerValue();
      animationFrameId = requestAnimationFrame(updateTicker);
    };
    
    // Start the animation frame loop
    animationFrameId = requestAnimationFrame(updateTicker);
    
    // Cleanup function to cancel the animation frame
    return () => cancelAnimationFrame(animationFrameId);
  }, [incrementTickerValue]);
}

