import React from 'react';
import { SectionTag } from '../common/SectionTag';
import { TestimonialSlider } from '../interactive/TestimonialSlider';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-tdds-ivory text-neutral-950 relative overflow-hidden">
      {/* Aligned with standard global site container (matches Hero, Bento, Works, etc.) */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-12">
          {/* Left Column: Heading Lockup (Strictly aligned with site grid) */}
          <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 flex flex-col items-start pt-2">
            <SectionTag className="mb-5">
              TESTIMONIALS
            </SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-4xl xl:text-5xl tracking-tight leading-[1.08] text-neutral-950">
              Kind words from amazing <span className="text-gradient-coral">clients.</span>
            </h2>
          </div>

          {/* Right Column: Interactive Testimonials Slider */}
          <div className="w-full flex-1 min-w-0">
            <TestimonialSlider />
          </div>
        </div>
      </div>
    </section>
  );
};
