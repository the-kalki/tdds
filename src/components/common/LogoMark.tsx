import React, { useId } from 'react';

interface LogoMarkProps {
  className?: string;
  title?: string;
}

/** TDDS "TD" monogram. T inherits currentColor (theme-aware), D carries the brand coral gradient. */
export const LogoMark: React.FC<LogoMarkProps> = ({ className = 'w-8 h-8', title = 'The Design Dude Studio' }) => {
  const gid = useId();
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="18" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF5722" />
          <stop offset="1" stopColor="#E02B20" />
        </linearGradient>
      </defs>
      <path fill={`url(#${gid})`} fillRule="evenodd" d="M18 6h4a14 14 0 0 1 0 28h-4zM22 12v16a8 8 0 0 0 0-16z" />
      <path fill="currentColor" d="M3 6h17v6h-5.5v22h-6V12H3z" />
    </svg>
  );
};
