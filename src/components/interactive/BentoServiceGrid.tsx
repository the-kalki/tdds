import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ServiceCompartment } from '../../types/content';
import { servicesData } from '../../content/siteContent';
import { useTilt } from '../../hooks/useTilt';

interface BentoCardProps {
  service: ServiceCompartment;
  onSelectService: (service: ServiceCompartment) => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ service, onSelectService }) => {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(5);

  return (
    <div
      ref={ref}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={`View deliverables for ${service.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectService(service);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectService(service)}
      className="group relative rounded-2xl bg-[#141414] border border-white/10 p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer transition-colors duration-300 hover:border-white/25 hover:bg-[#181818] focus:outline-none focus-visible:ring-2 focus-visible:ring-tdds-lime"
    >
      {/* Top Bar with Number Tag */}
      <div className="flex items-center justify-between mb-4 z-10">
        <span className="font-mono text-xs text-white/50 tracking-wider">
          {service.numberTag} )
        </span>
      </div>

      {/* 3D Visual Asset */}
      <div className="w-full h-36 sm:h-40 relative flex items-center justify-center mb-6 overflow-hidden rounded-xl bg-black/40">
        <img
          src={service.imageAsset}
          alt={service.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={320}
          height={160}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between z-10">
        <div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 tracking-tight group-hover:text-tdds-lime transition-colors">
            {service.title}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
            {service.shortDescription}
          </p>

          {/* Deliverables Checklist */}
          <ul className="space-y-1.5 mb-8">
            {service.deliverables.map((item, idx) => (
              <li
                key={idx}
                className="text-[11px] sm:text-xs text-white/70 flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-tdds-lime/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Action Trigger */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-white/60 uppercase tracking-wider group-hover:text-white transition-colors">
            {service.actionLabel}
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export interface BentoServiceGridProps {
  onSelectService: (service: ServiceCompartment) => void;
}

export const BentoServiceGrid: React.FC<BentoServiceGridProps> = ({
  onSelectService,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {servicesData.map((service) => (
        <BentoCard
          key={service.id}
          service={service}
          onSelectService={onSelectService}
        />
      ))}
    </div>
  );
};
