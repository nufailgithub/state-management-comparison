import { create } from 'zustand';

interface TickerState {
  tickerValue: number;
  setTickerValue: (value: number) => void;
}

// Create a completely separate store just for the ticker
// This isolates the frequent ticker updates from the rest of the application
export const useTickerStore = create<TickerState>((set) => ({
  tickerValue: 12547,
  setTickerValue: (value) => set({ tickerValue: value }),
}));

export const useTickerValue = () => useTickerStore(state => state.tickerValue);
export const useSetTickerValue = () => useTickerStore(state => state.setTickerValue);
