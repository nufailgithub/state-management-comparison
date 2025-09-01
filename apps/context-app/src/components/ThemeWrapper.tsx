import React, { memo } from 'react';
import { useTheme } from '../contexts/PreferencesContext';
import { useRenderCount } from '@shared/ui';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

// This component only subscribes to the theme state and applies it to the wrapper div
export const ThemeWrapper = memo(({ children }: ThemeWrapperProps) => {
  // Use the specialized theme hook
  const { theme } = useTheme();
  const renderCount = useRenderCount('ThemeWrapper');
  
  console.log('ThemeWrapper rendering, theme:', theme);
  
  return (
    <div className={theme}>
      {renderCount && <div className="fixed top-0 left-0 bg-black text-white text-xs p-1">ThemeWrapper renders: {renderCount}</div>}
      {children}
    </div>
  );
});
