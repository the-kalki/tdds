import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Search, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { clientBrandsData } from '../../content/siteContent';
import type { ClientBrand } from '../../types/content';
import { SectionTag } from '../common/SectionTag';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export interface ClientRosterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeadDrawer?: () => void;
}

type CategoryFilter = 'all' | 'fashion' | 'weddings' | 'lifestyle' | 'corporate';

export const ClientRosterDrawer: React.FC<ClientRosterDrawerProps> = ({
  isOpen,
  onClose,
  onOpenLeadDrawer,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const categoryCounts = useMemo(() => {
    return {
      all: clientBrandsData.length,
      fashion: clientBrandsData.filter((b) => b.category === 'fashion').length,
      weddings: clientBrandsData.filter((b) => b.category === 'weddings').length,
      lifestyle: clientBrandsData.filter((b) => b.category === 'lifestyle').length,
      corporate: clientBrandsData.filter((b) => b.category === 'corporate').length,
    };
  }, []);

  const filteredBrands = useMemo(() => {
    return clientBrandsData.filter((brand) => {
      const matchesCategory =
        selectedCategory === 'all' || brand.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inName = brand.name.toLowerCase().includes(q);
      const inTagline = brand.tagline?.toLowerCase().includes(q) ?? false;
      const inIndustry = brand.industry?.toLowerCase().includes(q) ?? false;
      const inDeliverables =
        brand.servicesDelivered?.some((s) => s.toLowerCase().includes(q)) ?? false;

      return inName || inTagline || inIndustry || inDeliverables;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: `All (${categoryCounts.all})` },
    { id: 'fashion', label: `Fashion & Luxe (${categoryCounts.fashion})` },
    { id: 'weddings', label: `Weddings & Events (${categoryCounts.weddings})` },
    { id: 'lifestyle', label: `Lifestyle & Retail (${categoryCounts.lifestyle})` },
    { id: 'corporate', label: `Corporate (${categoryCounts.corporate})` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roster-drawer-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close client roster backdrop"
        className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-default border-none p-0 m-0 w-full h-full"
      />

      {/* Drawer Surface */}
      <div className="relative z-10 w-full max-w-2xl bg-[#121212] text-white h-full border-l border-white/10 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Top Fixed Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 bg-[#141414]/90 backdrop-blur-xl flex-shrink-0">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <SectionTag theme="dark" className="font-mono text-[10px] sm:text-[11px]">
                ROSTER DIRECTORY
              </SectionTag>
              <span className="font-mono text-[10px] sm:text-[11px] text-white/50 tracking-wider uppercase border border-white/10 px-2.5 py-0.5 rounded-full bg-white/[0.03]">
                {clientBrandsData.length} PARTNERSHIPS
              </span>
            </div>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-neutral-950 flex items-center justify-center text-white/70 hover:text-neutral-950 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close client roster drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2
            id="roster-drawer-title"
            className="font-display font-black text-xl sm:text-2xl text-white tracking-tight leading-snug mb-1"
          >
            Visionary brands. Real partnerships.
          </h2>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-xl">
            A complete directory of founders, retailers, and high-growth brands we've scaled across cinematic content, visual systems, and growth architectures.
          </p>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brand name, industry, or deliverable..."
              className="w-full bg-[#1c1c1c] border border-white/10 focus:border-tdds-coral-start focus:ring-1 focus:ring-tdds-coral-start rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 -mb-1 pb-1"
            role="tablist"
            aria-label="Filter client roster by category"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all duration-200 select-none cursor-pointer focus:outline-none ${
                    isActive
                      ? 'bg-gradient-to-r from-tdds-coral-start to-tdds-coral-end text-white shadow-sm font-semibold'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Client Roster Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredBrands.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <Search className="w-8 h-8 text-white/20 mb-3" />
              <p className="font-display font-bold text-base text-white">No brands found</p>
              <p className="text-white/50 text-xs mt-1 max-w-xs">
                No clients match your filter "{searchQuery}". Try searching another keyword or clearing the filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {filteredBrands.map((brand, idx) => (
                <ClientCard key={brand.name} brand={brand} index={idx + 1} />
              ))}
            </div>
          )}
        </div>

        {/* Fixed Footer Conversion Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#161616] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-tdds-coral-start/15 border border-tdds-coral-start/30 flex items-center justify-center text-tdds-coral-start flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-xs sm:text-sm text-white">
                Want your brand in this roster?
              </p>
              <p className="text-white/60 text-[11px]">
                We engineer creative systems that refuse to be ignored.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLeadDrawer?.();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-tdds-lime text-neutral-950 font-bold text-xs rounded-pill px-5 py-2.5 transition-all duration-200 active:scale-95 shadow-md flex-shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ClientCardProps {
  brand: ClientBrand;
  index: number;
}

const ClientCard: React.FC<ClientCardProps> = ({ brand, index }) => {
  const isSerif = brand.style === 'serif';
  const isMonogram = brand.style === 'monogram';

  return (
    <div className="group relative rounded-2xl bg-[#181818]/90 hover:bg-[#1e1e1e] border border-white/10 hover:border-white/30 p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] select-none">
      <div>
        {/* Top Row: Index number & Category badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-[10px] text-white/40 tracking-wider">
            {String(index).padStart(2, '0')}
          </span>
          {brand.category && (
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
              {brand.category}
            </span>
          )}
        </div>

        {/* Brand Name (Rendered per brand typography style) */}
        <h3
          className={`text-white transition-colors group-hover:text-tdds-coral-start leading-tight mb-1 ${
            isSerif
              ? 'font-serif text-lg tracking-[0.06em]'
              : isMonogram
              ? 'font-display font-black text-lg tracking-tight'
              : 'font-display font-bold text-base sm:text-lg tracking-tight'
          }`}
        >
          {brand.name}
        </h3>

        {/* Tagline & Industry */}
        {brand.tagline && (
          <p className="font-mono text-[10px] tracking-widest text-tdds-lime uppercase mb-1">
            {brand.tagline}
          </p>
        )}
        <p className="text-white/60 text-[11px] leading-relaxed line-clamp-2 mb-3">
          {brand.industry}
        </p>

        {/* Deliverable Tags */}
        {brand.servicesDelivered && brand.servicesDelivered.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
            {brand.servicesDelivered.map((service, i) => (
              <span
                key={i}
                className="text-[10px] font-sans text-white/70 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5"
              >
                {service}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action: Instagram Profile or Verified Partner */}
      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
        {brand.instagramUrl ? (
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/70 hover:text-white group-hover:text-tdds-coral-start transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Profile</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-tdds-lime" />
            <span>Studio Partner</span>
          </div>
        )}

        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
          Verified
        </span>
      </div>
    </div>
  );
};
