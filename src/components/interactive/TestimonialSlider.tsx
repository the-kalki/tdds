import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../../content/siteContent';
import type { Testimonial } from '../../types/content';

interface TestimonialCardItemProps {
  item: Testimonial;
}

const TestimonialCardItem: React.FC<TestimonialCardItemProps> = ({ item }) => {
  return (
    <div className="w-[78vw] sm:w-[290px] lg:w-[310px] xl:w-[330px] max-w-[300px] sm:max-w-none flex-shrink-0 snap-start select-none">
      <div className="card-editorial-lift group relative rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[265px] bg-white border border-neutral-200/90 hover:border-neutral-900/30 transition-all duration-300 shadow-sm hover:shadow-xl">
        <div>
          <div className="text-neutral-300 mb-2.5 sm:mb-3.5">
            <Quote className="w-4 h-4 sm:w-6 sm:h-6 rotate-180 text-neutral-300 group-hover:text-tdds-coral-start transition-colors duration-300" />
          </div>
          <p className="text-neutral-800 text-xs sm:text-base font-normal leading-relaxed line-clamp-4">
            "{item.quote}"
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-950 text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-sm border border-neutral-800">
            {item.monogram}
          </div>
          <div className="min-w-0">
            <h4 className="font-display font-bold text-xs sm:text-sm text-neutral-950 truncate">
              {item.brandName}
            </h4>
            <div
              className="flex items-center gap-0.5 mt-0.5 sm:mt-1"
              aria-label="5 out of 5 stars"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-neutral-950 text-neutral-950"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface TestimonialSliderRef {
  scroll: (direction: 'left' | 'right') => void;
}

export const TestimonialSlider = forwardRef<TestimonialSliderRef>((_, ref) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scroll: (direction: 'left' | 'right') => {
      if (!trackRef.current) return;
      const scrollAmount = 330 * (direction === 'left' ? -1 : 1);
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    },
  }));

  return (
    <div className="relative overflow-x-clip overflow-y-visible w-full">
      {/* Soft Right-Edge Ivory Mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-tdds-ivory via-tdds-ivory/50 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-4.5 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {testimonialsData.map((item) => (
          <TestimonialCardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
});

TestimonialSlider.displayName = 'TestimonialSlider';
