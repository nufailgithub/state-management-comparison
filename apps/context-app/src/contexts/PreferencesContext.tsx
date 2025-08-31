import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserPreferences } from '@shared/core/types';

interface PreferencesContextType {
  preferences: UserPreferences;
  toggleTheme: () => void;
  toggleCurrency: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    currency: 'USD'
  });

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const toggleCurrency = () => {
    setPreferences(prev => ({
      ...prev,
      currency: prev.currency === 'USD' ? 'LKR' : 'USD'
    }));
  };

  return (
    <PreferencesContext.Provider value={{
      preferences,
      toggleTheme,
      toggleCurrency
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
