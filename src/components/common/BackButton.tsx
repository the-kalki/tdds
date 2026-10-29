import React from 'react';

export interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BackButton: React.FC<BackButtonProps> = ({ className = '', ...props }) => {
  return (
    <button
      type="button"
      className={`cursor-pointer duration-200 hover:scale-125 active:scale-100 shrink-0 flex items-center justify-center focus:outline-none p-1 group ${className}`}
      title="Go Back"
      aria-label="Go Back"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48px"
        height="48px"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-tdds-lime transition-all duration-200 group-hover:drop-shadow-[0_0_10px_rgba(200,241,105,0.6)]"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="1.8"
          d="M11 6L5 12M5 12L11 18M5 12H19"
        />
      </svg>
    </button>
  );
};

export default BackButton;
