import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lime' | 'dark' | 'light' | 'outline' | 'pulse';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'lime',
  className = '',
}) => {
  const base = "inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-mono tracking-wide uppercase transition-colors select-none";

  const variants = {
    lime: "bg-tdds-lime/15 text-tdds-lime border border-tdds-lime/30",
    dark: "bg-white/10 text-white/90 border border-white/10",
    light: "bg-neutral-900/5 text-neutral-800 border border-neutral-300/80",
    outline: "border border-neutral-300 text-neutral-600",
    pulse: "bg-tdds-lime/10 text-neutral-900 border border-tdds-lime/40 font-medium",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {variant === 'pulse' && (
        <span className="w-1.5 h-1.5 rounded-full bg-tdds-lime animate-pulse inline-block" />
      )}
      {children}
    </span>
  );
};
