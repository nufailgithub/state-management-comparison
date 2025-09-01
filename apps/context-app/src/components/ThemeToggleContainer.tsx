import React, { memo } from 'react';
import { useTheme } from '../contexts/PreferencesContext';
import { ThemeToggle, useRenderCount } from '@shared/ui';

// Use memo to prevent re-renders when parent components re-render
export const ThemeToggleContainer = memo(() => {
  // Only subscribe to the theme context with the specialized hook
  const { theme, toggleTheme } = useTheme();
  const renderCount = useRenderCount('ThemeToggleContainer');
  
  console.log('ThemeToggleContainer rendering, theme:', theme);
  
  return (
    <ThemeToggle
      theme={theme as 'light' | 'dark'}
      onToggle={toggleTheme}
      renderCount={renderCount}
    />
  );
});
