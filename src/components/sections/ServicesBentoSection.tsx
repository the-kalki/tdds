import React from 'react';
import { ArrowUpRight } from 'lucide-react';
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
  return (
    <section id="services" className="py-24 lg:py-32 bg-tdds-obsidian text-white relative">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <SectionTag theme="dark" className="mb-5">
              ( 01 ) SERVICES
            </SectionTag>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-4 text-white">
              Everything your brand needs.
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed font-normal">
              From content to campaigns, we handle the entire creative journey — so you can focus on what you do best.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenLeadDrawer}
              className="group inline-flex items-center gap-2 border border-white/20 hover:border-white hover:bg-white/5 text-white rounded-pill px-6 py-3 text-sm font-medium transition-all duration-200 active:scale-95"
            >
              <span>View All Services</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* The 4 Dark Bento Compartments */}
        <BentoServiceGrid onSelectService={onSelectService} />
      </div>
    </section>
  );
};
