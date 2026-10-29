import { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { caseStudiesData } from '../../content/siteContent';

export interface PortfolioMatrixProps {
  onOpenCaseVideo: (videoUrl: string, title: string) => void;
}

export const PortfolioMatrix = forwardRef<HTMLDivElement, PortfolioMatrixProps>(
  ({ onOpenCaseVideo }, ref) => {
    return (
      <div
        ref={ref}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {caseStudiesData.map((study) => (
          <div
            key={study.id}
            role="button"
            tabIndex={0}
            aria-label={`View ${study.client} - ${study.title} case study`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (study.videoFullUrl) {
                  onOpenCaseVideo(study.videoFullUrl, `${study.client} — ${study.title}`);
                }
              }
            }}
            onClick={() => {
              if (study.videoFullUrl) {
                onOpenCaseVideo(study.videoFullUrl, `${study.client} — ${study.title}`);
              }
            }}
            className="group relative rounded-2xl lg:rounded-3xl overflow-hidden w-[245px] sm:w-[265px] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-2.5rem)/3)] 2xl:w-[calc((100%-3rem)/4)] h-[365px] sm:h-[375px] lg:h-[385px] xl:h-[395px] flex-shrink-0 snap-start bg-neutral-900 cursor-pointer select-none shadow-md hover:shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
          >
            <img
              src={study.coverImage}
              alt={`${study.client} - ${study.title}`}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
              loading="lazy"
              width={717}
              height={960}
            />

            {/* Bottom Gradient Overlay with Brand Name, Campaign Subtitle, & Circular Action Button */}
            <div className="absolute inset-x-0 bottom-0 pt-20 pb-4 px-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between gap-2 z-10">
              <div className="min-w-0">
                <h3 className="font-display font-black text-sm sm:text-base text-white tracking-wide uppercase leading-tight drop-shadow">
                  {study.client}
                </h3>
                <p className="font-sans text-xs text-white/80 font-normal mt-0.5 drop-shadow truncate">
                  {study.title}
                </p>
              </div>

              {/* Circular Action Button */}
              <div className="w-8 h-8 rounded-full border border-white/30 text-white/90 bg-black/40 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white shadow-md">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

PortfolioMatrix.displayName = 'PortfolioMatrix';
