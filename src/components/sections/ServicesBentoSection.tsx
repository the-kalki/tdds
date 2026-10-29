import React, { useRef } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { BentoServiceGrid } from '../interactive/BentoServiceGrid';
import type { ServiceCompartment } from '../../types/content';

export interface ServicesBentoSectionProps {
  onSelectService: (service: ServiceCompartment) => void;
  onOpenLeadDrawer: () => void;
}

export const ServicesBentoSection: React.FC<ServicesBentoSectionProps> = ({
  onSelectService,
  onOpenLeadDrawer,
}) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!gridContainerRef.current) return;
    const scrollAmount = 300 * (direction === 'left' ? -1 : 1);
    gridContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-14 sm:py-16 lg:py-20 bg-tdds-obsidian text-white relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-12">
          {/* Left Column: Heading Lockup (Calibrated to prevent horizontal bleed into cards) */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col items-start pt-1">
            <SectionTag theme="dark" className="mb-6 font-mono">
              SERVICES
            </SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[2.25rem] xl:text-[2.65rem] tracking-tight leading-[1.06] text-white mb-4 break-words">
              Everything<br />your brand<br />needs.
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-sm">
              From content to campaigns, we handle the entire creative journey — so you can focus on what you do best.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLeadDrawer}
                className="group inline-flex items-center gap-2.5 border border-white/20 hover:border-white hover:bg-white/10 text-white rounded-pill px-6 py-3 text-sm font-medium transition-all duration-200 active:scale-95"
              >
                <span>View All Services</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Scroll Navigation Arrows */}
              <div className="flex items-center gap-1.5 ml-1">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-white/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-white/5"
                  aria-label="Previous services"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-white/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-white/5"
                  aria-label="Next services"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Visible Cards + Smooth Horizontal Scroll Track */}
          <div className="w-full flex-1 min-w-0">
            <BentoServiceGrid
              ref={gridContainerRef}
              onSelectService={onSelectService}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
