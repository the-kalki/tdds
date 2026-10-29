import React from 'react';
import { SectionTag } from '../common/SectionTag';
import { processStepsData } from '../../content/siteContent';

export const ProcessStrip: React.FC = () => {
  return (
    <section id="process" className="pt-16 pb-14 sm:py-16 lg:py-20 bg-tdds-secondary border-y border-tdds-border-light relative">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <SectionTag>THE WAY WE WORK</SectionTag>
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            A tested 4-step agile creative framework
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {processStepsData.map((step) => (
            <div key={step.step} className="flex flex-col">
              <span className="font-mono text-xs text-tdds-coral-start font-bold uppercase tracking-wider mb-2">
                STEP {step.step}
              </span>
              <h3 className="font-display font-bold text-lg text-neutral-950 mb-2">
                {step.headline}
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
