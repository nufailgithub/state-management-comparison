import React, { memo } from 'react';
import { useTicker } from '../contexts/TickerContext';
import { LiveTicker, useRenderCount } from '@shared/ui';

// Use memo to prevent re-renders when parent components re-render
export const LiveTickerContainer = memo(() => {
  // Only subscribe to the ticker value from the context
  const { tickerValue } = useTicker();
  const renderCount = useRenderCount('LiveTickerContainer');
  
  return (
    <LiveTicker 
      value={tickerValue} 
      label="Items Sold Today"
      renderCount={renderCount}
    />
  );
});
