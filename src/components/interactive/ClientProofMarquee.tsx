import React from 'react';
import { SectionTag } from '../common/SectionTag';
import { clientBrandsData } from '../../content/siteContent';

export const ClientProofMarquee: React.FC = () => {
  // Double the array for seamless infinite marquee loop
  const marqueeItems = [...clientBrandsData, ...clientBrandsData];

  return (
    <section id="clients" className="py-20 bg-tdds-obsidian text-white border-y border-white/10 relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 mb-10 flex flex-col items-center text-center">
        <SectionTag theme="dark" className="mb-4">
          ( 03 ) OUR CLIENTS
        </SectionTag>
        <p className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-widest">
          Trusted by visionary founders, established retailers, and high-growth brands
        </p>
      </div>

      {/* Infinite Hardware-Accelerated Marquee Track */}
      <div className="tdds-marquee-container relative py-4">
        {/* Left & Right Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-tdds-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-tdds-obsidian to-transparent z-10 pointer-events-none" />

        <div className="tdds-marquee-track flex items-center gap-12 sm:gap-16">
          {marqueeItems.map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center gap-3 group cursor-default select-none"
            >
              <div
                className={`font-display font-black text-lg sm:text-2xl tracking-wider uppercase transition-colors duration-200 ${
                  brand.isAccent
                    ? 'text-tdds-lime group-hover:brightness-125'
                    : 'text-white/60 group-hover:text-white'
                }`}
              >
                {brand.name}
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest hidden sm:inline-block">
                • {brand.industry}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
