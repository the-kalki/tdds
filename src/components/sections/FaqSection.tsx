import React from 'react';
import { Plus } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { faqsData } from '../../content/siteContent';

export const FaqSection: React.FC = () => {
  return (
    <section id="about" className="pt-16 pb-14 sm:py-20 lg:py-28 bg-tdds-ivory text-neutral-950 relative border-t border-tdds-border-light">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <SectionTag className="mb-3 sm:mb-5">
              QUESTIONS & ANSWERS
            </SectionTag>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] sm:leading-[1.08] mb-3 sm:mb-4 text-neutral-950">
              Clear answers, zero agency jargon.
            </h2>
            <p className="text-neutral-600 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6 font-normal">
              Everything you need to know about how we partner with brands, turnaround timelines, asset ownership, and project pricing.
            </p>
          </div>

          {/* Right Column: Native HTML5 Accordion */}
          <div className="lg:col-span-7 divide-y divide-neutral-200">
            {faqsData.map((faq, idx) => (
              <details
                key={idx}
                name="faq"
                open={idx === 0}
                className="group py-5 select-none"
              >
                <summary className="w-full flex items-center justify-between text-left gap-4 cursor-pointer list-none focus:outline-none">
                  <span className="font-display font-bold text-base sm:text-lg text-neutral-900 group-hover:text-black transition-colors">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white group-open:bg-neutral-900 group-open:text-white transition-all flex-shrink-0">
                    <Plus className="w-4 h-4 transition-transform duration-200 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="pt-3 pb-2 pr-12 text-sm text-neutral-600 leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
