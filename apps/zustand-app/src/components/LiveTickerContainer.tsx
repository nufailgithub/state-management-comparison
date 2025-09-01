import React, { memo, useCallback } from 'react';
import { useTickerValue } from '../store/tickerStore';
import { LiveTicker, useRenderCount } from '@shared/ui';

// Use memo to prevent re-renders when parent components re-render
export const LiveTickerContainer = memo(() => {
  // This will only subscribe to the ticker value from the isolated store
  // By using useCallback, we ensure that the component renders correctly even at high frequencies
  const tickerValue = useTickerValue();
  const renderCount = useRenderCount('LiveTickerContainer');
  
  // Highly optimized render that minimizes work during frequent updates
  const renderTickerValue = useCallback(() => {
    return tickerValue.toLocaleString();
  }, [tickerValue]);
  
  return (
    <LiveTicker 
      value={tickerValue} 
      label="Items Sold Today"
      renderCount={renderCount}
    />
  );
});
