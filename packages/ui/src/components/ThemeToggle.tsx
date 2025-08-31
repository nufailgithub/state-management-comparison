import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  renderCount?: number;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, renderCount }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {renderCount && (
        <span className="text-xs text-red-500 mr-2">R:{renderCount}</span>
      )}
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
