import React from 'react';
import { SectionTag } from '../common/SectionTag';
import { TestimonialSlider } from '../interactive/TestimonialSlider';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-tdds-ivory text-neutral-950 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-xl mb-6">
          <SectionTag className="mb-5">
            ( 04 ) TESTIMONIALS
          </SectionTag>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-neutral-950">
            Kind words from amazing <span className="text-gradient-coral">clients.</span>
          </h2>
        </div>

        {/* Testimonial Slider & Cards */}
        <TestimonialSlider />
      </div>
    </section>
  );
};
