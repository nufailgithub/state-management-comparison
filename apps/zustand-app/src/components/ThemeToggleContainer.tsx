import React, { memo } from 'react';
import { useTheme } from '../store';
import { ThemeToggle, useRenderCount } from '@shared/ui';
import { usePreferences } from '../store';

// Use memo to prevent re-renders when parent components re-render
export const ThemeToggleContainer = memo(() => {
  // Only subscribe to the specific state needed for this component
  const theme = useTheme();
  const { toggleTheme } = usePreferences();
  const renderCount = useRenderCount('ThemeToggleContainer');
  
  console.log('ThemeToggleContainer rendering, theme:', theme);
  
  return (
    <ThemeToggle
      theme={theme}
      onToggle={toggleTheme}
      renderCount={renderCount}
    />
  );
});
