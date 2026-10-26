import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonialsData } from '../../content/siteContent';
import type { Testimonial } from '../../types/content';
import { useTilt } from '../../hooks/useTilt';

interface TestimonialCardItemProps {
  item: Testimonial;
  isFeatured: boolean;
  distance: number;
  onSelect: () => void;
  innerRef?: React.Ref<HTMLDivElement>;
}

const TestimonialCardItem: React.FC<TestimonialCardItemProps> = ({
  item,
  isFeatured,
  distance,
  onSelect,
  innerRef,
}) => {
  const { ref: tiltRef, style: tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(5);

  // Stepped 3D Depth Scale & Opacity Cascade:
  // - Distance 0: Main Featured Card (Scale 1.0, Opacity 100%, Z-index 10)
  // - Distance 1: 1st Trailing Card (Scale 0.90, Opacity 75%, 3D depth, Z-index 5)
  // - Distance 2: 2nd Trailing Card (Scale 0.80, Opacity 45%, 3D depth, Z-index 2) - At least half visible
  // - Distance >= 3: Tucked away (Scale 0.70, Opacity 12%)
  let opacity = 1;
  let transform = 'perspective(1000px) rotateY(0deg) scale(1)';
  let zIndex = 1;

  if (distance === 0) {
    opacity = 1;
    transform = 'perspective(1000px) rotateY(0deg) scale(1)';
    zIndex = 10;
  } else if (distance === 1) {
    opacity = 0.75;
    transform = 'perspective(1000px) rotateY(-4deg) scale(0.90)';
    zIndex = 5;
  } else if (distance === 2) {
    opacity = 0.45;
    transform = 'perspective(1000px) rotateY(-8deg) scale(0.80)';
    zIndex = 2;
  } else if (distance >= 3) {
    opacity = 0.12;
    transform = 'perspective(1000px) rotateY(-12deg) scale(0.70)';
    zIndex = 1;
  } else {
    // Left of active (scrolled past): partially dimmed
    opacity = 0.35;
    transform = 'perspective(1000px) rotateY(4deg) scale(0.92)';
    zIndex = 1;
  }

  return (
    <div
      ref={innerRef}
      role="button"
      tabIndex={0}
      aria-label={`View testimonial from ${item.brandName}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        opacity,
        transform,
        transformOrigin: 'left center',
        zIndex,
      }}
      className={`w-[80vw] sm:w-[270px] lg:w-[290px] xl:w-[315px] flex-shrink-0 cursor-pointer select-none focus:outline-none transition-all duration-500 ease-editorial ${
        distance > 0 ? 'hover:opacity-100 hover:scale-[0.93]' : ''
      }`}
    >
      {/* 3D Tilt Wrapper with Fluid Aurora Shader Border */}
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className={`card-aurora-glow group relative rounded-2xl transition-all duration-300 ${
          isFeatured ? 'active-card shadow-xl' : 'shadow-sm hover:shadow-md'
        }`}
      >
        {/* Inner Solid Card Body */}
        <div
          className={`relative z-10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[260px] sm:min-h-[275px] transition-colors duration-300 ${
            isFeatured
              ? 'bg-white border border-neutral-200/90'
              : 'bg-white/85 hover:bg-white border border-neutral-200/60'
          }`}
        >
          <div>
            {/* Quotation Icon */}
            <div className="text-neutral-300 mb-3.5">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 rotate-180 text-neutral-400 group-hover:text-tdds-coral-start transition-colors duration-300" />
            </div>

            {/* Quote Content */}
            <p className="text-neutral-800 text-sm sm:text-base font-normal leading-relaxed line-clamp-4">
              "{item.quote}"
            </p>
          </div>

          {/* Client Info Bar: Monogram + Name + 5 Stars Underneath */}
          <div className="pt-3.5 border-t border-neutral-100 flex items-center gap-3">
            {/* Monogram Badge */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-tdds-coral-start/40 text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
              {item.monogram}
            </div>
            <div className="min-w-0">
              <h4 className="font-display font-bold text-xs sm:text-sm text-neutral-950 truncate">
                {item.brandName}
              </h4>
              {/* 5-Star Rating in Aurora Coral */}
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
  const cardCount = testimonialsData.length;
  // Repeat items 3 times for seamless infinite sliding
  const repeatedItems = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  // Start at middle copy
  const [currentIndex, setCurrentIndex] = useState(cardCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideOffset, setSlideOffset] = useState(360);
  const firstCardRef = useRef<HTMLDivElement>(null);

  // Recalculate slide offset on mount & resize
  const updateOffset = useCallback(() => {
    if (firstCardRef.current) {
      const parent = firstCardRef.current.parentElement;
      const gap = parent
        ? parseFloat(window.getComputedStyle(parent).columnGap || window.getComputedStyle(parent).gap) || 16
        : 16;
      setSlideOffset(firstCardRef.current.offsetWidth + gap);
    }
  }, []);

  useEffect(() => {
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [updateOffset]);

  // Turn transitions back on after boundary snaps
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const prev = () => {
    setIsTransitioning(true);
    setCurrentIndex((curr) => curr - 1);
  };

  const next = () => {
    setIsTransitioning(true);
    setCurrentIndex((curr) => curr + 1);
  };

  // Seamless boundary wrap on transition end
  const handleTransitionEnd = () => {
    if (currentIndex >= cardCount * 2) {
      setIsTransitioning(false);
      setCurrentIndex((curr) => curr - cardCount);
    } else if (currentIndex < cardCount) {
      setIsTransitioning(false);
      setCurrentIndex((curr) => curr + cardCount);
    }
  };

  return (
    <div className="w-full">
      {/* Slider Controls Header - Top Right Navigation */}
      <div className="flex items-center justify-end gap-2.5 mb-5 pr-1 sm:pr-2">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-all active:scale-95 shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-all active:scale-95 shadow-sm hover:shadow"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Testimonials Carousel Track with Soft Right-Edge Ivory Fade */}
      <div className="relative overflow-hidden w-full py-6 -my-6 pl-1">
        {/* Soft Right Ivory Gradient Overlay */}
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-l from-tdds-ivory via-tdds-ivory/60 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Carousel Moving Track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex gap-4 sm:gap-4.5 will-change-transform"
          style={{
            transform: `translateX(-${currentIndex * slideOffset}px)`,
            transition: isTransitioning
              ? 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'none',
          }}
        >
          {repeatedItems.map((item, idx) => {
            const distance = idx - currentIndex;
            const isFeatured = distance === 0;

            return (
              <TestimonialCardItem
                key={`${item.id}-${idx}`}
                innerRef={idx === 0 ? firstCardRef : undefined}
                item={item}
                isFeatured={isFeatured}
                distance={distance}
                onSelect={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(idx);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
