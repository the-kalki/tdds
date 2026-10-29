import React from 'react';
import { ArrowUpRight, MessageCircle, Mail } from 'lucide-react';
import { LogoMark } from '../common/LogoMark';
import { SectionTag } from '../common/SectionTag';
import { siteMeta } from '../../content/siteContent';

export interface FooterProps {
  onOpenLeadDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadDrawer }) => {
  const currentYear = 2026;

  return (
    <footer id="contact" className="relative bg-[#080808] text-white pt-20 sm:pt-28 pb-12 overflow-hidden border-t border-white/10">
      {/* 01. Dynamic Multi-Stop Liquid Aurora Canvas Flow (100% Pure CSS Animation - 0 Images) */}
      <div className="footer-liquid-canvas absolute inset-0 pointer-events-none" />

      {/* 02. Secondary Undulating Liquid Wave Mesh */}
      <div className="footer-liquid-wave absolute inset-x-0 bottom-0 h-4/5 pointer-events-none" />

      {/* 03. Top Obsidian Vignette Overlay ensuring maximum text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#080808]/65 to-transparent pointer-events-none" />

      {/* 04. Section Content */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-14 pb-20 sm:pb-28">
          {/* Left Column: Heading Lockup */}
          <div className="max-w-2xl">
            {/* Section Tag without numbering */}
            <SectionTag theme="dark" className="mb-6 sm:mb-8 font-mono">
              LET'S CREATE
            </SectionTag>

            {/* Massive Display H2 */}
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] tracking-tight leading-[1.0] text-white uppercase select-none">
              Have a good<br />idea?
              <span className="block text-gradient-coral mt-1.5 sm:mt-2.5">
                Let's make it happen.
              </span>
            </h2>
          </div>

          {/* Right Column: Equal-Width Precision Vertical Stack (Option A) */}
          <div className="flex flex-col items-stretch sm:items-end gap-3.5 w-full sm:w-auto flex-shrink-0">
            {/* Primary Action Button */}
            <button
              onClick={onOpenLeadDrawer}
              className="group inline-flex items-center justify-center gap-2.5 bg-white text-neutral-950 hover:bg-neutral-100 rounded-pill w-full sm:w-[230px] py-4 text-sm sm:text-base font-bold transition-all duration-300 active:scale-95 shadow-xl hover:shadow-2xl hover:brightness-105"
              aria-label="Start a Project"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Secondary Action: WhatsApp Button */}
            <a
              href={`https://wa.me/${siteMeta.whatsappNumber}?text=Hi%20TDDS%20team,%20I'd%20like%20to%20discuss%20a%20project...`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-white hover:bg-white/10 text-white rounded-pill w-full sm:w-[230px] py-4 text-sm sm:text-base font-semibold transition-all duration-300 active:scale-95 backdrop-blur-sm shadow-lg hover:shadow-xl"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-tdds-lime transition-transform duration-200 group-hover:scale-110" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 05. Clean Minimalist Legal & Social Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <LogoMark className="w-5 h-5 text-white/80" />
            <p>© {currentYear} The Design Dude Studio. All rights reserved.</p>
          </div>

          {/* Subtle Inline Social Icons */}
          <div className="flex items-center gap-2.5 text-white/70">
            <a
              href={siteMeta.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-white/20"
              aria-label="TDDS on Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-white/20"
              aria-label="TDDS on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href={`mailto:${siteMeta.email}`}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-white/20"
              aria-label="Email TDDS Studio"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Legal Pages & Studio Stamp */}
          <div className="flex items-center gap-5 text-white/50">
            <a href="#home" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#home" className="hover:text-white transition-colors">Terms of Engagement</a>
            <span className="text-white/30">•</span>
            <span className="text-white/70">Crafted in Ahmedabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
