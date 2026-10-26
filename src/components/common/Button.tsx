import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'white'
  | 'outline'
  | 'outline-dark'
  | 'lime'
  | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-neutral-900 text-white hover:bg-black rounded-pill px-6 py-3.5 shadow-sm hover:shadow",
    white:
      "bg-white text-neutral-950 hover:bg-neutral-100 rounded-pill px-6 py-3.5 font-semibold shadow-sm hover:shadow",
    outline:
      "border border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-900/5 rounded-pill px-6 py-3.5",
    'outline-dark':
      "border border-white/20 text-white hover:border-white hover:bg-white/5 rounded-pill px-6 py-3.5",
    lime:
      "bg-tdds-lime text-neutral-950 font-semibold hover:brightness-105 rounded-pill px-6 py-3.5 shadow-sm",
    ghost:
      "text-neutral-700 hover:text-black hover:bg-neutral-100/50 rounded-pill px-4 py-2",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
