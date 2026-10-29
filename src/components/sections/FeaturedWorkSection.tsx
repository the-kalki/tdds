import React, { useRef } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
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
  const matrixRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!matrixRef.current) return;
    const scrollAmount = 300 * (direction === 'left' ? -1 : 1);
    matrixRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

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
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLeadDrawer}
                className="group inline-flex items-center gap-2.5 border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-900/5 text-neutral-900 rounded-pill px-6 py-3 text-sm font-medium transition-all duration-200 active:scale-95"
              >
                <span>View All Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Scroll Navigation Arrows */}
              <div className="flex items-center gap-1.5 ml-1">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-neutral-900/5"
                  aria-label="Previous work"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-neutral-900/5"
                  aria-label="Next work"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Visible Cards + Smooth Horizontal Scroll Track */}
          <div className="w-full flex-1 min-w-0">
            <PortfolioMatrix
              ref={matrixRef}
              onOpenCaseVideo={onOpenCaseVideo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
