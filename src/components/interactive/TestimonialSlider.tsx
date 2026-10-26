import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonialsData } from '../../content/siteContent';

export const TestimonialSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? testimonialsData.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === testimonialsData.length - 1 ? 0 : current + 1));
  };

  return (
    <div>
      {/* Slider Controls Header on Desktop */}
      <div className="flex items-center justify-end gap-3 mb-8">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-800 hover:text-black transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-800 hover:text-black transition-all active:scale-95 shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonialsData.map((item, idx) => {
          const isFeatured = idx === activeIndex;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`View testimonial from ${item.clientName} of ${item.brandName}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(idx);
                }
              }}
              onClick={() => setActiveIndex(idx)}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 ${
                isFeatured
                  ? 'bg-white border-2 border-neutral-900 shadow-xl -translate-y-1'
                  : 'bg-neutral-100/70 border border-neutral-200/80 hover:bg-white hover:border-neutral-300 shadow-sm opacity-85 hover:opacity-100'
              }`}
            >
              <div>
                {/* Quote Icon */}
                <div className="text-neutral-400 mb-4">
                  <Quote className="w-6 h-6 rotate-180" />
                </div>

                {/* Quote Text */}
                <p className="text-neutral-900 text-base sm:text-lg font-normal leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info and Monogram */}
              <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white font-display font-bold text-sm flex items-center justify-center">
                    {item.monogram}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-neutral-950">
                      {item.brandName}
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans">
                      {item.clientName} {item.clientRole ? `• ${item.clientRole}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-tdds-coral-start text-xs tracking-widest" aria-label="5 star rating">
                  ★★★★★
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
