import React from 'react';

interface LiveTickerProps {
  value: number;
  label: string;
  renderCount?: number;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ value, label, renderCount }) => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-4 shadow-md">
      {renderCount && (
        <div className="text-xs text-yellow-200 mb-1">Ticker Renders: {renderCount}</div>
      )}
      <div className="text-sm opacity-90">{label}</div>
      <div className="text-2xl font-bold font-mono">
        {value.toLocaleString()}
      </div>
    </div>
  );
};
