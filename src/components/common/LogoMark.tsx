import React from 'react';

interface LogoMarkProps {
  className?: string;
  title?: string;
}

/** TDDS official studio logo mark */
export const LogoMark: React.FC<LogoMarkProps> = ({ className = 'w-8 h-8', title = 'The Design Dude Studio' }) => {
  return (
    <img
      src="/images/tdds-logo-mark.webp"
      alt={title}
      className={`object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};
