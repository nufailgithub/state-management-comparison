import { useEffect } from 'react';
import { useAppStore } from '../store';

export const useTickerEffect = () => {
  const setTickerValue = useAppStore(state => state.setTickerValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue(useAppStore.getState().tickerValue + Math.floor(Math.random() * 10) + 1);
    }, 100); // Same 100ms interval as Context version

    return () => clearInterval(interval);
  }, [setTickerValue]);
};
