import React from 'react';

export interface SectionTagProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionTag: React.FC<SectionTagProps> = ({
  children,
  theme = 'light',
  className = '',
}) => {
  const styles =
    theme === 'dark'
      ? "text-neutral-200 border-white/20 bg-white/[0.06]"
      : "text-neutral-800 border-neutral-300 bg-neutral-900/[0.04]";

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-pill text-[11px] font-mono tracking-widest uppercase border ${styles} select-none ${className}`}
    >
      <span>{children}</span>
    </div>
  );
};
