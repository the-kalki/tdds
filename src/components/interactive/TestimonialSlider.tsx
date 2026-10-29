import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonialsData } from '../../content/siteContent';
import type { Testimonial } from '../../types/content';

interface TestimonialCardItemProps {
  item: Testimonial;
}

const TestimonialCardItem: React.FC<TestimonialCardItemProps> = ({ item }) => {
  return (
    <div
      className="w-[80vw] sm:w-[270px] lg:w-[290px] xl:w-[315px] flex-shrink-0 snap-start select-none"
    >
      <div className="card-aurora-glow group relative rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
        <div className="relative z-10 rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between min-h-[260px] sm:min-h-[275px] bg-white border border-neutral-200/90 transition-colors duration-300">
          <div>
            <div className="text-neutral-300 mb-3.5">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 rotate-180 text-neutral-400 group-hover:text-tdds-coral-start transition-colors duration-300" />
            </div>
            <p className="text-neutral-800 text-sm sm:text-base font-normal leading-relaxed line-clamp-4">
              "{item.quote}"
            </p>
          </div>

          <div className="pt-3.5 border-t border-neutral-100 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-tdds-coral-start/40 text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
              {item.monogram}
            </div>
            <div className="min-w-0">
              <h4 className="font-display font-bold text-xs sm:text-sm text-neutral-950 truncate">
                {item.brandName}
              </h4>
              <div
                className="text-tdds-coral-start text-[11px] sm:text-xs tracking-wider flex items-center gap-0.5 mt-0.5"
                aria-label="5 star rating"
              >
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialSlider: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 320 * (direction === 'left' ? -1 : 1);
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Slider Controls Header - Top Right Navigation */}
      <div className="flex items-center justify-end gap-2.5 mb-5 pr-1 sm:pr-2">
        <button
          onClick={() => scroll('left')}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-all active:scale-95 shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-all active:scale-95 shadow-sm hover:shadow"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Testimonials Carousel Track with Soft Right-Edge Ivory Fade */}
      <div className="relative overflow-x-clip overflow-y-visible w-full py-8 -my-6 pl-1">
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-l from-tdds-ivory via-tdds-ivory/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-4.5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {testimonialsData.map((item) => (
            <TestimonialCardItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
