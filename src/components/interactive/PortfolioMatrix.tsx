import React, { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ServiceCategory } from '../../types/content';
import { caseStudiesData } from '../../content/siteContent';

export interface PortfolioMatrixProps {
  onOpenCaseVideo: (videoUrl: string, title: string) => void;
}

export const PortfolioMatrix: React.FC<PortfolioMatrixProps> = ({
  onOpenCaseVideo,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');

  const categories: ServiceCategory[] = [
    'All',
    'Video & Reels',
    'Social Media',
    'Advertising',
    'Branding & Design',
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return caseStudiesData;
    return caseStudiesData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-pill text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-900/[0.04] text-neutral-600 hover:text-black hover:bg-neutral-900/[0.08] border border-neutral-300/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Aspect-Locked Editorial Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((study) => (
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
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-200 cursor-pointer select-none shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
          >
            {/* Background Image Container */}
            <img
              src={study.coverImage}
              alt={`${study.client} - ${study.title}`}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
              loading="lazy"
              width={360}
              height={450}
            />

            {/* Dark Editorial Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Top Index Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="font-mono text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-pill border border-white/10">
                {study.index}
              </span>
            </div>

            {/* Bottom Content Metadata */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
              <div>
                <span className="block font-display font-black text-sm text-white/90 tracking-wider uppercase mb-0.5">
                  {study.client}
                </span>
                <span className="block font-sans text-xs text-white/75 font-medium">
                  {study.title}
                </span>
                {study.verifiedResult && (
                  <span className="hidden lg:block text-[10px] font-mono text-tdds-lime mt-1 line-clamp-1">
                    {study.verifiedResult}
                  </span>
                )}
              </div>

              {/* Action Trigger Pill */}
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-neutral-950 group-hover:scale-110 flex-shrink-0 ml-2">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
