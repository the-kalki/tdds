import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../../content/siteContent';
import type { Testimonial } from '../../types/content';

interface TestimonialCardItemProps {
  item: Testimonial;
  isActive: boolean;
  onSelect: () => void;
  innerRef: (el: HTMLDivElement | null) => void;
}

const TestimonialCardItem: React.FC<TestimonialCardItemProps> = ({
  item,
  isActive,
  onSelect,
  innerRef,
}) => {
  return (
    <div
      ref={innerRef}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`Testimonial from ${item.brandName}${isActive ? ' (Active)' : ''}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className="w-[78vw] sm:w-[290px] lg:w-[310px] xl:w-[330px] max-w-[300px] sm:max-w-none flex-shrink-0 snap-start select-none cursor-pointer focus:outline-none"
    >
      <div
        className={`group relative rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[265px] transition-all duration-300 ease-out will-change-[filter,transform,opacity] ${
          isActive
            ? 'bg-white border-2 border-neutral-950 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.12)] -translate-y-1.5 opacity-100 blur-none'
            : 'bg-white/75 hover:bg-white border border-neutral-200/80 hover:border-neutral-900/40 shadow-sm hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 opacity-55 hover:opacity-100 blur-[1.5px] sm:blur-[2px] hover:blur-none'
        }`}
      >
        <div>
          {/* Header with Quote Icon */}
          <div className="mb-2.5 sm:mb-3.5">
            <Quote
              className={`w-4 h-4 sm:w-6 sm:h-6 rotate-180 transition-colors duration-300 ${
                isActive
                  ? 'text-tdds-coral-start'
                  : 'text-neutral-300 group-hover:text-neutral-600'
              }`}
            />
          </div>

          <p
            className={`text-xs sm:text-base font-normal leading-relaxed line-clamp-4 transition-colors ${
              isActive ? 'text-neutral-950 font-medium' : 'text-neutral-700'
            }`}
          >
            "{item.quote}"
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center gap-2.5 sm:gap-3">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-display font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isActive
                ? 'bg-neutral-950 text-white shadow-md ring-2 ring-tdds-coral-start/50 scale-105'
                : 'bg-neutral-900 text-white/90 shadow-sm'
            }`}
          >
            {item.monogram}
          </div>
          <div className="min-w-0">
            <h4
              className={`font-display font-bold text-xs sm:text-sm truncate transition-colors ${
                isActive ? 'text-neutral-950 font-extrabold' : 'text-neutral-800'
              }`}
            >
              {item.brandName}
            </h4>
            <div
              className="flex items-center gap-0.5 mt-0.5 sm:mt-1"
              aria-label="5 out of 5 stars"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-colors ${
                    isActive
                      ? 'fill-tdds-coral-start text-tdds-coral-start'
                      : 'fill-neutral-950 text-neutral-950'
                  }`}
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const isProgrammaticScroll = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToCard = (index: number) => {
    if (!trackRef.current) return;
    const boundedIndex = Math.max(0, Math.min(testimonialsData.length - 1, index));
    setActiveIndex(boundedIndex);
    activeIndexRef.current = boundedIndex;

    const targetCard = cardRefs.current[boundedIndex];
    if (targetCard) {
      isProgrammaticScroll.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const track = trackRef.current;
      const paddingLeft = window.innerWidth >= 640 ? 24 : 16;
      const targetScrollLeft = targetCard.offsetLeft - track.offsetLeft - paddingLeft;

      track.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  };

  useImperativeHandle(ref, () => ({
    scroll: (direction: 'left' | 'right') => {
      const step = direction === 'right' ? 1 : -1;
      const nextIndex = activeIndexRef.current + step;
      scrollToCard(nextIndex);
    },
  }));

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollLeft = track.scrollLeft;
    const paddingLeft = window.innerWidth >= 640 ? 24 : 16;

    let closestIndex = 0;
    let minDiff = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardLeft = card.offsetLeft - track.offsetLeft - paddingLeft;
      const diff = Math.abs(cardLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      activeIndexRef.current = closestIndex;
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-x-clip overflow-y-visible w-full">
      {/* Soft Right-Edge Ivory Mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-tdds-ivory via-tdds-ivory/50 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto pl-4 pr-12 sm:pl-6 sm:pr-16 pt-5 pb-9 sm:pt-6 sm:pb-10 scroll-pl-4 sm:scroll-pl-6 snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing -my-4"
      >
        {testimonialsData.map((item, idx) => (
          <TestimonialCardItem
            key={item.id}
            item={item}
            isActive={activeIndex === idx}
            onSelect={() => scrollToCard(idx)}
            innerRef={(el) => (cardRefs.current[idx] = el)}
          />
        ))}
      </div>
    </div>
  );
});

TestimonialSlider.displayName = 'TestimonialSlider';
