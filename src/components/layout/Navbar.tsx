import { LogoMark } from '../common/LogoMark';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { siteMeta } from '../../content/siteContent';

export interface NavbarProps {
  onOpenLeadDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadDrawer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = ['home', 'services', 'work', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-tdds-ivory/85 backdrop-blur-md border-b border-tdds-border-light/60 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Monogram */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-lg p-1"
          >
            <LogoMark className="w-8 h-8 text-neutral-950 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-xs sm:text-sm tracking-tight leading-tight text-neutral-950">
                THE DESIGN DUDE
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-neutral-500 uppercase leading-none">
                STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-neutral-700">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-150 hover:text-neutral-950 ${
                    isActive ? 'text-neutral-950 font-semibold' : 'text-neutral-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLeadDrawer}
              className="group hidden sm:inline-flex items-center gap-2 bg-neutral-950 text-white hover:bg-black rounded-pill px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm"
              aria-label="Start a project enquiry"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-800 hover:text-black hover:bg-neutral-200/50 rounded-lg transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="absolute top-16 left-4 right-4 bg-tdds-ivory rounded-2xl p-6 border border-tdds-border-light shadow-2xl flex flex-col gap-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-neutral-400">0{navLinks.indexOf(link) + 1}</span>
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-tdds-border-light flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadDrawer();
                }}
                className="w-full flex items-center justify-center gap-2 bg-neutral-950 text-white rounded-pill py-3 text-sm font-semibold"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${siteMeta.whatsappNumber}?text=Hi%20TDDS%20team,%20I'd%20like%20to%20discuss%20a%20project`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-neutral-300 rounded-pill py-2.5 text-xs font-medium text-neutral-800"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
