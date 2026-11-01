import React from 'react';
import { SectionTag } from '../common/SectionTag';
import { clientBrandsData } from '../../content/siteContent';
import type { ClientBrand } from '../../types/content';

interface BrandItemProps {
  brand: ClientBrand;
  isClone?: boolean;
}

const BrandItem: React.FC<BrandItemProps> = ({ brand, isClone = false }) => {
  const isSerif = brand.style === 'serif';
  const isMonogram = brand.style === 'monogram';
  const hasInstagram = Boolean(brand.instagramUrl && brand.instagramUrl.trim().length > 0);

  const innerBrandContent = (
    <>
      {/* Brand Wordmark (Top Layer) */}
      <div
        className={`leading-none flex items-center justify-center gap-1 transition-all duration-300 ${
          isSerif
            ? 'font-serif text-xl sm:text-2xl tracking-[0.22em] text-white/80 group-hover:text-white'
            : isMonogram
            ? 'font-display font-black text-2xl sm:text-3xl tracking-tighter text-white/85 group-hover:text-white'
            : 'font-display font-black text-xl sm:text-2xl tracking-wider text-white/85 group-hover:text-white'
        }`}
      >
        {brand.name.includes('ZANZAR') && (
          <span className="text-xs text-white/70 group-hover:text-tdds-coral-start transition-colors mr-1">
            ✦
          </span>
        )}
        <span>{brand.name}</span>
      </div>

      {/* Brand Descriptor / Category (Bottom Layer) */}
      {brand.tagline && (
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.28em] uppercase mt-1.5 transition-colors duration-300 text-white/70 group-hover:text-white">
          {brand.tagline}
        </span>
      )}
    </>
  );

  if (hasInstagram && !isClone) {
    return (
      <a
        href={brand.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex flex-col items-center justify-center text-center group cursor-pointer select-none transition-transform duration-300 hover:scale-105 no-underline focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-sm"
        aria-label={`${brand.name} on Instagram`}
      >
        {innerBrandContent}
      </a>
    );
  }

  return (
    <div
      className="shrink-0 flex flex-col items-center justify-center text-center group cursor-default select-none transition-transform duration-300 hover:scale-105"
      aria-hidden={isClone ? 'true' : undefined}
    >
      {innerBrandContent}
    </div>
  );
};

export const ClientProofMarquee: React.FC = () => {
  return (
    <section id="clients" className="section-defer-render py-14 sm:py-16 bg-tdds-obsidian text-white border-y border-white/10 relative overflow-hidden">
      {/* Section Header Lockup */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10 flex flex-col items-center text-center">
        <SectionTag theme="dark" className="mb-3">
          OUR CLIENTS
        </SectionTag>
        <h2 className="sr-only">Our Clients — Trusted by Visionary Founders and Established Retailers</h2>
        <p className="text-[11px] sm:text-xs font-mono text-white/75 uppercase tracking-[0.2em]">
          Trusted by visionary founders, established retailers, and high-growth brands
        </p>
      </div>

      {/* Infinite Hardware-Accelerated Marquee Container */}
      <div className="tdds-marquee-container relative py-3 w-full overflow-hidden flex select-none">
        {/* Left & Right Gradient Fade Masks for Editorial Screen Glides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-tdds-obsidian via-tdds-obsidian/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-tdds-obsidian via-tdds-obsidian/90 to-transparent z-10 pointer-events-none" />

        {/* Primary Track Set */}
        <div className="tdds-marquee-track flex items-center gap-16 sm:gap-24 lg:gap-32 pr-16 sm:pr-24 lg:pr-32 shrink-0 w-max">
          {clientBrandsData.map((brand, idx) => (
            <BrandItem key={`track1-${brand.name}-${idx}`} brand={brand} />
          ))}
        </div>

        {/* Cloned Track Set (Exact identical copy + matching seam gap for 100% jitter-free loop) */}
        <div
          className="tdds-marquee-track flex items-center gap-16 sm:gap-24 lg:gap-32 pr-16 sm:pr-24 lg:pr-32 shrink-0 w-max"
          aria-hidden="true"
        >
          {clientBrandsData.map((brand, idx) => (
            <BrandItem key={`track2-${brand.name}-${idx}`} brand={brand} isClone />
          ))}
        </div>
      </div>
    </section>
  );
};
