import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { PortfolioMatrix } from '../interactive/PortfolioMatrix';
import { clientBrandsData } from '../../content/siteContent';

export interface FeaturedWorkSectionProps {
  onOpenCaseVideo?: (videoUrl: string, title: string) => void;
  onOpenLeadDrawer: () => void;
  onOpenClientRoster?: () => void;
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({
  onOpenLeadDrawer,
  onOpenClientRoster,
}) => {
  return (
    <section id="work" className="section-defer-render pt-20 pb-14 sm:py-16 lg:py-20 bg-tdds-ivory text-neutral-950 relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {/* Left Column: Heading Lockup (Strictly aligned with Services & Testimonials) */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col items-start pt-1">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-6">
              <SectionTag className="font-mono">
                FEATURED WORK
              </SectionTag>
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-600 tracking-wider uppercase border border-neutral-300 px-2.5 py-0.5 rounded-full bg-neutral-900/[0.03]">
                {clientBrandsData.length} CLIENTS
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-[2.35rem] xl:text-[2.75rem] tracking-tight leading-[1.1] sm:leading-[1.06] text-neutral-950 mb-2.5 sm:mb-4 break-words">
              <span className="block sm:inline lg:block">Real brands. </span>
              <span className="block sm:inline lg:block">Real <span className="text-gradient-coral">work.</span></span>
            </h2>
            <p className="text-neutral-700 text-xs sm:text-sm lg:text-base leading-relaxed font-normal mb-5 sm:mb-8 max-w-sm">
              A glimpse of the stories we've helped brands tell across high-retention campaigns, films, and digital systems.
            </p>
            <button
              type="button"
              onClick={onOpenClientRoster || onOpenLeadDrawer}
              aria-label={`View complete client roster of ${clientBrandsData.length} brands`}
              className="group inline-flex items-center gap-2.5 bg-neutral-950 text-white hover:bg-black rounded-pill px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 cursor-pointer"
            >
              <span>View All Clients ({clientBrandsData.length})</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Right Column: 3 Visible Cards + Smooth Horizontal Scroll Track */}
          <div className="w-full flex-1 min-w-0">
            <PortfolioMatrix />
          </div>
        </div>
      </div>
    </section>
  );
};
