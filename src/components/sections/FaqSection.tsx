import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { faqsData } from '../../content/siteContent';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="about" className="py-24 lg:py-32 bg-tdds-ivory text-neutral-950 relative border-t border-tdds-border-light">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <SectionTag className="mb-5">
              QUESTIONS & ANSWERS
            </SectionTag>
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.08] mb-4 text-neutral-950">
              Clear answers, zero agency jargon.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Everything you need to know about how we partner with brands, turnaround timelines, asset ownership, and project pricing.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 divide-y divide-neutral-200">
            {faqsData.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-neutral-900 group-hover:text-black transition-colors">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-all flex-shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-2 pr-12 text-sm text-neutral-600 leading-relaxed font-sans animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
