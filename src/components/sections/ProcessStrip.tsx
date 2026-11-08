import React from 'react';
import { SectionTag } from '../common/SectionTag';
import { processStepsData } from '../../content/siteContent';

export const ProcessStrip: React.FC = () => {
  return (
    <section id="process" className="section-defer-render pt-16 pb-14 sm:py-16 lg:py-20 bg-tdds-secondary border-y border-tdds-border-light relative">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <SectionTag>THE WAY WE WORK</SectionTag>
            <h2 className="sr-only">The Way We Work — Tested 7-Step Agile Creative Framework</h2>
          </div>
          <span className="text-xs font-mono text-neutral-600 uppercase tracking-widest font-medium">
            A tested 7-step agile creative framework
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 sm:gap-y-10">
          {processStepsData.map((step) => (
            <div
              key={step.step}
              className="flex flex-col w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-6rem)/4)]"
            >
              <span className="font-mono text-xs text-[#A7280E] font-bold uppercase tracking-wider mb-2">
                STEP {step.step}
              </span>
              <h3 className="font-display font-bold text-lg text-neutral-950 mb-2">
                {step.headline}
              </h3>
              <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
