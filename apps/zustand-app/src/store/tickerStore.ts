import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface TickerState {
  tickerValue: number;
  setTickerValue: (value: number) => void;
  incrementTickerValue: () => void; // Add a dedicated increment action
}

// Create a completely separate store just for the ticker with optimized middleware
export const useTickerStore = create<TickerState>()(
  devtools(
    subscribeWithSelector((set) => ({
      tickerValue: 12547,
      setTickerValue: (value: number) => 
        set({ tickerValue: value }, false, 'setTickerValue'),
      incrementTickerValue: () => 
        set(
          state => ({ 
            tickerValue: state.tickerValue + Math.floor(Math.random() * 10) + 1 
          }),
          false,
          'incrementTickerValue'
        ),
    })),
    { name: 'ticker-store' }
  )
);

// Use strict equality to minimize re-renders
export const useTickerValue = () => 
  useTickerStore(state => state.tickerValue, (a, b) => a === b);
  
export const useSetTickerValue = () => 
  useTickerStore(state => state.setTickerValue);
