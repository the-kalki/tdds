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
    <section id="work" className="py-24 lg:py-32 bg-tdds-ivory text-neutral-950 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <SectionTag className="mb-5">
              ( 02 ) FEATURED WORK
            </SectionTag>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-4 text-neutral-950">
              Real brands. Real <span className="text-gradient-coral">work.</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
              A glimpse of the stories we've helped brands tell.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenLeadDrawer}
              className="group inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-900/5 text-neutral-900 rounded-pill px-6 py-3 text-sm font-medium transition-all duration-200 active:scale-95"
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Portfolio Matrix */}
        <PortfolioMatrix onOpenCaseVideo={onOpenCaseVideo} />
      </div>
    </section>
  );
};
