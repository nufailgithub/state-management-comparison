import React, { createContext, useContext, useReducer, useCallback, ReactNode, useEffect } from 'react';

// Define action types
type TickerAction = 
  | { type: 'INCREMENT', value: number }
  | { type: 'SET', value: number };

// State type
interface TickerState {
  tickerValue: number;
}

// Context type with state and actions
interface TickerContextType {
  tickerValue: number;
  incrementTicker: () => void;
  setTickerValue: (value: number) => void;
}

// Initial state
const initialState: TickerState = {
  tickerValue: 12547
};

// Reducer for more efficient updates
function tickerReducer(state: TickerState, action: TickerAction): TickerState {
  switch (action.type) {
    case 'INCREMENT':
      return { tickerValue: state.tickerValue + action.value };
    case 'SET':
      return { tickerValue: action.value };
    default:
      return state;
  }
}

// Create context
const TickerContext = createContext<TickerContextType | undefined>(undefined);

// Create provider component
export const TickerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use reducer for more efficient updates
  const [state, dispatch] = useReducer(tickerReducer, initialState);
  
  // Memoized actions
  const incrementTicker = useCallback(() => {
    const incrementValue = Math.floor(Math.random() * 10) + 1;
    dispatch({ type: 'INCREMENT', value: incrementValue });
  }, []);
  
  const setTickerValue = useCallback((value: number) => {
    dispatch({ type: 'SET', value });
  }, []);
  
  // Effect for ticker updates
  useEffect(() => {
    let animationFrameId: number;
    
    const updateTicker = () => {
      incrementTicker();
      animationFrameId = requestAnimationFrame(updateTicker);
    };
    
    animationFrameId = requestAnimationFrame(updateTicker);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [incrementTicker]);
  
  // Provide value object
  const value = {
    tickerValue: state.tickerValue,
    incrementTicker,
    setTickerValue
  };
  
  return (
    <TickerContext.Provider value={value}>
      {children}
    </TickerContext.Provider>
  );
};

// Custom hook
export const useTicker = () => {
  const context = useContext(TickerContext);
  if (!context) {
    throw new Error('useTicker must be used within a TickerProvider');
  }
  return context;
};

// Additional selective hooks for better performance
export const useTickerValue = () => {
  const context = useContext(TickerContext);
  if (!context) {
    throw new Error('useTickerValue must be used within a TickerProvider');
  }
  return context.tickerValue;
};
