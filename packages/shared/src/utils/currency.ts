import { CURRENCY_RATES } from '../types';

export const formatCurrency = (amount: number, currency: 'USD' | 'LKR'): string => {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  } else {
    const lkrAmount = amount * CURRENCY_RATES.USD_TO_LKR;
    return `Rs ${lkrAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  }
};

export const convertPrice = (amount: number, fromCurrency: 'USD' | 'LKR', toCurrency: 'USD' | 'LKR'): number => {
  if (fromCurrency === toCurrency) return amount;
  
  if (fromCurrency === 'USD' && toCurrency === 'LKR') {
    return amount * CURRENCY_RATES.USD_TO_LKR;
  } else {
    return amount * CURRENCY_RATES.LKR_TO_USD;
  }
};
