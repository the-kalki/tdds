import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
} from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import type { ServiceCompartment } from '../../types/content';
import { servicesData } from '../../content/siteContent';

interface BentoCardProps {
  service: ServiceCompartment;
  onSelectService: (service: ServiceCompartment) => void;
  innerRef: (el: HTMLDivElement | null) => void;
  canTriggerClick: () => boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
  service,
  onSelectService,
  innerRef,
  canTriggerClick,
}) => {
  return (
    <div
      ref={innerRef}
      role="button"
      tabIndex={0}
      aria-label={`${service.title} — Explore Scope deliverables`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectService(service);
        }
      }}
      onClick={() => {
        if (!canTriggerClick()) return;
        onSelectService(service);
      }}
      className="group relative rounded-2xl lg:rounded-3xl bg-[#141414]/90 backdrop-blur-xl border border-white/10 p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:bg-[#181818] shadow-md hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white w-[78vw] sm:w-[260px] lg:w-[calc((100%-2rem)/2.35)] xl:w-[calc((100%-2.5rem)/3.35)] 2xl:w-[calc((100%-3rem)/3.35)] max-w-[285px] sm:max-w-none h-[310px] sm:h-[375px] lg:h-[385px] xl:h-[395px] flex-shrink-0 snap-center select-none"
    >
      <div>
        {/* 3D Visual Asset (Centered floating icon) */}
        <div className="w-full h-16 sm:h-24 lg:h-26 relative flex items-center justify-center my-1 sm:my-1.5 overflow-hidden">
          <img
            src={service.imageAsset}
            alt={service.title}
            className="max-h-full max-w-[85%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width={200}
            height={110}
          />
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-sm sm:text-base text-white mb-2 sm:mb-2.5 tracking-tight leading-snug group-hover:text-tdds-coral-start transition-colors">
          {service.title}
        </h3>

        {/* Deliverables Feature Bullets (Scannable checklist with accent markers) */}
        <ul className="border-t border-white/10 pt-2.5 sm:pt-3 space-y-1.5 sm:space-y-2">
          {service.deliverables.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-[11px] sm:text-xs text-white/80 group-hover:text-white leading-snug font-medium transition-colors"
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-tdds-coral-start group-hover:bg-tdds-lime transition-colors flex-shrink-0"
              />
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action Trigger: Scope label + Circular Button */}
      <div className="pt-2 flex items-center justify-between">
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/70 group-hover:text-white transition-colors">
          Explore Scope
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/90 transition-all duration-300 group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};

export interface BentoServiceGridRef {
  scroll: (direction: 'left' | 'right') => void;
  scrollToIndex: (index: number) => void;
}

export interface BentoServiceGridProps {
  onSelectService: (service: ServiceCompartment) => void;
  onStateChange?: (state: {
    activeIndex: number;
    canScrollLeft: boolean;
    canScrollRight: boolean;
    total: number;
  }) => void;
}

export const BentoServiceGrid = forwardRef<BentoServiceGridRef, BentoServiceGridProps>(
  ({ onSelectService, onStateChange }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);

    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const dragDistanceRef = useRef(0);
    const isProgrammaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateScrollState = useCallback(() => {
      const track = trackRef.current;
      if (!track) return;

      const { scrollLeft, scrollWidth, clientWidth } = track;
      const maxScroll = Math.max(0, scrollWidth - clientWidth);
      const newCanScrollLeft = scrollLeft > 8;
      const newCanScrollRight = scrollLeft < maxScroll - 8;

      setCanScrollLeft(newCanScrollLeft);
      setCanScrollRight(newCanScrollRight);

      // Dead-center card calculation: active card is closest to viewport center
      const viewportCenter = scrollLeft + clientWidth / 2;
      let closestIndex = 0;
      let minDiff = Infinity;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardCenter = card.offsetLeft - track.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(cardCenter - viewportCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
      activeIndexRef.current = closestIndex;
      onStateChange?.({
        activeIndex: closestIndex,
        canScrollLeft: newCanScrollLeft,
        canScrollRight: newCanScrollRight,
        total: servicesData.length,
      });
    }, [onStateChange]);

    const scrollToIndex = useCallback(
      (index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const boundedIndex = Math.max(0, Math.min(servicesData.length - 1, index));
        const targetCard = cardRefs.current[boundedIndex];
        if (!targetCard) return;

        isProgrammaticScrollRef.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        // Center the target card dead-center in the viewport
        const cardLeft = targetCard.offsetLeft - track.offsetLeft;
        const centerOffset = (track.clientWidth - targetCard.offsetWidth) / 2;
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        const targetScrollLeft = Math.max(0, Math.min(maxScroll, cardLeft - centerOffset));

        track.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth',
        });

        setActiveIndex(boundedIndex);
        activeIndexRef.current = boundedIndex;
        onStateChange?.({
          activeIndex: boundedIndex,
          canScrollLeft: targetScrollLeft > 8,
          canScrollRight: targetScrollLeft < maxScroll - 8,
          total: servicesData.length,
        });

        scrollTimeoutRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
          updateScrollState();
        }, 450);
      },
      [onStateChange, updateScrollState]
    );

    const scroll = useCallback(
      (direction: 'left' | 'right') => {
        const nextIndex = activeIndexRef.current + (direction === 'right' ? 1 : -1);
        scrollToIndex(nextIndex);
      },
      [scrollToIndex]
    );

    useImperativeHandle(
      ref,
      () => ({
        scroll,
        scrollToIndex,
      }),
      [scroll, scrollToIndex]
    );

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      updateScrollState();

      const handleResize = () => {
        updateScrollState();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, [updateScrollState]);

    const handleScroll = () => {
      if (!isProgrammaticScrollRef.current) {
        updateScrollState();
      }
    };

    // Mouse drag-to-scroll support for desktop
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      isDraggingRef.current = true;
      startXRef.current = e.pageX - trackRef.current.offsetLeft;
      scrollLeftRef.current = trackRef.current.scrollLeft;
      dragDistanceRef.current = 0;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || !trackRef.current) return;
      const x = e.pageX - trackRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1.25;
      dragDistanceRef.current = Math.abs(walk);
      trackRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const canTriggerClick = () => dragDistanceRef.current < 6;

    return (
      <div className="relative overflow-x-clip overflow-y-visible w-full group/slider">
        {/* Soft edge gradient masks with calibrated width so centered cards remain 100% visible */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-r from-tdds-obsidian via-tdds-obsidian/70 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-tdds-obsidian via-tdds-obsidian/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Floating in-track Navigation Chevrons for desktop view */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left to previous service"
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#181818]/90 hover:bg-white text-white hover:text-neutral-950 border border-white/20 hover:border-white items-center justify-center transition-all duration-200 shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right to view more services"
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#181818]/90 hover:bg-white text-white hover:text-neutral-950 border border-white/20 hover:border-white items-center justify-center transition-all duration-200 shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        )}

        {/* Carousel Track with CSS Scroll Snap center alignment and safe breathing room */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-3 sm:gap-4 overflow-x-auto pt-3 pb-8 sm:pt-4 sm:pb-10 px-2 sm:px-3 scroll-px-2 sm:scroll-px-3 snap-x snap-mandatory no-scrollbar scroll-smooth -my-3 sm:-my-4 cursor-grab active:cursor-grabbing"
        >
          {servicesData.map((service, idx) => (
            <BentoCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
              innerRef={(el) => (cardRefs.current[idx] = el)}
              canTriggerClick={canTriggerClick}
            />
          ))}
        </div>
      </div>
    );
  }
);

BentoServiceGrid.displayName = 'BentoServiceGrid';
