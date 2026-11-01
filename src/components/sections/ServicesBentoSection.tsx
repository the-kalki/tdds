import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { BentoServiceGrid, type BentoServiceGridRef } from '../interactive/BentoServiceGrid';
import type { ServiceCompartment } from '../../types/content';
import { servicesData } from '../../content/siteContent';

export interface ServicesBentoSectionProps {
  onSelectService: (service: ServiceCompartment) => void;
  onOpenLeadDrawer?: () => void;
}

export const ServicesBentoSection: React.FC<ServicesBentoSectionProps> = ({
  onSelectService,
}) => {
  const gridRef = useRef<BentoServiceGridRef>(null);
  const [gridState, setGridState] = useState({
    activeIndex: 0,
    canScrollLeft: false,
    canScrollRight: true,
    total: servicesData.length,
  });

  return (
    <section id="services" className="section-defer-render pt-20 pb-14 sm:py-16 lg:py-20 bg-tdds-obsidian text-white relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {/* Left Column: Heading Lockup + Navigation Dock */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col items-start pt-1">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-6">
              <SectionTag theme="dark" className="font-mono">
                SERVICES
              </SectionTag>
              <span className="font-mono text-[10px] sm:text-[11px] text-white/50 tracking-wider uppercase border border-white/10 px-2.5 py-0.5 rounded-full bg-white/[0.03]">
                0{servicesData.length} PILLARS
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] tracking-tight leading-[1.1] sm:leading-[1.06] text-white mb-2.5 sm:mb-4 break-words">
              <span className="block sm:inline lg:block">Everything </span>
              <span className="block sm:inline lg:block">your brand </span>
              <span className="block sm:inline lg:block">needs.</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed font-normal max-w-sm mb-5 sm:mb-7">
              From content to campaigns, we handle the entire creative journey — so you can focus on what you do best.
            </p>

            {/* Navigation Controls & Pillar Indicator Dock */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3">
                {/* Arrow Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => gridRef.current?.scroll('left')}
                    disabled={!gridState.canScrollLeft}
                    aria-label="Previous service"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-neutral-950 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-white flex items-center justify-center text-white transition-all duration-200 active:scale-95 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => gridRef.current?.scroll('right')}
                    disabled={!gridState.canScrollRight}
                    aria-label="Next service"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-neutral-950 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-white flex items-center justify-center text-white transition-all duration-200 active:scale-95 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Counter & Status */}
                <div className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 font-mono text-xs text-white/80 flex items-center gap-1.5 select-none">
                  <span className="text-white font-bold">0{gridState.activeIndex + 1}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-white/60">0{servicesData.length}</span>
                  <span className="text-[10px] text-white/40 tracking-wider ml-1 uppercase">Pillars</span>
                </div>
              </div>

              {/* Interactive Pagination Indicators */}
              <div
                className="flex items-center gap-1.5 pt-0.5"
                role="tablist"
                aria-label="Service navigation indicators"
              >
                {servicesData.map((service, idx) => {
                  const isActive = gridState.activeIndex === idx;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => gridRef.current?.scrollToIndex(idx)}
                      aria-label={`Jump to service ${idx + 1}: ${service.title}`}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isActive
                          ? 'w-7 sm:w-8 bg-gradient-to-r from-tdds-coral-start to-tdds-coral-end shadow-[0_0_10px_rgba(255,87,34,0.4)]'
                          : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                      title={service.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Cards Track with Gradient Masks and Peeking Affordance */}
          <div className="w-full flex-1 min-w-0">
            <BentoServiceGrid
              ref={gridRef}
              onSelectService={onSelectService}
              onStateChange={setGridState}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
