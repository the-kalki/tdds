import React from 'react';
import { SectionTag } from '../common/SectionTag';
import { clientBrandsData } from '../../content/siteContent';

export const ClientProofMarquee: React.FC = () => {
  // Double the array for seamless infinite marquee loop (-50% transform keyframe)
  const marqueeItems = [...clientBrandsData, ...clientBrandsData];

  return (
    <section id="clients" className="py-14 sm:py-16 bg-tdds-obsidian text-white border-y border-white/10 relative overflow-hidden">
      {/* Section Header Lockup */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10 flex flex-col items-center text-center">
        <SectionTag theme="dark" className="mb-3">
          OUR CLIENTS
        </SectionTag>
        <p className="text-[11px] sm:text-xs font-mono text-white/50 uppercase tracking-[0.2em]">
          Trusted by visionary founders, established retailers, and high-growth brands
        </p>
      </div>

      {/* Infinite Hardware-Accelerated Marquee Track */}
      <div className="tdds-marquee-container relative py-3">
        {/* Left & Right Gradient Fade Masks for Editorial Screen Glides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-tdds-obsidian via-tdds-obsidian/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-tdds-obsidian via-tdds-obsidian/90 to-transparent z-10 pointer-events-none" />

        {/* Moving Marquee Track */}
        <div className="tdds-marquee-track flex items-center gap-16 sm:gap-24 lg:gap-32">
          {marqueeItems.map((brand, idx) => {
            const isSerif = brand.style === 'serif';
            const isMonogram = brand.style === 'monogram';
            const isAccent = brand.isAccent;

            return (
              <div
                key={`${brand.name}-${idx}`}
                className="flex-shrink-0 flex flex-col items-center justify-center text-center group cursor-default select-none transition-transform duration-300 hover:scale-105"
              >
                {/* Brand Wordmark (Top Layer) */}
                <div
                  className={`leading-none flex items-center justify-center gap-1 transition-all duration-300 ${
                    isSerif
                      ? 'font-serif text-xl sm:text-2xl tracking-[0.22em] text-white/80 group-hover:text-white'
                      : isMonogram
                      ? 'font-display font-black text-2xl sm:text-3xl tracking-tighter text-white/85 group-hover:text-white'
                      : isAccent
                      ? 'font-display font-bold text-base sm:text-lg tracking-wider text-tdds-lime group-hover:brightness-125'
                      : 'font-display font-black text-xl sm:text-2xl tracking-wider text-white/85 group-hover:text-white'
                  }`}
                >
                  {brand.name === 'ZANZAR' && (
                    <span className="text-xs text-white/40 group-hover:text-tdds-coral-start transition-colors mr-1">
                      ✦
                    </span>
                  )}
                  <span>{brand.name}</span>
                </div>

                {/* Brand Descriptor / Category (Bottom Layer) */}
                {brand.tagline && (
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono tracking-[0.28em] uppercase mt-1.5 transition-colors duration-300 ${
                      isAccent
                        ? 'text-tdds-lime/70 group-hover:text-tdds-lime font-bold'
                        : 'text-white/40 group-hover:text-white/75'
                    }`}
                  >
                    {brand.tagline}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
