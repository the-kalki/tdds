import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SectionTag } from '../common/SectionTag';
import { siteMeta } from '../../content/siteContent';

export const ConversionCtaSection: React.FC = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-tdds-obsidian text-white relative overflow-hidden">
      {/* Background Fluid Neon Ribbon Wave Artwork */}
      <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen">
        <img
          src="/images/cta-ribbon.webp"
          alt="Fluid Neon Wave"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left Column: Compact Headline Lockup */}
          <div className="max-w-2xl">
            <SectionTag theme="dark" className="mb-4">
              LET'S CREATE
            </SectionTag>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.0] text-white uppercase select-none">
              Have a good idea?
              <span className="block text-gradient-coral mt-1">Let's make it happen.</span>
            </h2>
          </div>

          {/* Right Column: WhatsApp Direct Action */}
          <div className="flex-shrink-0">
            <a
              href={`https://wa.me/${siteMeta.whatsappNumber}?text=Hi%20TDDS%20team,%20I'd%20like%20to%20discuss%20a%20project...`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white hover:bg-white/10 text-white rounded-pill px-7 py-3.5 text-sm sm:text-base font-medium transition-all duration-200 active:scale-95 backdrop-blur-sm shadow-xl group"
            >
              <MessageCircle className="w-5 h-5 text-tdds-lime group-hover:scale-110 transition-transform" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
