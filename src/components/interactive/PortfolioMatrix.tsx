import { forwardRef } from 'react';
import { caseStudiesData } from '../../content/siteContent';

export interface PortfolioMatrixProps {
  onOpenCaseVideo?: (videoUrl: string, title: string) => void;
}

export const PortfolioMatrix = forwardRef<HTMLDivElement, PortfolioMatrixProps>(
  (_props, ref) => {
    return (
      <div
        ref={ref}
        className="flex gap-3 sm:gap-4 overflow-x-auto pt-3 pb-8 sm:pt-4 sm:pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth -my-3 sm:-my-4"
      >
        {caseStudiesData.map((study) => (
          <div
            key={study.id}
            className="group relative rounded-2xl lg:rounded-3xl overflow-hidden w-[76vw] sm:w-[260px] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-2.5rem)/3)] 2xl:w-[calc((100%-3rem)/4)] max-w-[280px] sm:max-w-none h-[255px] sm:h-[320px] lg:h-[330px] xl:h-[335px] flex-shrink-0 snap-start bg-neutral-900 select-none shadow-md hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-300"
          >
            <img
              src={study.coverImage}
              alt={`${study.client} - ${study.title}`}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width={717}
              height={960}
            />

            {/* Bottom Gradient Overlay with Brand Name & Campaign Subtitle */}
            <div className="absolute inset-x-0 bottom-0 pt-14 sm:pt-16 pb-3.5 px-3.5 sm:pb-4 sm:px-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between gap-2 z-10">
              <div className="min-w-0">
                <h3 className="font-display font-black text-xs sm:text-sm lg:text-base text-white tracking-wide uppercase leading-tight drop-shadow truncate">
                  {study.client}
                </h3>
                <p className="font-sans text-[10px] sm:text-xs text-white/80 font-normal mt-0.5 drop-shadow truncate">
                  {study.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

PortfolioMatrix.displayName = 'PortfolioMatrix';
