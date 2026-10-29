import { LogoMark } from '../common/LogoMark';
import React from 'react';
import { ArrowUpRight, MessageCircle, Mail } from 'lucide-react';
import { siteMeta } from '../../content/siteContent';

export interface FooterProps {
  onOpenLeadDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadDrawer }) => {
  return (
    <footer className="bg-tdds-obsidian text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tdds-coral-start/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Studio Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <LogoMark className="w-8 h-8 text-white" />
                <span className="font-display font-black text-lg tracking-tight">
                  THE DESIGN DUDE STUDIO
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
                {siteMeta.tagline}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-tdds-lime animate-pulse" />
                <span>{siteMeta.location}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 text-white/70">
              <a
                href={siteMeta.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="TDDS on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="TDDS on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${siteMeta.whatsappNumber}?text=Hi%20TDDS%20team`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-tdds-lime transition-colors"
                aria-label="Chat with TDDS on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteMeta.email}`}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Email TDDS studio"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-white transition-colors">
                  Client Roster
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  How We Work
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Breakdown (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-5">
              Pillars
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Video Editing & Production</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Social Media Management</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>CGI / VFX Advertisements</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Logo & Graphic Designing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Action & Enquiries (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-5">
                Start a Conversation
              </h4>
              <p className="text-white/60 text-sm mb-4">
                Have a campaign or brand launch in mind? Let's discuss scope and timeline.
              </p>
              <button
                onClick={onOpenLeadDrawer}
                className="w-full bg-white text-neutral-950 font-bold hover:bg-neutral-100 rounded-pill py-3 px-5 text-sm inline-flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 text-xs text-white/50 space-y-1">
              <p>Email: <a href={`mailto:${siteMeta.email}`} className="text-white/80 hover:underline">{siteMeta.email}</a></p>
              <p>WhatsApp: <span className="text-white/80">{siteMeta.phoneDisplay}</span></p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} The Design Dude Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
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
