import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { PortfolioMatrix } from '../interactive/PortfolioMatrix';

export interface FeaturedWorkSectionProps {
  onOpenCaseVideo: (videoUrl: string, title: string) => void;
  onOpenLeadDrawer: () => void;
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({
  onOpenCaseVideo,
  onOpenLeadDrawer,
}) => {
  return (
    <section id="work" className="py-14 sm:py-16 lg:py-20 bg-tdds-ivory text-neutral-950 relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-12">
          {/* Left Column: Heading Lockup (Strictly aligned with Services & Testimonials) */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col items-start pt-1">
            <SectionTag className="mb-6 font-mono">
              FEATURED WORK
            </SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[2.35rem] xl:text-[2.75rem] tracking-tight leading-[1.06] text-neutral-950 mb-4 break-words">
              Real<br />brands.<br />Real <span className="text-gradient-coral">work.</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-sm">
              A glimpse of the stories we've helped brands tell.
            </p>
            <button
              onClick={onOpenLeadDrawer}
              className="group inline-flex items-center gap-2.5 bg-neutral-950 text-white hover:bg-black rounded-pill px-6 sm:px-7 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Right Column: 3 Visible Cards + Smooth Horizontal Scroll Track */}
          <div className="w-full flex-1 min-w-0">
            <PortfolioMatrix
              onOpenCaseVideo={onOpenCaseVideo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
