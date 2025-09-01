import React, { memo } from 'react';
import { useTickerValue } from '../store/tickerStore';
import { LiveTicker, useRenderCount } from '@shared/ui';

// Use memo to prevent re-renders when parent components re-render
export const LiveTickerContainer = memo(() => {
  // This will only subscribe to the ticker value from the isolated store
  const tickerValue = useTickerValue();
  const renderCount = useRenderCount('LiveTickerContainer');
  
  console.log('LiveTickerContainer rendering, value:', tickerValue);
  
  return (
    <LiveTicker 
      value={tickerValue} 
      label="Items Sold Today"
      renderCount={renderCount}
    />
  );
});
