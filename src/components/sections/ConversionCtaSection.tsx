import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { siteMeta } from '../../content/siteContent';

export interface ConversionCtaSectionProps {
  onOpenLeadDrawer: () => void;
}

export const ConversionCtaSection: React.FC<ConversionCtaSectionProps> = ({
  onOpenLeadDrawer,
}) => {
  return (
    <section id="contact" className="py-24 lg:py-36 bg-tdds-obsidian text-white relative overflow-hidden">
      {/* Background Fluid Neon Ribbon Wave Artwork */}
      <div className="absolute inset-x-0 bottom-0 top-1/4 pointer-events-none opacity-40 mix-blend-screen">
        <img
          src="/images/cta-ribbon.webp"
          alt="Fluid Neon Wave"
          className="w-full h-full object-cover object-bottom"
          loading="lazy"
        />
      </div>

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          <SectionTag theme="dark" className="mb-6">
            ( 05 ) LET'S CREATE
          </SectionTag>

          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.92] text-white uppercase mb-8 select-none">
            Have a good idea?
            <span className="block text-gradient-coral">Let's make it happen.</span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            Tell us about your brand targets, video concept, or social growth ambitions. We typically respond within 24 hours.
          </p>

          {/* Dual Conversion Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenLeadDrawer}
              className="group inline-flex items-center gap-2 bg-white text-neutral-950 font-bold hover:bg-neutral-100 rounded-pill px-8 py-4 text-sm sm:text-base transition-all duration-200 active:scale-95 shadow-xl"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href={`https://wa.me/${siteMeta.whatsappNumber}?text=Hi%20TDDS%20team,%20I'd%20like%20to%20discuss%20a%20project...`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white hover:bg-white/10 text-white rounded-pill px-7 py-4 text-sm sm:text-base font-medium transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-tdds-lime" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
