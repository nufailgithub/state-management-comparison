import React, { memo } from 'react';
import { useCurrency } from '../store';
import { CurrencyToggle, useRenderCount } from '@shared/ui';
import { usePreferences } from '../store';

// Use memo to prevent re-renders when parent components re-render
export const CurrencyToggleContainer = memo(() => {
  // Only subscribe to the specific state needed for this component
  const currency = useCurrency();
  const { toggleCurrency } = usePreferences();
  const renderCount = useRenderCount('CurrencyToggleContainer');
  
  console.log('CurrencyToggleContainer rendering, currency:', currency);
  
  return (
    <CurrencyToggle
      currency={currency}
      onToggle={toggleCurrency}
      renderCount={renderCount}
    />
  );
});
