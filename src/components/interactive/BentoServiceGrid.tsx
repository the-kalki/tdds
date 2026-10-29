import React, { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ServiceCompartment } from '../../types/content';
import { servicesData } from '../../content/siteContent';

interface BentoCardProps {
  service: ServiceCompartment;
  onSelectService: (service: ServiceCompartment) => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ service, onSelectService }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View deliverables for ${service.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectService(service);
        }
      }}
      onClick={() => onSelectService(service)}
      className="group relative rounded-2xl lg:rounded-3xl bg-[#141414]/90 backdrop-blur-xl border border-white/10 p-4.5 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-[#181818] shadow-lg hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white w-[245px] sm:w-[265px] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-2.5rem)/3)] 2xl:w-[calc((100%-3rem)/4)] h-[365px] sm:h-[375px] lg:h-[385px] xl:h-[395px] flex-shrink-0 snap-start select-none"
    >
      <div>
        {/* 3D Visual Asset (Centered floating icon) */}
        <div className="w-full h-24 sm:h-26 relative flex items-center justify-center my-1.5 overflow-hidden">
          <img
            src={service.imageAsset}
            alt={service.title}
            className="max-h-full max-w-[85%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={200}
            height={110}
          />
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-sm sm:text-[15px] text-white mb-2.5 tracking-tight group-hover:text-tdds-coral-start transition-colors">
          {service.title}
        </h3>

        {/* Deliverables Checklist (Clean vertical list, matching reference image) */}
        <ul className="space-y-1">
          {service.deliverables.slice(0, 6).map((item, idx) => (
            <li
              key={idx}
              className="text-[11px] sm:text-xs text-white/60 leading-tight font-normal truncate"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action Trigger: Circular Button aligned right */}
      <div className="pt-2 flex items-center justify-end">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};

export interface BentoServiceGridProps {
  onSelectService: (service: ServiceCompartment) => void;
}

export const BentoServiceGrid = forwardRef<HTMLDivElement, BentoServiceGridProps>(
  ({ onSelectService }, ref) => {
    return (
      <div
        ref={ref}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {servicesData.map((service) => (
          <BentoCard
            key={service.id}
            service={service}
            onSelectService={onSelectService}
          />
        ))}
      </div>
    );
  }
);

BentoServiceGrid.displayName = 'BentoServiceGrid';
