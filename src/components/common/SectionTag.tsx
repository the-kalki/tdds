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
      ? "text-neutral-400 border-white/10 bg-white/[0.04]"
      : "text-neutral-500 border-neutral-300/80 bg-neutral-900/[0.03]";

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-pill text-[11px] font-mono tracking-widest uppercase border ${styles} select-none ${className}`}
    >
      <span>{children}</span>
    </div>
  );
};
