import React from 'react';

interface RetroCardProps {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  className?: string;
  color?: 'blue' | 'pink' | 'yellow' | 'green';
}

export const RetroCard: React.FC<RetroCardProps> = ({ children, title, icon, className = '', color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-sky-200 bg-white shadow-sky-100',
    pink: 'border-pink-200 bg-pink-50 shadow-pink-100',
    yellow: 'border-yellow-200 bg-yellow-50 shadow-yellow-100',
    green: 'border-green-200 bg-green-50 shadow-green-100',
  };

  const badgeColors = {
    blue: 'bg-sky-100 text-sky-700',
    pink: 'bg-pink-100 text-pink-700',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
  };

  return (
    <div className={`retro-card p-6 relative border-2 ${colorClasses[color]} ${className}`}>
      {(title || icon) && (
        <div className={`absolute -top-5 left-6 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm ${badgeColors[color]}`}>
          <span className="text-xl">{icon}</span>
          <span className="font-bold text-lg">{title}</span>
        </div>
      )}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};