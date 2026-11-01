import React from 'react';
import { Plus } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { faqsData } from '../../content/siteContent';

export const FaqSection: React.FC = () => {
  return (
    <section id="about" className="section-defer-render pt-16 pb-14 sm:py-20 lg:py-28 bg-tdds-ivory text-neutral-950 relative border-t border-tdds-border-light">
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
                <summary className="w-full flex items-center justify-between text-left gap-4 cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                  <span className="font-display font-bold text-base sm:text-lg text-neutral-950 group-hover:text-black transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white group-open:bg-neutral-900 group-open:text-white transition-all flex-shrink-0">
                    <Plus className="w-4 h-4 transition-transform duration-200 group-open:rotate-45" />
                  </span>
                </summary>
                
                {/* Structured Answer Container: High-Scannability Typography */}
                <div className="pt-3.5 pb-2 pr-4 sm:pr-10 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans max-w-prose space-y-2.5">
                  {/* Opening Summary Sentence (Renders inline <strong> markup cleanly) */}
                  {faq.summary ? (
                    <p
                      className="text-neutral-800 font-normal [&>strong]:text-neutral-950 [&>strong]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: faq.summary }}
                    />
                  ) : (
                    <p
                      className="text-neutral-800 font-normal [&>strong]:text-neutral-950 [&>strong]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: faq.answer || '' }}
                    />
                  )}

                  {/* Multi-part Breakdown with Inline Bolding */}
                  {faq.bullets && faq.bullets.length > 0 && (
                    <ul className="space-y-1.5 pl-4 sm:pl-5 list-disc text-neutral-700 marker:text-neutral-500">
                      {faq.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          dangerouslySetInnerHTML={{ __html: bullet }}
                          className="leading-relaxed [&>strong]:text-neutral-950 [&>strong]:font-semibold"
                        />
                      ))}
                    </ul>
                  )}

                  {/* Core Takeaway / Strategic Reassurance */}
                  {faq.takeaway && (
                    <p
                      className="text-xs sm:text-sm text-neutral-800 font-normal pt-2 border-t border-neutral-200/60 [&>strong]:text-neutral-950 [&>strong]:font-bold"
                      dangerouslySetInnerHTML={{ __html: faq.takeaway }}
                    />
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
