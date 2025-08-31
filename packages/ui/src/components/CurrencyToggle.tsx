import React from 'react';

interface CurrencyToggleProps {
  currency: 'USD' | 'LKR';
  onToggle: () => void;
  renderCount?: number;
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currency, onToggle, renderCount }) => {
  return (
    <button
      onClick={onToggle}
      className="px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-medium"
    >
      {renderCount && (
        <span className="text-xs text-red-500 mr-1">R:{renderCount}</span>
      )}
      {currency}
    </button>
  );
};
