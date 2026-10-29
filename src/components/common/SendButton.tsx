import React from 'react';

export interface SendButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SendButton: React.FC<SendButtonProps> = ({
  children = 'Send Enquiry & Open WhatsApp',
  className = '',
  type = 'submit',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`relative z-10 flex justify-center items-center gap-2 border-2 border-tdds-lime rounded-full text-neutral-950 font-bold bg-tdds-lime uppercase px-6 sm:px-8 py-3.5 sm:py-4 overflow-hidden ease-in-out duration-700 group active:scale-95 active:duration-0 isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-neutral-950 hover:text-tdds-lime before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 cursor-pointer shadow-lg shadow-tdds-lime/20 ${className}`}
      {...props}
    >
      <span className="truncate ease-in-out duration-300 group-active:-translate-x-96 group-focus:translate-x-96">
        {children}
      </span>
      <div className="absolute flex flex-row justify-center items-center gap-2 -translate-x-96 ease-in-out duration-300 group-active:translate-x-0 group-focus:translate-x-0 text-tdds-lime font-bold">
        <div className="animate-spin size-4 border-2 border-tdds-lime border-t-transparent rounded-full" />
        Processing...
      </div>
      <svg
        className="fill-neutral-950 group-hover:fill-tdds-lime group-hover:-translate-x-0 group-active:translate-x-96 group-active:duration-0 group-focus:translate-x-96 ease-in-out duration-700 shrink-0"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0}
        viewBox="0 0 512 512"
        height={16}
        width={16}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z" />
      </svg>
    </button>
  );
};

export default SendButton;
