import React, { memo } from 'react';
import { useCurrency } from '../contexts/PreferencesContext';
import { CurrencyToggle, useRenderCount } from '@shared/ui';

// Use memo to prevent re-renders when parent components re-render
export const CurrencyToggleContainer = memo(() => {
  // Only subscribe to the currency context with the specialized hook
  const { currency, toggleCurrency } = useCurrency();
  const renderCount = useRenderCount('CurrencyToggleContainer');
  
  console.log('CurrencyToggleContainer rendering, currency:', currency);
  
  return (
    <CurrencyToggle
      currency={currency as 'USD' | 'LKR'}
      onToggle={toggleCurrency}
      renderCount={renderCount}
    />
  );
});
