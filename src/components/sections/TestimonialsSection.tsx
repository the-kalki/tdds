import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { TestimonialSlider, type TestimonialSliderRef } from '../interactive/TestimonialSlider';

export const TestimonialsSection: React.FC = () => {
  const sliderRef = useRef<TestimonialSliderRef>(null);

  return (
    <section id="testimonials" className="py-14 sm:py-16 lg:py-20 bg-tdds-ivory text-neutral-950 relative overflow-hidden">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Header Bar: SectionTag (No numbers) on Left + Navigation Controls on Right */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <SectionTag className="font-mono">
            TESTIMONIALS
          </SectionTag>

          <div className="flex items-center gap-2">
            <button
              onClick={() => sliderRef.current?.scroll('left')}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-all duration-200 active:scale-95 shadow-sm hover:shadow"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => sliderRef.current?.scroll('right')}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-700 hover:text-black transition-all duration-200 active:scale-95 shadow-sm hover:shadow"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Row: Left 5-Line Stacked Headline + Right Carousel Track (Top & Baseline Aligned) */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-12">
          {/* Left Column: 5-Line Headline matching user screenshot */}
          <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 pt-0.5">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[2.65rem] xl:text-[3.15rem] tracking-tight leading-[0.93] text-neutral-950 select-none">
              <span className="block">Kind</span>
              <span className="block">words</span>
              <span className="block">from</span>
              <span className="block">amazing</span>
              <span className="block text-gradient-coral">clients.</span>
            </h2>
          </div>

          {/* Right Column: Cards Carousel Track */}
          <div className="w-full flex-1 min-w-0">
            <TestimonialSlider ref={sliderRef} />
          </div>
        </div>
      </div>
    </section>
  );
};
