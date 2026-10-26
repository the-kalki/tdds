import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { ServiceCompartment } from '../../types/content';

export interface DeliverablesDrawerProps {
  isOpen: boolean;
  service: ServiceCompartment | null;
  onClose: () => void;
  onEnquire: (serviceTitle: string) => void;
}

export const DeliverablesDrawer: React.FC<DeliverablesDrawerProps> = ({
  isOpen,
  service,
  onClose,
  onEnquire,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close drawer backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-default border-none p-0 m-0"
      />
      <div
        className="relative z-10 w-full max-w-lg bg-[#141414] text-white h-full border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <span className="font-mono text-xs text-tdds-lime tracking-wider uppercase">
              ( {service.numberTag} ) SCOPE DETAILS
            </span>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visual & Title */}
          <div className="w-full h-44 rounded-xl overflow-hidden mb-6 bg-black/50 border border-white/10">
            <img
              src={service.imageAsset}
              alt={service.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <h3 id="drawer-title" className="font-display font-bold text-2xl text-white mb-3">
            {service.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            {service.shortDescription}
          </p>

          {/* Deliverables List */}
          <div className="mb-8">
            <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
              Included Deliverables
            </h4>
            <div className="space-y-3">
              {service.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-3 text-sm text-white/85"
                >
                  <CheckCircle2 className="w-4 h-4 text-tdds-lime flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              onEnquire(service.title);
            }}
            className="w-full bg-tdds-lime text-neutral-950 font-bold hover:brightness-105 rounded-pill py-3.5 px-6 text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <span>Discuss This Service</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-white/50 hover:text-white py-2"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
