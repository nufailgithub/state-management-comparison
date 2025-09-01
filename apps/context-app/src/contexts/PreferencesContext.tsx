import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { UserPreferences } from '@shared/core/types';

interface PreferencesContextType {
  preferences: UserPreferences;
  toggleTheme: () => void;
  toggleCurrency: () => void;
}

// Create separate contexts for different parts of the state
const ThemeContext = createContext<{theme: string; toggleTheme: () => void} | undefined>(undefined);
const CurrencyContext = createContext<{currency: string; toggleCurrency: () => void} | undefined>(undefined);
const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

// Provider that manages all preferences
export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    currency: 'USD'
  });

  // Use useCallback to prevent unnecessary rerenders
  const toggleTheme = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  }, []);

  const toggleCurrency = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      currency: prev.currency === 'USD' ? 'LKR' : 'USD'
    }));
  }, []);

  // Memoize the context value to prevent unnecessary rerenders
  const themeContextValue = useMemo(() => ({
    theme: preferences.theme,
    toggleTheme
  }), [preferences.theme, toggleTheme]);

  const currencyContextValue = useMemo(() => ({
    currency: preferences.currency,
    toggleCurrency
  }), [preferences.currency, toggleCurrency]);

  const preferencesContextValue = useMemo(() => ({
    preferences,
    toggleTheme,
    toggleCurrency
  }), [preferences, toggleTheme, toggleCurrency]);

  return (
    <PreferencesContext.Provider value={preferencesContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <CurrencyContext.Provider value={currencyContextValue}>
          {children}
        </CurrencyContext.Provider>
      </ThemeContext.Provider>
    </PreferencesContext.Provider>
  );
};

// Main hook for full preferences context
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

// Specialized hook just for theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a PreferencesProvider');
  }
  return context;
};

// Specialized hook just for currency
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a PreferencesProvider');
  }
  return context;
};
