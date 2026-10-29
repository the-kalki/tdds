import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { FluidImpactText } from '../interactive/FluidImpactText';
import { heroContent } from '../../content/siteContent';

export interface HeroSectionProps {
  onOpenLeadDrawer: () => void;
  onOpenShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenLeadDrawer,
  onOpenShowreel,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-screen min-h-[100dvh] flex items-center pt-20 pb-10 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-tdds-ivory overflow-hidden"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Typography Lockup (5 cols on lg/xl) */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            {/* Location Tag */}
            <SectionTag className="mb-4 sm:mb-6">
              {heroContent.locationBadge}
            </SectionTag>

            {/* Main Headline H1 */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-6xl xl:text-7xl tracking-tight text-neutral-950 uppercase leading-[0.92] mb-4 sm:mb-6 select-none">
              <span className="block">IDEAS</span>
              <span className="block">INTO</span>
              <FluidImpactText className="mt-1 sm:mt-1.5" />
            </h1>

            {/* Subheadline Copy */}
            <p className="text-neutral-600 text-xs sm:text-base lg:text-lg font-normal leading-relaxed max-w-md mb-6 sm:mb-10">
              {heroContent.subheadline}
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenLeadDrawer}
                className="group inline-flex items-center gap-2 bg-neutral-950 text-white hover:bg-black rounded-pill px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-base font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                <span>{heroContent.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onOpenShowreel}
                className="group inline-flex items-center gap-2.5 border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-900/5 text-neutral-900 rounded-pill px-4.5 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-medium transition-all duration-200 active:scale-95"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-neutral-400 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-neutral-900 text-neutral-900 ml-0.5" />
                </span>
                <span>Watch Showreel</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Artwork Monogram + Philosophy Tags (7 cols on lg/xl) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-start lg:pl-4 xl:pl-8 mt-2 lg:mt-0">
            <div className="relative flex items-center justify-center lg:justify-start gap-4 sm:gap-10 xl:gap-12 w-full">
              {/* 3D Glass Monogram Sculpture */}
              <div className="relative w-[210px] sm:w-[320px] lg:w-[390px] xl:w-[440px] aspect-square flex-shrink-0 flex items-center justify-center transition-transform duration-700 ease-editorial hover:scale-[1.02]">
                <img
                  src="/images/hero-3d-monogram.webp"
                  alt="The Design Dude Studio 3D Monogram Sculpture"
                  className="w-full h-full object-contain filter drop-shadow-2xl select-none pointer-events-none"
                  width={440}
                  height={440}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Philosophy Vertical Tags with generous breathing room to the right */}
              <div className="flex flex-col items-start gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-mono tracking-[0.24em] text-neutral-400 uppercase select-none flex-shrink-0">
                {heroContent.philosophyTags.map((tag) => (
                  <span key={tag} className="transition-colors duration-200 hover:text-neutral-900">
                    {tag}
                  </span>
                ))}
                <div className="w-4 sm:w-5 h-[1.5px] bg-neutral-300 mt-1.5 sm:mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Scroll Indicator (Far Bottom-Right with subtle bounce effect) */}
      <div className="hidden lg:flex absolute right-6 sm:right-10 bottom-8 sm:bottom-12 flex-col items-center gap-2.5 select-none pointer-events-none z-10 animate-scroll-bounce">
        <span
          style={{ writingMode: 'vertical-rl' }}
          className="text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-neutral-400 uppercase"
        >
          SCROLL
        </span>
        <div className="w-[1.5px] h-8 sm:h-10 bg-neutral-300 relative overflow-hidden rounded-full">
          <div className="w-full h-1/2 bg-neutral-900 rounded-full" />
        </div>
      </div>
    </section>
  );
};
